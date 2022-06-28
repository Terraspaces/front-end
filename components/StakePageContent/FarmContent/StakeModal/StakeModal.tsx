import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../../../contexts/wallet";
import { useFetchStakingInfoByOwnerId } from "../../../../state/hooks";
import { X_PARAS_COLLECTIONS } from "../../../../contexts/wallet";
import {
    Container,
} from "./style";


interface StakeModalProps {
    farmData: any;
    closeModal: any;
    nftList: any;
    onFarmingStake: any;
    nftContractList: any;
    nftMetadata: any;
}

export interface OptionProps {
    label: string;
    value: any;
}

const StakeModal: NextPage<StakeModalProps> = ({
    farmData,
    closeModal,
    nftList,
    onFarmingStake,
    nftContractList,
    nftMetadata
}) => {
    const { wallet } = useContext(WalletContext)
    const [selectOptions, setSelectOptions] = useState<Map<string, string[]>>()
    const [selectedNFT, setSelectedNFT] = useState<string[]>()
    const stakingInfo = useFetchStakingInfoByOwnerId(wallet?.account().accountId as string, farmData)
    const newData = new Map<string, string[]>();

    const fetchData = async () => {
        for (let i = 0; i < nftList.get(farmData)?.length; i++) {
            let nft_contract_id = farmData;
            if (nft_contract_id == "x.paras.near") {
                const result = await fetch("https://api-v2-mainnet.paras.id/token?token_id=" + nftList.get(farmData)[i]?.token_id);
                nft_contract_id = (await result.json())["data"]["results"][0].metadata.collection_id;
            }
            let list: string[] = [];
            if (newData.has(nft_contract_id)) {
                const data = newData.get(nft_contract_id);
                list = data == undefined ? [] : data;
            }
            list.push(nftList.get(farmData)[i]?.token_id);
            newData.set(nft_contract_id, list);
            if (!(stakingInfo.token_ids || []).includes((newData.get(farmData) as any)[i])) {
                setSelectOptions(newData)
            }
        }
    }

    useEffect(() => {
        if (stakingInfo.token_ids && wallet) {
            fetchData()
        }
    }, [wallet, JSON.stringify(stakingInfo)])

    const handleSelectNFT = (imageURL: string, metadata: any, token_id: string) => {
        const result: any[] = [{ imageURL: imageURL, metadata: metadata, token_id: token_id }]
        setSelectedNFT(result)
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="collection-list">
                    <h1 className="ml-20 mt-20 bold mb-40">Select your NFT</h1>
                    {nftContractList.map((contract_id: string, contract_index: number) => {
                        return (
                            <div key={contract_index}>
                                <div className="d-flex align-items-center mt-20 stakeModal-subHeader">
                                    <img className="mr-8 radius-35 border-white" draggable={false} src={"assets/icons/" + contract_id + ".png"} alt="Near" width={45} height={45} loading="lazy" />
                                    <h5>{nftMetadata.get(contract_id) != undefined ? nftMetadata.get(contract_id)?.name : contract_id}</h5>
                                    <img src="assets/img/icons/verified.svg" width="24" height="24" alt="verified" draggable={false} className="ml-10" />
                                </div>
                                <div className="nft-list">
                                    {nftList.get(contract_id)?.map((nftData: any, index: number) => {
                                        if (selectOptions?.get(contract_id)?.includes(nftData.token_id)) {
                                            const imageURL = X_PARAS_COLLECTIONS.includes(contract_id) ? ("https://ipfs.fleek.co/ipfs/" + nftData.metadata.media) : (nftData.metadata.media?.startsWith('http') ? nftData.metadata.media : (nftMetadata.get(contract_id)?.base_uri + '/' + nftData.metadata.media));
                                            return (
                                                <div className="nft-view" key={index} onClick={() => handleSelectNFT(imageURL, nftData.metadata, nftData.token_id)}>
                                                    <img className="stakeModal-img" draggable={false} src={imageURL} alt="staking" loading="lazy" />
                                                    <div className="nft-badge">{nftData.metadata.title}</div>
                                                    <button className="cmn-btn-1 f-18 mt-20 hidden-stake-btn" onClick={() => onFarmingStake(farmData, selectedNFT)}>
                                                        <span>Stake</span>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="nft-detailView">
                    {selectedNFT && (
                        <div className="d-flex flex-direction-column justify-content-between">
                            <div>
                                <img className="nft-detailImg" draggable={false} src={(selectedNFT as any)[0].imageURL} alt="selected" />
                                <h3 className="mt-10 ml-10 bold">{(selectedNFT as any)[0].metadata.title}</h3>
                                <h6 className="description">{(selectedNFT as any)[0].metadata.description}</h6>
                            </div>
                            <div>
                                <button className="cmn-btn-1 f-18 radius-12 mt-20 w-100" onClick={() => onFarmingStake(farmData, (selectedNFT as any)[0].token_id)}>
                                    <span>Stake</span>
                                </button>
                                <button className="cmn-btn-outline f-18 radius-12 mt-10 w-100" onClick={() => closeModal()}>
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default StakeModal