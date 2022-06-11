import type { NextPage } from "next";
import { useEffect, useState, useContext } from "react";
import { WalletContext } from "../../../contexts/wallet";
import { useFetchClaimAmountByOwnerId } from "../../../state/hooks";

interface ButtonContentProps {
    farmData: any;
    openStakeModal: any;
    openUnStakeModal: any;
    onClaimReward: any;
}

const ButtonContent: NextPage<ButtonContentProps> = ({
    farmData,
    openStakeModal,
    openUnStakeModal,
    onClaimReward,
}) => {
    const { wallet } = useContext(WalletContext)
    const [isClaimBtnStatus, setIsClaimBtnStatus] = useState<boolean>(false);
    const claimAmount = useFetchClaimAmountByOwnerId(wallet?.account().accountId || '', farmData)
    useEffect(() => {
        if (claimAmount as any === '0' || claimAmount as any === NaN) {
            setIsClaimBtnStatus(true)
        }
    }, [claimAmount])
    return (
        <>
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
        </>
    )
}

export default ButtonContent