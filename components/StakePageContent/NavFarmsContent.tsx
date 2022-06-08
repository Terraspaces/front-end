import type { NextPage } from "next";
import { Icon } from '@iconify/react';

const NavFarmsContent = () => {
    const farmsData = [
        {
            title: 'Terraspaces',
            img: 'assets/img/staking/t-stake3.png',
            totalStaked: 14,
            nftStaked: 2,
            nftType: 'Kryptonite',
            rewardToken: '$USN',
            rewardMonthly: '7 $USN',
            totalSupply: 237,
            stakingCap: 452,
            automaticAirdropsState: true,
            dashboardAccessState: true,
            stakeBtnState: true,
            unStakeBtnState: true,
            claimBtnState: true
        },
        {
            title: 'Terraspaces',
            img: 'assets/img/staking/t-stake1.png',
            totalStaked: 32,
            nftStaked: 22,
            nftType: 'Any',
            rewardToken: '$SAGA',
            rewardMonthly: '5 $SAGA',
            totalSupply: 642,
            stakingCap: 123,
            automaticAirdropsState: false,
            dashboardAccessState: false,
            stakeBtnState: false,
            unStakeBtnState: false,
            claimBtnState: false
        },
        {
            title: 'Terraspaces',
            img: 'assets/img/staking/t-stake4.png',
            totalStaked: 64,
            nftStaked: 21,
            nftType: 'Origin',
            rewardToken: '$USN',
            rewardMonthly: '23 $USN',
            totalSupply: 753,
            stakingCap: 477,
            automaticAirdropsState: true,
            dashboardAccessState: false,
            stakeBtnState: false,
            unStakeBtnState: true,
            claimBtnState: true
        },
        {
            title: 'Terraspaces',
            img: 'assets/img/staking/t-stake6.png',
            totalStaked: 9,
            nftStaked: 20,
            nftType: 'Origin',
            rewardToken: '$SAGA',
            rewardMonthly: '17 $SAGA',
            totalSupply: 734,
            stakingCap: 35,
            automaticAirdropsState: false,
            dashboardAccessState: true,
            stakeBtnState: true,
            unStakeBtnState: false,
            claimBtnState: true
        }
    ]

    const handleStake = () => {
        // Stake
    }

    const handleUnstake = () => {
        //Unstake
    }

    const handleClaim = () => {
        //Claim Reward
    }

    return (
        <div className="tab-pane fade" id="pills-farms" role="tabpanel" aria-labelledby="pills-farms-tab">
            <div className='row'>
                {farmsData.map((farmData, index) => (
                    <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-20' key={index}>
                        <div className='t-card p-20'>
                            <div className="d-flex align-items-center mt-20">
                                <img className='mr-10 farms-card-img' src={farmData.img} alt='terraspaces image' width={45} height={45} />
                                <h5 className='mr-5 letter-space-1 t-20'>{farmData.title}</h5>
                                <img src="assets/img/icons/verified.svg" alt="verified" width={24} height={24} />
                            </div>
                            <div className="floor-c d-flex justify-content-between mt-10">
                                <button type="button" className="floor-btn">Total Staked: {farmData.totalStaked}</button>
                                <button type="button" className="floor-btn">Your NFTs Staked: {farmData.nftStaked}</button>
                            </div>
                            <div className='d-flex justify-content-between mt-40'>
                                <h6 className='t-14'>NFT Type: {farmData.nftType}</h6>
                                <h6 className='t-14'>Reward Tokens</h6>
                            </div>
                            <div className='d-flex justify-content-between mt-1'>
                                <img className='mr-10 farms-card-img' src={farmData.img} alt='terraspaces image' width={27} height={27} />
                                <h6 className='t-18'>{farmData.rewardToken}</h6>
                            </div>
                            <div className='d-flex justify-content-between mt-20'>
                                <h6 className='t-14'>Rewards: Monthly</h6>
                                <div className='d-flex align-items-center'>
                                    <h6 className='t-14 mr-5'>Automatic Airdrops</h6>
                                    {farmData.automaticAirdropsState && <Icon icon="akar-icons:circle-check" color='white' width={20} height={20} />}
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-1'>
                                <h6 className='t-20'>7 $USN: NFT</h6>
                                <div className='d-flex align-items-center'>
                                    <h6 className='t-14 mr-5'>Dashboard Access</h6>
                                    {farmData.dashboardAccessState && <Icon icon="akar-icons:circle-check" color='white' width={20} height={20} />}
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-20'>
                                <h6 className='t-14'>Total Supply</h6>
                                <h6 className='t-14'>Staking Cap</h6>
                            </div>
                            <div className='d-flex justify-content-between mt-1'>
                                <h6 className='t-20'>{farmData.totalSupply}</h6>
                                <h6 className='t-20'>{farmData.stakingCap}</h6>
                            </div>
                            <div className='d-flex mt-30'>
                                <div className='col-6 pr-7'>
                                    <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100" disabled={!farmData.stakeBtnState} onClick={() => handleStake()}>
                                        <span>Stake</span>
                                    </button>
                                </div>
                                <div className='col-6 pl-7'>
                                    <button className="cmn-btn-outline f-18 radius-12 mt-10 col-6 w-100" disabled={!farmData.unStakeBtnState} onClick={() => handleUnstake()}>
                                        <span>Unstake</span>
                                    </button>
                                </div>
                            </div>
                            <button className="cmn-btn-1 f-18 radius-12 mt-15 col-6 w-100" disabled={!farmData.claimBtnState} onClick={() => handleClaim()}>
                                <span>Claim Rewards</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NavFarmsContent