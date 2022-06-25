import type { NextPage } from "next";
import { useContext, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useFetchFarmSpec, useFetchStakingInfoByOwnerId, useFetchTokenRate } from "../../../state/hooks";
import { WalletContext } from '../../../contexts/wallet'

interface CardDetailSecondProps {
    farmData: any
}

const CardDetailSecond: NextPage<CardDetailSecondProps> = ({
    farmData
}) => {
    const { wallet } = useContext(WalletContext)
    const stakingInfo = useFetchStakingInfoByOwnerId(wallet?.account().accountId as string, farmData)
    const multipliers: any[] = useFetchTokenRate(farmData, stakingInfo.token_ids || [])
    const farmSpec = useFetchFarmSpec(farmData)

    const reward = useMemo(() => {
        let totalReward = multipliers.reduce((total, x) => {
            return total + (x * (farmSpec.reward_rate))
        }, 0)
        return totalReward / 10 ** 18 * 3600 * 24 * 30
    }, [JSON.stringify(multipliers), farmSpec])

    return (
        <>
            <div className='d-flex justify-content-between mt-20'>
                <h6 className="text-grey">Rewards: Monthly</h6>
                <div className='d-flex align-items-center'>
                    <h6 className='mr-5'>Automatic Airdrops</h6>
                    <Icon icon="akar-icons:circle-check" color='white' width={20} height={20} />
                </div>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <h6 className='t-20'>{(reward).toFixed(2)} USN</h6>
                <div className='d-flex align-items-center'>
                    <h6 className='mr-5'>Dashboard Access</h6>
                    <Icon icon="akar-icons:circle-check" color='white' width={20} height={20} />
                </div>
            </div>
        </>
    )
}

export default CardDetailSecond