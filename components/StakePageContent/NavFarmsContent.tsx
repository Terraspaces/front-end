import type { NextPage } from "next";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal'
import { CardDetailFirst, CardDetailSecond, CardHeader, CardSubHeader, ButtonContent, CardDetailThird } from "./FarmContent";
import StakeModal from "./FarmContent/StakeModal/StakeModal";
import UnStakeModal from './FarmContent/UnStakeModal/UnStakeModal'

interface NavFarmsContentProps {
    onFarmingStake: any;
    onFarmingUnstake: any;
    onClaimReward: any;
    farmContractList: any;
    nftList: any;
    nftMetadata: any;
}

const NavFarmsContent: NextPage<NavFarmsContentProps> = ({
    onFarmingStake,
    onFarmingUnstake,
    onClaimReward,
    farmContractList,
    nftList,
    nftMetadata
}) => {
    const [isStakeModal, setIsStakeModal] = useState<boolean>(false);
    const [isUnStakeModal, setIsUnStakeModal] = useState<boolean>(false);
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

    const [storage, setStorage] = useState(localStorage.getItem('isFarms'))
    const [navState, setNavState] = useState('')
    useEffect(() => {
        if (storage === 'yes') {
            setNavState('Owned')
        }
    }, [storage])

    return (
        <div className={navState === 'Owned' ? "tab-pane fade show active" : "tab-pane fade"} id="pills-farms" role="tabpanel" aria-labelledby="pills-farms-tab">
            <div className='row'>
                {farmContractList?.map((farmData: any, index: number) => (
                    <>
                        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-20' key={index}>
                            <div className='t-card p-20'>
                                <CardHeader farmData={farmData} />
                                <CardSubHeader farmData={farmData} />
                                <CardDetailFirst farmData={farmData} />
                                <CardDetailSecond farmData={farmData} />
                                <CardDetailThird totalSupply={totalSupply} farmData={farmData} />
                                <ButtonContent
                                    farmData={farmData}
                                    openStakeModal={openStakeModal}
                                    openUnStakeModal={openUnStakeModal}
                                    onClaimReward={onClaimReward}
                                />
                            </div>
                        </div>
                        <ReactModal isOpen={isStakeModal} onRequestClose={() => closeModal()} style={customStyles} htmlOpenClassName="modalBody">
                            <StakeModal
                                farmData={farmData}
                                closeModal={closeModal}
                                nftList={nftList}
                                onFarmingStake={onFarmingStake}
                                nftMetadata={nftMetadata}
                            />
                        </ReactModal>
                        <ReactModal isOpen={isUnStakeModal} onRequestClose={() => closeModal()} style={customStyles} htmlOpenClassName="modalBody">
                            <UnStakeModal
                                farmData={farmData}
                                closeModal={closeModal}
                                nftList={nftList}
                                onFarmingUnstake={onFarmingUnstake}
                                nftMetadata={nftMetadata}
                            />
                        </ReactModal>
                    </>
                ))}
            </div>
        </div>
    )
}

export default NavFarmsContent