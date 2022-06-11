import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useFetchFarmSpec, useFetchInfoByOwnerId, useNFTIsApproved } from "../../../state/hooks";
import { FARM_CONTRACT_ID, WalletContext } from '../../../contexts/wallet'

interface CardDetailFirstProps {
    farmData: any
}

const CardDetailFirst: NextPage<CardDetailFirstProps> = ({
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
    }, [stakingInfo, nftType])
    const nftTypeOne = nftType.includes('Kryptonite') ? 'Kryptonite' : nftType.includes('Lunar') ? 'Lunar' : nftType.includes('Quartz') ? 'Quartz' : nftType.includes('Iceberg') ? 'Iceberg' : nftType.includes('Golden') ? 'Golden' : nftType.includes('Terra') ? 'Terra' : 'None'
    const farmSpec = useFetchFarmSpec(farmData)
    return (
        <>
            <div className='d-flex justify-content-between mt-40'>
                <h6>NFT Type: {nftTypeOne}</h6>
                <h6>Reward Tokens</h6>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                {stakingInfo && (stakingInfo as any).token_ids && (stakingInfo as any).token_ids.length > 0 ? <img className='mr-10 farms-card-img' src={`https://terraspaces_nft_1.mypinata.cloud/ipfs/QmeP2Gn7fjycGerqTiKZnexyYXvu5qvDVKq4WHdfzwL8bi/${(stakingInfo as any).token_ids[0]}.png`} alt='terraspaces image' width={27} height={27} /> : <h6 className='t-18'>None</h6>}
                <h6 className='t-18'>${(farmSpec as any).reward_token_id?.toUpperCase()}</h6>
            </div>
        </>
    )
}

export default CardDetailFirst