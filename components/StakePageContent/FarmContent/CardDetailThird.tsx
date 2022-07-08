import type { NextPage } from "next";
import { useContext } from "react";
import { WalletContext } from "../../../contexts/wallet";
import { useFetchClaimAmount } from '../../../state/hooks'

interface CardDetailThirdProps {
    totalSupply: any;
    farmData: any;
}

const CardDetailThird: NextPage<CardDetailThirdProps> = ({
    totalSupply,
    farmData
}) => {
    const { wallet } = useContext(WalletContext)
    const claimAmount = useFetchClaimAmount(wallet?.account().accountId as string, farmData) / (10 ** 18)
    return (
        <>
            <div className='d-flex justify-content-between mt-20'>
                <h6 className="text-grey">Total Supply</h6>
                <h6 className="text-grey">Claimable Rewards</h6>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <h6 className='t-20'>{totalSupply}</h6>
                <h6 className='t-20'>{claimAmount.toFixed(3)}</h6>
            </div>
        </>
    )
}

export default CardDetailThird