import { NativeSelect, MenuItem } from "@mui/material";
import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { FARM_CONTRACT_ID, WalletContext } from "../../../../contexts/wallet";
import { useFetchStakingInfoByOwnerId } from "../../../../state/hooks";
import CardHeader from "../CardHeader";
import {
    Container,
    StakeModalHeader,
    NFTStakeContent,
    ButtonGroup
} from "./style";
import Select from './Select'


interface StakeModalProps {
    farmData: any;
    closeModal: any;
    nftList: any;
    onFarmingStake: any
}

export interface OptionProps {
    label: string
    value: any
}

const StakeModal: NextPage<StakeModalProps> = ({
    farmData,
    closeModal,
    nftList,
    onFarmingStake
}) => {
    const { wallet } = useContext(WalletContext)
    const [selectOptions, setSelectOptions] = useState([])
    const [selectedNFT, setSelectedNFT] = useState('')
    const stakingInfo = useFetchStakingInfoByOwnerId(wallet?.account().accountId as string, farmData)
    const newData = new Map<string, string[]>();
    const selectOption: any = []
    const fetchData = async () => {
        for (let i = 0; i < nftList.get(farmData)?.length; i++) {
            const nft_info = await wallet?.account().viewFunction(
                farmData,
                "nft_token",
                {
                    token_id: nftList.get(farmData)[i]?.token_id
                }
            )
            if ((JSON.stringify(nft_info.approved_account_ids).match(FARM_CONTRACT_ID) || []).length
                == (JSON.stringify(nft_info.approved_account_ids).match('":') || []).length) {
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
                for (let i = 0; i < nftList.get(farmData).length; i++) {
                    if ((stakingInfo.token_ids || []).includes((newData.get(farmData) as any)[i])) {
                        selectOption.push({ label: nft_info.metadata.title, value: nftList.get(farmData)[i]?.token_id })
                    }
                }
                setSelectOptions(selectOption)
            }
        }
    }

    useEffect(() => {
        if (wallet) {
            fetchData()
        }
    }, [wallet])

    const handleSortOptionChange = (option: OptionProps): void => {
        setSelectedNFT(option.value)
    }

    return (
        <Container>
            <StakeModalHeader>
                <h3 className="mt-20 mr-50">Stake Your NFT</h3>
                <CardHeader farmData={farmData} />
            </StakeModalHeader>
            <Select
                options={selectOptions}
                onChange={handleSortOptionChange}
            />
            {
                selectedNFT ? (
                    <NFTStakeContent>
                        <img className='mr-10 stake-modal-img' src={`https://terraspaces_nft_1.mypinata.cloud/ipfs/QmeP2Gn7fjycGerqTiKZnexyYXvu5qvDVKq4WHdfzwL8bi/${selectedNFT}.png`} alt='terraspaces image' width={300} />
                        <ButtonGroup>
                            <button className="cmn-btn-1 f-18 radius-12 mt-20 w-100" onClick={() => onFarmingStake(farmData, selectedNFT)}>
                                <span>Stake</span>
                            </button>
                            <button className="cmn-btn-outline f-18 radius-12 mt-20 w-100" onClick={() => closeModal()}>
                                <span>Cancel</span>
                            </button>
                        </ButtonGroup>
                    </NFTStakeContent>
                ) : (
                    <h3 className="p-2 mt-10">Please select your NFT</h3>
                )
            }
        </Container>
    )
}

export default StakeModal