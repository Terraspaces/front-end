import type { NextPage } from 'next'
import { WalletContext, STAKE_CONTRACT_ID, NFT_CONTRACT_ID, MAX_GAS, NftData, NftContractMetadata, DEPOSIT, X_PARAS_COLLECTIONS } from '../contexts/wallet'
import { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import ReferralModal from '../components/ReferralModal'
import HeaderContent from '../components/HeaderContent'
import {
  NavBarContent,
  NavHomeContent,
  NavProfileContent,
  NavFarmsContent,
  NavReferralsContent
} from '../components/StakePageContent'

const Mint: NextPage = () => {
  const { wallet, getMainCollectionList, getCollectionMetadata } = useContext(WalletContext)
  const [nftContractList, setNftContractList] = useState<string[]>([]);
  const [trendingData, setTrendingData] = useState<any>({})
  const [nftList, setNftList] = useState<Map<string, NftData[]>>(new Map());
  const [nftMetadata, setNftMetadata] = useState<Map<string, NftContractMetadata>>(new Map());
  const [stakeList, setStakeList] = useState<Map<string, string[]>>(new Map());
  const [totalNftCountList, setTotalNftCountList] = useState<Map<string, number>>(new Map());
  const [stakedNftCountList, setStakedNftCountList] = useState<Map<string, number>>(new Map());
  const [totalStaked, setTotalStaked] = useState<number>(0);
  const [overviewStatus, setOverviewStatus] = useState<number>(0);
  const [isNetworkSelectModalOpen, setIsNetworkSelectModalOpen] = useState<boolean>(false);

  const getTrendingCollectionData = async () => {
    const api = process.env.NEXT_PUBLIC_API;
    const getAPI = async () => {
      const trendingCollectionDataEndpoint = `${api}/trending_collection_data`;
      const result = await fetch(trendingCollectionDataEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
      });
      return (await result.json())
    };
    const result = await getAPI();
    setTrendingData(result);
  }

  const onStake = async (account_id: string, token_id: string) => {
    await wallet?.account().functionCall(
      X_PARAS_COLLECTIONS.includes(account_id) ? "x.paras.near" : account_id,
      "nft_approve",
      {
        token_id,
        account_id: STAKE_CONTRACT_ID,
        msg: JSON.stringify({
          staking_status: "Staking to platform"
        }),
      },
      MAX_GAS,
      DEPOSIT,
    )
  }

  const onUnstake = async (account_id: string, token_id: string) => {
    await wallet?.account().functionCall(
      STAKE_CONTRACT_ID,
      "unstake",
      {
        token_id,
        nft_contract_id: X_PARAS_COLLECTIONS.includes(account_id) ? "x.paras.near" : account_id,
      },
      MAX_GAS,
      "1",
    )
  }

  const fetchCollectionList = async () => {
    const nftContractList = await getMainCollectionList();
    let list = new Map<string, NftContractMetadata>();
    for (let i = 0; i < nftContractList.length; i++) {
      const data = await getCollectionMetadata(nftContractList[i]);
      list.set(nftContractList[i], data);
    }
    getTrendingCollectionData();
    setNftMetadata(list);
    setNftContractList(nftContractList);
  }

  const fetchData = async () => {
    const totalCount = await wallet?.account().viewFunction(STAKE_CONTRACT_ID,
      "get_supply_by_contract_id",
      {
        account_id: NFT_CONTRACT_ID,
      });
    setTotalStaked(totalCount);

    const NFTData = new Map<string, NftData[]>();
    for (let i = 0; i < nftContractList.length; i++) {
      if (X_PARAS_COLLECTIONS.includes(nftContractList[i])) {
        const result = await fetch("https://api-v2-mainnet.paras.id/token?owner_id=" + wallet?.getAccountId() + "&collection_id=" + nftContractList[i] + "&contract_id=x.paras.near&__limit=30");
        const nftList = (await result.json())["data"]["results"];
        NFTData.set(nftContractList[i], nftList);
      } else {
        const nftList = await wallet?.account().viewFunction(nftContractList[i],
          "nft_tokens_for_owner",
          {
            account_id: wallet.getAccountId(),
            from_index: "0",
            limit: 100,
          });
        NFTData.set(nftContractList[i], nftList);
      }
    }
    let stakeData = await wallet?.account().viewFunction(STAKE_CONTRACT_ID,
      "get_staking_informations_by_owner_id",
      {
        account_id: wallet.getAccountId(),
        from_index: "0",
        limit: 100,
      });
    if (stakeData == undefined)
      stakeData = [];
    const newData = new Map<string, string[]>();
    for (let i = 0; i < stakeData.length; i++) {
      const nft_info = await wallet?.account().viewFunction(stakeData[i].nft_contract_id,
        "nft_token",
        {
          token_id: stakeData[i].token_id,
        });

      if ((JSON.stringify(nft_info.approved_account_ids).match(STAKE_CONTRACT_ID) || []).length
        == (JSON.stringify(nft_info.approved_account_ids).match('":') || []).length) {
        let nft_contract_id = stakeData[i].nft_contract_id;
        if (nft_contract_id == "x.paras.near") {
          const result = await fetch("https://api-v2-mainnet.paras.id/token?token_id=" + stakeData[i].token_id);
          nft_contract_id = (await result.json())["data"]["results"][0].metadata.collection_id;
        }
        let list: string[] = [];
        if (newData.has(nft_contract_id)) {
          const data = newData.get(nft_contract_id);
          list = data == undefined ? [] : data;
        }
        list.push(stakeData[i].token_id);
        newData.set(nft_contract_id, list);
      }
    }
    const totalCountData = new Map<string, number>();
    const stakedCountData = new Map<string, number>();
    for (let i = 0; i < nftContractList.length; i++) {
      let total_count = NFTData.get(nftContractList[i]) != undefined ? NFTData.get(nftContractList[i])?.length : 0
      if (total_count == undefined)
        total_count = 0;
      let stake_count = newData.get(nftContractList[i]) != undefined ? newData.get(nftContractList[i])?.length : 0
      if (stake_count == undefined)
        stake_count = 0;
      totalCountData.set(nftContractList[i], total_count - stake_count)
      stakedCountData.set(nftContractList[i], stake_count);
    }
    setNftList(NFTData);
    setStakeList(newData);
    setTotalNftCountList(totalCountData);
    setStakedNftCountList(stakedCountData);
  }

  useEffect(() => {
    if (wallet && wallet.isSignedIn()) {
      fetchData()
    }
  }, [nftContractList]);

  useEffect(() => {
    if (wallet && wallet.isSignedIn()) {
      fetchCollectionList();
    }
  }, [wallet]);

  ReactModal.defaultStyles.overlay!.backgroundColor = 'rgba(255, 100, 255, 0.05)';

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "transparent",
      border: 'none',
      overflow: 'hidden',
    },
  };

  function closeModal() {
    setIsNetworkSelectModalOpen(false);
    document.getElementById('__next')!.style.filter = 'none'
  }

  function openModal() {
    setIsNetworkSelectModalOpen(true);
    document.getElementById('__next')!.style.filter = 'blur(20px)'
  }

  const setOverview = (key: number) => {
    setOverviewStatus(key)
  }

  return (
    <main id="app-root" className="stking-page pt-160 fix">
      <div className="home-vect-abs v-top">
        <img src="assets/img/vector/stakin-v.png" alt="staking" loading="lazy" />
      </div>
      {
        wallet?.isSignedIn() ?
          <>
            <HeaderContent overviewStatus={overviewStatus} />
            <div className="stake-area">
              <div className="container">
                <div className="stake-wrapper">
                  <NavBarContent setOverview={setOverview} />
                  <div className="tab-content" id="pills-tabContent">
                    <NavHomeContent
                      nftContractList={nftContractList}
                      nftMetadata={nftMetadata}
                      trendingData={trendingData}
                      totalNftCountList={totalNftCountList}
                      nftList={nftList}
                      stakeList={stakeList}
                      onStake={onStake}
                    />
                    <NavProfileContent
                      nftContractList={nftContractList}
                      nftMetadata={nftMetadata}
                      trendingData={trendingData}
                      stakedNftCountList={stakedNftCountList}
                      nftList={nftList}
                      stakeList={stakeList}
                      onUnstake={onUnstake}
                    />
                    <NavFarmsContent />
                    <NavReferralsContent openModal={openModal} />
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          <div className="dashboard-wrapper">
            <div className="" style={{ marginLeft: 60, marginRight: 60 }}>
              <h3>Please connect wallet to stake NFTs.</h3>
            </div>
          </div>
      }
      <ReactModal isOpen={isNetworkSelectModalOpen} onRequestClose={() => closeModal()} style={customStyles}>
        <ReferralModal />
      </ReactModal>
    </main >
  )
}

export default Mint
