import type { NextPage } from "next";

interface NavReferralsContentProps {
    openModal: any
}

const NavReferralsContent: NextPage<NavReferralsContentProps> = ({ openModal }) => {
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
                                <button type="button" className="floor-btn w-100">Your NFTs Staked: 10</button>
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
                        <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100 mt-30" onClick={() => openModal()}>
                            <span>Make a Referral</span>
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-sm-12 col-xs-12 mt-20'>
                    <div className='t-card p-20'>
                        <div className="d-flex align-items-center mt-20">
                            <img className='-mr-20' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <img className='-mr-20' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <img className='-mr-20' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <img className='-mr-20' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <img className='-mr-20' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <img className='-mr-20' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <img className='mr-10' src='assets/img/dashbaord/stakin-l.png' alt='terraspaces image' width={45} height={45} />
                            <h5 className='mr-5 letter-space-1 t-20'>Staking Partners</h5>
                            <img src="assets/img/icons/verified.svg" alt="verified" width={24} height={24} />
                        </div>
                        <div className="floor-c row mt-10">
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Referral Commission: 5%</button>
                            </div>
                            <div className='col-lg-4 col-md-6 col-xs-12 p-1'>
                                <button type="button" className="floor-btn w-100">Your NFTs Staked: 10</button>
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
                        <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100 mt-30" onClick={() => openModal()}>
                            <span>Make a Referral</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavReferralsContent