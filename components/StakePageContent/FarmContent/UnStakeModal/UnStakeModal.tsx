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
    onFarmingUnstake: any;
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
    onFarmingUnstake,
    nftMetadata
}) => {
    const { wallet } = useContext(WalletContext)
    const [selectOptions, setSelectOptions] = useState<string[]>([])
    const [selectedNFT, setSelectedNFT] = useState<string[]>()
    const stakingInfo = useFetchStakingInfoByOwnerId(wallet?.account().accountId as string, farmData)
    const newData = new Map<string, string[]>();
    // const stakingInfo = {
    //     "token_ids": [
    //         "44",
    //         "45",
    //         "46",
    //         "47",
    //         "48"
    //     ],
    //     "stacked_reward": 5826388888891872,
    //     "updated_at": 1656431058
    // }

    // const nftList.get(farmData) = [
    //     {
    //         "token_id": "44",
    //         "owner_id": "millicare.near",
    //         "metadata": {
    //             "title": "Terraspaces #44",
    //             "description": "Genesis collection of 777 abstract NFTs. The First Generative Landmarks Collection on NEAR featuring Gated-via-Staking Access to Analaytical Dashboard. Tap into revenue generation via Staking-as-a-Service [SaaS] business model.",
    //             "media": "44.png",
    //             "media_hash": null,
    //             "copies": null,
    //             "issued_at": 1651705354843,
    //             "expires_at": null,
    //             "starts_at": null,
    //             "updated_at": null,
    //             "extra": null,
    //             "reference": "44.json",
    //             "reference_hash": null
    //         },
    //         "approved_account_ids": {
    //             "terraspaces-farming.near": 19,
    //             "terraspaces-staking.near": 14
    //         },
    //         "royalty": {
    //             "luciddream.near": 100,
    //             "zerotime.near": 100,
    //             "terraspaces-treasury.near": 300,
    //             "xuguangxia725.near": 100
    //         }
    //     },
    //     {
    //         "token_id": "45",
    //         "owner_id": "millicare.near",
    //         "metadata": {
    //             "title": "Terraspaces #45",
    //             "description": "Genesis collection of 777 abstract NFTs. The First Generative Landmarks Collection on NEAR featuring Gated-via-Staking Access to Analaytical Dashboard. Tap into revenue generation via Staking-as-a-Service [SaaS] business model.",
    //             "media": "45.png",
    //             "media_hash": null,
    //             "copies": null,
    //             "issued_at": 1651705354843,
    //             "expires_at": null,
    //             "starts_at": null,
    //             "updated_at": null,
    //             "extra": null,
    //             "reference": "45.json",
    //             "reference_hash": null
    //         },
    //         "approved_account_ids": {
    //             "terraspaces-farming.near": 19,
    //             "terraspaces-staking.near": 14
    //         },
    //         "royalty": {
    //             "luciddream.near": 100,
    //             "zerotime.near": 100,
    //             "terraspaces-treasury.near": 300,
    //             "xuguangxia725.near": 100
    //         }
    //     },
    //     {
    //         "token_id": "46",
    //         "owner_id": "millicare.near",
    //         "metadata": {
    //             "title": "Terraspaces #46",
    //             "description": "Genesis collection of 777 abstract NFTs. The First Generative Landmarks Collection on NEAR featuring Gated-via-Staking Access to Analaytical Dashboard. Tap into revenue generation via Staking-as-a-Service [SaaS] business model.",
    //             "media": "46.png",
    //             "media_hash": null,
    //             "copies": null,
    //             "issued_at": 1651705354843,
    //             "expires_at": null,
    //             "starts_at": null,
    //             "updated_at": null,
    //             "extra": null,
    //             "reference": "46.json",
    //             "reference_hash": null
    //         },
    //         "approved_account_ids": {
    //             "terraspaces-farming.near": 19,
    //             "terraspaces-staking.near": 14
    //         },
    //         "royalty": {
    //             "luciddream.near": 100,
    //             "zerotime.near": 100,
    //             "terraspaces-treasury.near": 300,
    //             "xuguangxia725.near": 100
    //         }
    //     },
    //     {
    //         "token_id": "47",
    //         "owner_id": "millicare.near",
    //         "metadata": {
    //             "title": "Terraspaces #47",
    //             "description": "Genesis collection of 777 abstract NFTs. The First Generative Landmarks Collection on NEAR featuring Gated-via-Staking Access to Analaytical Dashboard. Tap into revenue generation via Staking-as-a-Service [SaaS] business model.",
    //             "media": "47.png",
    //             "media_hash": null,
    //             "copies": null,
    //             "issued_at": 1651705354843,
    //             "expires_at": null,
    //             "starts_at": null,
    //             "updated_at": null,
    //             "extra": null,
    //             "reference": "47.json",
    //             "reference_hash": null
    //         },
    //         "approved_account_ids": {
    //             "terraspaces-farming.near": 19,
    //             "terraspaces-staking.near": 14
    //         },
    //         "royalty": {
    //             "luciddream.near": 100,
    //             "zerotime.near": 100,
    //             "terraspaces-treasury.near": 300,
    //             "xuguangxia725.near": 100
    //         }
    //     },
    //     {
    //         "token_id": "48",
    //         "owner_id": "millicare.near",
    //         "metadata": {
    //             "title": "Terraspaces #48",
    //             "description": "Genesis collection of 777 abstract NFTs. The First Generative Landmarks Collection on NEAR featuring Gated-via-Staking Access to Analaytical Dashboard. Tap into revenue generation via Staking-as-a-Service [SaaS] business model.",
    //             "media": "48.png",
    //             "media_hash": null,
    //             "copies": null,
    //             "issued_at": 1651705354843,
    //             "expires_at": null,
    //             "starts_at": null,
    //             "updated_at": null,
    //             "extra": null,
    //             "reference": "48.json",
    //             "reference_hash": null
    //         },
    //         "approved_account_ids": {
    //             "terraspaces-farming.near": 19,
    //             "terraspaces-staking.near": 14
    //         },
    //         "royalty": {
    //             "luciddream.near": 100,
    //             "zerotime.near": 100,
    //             "terraspaces-treasury.near": 300,
    //             "xuguangxia725.near": 100
    //         }
    //     }
    // ]

    const fetchData = async () => {
        const tmpOptions = [];
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
            if ((stakingInfo.token_ids || []).includes((newData.get(farmData) as string[])[i])) {
                tmpOptions.push((newData.get(farmData) as string[])[i]);
            }
        }
        setSelectOptions([...selectOptions, ...tmpOptions]);
    }

    useEffect(() => {
        if (stakingInfo && wallet && nftList && farmData && newData) {
            fetchData()
        }
    }, [wallet, JSON.stringify(stakingInfo), JSON.stringify(nftList), farmData, JSON.stringify(newData)])

    const handleSelectNFT = (imageURL: string, metadata: any, token_id: string) => {
        const result: any[] = [{ imageURL: imageURL, metadata: metadata, token_id: token_id }]
        setSelectedNFT(result)
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="collection-list">
                    <h1 className="ml-20 mt-20 mb-40 bold">Unstake your NFT</h1>
                    <div>
                        <div className="d-flex align-items-center mt-20 stakeModal-subHeader">
                            <img className="mr-8 radius-35 border-white" draggable={false} src={"assets/icons/" + farmData + ".png"} alt="Near" width={45} height={45} loading="lazy" />
                            <h5>{nftMetadata.get(farmData) != undefined ? nftMetadata.get(farmData)?.name : farmData}</h5>
                            <img src="assets/img/icons/verified.svg" width="24" height="24" draggable={false} alt="verified" className="ml-10" />
                        </div>
                        {selectOptions.length === 0 ? (
                            <h3 className="mt-20 ml-20">There are no NFTs to unstake.</h3>
                        ) : (
                            <div className="nft-list">
                                {nftList.get(farmData)?.map((nftData: any, index: number) => {
                                    if ((selectOptions || [])?.includes(nftData.token_id)) {
                                        const imageURL = X_PARAS_COLLECTIONS.includes(farmData) ? ("https://ipfs.fleek.co/ipfs/" + nftData.metadata.media) : (nftData.metadata.media?.startsWith('http') ? nftData.metadata.media : (nftMetadata.get(farmData)?.base_uri + '/' + nftData.metadata.media));
                                        return (
                                            <div className="nft-view" key={index} onClick={() => handleSelectNFT(imageURL, nftData.metadata, nftData.token_id)}>
                                                <img className="stakeModal-img" src={imageURL} draggable={false} alt="staking" loading="lazy" />
                                                <div className="nft-badge">{nftData.metadata.title}</div>
                                                <button className="cmn-btn-1 f-18 mt-20 hidden-stake-btn" onClick={() => onFarmingUnstake(farmData, selectedNFT)}>
                                                    <span>Unstake</span>
                                                </button>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )}
                    </div>
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
                                <button className="cmn-btn-1 f-18 radius-12 mt-20 w-100" onClick={() => onFarmingUnstake(farmData, (selectedNFT as any)[0].token_id)}>
                                    <span>Unstake</span>
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