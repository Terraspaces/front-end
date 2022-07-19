import type { NextPage } from 'next';
import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-dropdown-select';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { Icon } from '@iconify/react';
import { Container, BodyContainer, IconContent, TimelineContent, DetailContent, ModalInput, InputContent, Tooltip } from './styles';
import { submit_referral, getReferralTerraStats, getReferralStakingStats, getReferralStatus } from '../../utils/api/terraspace_api';
import { WalletContext } from '../../contexts/wallet';
import ReactModal from 'react-modal';
import { getCollectionNameList } from '../../utils/api/terraspace_api'

interface ReferralModalProps {
    totalCount: number;
    variables: number[];
}

interface ReferralStats {
    submitted: number;
    pending: number;
    approved: number;
    amount: number;
}

interface selectOptionProps {
    value: string;
    label: string;
}

const ReferralModal: NextPage<ReferralModalProps> = ({ totalCount, variables }) => {

    const { wallet } = useContext(WalletContext)
    const [referralStats, setReferralStats] = useState<ReferralStats>()

    const [referralWallet, setReferralWallet] = useState<string>('')
    const [collectionName, setCollectionName] = useState<string>('')
    const [allowSubmit, setAllowSubmit] = useState<boolean>(false)
    const [isTooltipDisplayed, setIsTooltipDisplayed] = useState<boolean>(false);
    const [isTooltipDisplayedLink, setIsTooltipDisplayedLink] = useState<boolean>(false);
    const [selectOptions, setSelectOption] = useState<selectOptionProps[]>([]);
    const [isValidWallet, setIsValidWallet] = useState<boolean>(true)
    const [toast, setToast] = useState<string>('')
    const [isNetworkSelectModalOpen, setIsNetworkSelectModalOpen] = useState<boolean>(false);

    const getReferralWallet = (event: any) => {
        const result = event.target.value;
        const index = result?.length - result?.lastIndexOf('.near');
        if (result?.includes('.near') && index === 5) {
            setIsValidWallet(true)
        } else if (!result?.includes('.near') || index !== 5) {
            setIsValidWallet(false)
        }
        setReferralWallet(event.target.value)
    }

    const getCollectionName = (event: any) => {
        setCollectionName(event.target.value)
    }

    // function copyToClipBoard() {
    //     var x: any = document.getElementById("snackbar");
    //     x.className = "show";
    //     setTimeout(function () { x.className = x.className.replace("show", ""); }, 4500);
    // }

    const SubmitReferral = async () => {
        const index = referralWallet.length - referralWallet.lastIndexOf('.near')
        if (!referralWallet.includes('.near') || index !== 5) {
            setIsValidWallet(false)
            return;
        }
        if (allowSubmit && referralWallet !== '' && collectionName !== '') {
            await submit_referral({ referral_wallet_id: wallet?.account().accountId || '', referred_by: variables[0] === 2.5 ? "Staking Partners" : "Terraspaces", collection_name: collectionName })
            const submitStatus = await getReferralStatus(wallet?.account().accountId || '')
            if (submitStatus.has_referral) {
                setIsNetworkSelectModalOpen(true)
                const timer = setTimeout(() => {
                    setIsNetworkSelectModalOpen(false)
                }, 4000);
                return () => {
                    clearTimeout(timer)
                }
            }
        }
        updateReferralStats()
    }

    const updateReferralStats = async () => {
        const data_terra = await getReferralTerraStats(wallet?.account().accountId || '')
        const data_staking = await getReferralStakingStats(wallet?.account().accountId || '')
        variables[0] === 2.5 ? setReferralStats(data_staking) : setReferralStats(data_terra)
    }

    // useEffect(() => {
    //     (async () => {
    //         const result = await getReferralTerraStats(wallet?.account().accountId || '')
    //         console.log(result)
    //     })
    // }, [wallet])

    // const getCollectionList = async () => {
    //     const results = await getCollectionNameList()
    //     const options = results.map((result: any) => ({ label: result.name, value: result.name }))
    //     setSelectOption(options);
    // }

    useEffect(() => {
        updateReferralStats()
        // getCollectionList()
        setReferralWallet(wallet?.account().accountId as string)
    }, [wallet])

    const exploreList = [
        { name: 'Antisocial Ape Club', photo: '/assets/partners/asac.jpg', description: 'A collection of 3333 pixel art ape NFTs stored an the NEAR blockchain', para_link: "https://paras.id/collection/asac.near" },
        { name: 'Boo Monsters', photo: '/assets/partners/boomonsters.png', description: 'A limited collection of Boo Monsters roaming the blockchain', para_link: "https://paras.id/collection/boo-monster-by-omarbibznear" },
        { name: 'Mara Gen1', photo: '/assets/partners/mara.png', description: '1000 unique Mara holding one of these gives access to loads of benefits from MARADAO.', para_link: "https://paras.id/collection/mara-smartcontract.near" },
        { name: 'Nearnauts', photo: '/assets/partners/nearnaut.png', description: 'NEARNauts is a generative NFT project on the NEAR network consisting of 7777 randomly generated Nauts of varying rarity.', para_link: "https://paras.id/collection/nearnautnft.near" },
        { name: 'Mr. Brown', photo: '/assets/partners/mrbrown.jpeg', description: 'Mr. Brown is a middle-aged insurance clerk with 4,200 imagined identities living inside his head. He gets lost in them every day, sometimes even forgetting which one is real. Even though the mental borders between identities are thin, no two identities are alike. Each Mr. Brown is unique and stored on the NEAR blockchain.', para_link: "https://paras.id/collection/mrbrownproject.near" },
        { name: 'The Dons', photo: '/assets/partners/thedons.jpg', description: 'A collection of 3,500 Mafia Bosses coming to take over NEAR Protocol. Blood makes you related. Loyalty makes you family.', para_link: "https://paras.id/collection/nft.thedons.near" },
        { name: 'Monarchs By Haven', photo: '/assets/partners/haven.gif', description: 'Monarchs is a collection of 333 NFTs rewriting history on the NEAR Protocol.', para_link: "https://paras.id/collection/mint.havendao.near" }
    ]

    ReactModal.defaultStyles.overlay!.backgroundColor = 'rgba(0, 0, 0, 0.1)';

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "transparent",
            border: 'none',
            overflow: 'hidden',
        },
    };

    function closeModal() {
        setIsNetworkSelectModalOpen(false);
    }

    return (
        <>
            <Container>
                <div className='d-flex align-items-center justify-content-between'>
                    <h1 className='t-36'>Make New Referral</h1>
                </div>
                <BodyContainer className='row'>
                    <div className='col-md-4 col-xs-12'>
                        <div className={variables[0] === 2.5 ? "" : "d-flex align-items-center"}>
                            {variables[0] === 2.5 ? (
                                exploreList.map((explore, index) => {
                                    return <img className='-mr-15 partner-image' src={explore.photo} alt='terraspaces image' width={45} height={45} key={index} />
                                })
                            ) : (
                                <img className='mr-10' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={42} height={42} />
                            )}
                            <div className='d-flex align-items-center'>
                                <h5 className='mr-5 letter-space-1 t-20'>{variables[0] === 2.5 ? 'Staking Partners' : 'Terraspaces'}</h5>
                                <img src="assets/img/icons/verified.svg" alt="verified" width={24} height={24} />
                            </div>
                        </div>
                        <h4 className='mt-20'>How it works</h4>
                        <div className='timeline'>
                            <TimelineContent>
                                <div className='d-flex align-items-center mt-30'>
                                    <IconContent>
                                        <Icon icon="icon-park-outline:mail-review" color="white" width="22" height="22" />
                                    </IconContent>
                                    <div>
                                        <p className='text-18 bold'>Share Form Link</p>
                                        <p className='text-14 mt-10'>Invite new collections as partners by sharing the application form.</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mt-30'>
                                    <IconContent>
                                        <Icon icon="akar-icons:link-chain" color="white" width="22" height="22" />
                                    </IconContent>
                                    <div>
                                        <p className='text-18 bold'>Share Referral Wallet</p>
                                        <p className='text-14 mt-10'>Share this connected wallet as your referral link with new collection.</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mt-30'>
                                    <IconContent>
                                        <Icon icon="icons8:add-user" color="white" width="22" height="22" />
                                    </IconContent>
                                    <div>
                                        <p className='text-18 bold'>Submit Referral</p>
                                        <p className='text-14 mt-10'>Submit new referral once application form and wallet is shared.</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mt-30'>
                                    <IconContent>
                                        <Icon icon="ant-design:dollar-circle-outlined" color="white" width="22" height="22" />
                                    </IconContent>
                                    <div>
                                        <p className='text-18 bold'>Earn $USN Rewards</p>
                                        <p className='text-14 mt-10'>Get $USN rewards after approved collection has applied and onboarded.</p>
                                    </div>
                                </div>
                            </TimelineContent>
                        </div>
                    </div>
                    <div className='col-md-8 col-xs-12'>
                        <DetailContent>
                            <div className="floor-c row value-group">
                                <div className='col-md-4 col-xs-12 p-1'>
                                    <button type="button" className="modal-btn w-100">Referral Commission: {variables[0]}%</button>
                                </div>
                                <div className='col-md-4 col-xs-12 p-1'>
                                    <button type="button" className="modal-btn w-100">Your NFTs Staked: {variables[0] === 2.5 ? 0 : totalCount}</button>
                                </div>
                                <div className='col-md-4 col-xs-12 p-1'>
                                    <button type="button" className="modal-btn w-100">Staking Multiplier: {variables[1]}</button>
                                </div>
                            </div>
                            <div className="row mt-30">
                                <div className='col-md-4 col-xs-6 p-1'>
                                    <p className='text-14 font-light'>Submitted Referrals</p>
                                    <p className='text-18 bold mt-1'>{referralStats?.submitted}</p>
                                </div>
                                <div className='col-md-4 col-xs-6 p-1'>
                                    <p className='text-14 font-light'>Approved Referrals</p>
                                    <p className='text-18 bold mt-1'>{referralStats?.approved}</p>
                                </div>
                                {/* <div className='col-md-4 col-xs-6 p-1'>
                                    <p className='text-14 font-light'>Pending Referrals</p>
                                    <p className='text-18 bold mt-1'>{referralStats?.pending}</p>
                                </div> */}
                                <div className='col-md-4 col-xs-6 p-1'>
                                    <p className='text-14 font-light'>Amount Earned</p>
                                    <p className='text-18 bold mt-1'>${referralStats?.amount}</p>
                                </div>
                            </div>
                            <div className="floor-c row mt-15">
                                <div className='row d-flex justify-content-between'>
                                    <div className='col-md-6 col-xs-12 p-1'>
                                        <p className='text-16'>Your Referral Wallet</p>
                                        <InputContent>
                                            <ModalInput placeholder='zerotime.near' disabled value={referralWallet} onChange={() => getReferralWallet(event)} />
                                            <Icon icon="fluent:clipboard-paste-16-regular" width="22" height="22" className='ml-10'
                                                onClick={() => {
                                                    if (navigator.clipboard) {
                                                        navigator.clipboard.writeText(wallet?.account().accountId as string)
                                                        setIsTooltipDisplayed(true);
                                                        setTimeout(() => {
                                                            setIsTooltipDisplayed(false);
                                                        }, 1500);
                                                    }
                                                }} />
                                            <Tooltip isTooltipDisplayed={isTooltipDisplayed} style={{ width: "70px", left: "-15px" }}>Copied</Tooltip>
                                        </InputContent>
                                    </div>
                                    <div className='col-md-6 col-xs-12 p-1'>
                                        <p className='text-16'>Your Referral Link</p>
                                        <InputContent>
                                            <ModalInput placeholder='Airtable Link' value="https://airtable.com/shrt1s7uQK1z3pjs9" className="cursor-pointer" onClick={() => window.open("https://airtable.com/shrt1s7uQK1z3pjs9", '_blank')} />
                                            <Icon icon="fluent:clipboard-paste-16-regular" width="22" height="22" className='ml-10'
                                                onClick={() => {
                                                    if (navigator.clipboard) {
                                                        navigator.clipboard.writeText("https://airtable.com/shrt1s7uQK1z3pjs9")
                                                        setIsTooltipDisplayedLink(true);
                                                        setTimeout(() => {
                                                            setIsTooltipDisplayedLink(false);
                                                        }, 1500);
                                                    }
                                                }} />
                                            <Tooltip isTooltipDisplayed={isTooltipDisplayedLink} style={{ width: "70px", left: "-15px" }}>Copied</Tooltip>
                                        </InputContent>
                                    </div>
                                </div>
                                {!isValidWallet && <p className='warning-text'>Please enter correct wallet format.</p>}
                            </div>
                            <div className='floor-c row mt-15 p-1'>
                                <p className='text-16 p-1'>Collection Name*</p>
                                <InputContent>
                                    <ModalInput placeholder='Enter collection name' onChange={() => getCollectionName(event)} />
                                </InputContent>
                            </div>
                            {/* <Select
                                color='#63517e'
                                values={[]}
                                options={selectOptions}
                                onChange={() => getCollectionName(event)}
                                className="dropdownList"
                                placeholder='Select Collection name'
                            /> */}
                            <label className="checkbox-container">I have shared the application form and referral wallet to invited collection.
                                <input type="checkbox" checked={allowSubmit} onClick={() => setAllowSubmit(!allowSubmit)} />
                                <span className="checkmark" />
                            </label>
                            <button className="cmn-btn-1 f-18 radius-12 w-100" onClick={() => SubmitReferral()}>
                                <span>Submit Referral</span>
                            </button>
                            <p className='text-14 p-1 italic'>Note: You may only submit once every 24 hours.</p>
                        </DetailContent>
                    </div>
                </BodyContainer >
                <p id="snackbar">{toast}</p>
                <ReactModal isOpen={isNetworkSelectModalOpen} style={customStyles}>
                    <Player
                        autoplay
                        loop
                        src="https://assets1.lottiefiles.com/packages/lf20_cjoombb4.json"
                        style={{ width: '350px' }}
                    />
                </ReactModal>
            </Container >
        </>
    )
}

export default ReferralModal