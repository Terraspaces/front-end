import type { NextPage } from "next";
import { useEffect, useContext, useState } from "react";
import { useFetchByOwnerId } from '../../state/hooks'
import { WalletContext } from '../../contexts/wallet'

interface NavReferralsContentProps {
    openModal: any;
    totalCountPerUser: number;
}

const NavReferralsContent: NextPage<NavReferralsContentProps> = ({ openModal, totalCountPerUser }) => {
    const exploreList = [
        { name: 'Antisocial Ape Club', photo: '/assets/partners/asac.jpg', description: 'A collection of 3333 pixel art ape NFTs stored an the NEAR blockchain', para_link: "https://paras.id/collection/asac.near" },
        { name: 'Boo Monsters', photo: '/assets/partners/boomonsters.png', description: 'A limited collection of Boo Monsters roaming the blockchain', para_link: "https://paras.id/collection/boo-monster-by-omarbibznear" },
        { name: 'Mara Gen1', photo: '/assets/partners/mara.png', description: '1000 unique Mara holding one of these gives access to loads of benefits from MARADAO.', para_link: "https://paras.id/collection/mara-smartcontract.near" },
        { name: 'Nearnauts', photo: '/assets/partners/nearnaut.png', description: 'NEARNauts is a generative NFT project on the NEAR network consisting of 7777 randomly generated Nauts of varying rarity.', para_link: "https://paras.id/collection/nearnautnft.near" },
        { name: 'Mr. Brown', photo: '/assets/partners/mrbrown.jpeg', description: 'Mr. Brown is a middle-aged insurance clerk with 4,200 imagined identities living inside his head. He gets lost in them every day, sometimes even forgetting which one is real. Even though the mental borders between identities are thin, no two identities are alike. Each Mr. Brown is unique and stored on the NEAR blockchain.', para_link: "https://paras.id/collection/mrbrownproject.near" },
        { name: 'The Dons', photo: '/assets/partners/thedons.jpg', description: 'A collection of 3,500 Mafia Bosses coming to take over NEAR Protocol. Blood makes you related. Loyalty makes you family.', para_link: "https://paras.id/collection/nft.thedons.near" },
        { name: 'Monarchs By Haven', photo: '/assets/partners/haven.gif', description: 'Monarchs is a collection of 333 NFTs rewriting history on the NEAR Protocol.', para_link: "https://paras.id/collection/mint.havendao.near" }
    ]
    return (
        <div className="tab-pane fade" id="pills-referrals" role="tabpanel" aria-labelledby="pills-referrals-tab">
            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12 mt-20'>
                    <div className='t-card p-20'>
                        <div className="d-flex align-items-center mt-20">
                            <img className='mr-10' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <h5 className='mr-5 letter-space-1 t-20'>Terraspaces</h5>
                            <img src="assets/img/icons/verified.svg" alt="verified" width={24} height={24} />
                        </div>
                        <div className="floor-c row mt-10">
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Referral Commission: 5%</button>
                            </div>
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Your NFTs Staked: {totalCountPerUser}</button>
                            </div>
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Staking Multiplier: 0.5</button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-40'>
                            <h6 className='t-14 w-50'>New Staking Partner Fee: $2000 x 5%</h6>
                            <h6 className='t-14'>Your NFTs Staked: 10 x 0.5</h6>
                        </div>
                        <div className='d-flex justify-content-between mt-1'>
                            <h6 className='t-20'>$100</h6>
                            <h6 className='t-20'>5</h6>
                        </div>
                        <div className='d-flex justify-content-between mt-20'>
                            <h6 className='t-14'>Referral Payout: $100 x 5</h6>
                            <h6 className='t-14'>Staking Multiplier Cap</h6>
                        </div>
                        <div className='d-flex justify-content-between mt-1'>
                            <h6 className='t-20'>$500</h6>
                            <h6 className='t-20'>40 NFTs</h6>
                        </div>
                        <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100 mt-30" onClick={() => openModal('terra')}>
                            <span>Make a Referral</span>
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-sm-12 col-xs-12 mt-20'>
                    <div className='t-card p-20'>
                        <div className="d-flex align-items-center mt-20">
                            {exploreList.map((explore, index) => {
                                return <img className='-mr-20 partner-image' src={explore.photo} alt='terraspaces image' width={45} height={45} key={index} />
                            })}
                            <h5 className='ml-20 mr-5 letter-space-1 t-20'>Staking Partners</h5>
                            <img src="assets/img/icons/verified.svg" alt="verified" width={24} height={24} />
                        </div>
                        <div className="floor-c row mt-10">
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Referral Commission: 2.5%</button>
                            </div>
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Your NFTs Staked: {totalCountPerUser}</button>
                            </div>
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Staking Multiplier: 0.5</button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-40'>
                            <h6 className='t-14 w-50'>New Staking Partner Fee: $2000 x 2.5%</h6>
                            <h6 className='t-14'>Your NFTs Staked: 10 x 0.5</h6>
                        </div>
                        <div className='d-flex justify-content-between mt-1'>
                            <h6 className='t-20'>$50</h6>
                            <h6 className='t-20'>5</h6>
                        </div>
                        <div className='d-flex justify-content-between mt-20'>
                            <h6 className='t-14'>Referral Payout: $50 x 5</h6>
                            <h6 className='t-14'>Staking Multiplier Cap</h6>
                        </div>
                        <div className='d-flex justify-content-between mt-1'>
                            <h6 className='t-20'>$250</h6>
                            <h6 className='t-20'>40 NFTs</h6>
                        </div>
                        <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100 mt-30" onClick={() => openModal('partners')}>
                            <span>Make a Referral</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavReferralsContent