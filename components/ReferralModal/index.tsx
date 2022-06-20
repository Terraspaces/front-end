import type { NextPage } from 'next';
import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-dropdown-select';
import { Icon } from '@iconify/react';
import { Container, BodyContainer, IconContent, TimelineContent, DetailContent, ModalInput, InputContent, Tooltip } from './styles';
import { getReferralStats, submit_referral } from '../../utils/api/terraspace_api';
import { WalletContext } from '../../contexts/wallet';
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
    const [selectOptions, setSelectOption] = useState<selectOptionProps[]>([]);
    const [isValidWallet, setIsValidWallet] = useState<boolean>(true)

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
        setCollectionName(event.target.ariaLabel)
    }

    const SubmitReferral = async () => {
        const index = referralWallet.length - referralWallet.lastIndexOf('.near')
        if (!referralWallet.includes('.near') || index !== 5) {
            setIsValidWallet(false)
            return;
        }
        if (allowSubmit && referralWallet !== '' && collectionName !== '') {
            await submit_referral({ referral_wallet_id: wallet?.account().accountId || '', referred_wallet_id: referralWallet, collection_name: collectionName })
        }
        updateReferralStats()
    }

    const updateReferralStats = async () => {
        const data = await getReferralStats(wallet?.account().accountId || '')
        setReferralStats(data)
    }

    const getCollectionList = async () => {
        const results = await getCollectionNameList()
        const options = results.map((result: any) => ({ label: result.name, value: result.name }))
        setSelectOption(options);
    }

    useEffect(() => {
        updateReferralStats()
        getCollectionList()
    }, [wallet])

    return (
        <Container>
            <div className='d-flex align-items-center justify-content-between'>
                <h1 className='t-36'>Make New Referral</h1>
                {/* <button className="cmn-btn-1 f-18 radius-12 p-15">
                    <span className='mr-5'>Wallet</span>
                    <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                </button> */}
            </div>
            <BodyContainer className='row'>
                <div className='col-md-4 col-xs-12'>
                    <div className="d-flex align-items-center">
                        <img className='mr-10' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={42} height={42} />
                        <h5 className='mr-5 letter-space-1 t-20'>Terraspaces</h5>
                        <img src="assets/img/icons/verified.svg" alt="verified" width={24} height={24} />
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
                                <button type="button" className="modal-btn w-100">Your NFTs Staked: {totalCount}</button>
                            </div>
                            <div className='col-md-4 col-xs-12 p-1'>
                                <button type="button" className="modal-btn w-100">Staking Multiplier: {variables[1]}</button>
                            </div>
                        </div>
                        <div className="row mt-30">
                            <div className='col-md-3 col-xs-6 p-1'>
                                <p className='text-14 font-light'>Submitted Referrals</p>
                                <p className='text-18 bold mt-1'>{referralStats?.submitted}</p>
                            </div>
                            <div className='col-md-3 col-xs-6 p-1'>
                                <p className='text-14 font-light'>Pending Referrals</p>
                                <p className='text-18 bold mt-1'>{referralStats?.pending}</p>
                            </div>
                            <div className='col-md-3 col-xs-6 p-1'>
                                <p className='text-14 font-light'>Approved Referrals</p>
                                <p className='text-18 bold mt-1'>{referralStats?.approved}</p>
                            </div>
                            <div className='col-md-3 col-xs-6 p-1'>
                                <p className='text-14 font-light'>Amount Earned</p>
                                <p className='text-18 bold mt-1'>${referralStats?.amount}</p>
                            </div>
                        </div>
                        <div className="floor-c row mt-15 p-1">
                            <p className='text-16 p-1'>Your Referral Wallet</p>
                            <InputContent>
                                <ModalInput placeholder='zerotime.near' onChange={() => getReferralWallet(event)} />
                                <Icon icon="bx:copy" width="22" height="22"
                                    onClick={() => {
                                        if (navigator.clipboard) {
                                            navigator.clipboard.writeText(referralWallet);
                                            setIsTooltipDisplayed(true);
                                            setTimeout(() => {
                                                setIsTooltipDisplayed(false);
                                            }, 1500);
                                        }
                                    }} />
                                <Tooltip isTooltipDisplayed={isTooltipDisplayed} style={{ width: "70px", left: "-15px" }}>Copied</Tooltip>
                            </InputContent>
                            {!isValidWallet && <p className='warning-text'>Please enter correct wallet format.</p>}
                            {/* <div className='col-md-6 col-xs-12 p-1'>
                                <p className='text-16'>Your Referral Link</p>
                                <InputContent>
                                    <ModalInput placeholder='https://terraspaces.io/apply' />
                                    <Icon icon="bx:copy" color="#a194bb" width="22" height="22" />
                                </InputContent>
                            </div> */}
                        </div>
                        <div className='floor-c row mt-15 p-1'>
                            <p className='text-16 p-1'>Collection Name*</p>
                            {/* <InputContent>
                                <ModalInput placeholder='Enter collection name' onChange={() => getCollectionName(event)} />
                            </InputContent> */}
                        </div>
                        <Select
                            color='#63517e'
                            values={[]}
                            options={selectOptions}
                            onChange={() => getCollectionName(event)}
                            className="dropdownList"
                            placeholder='Select Collection name'
                        />
                        <label className="checkbox-container mt-20">I have shared the application form and referral wallet to invited collection.
                            <input type="checkbox" checked={allowSubmit} onClick={() => setAllowSubmit(!allowSubmit)} />
                            <span className="checkmark" />
                        </label>
                        <button className="cmn-btn-1 f-18 radius-12 w-100 mt-50" onClick={() => SubmitReferral()}>
                            <span>Submit Referral</span>
                        </button>
                        <p className='text-14 p-1 italic'>Note: You may only submit once every 24 hours.</p>
                    </DetailContent>
                </div>
            </BodyContainer >
        </Container >
    )
}

export default ReferralModal