import type { NextPage } from "next";
import { useContext } from "react";
import { useFetchByOwnerId, useFetchSupplyFarm } from "../../../state/hooks";
import { WalletContext } from '../../../contexts/wallet'

interface CardSubHeaderProps {
    farmData: any
}

const CardSubHeader: NextPage<CardSubHeaderProps> = ({
    farmData
}) => {
    const { wallet } = useContext(WalletContext)
    const totalStaked = useFetchSupplyFarm(farmData)
    const stakedPerUser = useFetchByOwnerId(wallet?.account().accountId as string, [farmData])
    return (
        <div className="floor-c d-flex justify-content-between mt-10">
            <button type="button" className="floor-btn">Total Staked: {totalStaked}</button>
            <button type="button" className="floor-btn">Your NFTs Staked: {stakedPerUser}</button>
        </div>
    )
}

export default CardSubHeader