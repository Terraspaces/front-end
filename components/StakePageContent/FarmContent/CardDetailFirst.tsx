import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useFetchFarmSpec, useFetchStakingInfoByOwnerId } from "../../../state/hooks";
import { WalletContext } from '../../../contexts/wallet'

interface CardDetailFirstProps {
    farmData: any
}

const CardDetailFirst: NextPage<CardDetailFirstProps> = ({
    farmData
}) => {
    const { wallet } = useContext(WalletContext)
    const stakingInfo = useFetchStakingInfoByOwnerId(wallet?.account().accountId as string, farmData)
    const [nftType, setNFTType] = useState<string[]>([])
    useEffect(() => {
        if (stakingInfo.token_ids?.length > 0) {
            (async () => {
                const tokenId = stakingInfo.token_ids[0];
                const result = await fetch(`https://terraspaces_nft_1.mypinata.cloud/ipfs/QmeP2Gn7fjycGerqTiKZnexyYXvu5qvDVKq4WHdfzwL8bi/${tokenId}.json`)
                const metadata = await result.json();
                const attributes: any[] = metadata.attributes;
                const trait = attributes.find(({trait_type}) => trait_type === "Terrain")
                setNFTType(trait ? trait.value : 'None');
            })();
        }
    }, [stakingInfo, nftType])
    const farmSpec = useFetchFarmSpec(farmData)
    return (
        <>
            <div className='d-flex justify-content-between mt-40'>
                <h6>NFT Type: {nftType}</h6>
                <h6>Reward Tokens</h6>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                {stakingInfo && stakingInfo.token_ids && stakingInfo.token_ids.length > 0 ? <img className='mr-10 farms-card-img' src={`https://terraspaces_nft_1.mypinata.cloud/ipfs/QmeP2Gn7fjycGerqTiKZnexyYXvu5qvDVKq4WHdfzwL8bi/${stakingInfo.token_ids[0]}.png`} alt='terraspaces image' width={27} height={27} /> : <h6 className='t-18'>None</h6>}
                <h6 className='t-18'>${farmSpec.reward_token_id?.toUpperCase()}</h6>
            </div>
        </>
    )
}

export default CardDetailFirst