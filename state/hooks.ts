import { useContext, useEffect, useState } from "react";
import { WalletContext, FARM_CONTRACT_ID, X_PARAS_COLLECTIONS, NFT_CONTRACT_ID } from "../contexts/wallet";

export const useFetchFarmContractIds = () => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                FARM_CONTRACT_ID,
                "get_farm_contract_ids"
            )
            setData(data)
        })();
    }, [wallet])
    return data
}

export const useFetchStakerIds = (from_index: string, limit: number) => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                FARM_CONTRACT_ID,
                "get_staker_ids",
                {
                    from_index,
                    limit
                }
            )
            setData(data);
        })();
    }, [wallet, from_index, limit])

    return data
}

export const useFetchSupplyStakers = () => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                FARM_CONTRACT_ID,
                "get_supply_stakers"
            )
            setData(data)
        })()
    }, [wallet])
    return data
}

export const useFetchSupplyFarm = (nft_contract_id: string) => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                FARM_CONTRACT_ID,
                "get_supply_farm",
                {
                    nft_contract_id
                }
            )
            setData(data)
        })()
    }, [wallet, nft_contract_id])
    return data
}

export const useFetchByOwnerId = (account_id: string, nft_contract_ids: string[]) => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState<number[]>([]);
    useEffect(() => {
        (async () => {
            const _ownerId = await Promise.all(nft_contract_ids.map(async (contract_id) => {
                const data = await wallet?.account().viewFunction(
                    FARM_CONTRACT_ID,
                    "get_supply_by_owner_id",
                    {
                        account_id,
                        nft_contract_id: contract_id
                    }
                )
                return data
            }))
            setData(_ownerId)
        })()
    }, [wallet, account_id, nft_contract_ids])
    return data
}

export const useFetchClaimAmountByOwnerId = (account_id: string, nft_contract_id: string) => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                FARM_CONTRACT_ID,
                "get_claim_amount_by_owner_id",
                {
                    account_id,
                    nft_contract_id
                }
            )
            setData(data)
        })()
    }, [wallet, account_id, nft_contract_id])
    return data
}

export const useFetchStakingInfoByOwnerId = (account_id: string, nft_contract_id: string) => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState<any>({});
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                FARM_CONTRACT_ID,
                "get_staking_informations_by_owner_id",
                {
                    account_id,
                    nft_contract_id
                }
            )
            setData(data)
        })()
    }, [wallet, account_id, nft_contract_id])
    return data
}

export const useNFTIsApproved = (token_id: string, approved_account_id: string) => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                X_PARAS_COLLECTIONS.includes(approved_account_id) ? "x.paras.near" : approved_account_id,
                "nft_is_approved",
                {
                    token_id,
                    approved_account_id
                }
            )
            setData(data)
        })
    }, [approved_account_id, wallet, token_id])
    return data
}

export const useFetchFarmSpec = (nft_contract_id: string) => {
    const { wallet } = useContext(WalletContext)
    const [data, setData] = useState<any>({})
    useEffect(() => {
        (async () => {
            const data = await wallet?.account().viewFunction(
                FARM_CONTRACT_ID,
                "get_farm_spec",
                {
                    nft_contract_id
                }
            )
            setData(data)
        })()
    }, [wallet, nft_contract_id])
    return data
}

export const useFetchTokenRate = (nft_contract_id: string, token_ids: string[]) => {
    const { wallet } = useContext(WalletContext)
    const [tokenRates, setTokenRates] = useState<string[]>([])
    useEffect(() => {
        (async () => {
            const _tokenRates = await Promise.all(token_ids.map(async (id) => {
                const data = await wallet?.account().viewFunction(
                    FARM_CONTRACT_ID,
                    'get_token_rate',
                    {
                        nft_contract_id,
                        token_id: id
                    }
                )
                return data;
            }));
            setTokenRates(_tokenRates);
        })();
    }, [wallet, nft_contract_id, JSON.stringify(token_ids)])
    return tokenRates;
}