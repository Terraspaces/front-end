import type { NextPage } from "next";
import { useContext, useEffect, useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useFetchFarmSpec, useFetchInfoByOwnerId, useFetchTokenRate } from "../../../state/hooks";
import { WalletContext } from '../../../contexts/wallet'

interface CardDetailSecondProps {
    farmData: any
}

const CardDetailSecond: NextPage<CardDetailSecondProps> = ({
    farmData
}) => {
    const { wallet } = useContext(WalletContext)
    const stakingInfo = useFetchInfoByOwnerId(wallet?.account().accountId as string, farmData)
    const [nftType, setNFTType] = useState<Array<string>>([])
    useEffect(() => {
        if (stakingInfo && (stakingInfo as any).token_ids) {
            (async () => {
                for (let i = 0; i < (stakingInfo as any).token_ids?.length; i++) {
                    const result = await fetch(`https://terraspaces_nft_1.mypinata.cloud/ipfs/QmeP2Gn7fjycGerqTiKZnexyYXvu5qvDVKq4WHdfzwL8bi/${(stakingInfo as any)?.token_ids[i]}.json`)
                    const data = (await (result.json()))["attributes"][1].value
                    if (!nftType.includes(data)) {
                        setNFTType([...nftType, data])
                    }
                }
            })()
        }
    }, [stakingInfo, nftType, farmData, wallet])

    const multipliers: any[] = useFetchTokenRate(farmData, (stakingInfo as any).token_ids || [])
    const farmSpec = useFetchFarmSpec(farmData)

    console.log(multipliers, farmSpec)
    const reward = useMemo(() => {
        let totalReward = multipliers.reduce((total, x) => {
            return total + (x * ((farmSpec as any).reward_rate))
        }, 0)
        return totalReward / 10 ** 18 * 3600 * 24 * 30
    }, [JSON.stringify(multipliers), farmSpec])
    // const reward_rate = ((multiplier as any) * ((farmSpec as any).reward_rate) / 10 ** 18) * 3600 * 24 * 30
    const reward_rate = 10

    return (
        <>
            <div className='d-flex justify-content-between mt-20'>
                <h6>Rewards: Monthly</h6>
                <div className='d-flex align-items-center'>
                    <h6 className='mr-5'>Automatic Airdrops</h6>
                    <Icon icon="akar-icons:circle-check" color='white' width={20} height={20} />
                </div>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <h6 className='t-20'>{(reward).toFixed(2)} $USN NFT</h6>
                <div className='d-flex align-items-center'>
                    <h6 className='mr-5'>Dashboard Access</h6>
                    <Icon icon="akar-icons:circle-check" color='white' width={20} height={20} />
                </div>
            </div>
        </>
    )
}

export default CardDetailSecond