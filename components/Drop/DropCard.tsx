import type { NextPage } from "next";
import { useContext } from "react";
import { WalletContext } from "../../contexts/wallet";
import { Icon } from '@iconify/react';
import { Card, CardBody, LoverCount } from './styles'

interface DropCardProps {
    index: number;
    dropData: any;
    handleFav: any;
    handleUnFav: any;
}

const DropCard: NextPage<DropCardProps> = ({
    dropData,
    handleFav,
    handleUnFav,
    index
}) => {
    const { wallet } = useContext(WalletContext)
    return (
        <Card>
            <div className='img-content'>
                <img src={dropData.image_link} alt={dropData.name} />
            </div>
            <CardBody>
                <div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='card-head'>
                            <div className='card-subheader'>
                                <p className='card-title'>{dropData.name}</p>
                                <div className='icon-set'>
                                    <Icon icon="akar-icons:discord-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.discord, "_blank")} />
                                    <Icon icon="akar-icons:twitter-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.twitter, "_blank")} />
                                    <Icon icon="akar-icons:link-chain" color="white" width="25" height="25" onClick={() => window.open(dropData.website, "_blank")} />
                                </div>
                            </div>
                            <LoverCount>
                                <Icon icon="akar-icons:heart" width="25" height="25" color='white' className='mr-10' />
                                <h6>{dropData.vote_count}</h6>
                            </LoverCount>
                        </div>
                        {dropData?.likes.includes(wallet?.account().accountId) ? (
                            <div className='fav-icon' onClick={() => handleUnFav(dropData.name)}>
                                <Icon icon="clarity:star-solid" width={30} height={30} color="white" />
                            </div>
                        ) : (
                            <div className='fav-icon' onClick={() => handleFav(dropData.name)}>
                                <Icon icon="clarity:star-line" width={30} height={30} color="white" />
                            </div>
                        )}
                    </div>
                    <div className='icon-set'>
                        <Icon icon="akar-icons:discord-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.discord, "_blank")} />
                        <Icon icon="akar-icons:twitter-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.twitter, "_blank")} />
                        <Icon icon="akar-icons:link-chain" color="white" width="25" height="25" onClick={() => window.open(dropData.website, "_blank")} />
                    </div>
                    <p className='description'>{dropData.info.length > 320 ? dropData.info.substring(0, 320) + '...' : dropData.info}</p>
                </div>
                <div className='detail-content row'>
                    <div className='col-md-5 col-xs-12 d-flex justify-content-between'>
                        <div>
                            <p className='subtitle'>Mint Price</p>
                            <div className='d-flex align-items-center mt-1'>
                                <p className='sub-detail mr-10'>{dropData.price ? dropData.price : 0}</p>
                                <img src='assets/img/icons/volume.png' alt='near icon' className='mt-0' />
                            </div>
                        </div>
                        <div className='d-flex flex-direction-column align-items-end'>
                            <p className='subtitle'>Mint Date</p>
                            <p className='sub-detail mt-1'>{dropData.mint_date}</p>
                        </div>
                    </div>
                    <div className='col-md-5 col-xs-12 d-flex justify-content-between'>
                        <div>
                            <p className='subtitle'>Supply</p>
                            <p className='sub-detail mr-10'>{dropData.supply} NFTs</p>
                        </div>
                        <div className='d-flex flex-direction-column align-items-end'>
                            <p className='subtitle'>Mint Time</p>
                            <p className='sub-detail'>{dropData.mint_time}</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default DropCard