import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ReactModal from 'react-modal'
import { CardDetailFirst, CardDetailSecond, CardHeader, CardSubHeader } from "./FarmContent";
import StakeModal from "./FarmContent/StakeModal/StakeModal";
import { useFetchClaimAmountByOwnerId } from "../../state/hooks";
import UnStakeModal from './FarmContent/UnStakeModal/UnStakeModal'

interface NavFarmsContentProps {
    onFarmingStake: any;
    onFarmingUnstake: any;
    onClaimReward: any;
    farmContractList: any;
    nftList: any;
}

const NavFarmsContent: NextPage<NavFarmsContentProps> = ({
    onFarmingStake,
    onFarmingUnstake,
    onClaimReward,
    farmContractList,
    nftList
}) => {
    const [isStakeModal, setIsStakeModal] = useState<boolean>(false);
    const [isUnStakeModal, setIsUnStakeModal] = useState<boolean>(false);
    const [isClaimBtnStatus, setIsClaimBtnStatus] = useState<boolean>(false);
    const totalSupply = 777;

    ReactModal.defaultStyles.overlay!.backgroundColor = 'rgba(255, 100, 255, 0.05)';

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
        setIsStakeModal(false);
        setIsUnStakeModal(false);
        document.getElementById('__next')!.style.filter = 'none'
    }

    function openStakeModal() {
        setIsStakeModal(true);
        document.getElementById('__next')!.style.filter = 'blur(20px)'
    }

    function openUnStakeModal() {
        setIsUnStakeModal(true);
        document.getElementById('__next')!.style.filter = 'blur(20px)'
    }
    const claimAmount = useFetchClaimAmountByOwnerId('millicare.near', 'terraspaces.near')
    useEffect(() => {
        if (claimAmount as any === '0' || claimAmount as any === NaN) {
            setIsClaimBtnStatus(true)
        }
    }, [claimAmount])
    return (
        <div className="tab-pane fade" id="pills-farms" role="tabpanel" aria-labelledby="pills-farms-tab">
            <div className='row'>
                {farmContractList?.map((farmData: any, index: number) => (
                    <>
                        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-20' key={index}>
                            <div className='t-card p-20'>
                                <CardHeader farmData={farmData} />
                                <CardSubHeader farmData={farmData} />
                                <CardDetailFirst farmData={farmData} />
                                <CardDetailSecond farmData={farmData} />
                                <div className='d-flex justify-content-between mt-20'>
                                    <h6>Total Supply</h6>
                                    <h6>Staking Cap</h6>
                                </div>
                                <div className='d-flex justify-content-between mt-1'>
                                    <h6 className='t-20'>{totalSupply}</h6>
                                    <h6 className='t-20'>{totalSupply}</h6>
                                </div>
                                <div className='d-flex mt-30'>
                                    <div className='col-6 pr-7'>
                                        <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100" onClick={() => openStakeModal()}>
                                            <span>Stake</span>
                                        </button>
                                    </div>
                                    <div className='col-6 pl-7'>
                                        <button className="cmn-btn-outline f-18 radius-12 mt-10 col-6 w-100" onClick={() => openUnStakeModal()}>
                                            <span>Unstake</span>
                                        </button>
                                    </div>
                                </div>
                                <button className="cmn-btn-1 f-18 radius-12 mt-15 col-6 w-100" disabled={isClaimBtnStatus} onClick={() => onClaimReward(farmData)}>
                                    <span>Claim Rewards</span>
                                </button>
                            </div>
                        </div>
                        <ReactModal isOpen={isStakeModal} onRequestClose={() => closeModal()} style={customStyles}>
                            <StakeModal
                                farmData={farmData}
                                closeModal={closeModal}
                                nftList={nftList}
                                onFarmingStake={onFarmingStake}
                            />
                        </ReactModal>
                        <ReactModal isOpen={isUnStakeModal} onRequestClose={() => closeModal()} style={customStyles}>
                            <UnStakeModal
                                farmData={farmData}
                                closeModal={closeModal}
                                onFarmingUnstake={onFarmingUnstake}
                            />
                        </ReactModal>
                    </>
                ))}
            </div>
        </div>
    )
}

export default NavFarmsContent