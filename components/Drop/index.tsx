import type { NextPage } from 'next';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Container, ToggleContent, UpcomingContent, MobileToggle, CardContent, Card, CardBody, LoverCount } from "./styles";

const Drop: NextPage = () => {

    const dropDatas = [
        {
            title: 'Monarchs By Haven',
            img: 'assets/partners/haven.gif',
            voteCount: 75,
            description: 'Explorer staking partners and stake their NFT to access dashboard. Explorer staking partners and stake their NFT to access dashboard.Explorer staking partners and stake their NFT to access dashboard.',
            mintPrice: 7,
            mintDate: '20 March 2022',
            supplyCount: '700',
            mintTime: '16:00',
            url: {
                discord: 'https://discord/2h4lsd9',
                twitter: 'https://twitter.com',
                site: 'https://haven.com'
            }
        },
        {
            title: 'Monarchs By Boomonsters',
            img: 'assets/partners/boomonsters.png',
            voteCount: 62,
            description: 'Explorer staking partners and stake their NFT to access dashboard. Explorer staking partners and stake their NFT to access dashboard.Explorer staking partners and stake their NFT to access dashboard.',
            mintPrice: 7,
            mintDate: '20 May 2022',
            supplyCount: '250',
            mintTime: '06:00',
            url: {
                discord: 'https://discord/2h4lsd9',
                twitter: 'https://twitter.com',
                site: 'https://haven.com'
            }
        },
        {
            title: 'Monarchs By Asac',
            img: 'assets/partners/asac.jpg',
            voteCount: 49,
            description: 'Explorer staking partners and stake their NFT to access dashboard. Explorer staking partners and stake their NFT to access dashboard.Explorer staking partners and stake their NFT to access dashboard.',
            mintPrice: 7,
            mintDate: '20 October 2021',
            supplyCount: '400',
            mintTime: '14:35',
            url: {
                discord: 'https://discord/2h4lsd9',
                twitter: 'https://twitter.com',
                site: 'https://haven.com'
            }
        }
    ]

    return (
        <Container>
            <div className="vector-abs">
                <img src="assets/img/vector/Vector.png" alt="Vector" loading="lazy" />
            </div>
            <UpcomingContent>
                <div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <h1 className='mr-20 upcoming-text'>Upcoming Drops</h1>
                            <ToggleContent>
                                <input type='checkbox' />
                                <span className='base-color'>
                                    <span className='toggle-slider' />
                                    <span className='cash'>Upcoming</span>
                                    <span className='token'><Icon icon="ant-design:star-filled" width="20" height="20" />Favorites</span>
                                </span>
                            </ToggleContent>
                        </div>
                        <button className="cmn-btn-1 f-18 radius-12 list-btn">
                            <span>Get Listed</span>
                        </button>
                    </div>
                    <MobileToggle>
                        <input type='checkbox' />
                        <span className='base-color'>
                            <span className='toggle-slider' />
                            <span className='cash'>Upcoming</span>
                            <span className='token'><Icon icon="ant-design:star-filled" width="20" height="20" />Favorites</span>
                        </span>
                    </MobileToggle>
                </div>
                <CardContent>
                    {
                        dropDatas.map((dropData, index) => (
                            <Card key={index}>
                                <div className='img-content'>
                                    <img src={dropData.img} alt={dropData.title} />
                                </div>
                                <CardBody>
                                    <div>
                                        <div className='card-head'>
                                            <div className='card-subheader'>
                                                <p className='card-title'>{dropData.title}</p>
                                                <div className='icon-set'>
                                                    <Icon icon="akar-icons:discord-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.url.discord, "_blank")} />
                                                    <Icon icon="akar-icons:twitter-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.url.twitter, "_blank")} />
                                                    <Icon icon="akar-icons:link-chain" color="white" width="25" height="25" onClick={() => window.open(dropData.url.site, "_blank")} />
                                                </div>
                                            </div>
                                            <LoverCount>
                                                <Icon icon="akar-icons:heart" width="25" height="25" color='white' className='mr-10' />
                                                <h6>{dropData.voteCount}</h6>
                                            </LoverCount>
                                        </div>
                                        <div className='icon-set'>
                                            <Icon icon="akar-icons:discord-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.url.discord, "_blank")} />
                                            <Icon icon="akar-icons:twitter-fill" color="white" width="25" height="25" className='mr-10' onClick={() => window.open(dropData.url.twitter, "_blank")} />
                                            <Icon icon="akar-icons:link-chain" color="white" width="25" height="25" onClick={() => window.open(dropData.url.site, "_blank")} />
                                        </div>
                                        <p className='description'>{dropData.description}</p>
                                    </div>
                                    <div>
                                        <div className='detail-content row'>
                                            <div className='col-md-5 col-xs-12 d-flex justify-content-between'>
                                                <div>
                                                    <p className='subtitle'>Mint Price</p>
                                                    <div className='d-flex align-items-center mt-1'>
                                                        <p className='sub-detail mr-10'>{dropData.mintPrice}</p>
                                                        <img src='assets/img/icons/volume.png' alt='near icon' className='mt-0' />
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-direction-column align-items-end'>
                                                    <p className='subtitle'>Mint Date</p>
                                                    <p className='sub-detail mt-1'>{dropData.mintTime}</p>
                                                </div>
                                            </div>
                                            <div className='col-md-5 col-xs-12 d-flex justify-content-between'>
                                                <div>
                                                    <p className='subtitle'>Supply</p>
                                                    <p className='sub-detail mr-10'>{dropData.supplyCount} NFTs</p>
                                                </div>
                                                <div className='d-flex flex-direction-column align-items-end'>
                                                    <p className='subtitle'>Mint Time</p>
                                                    <p className='sub-detail'>{dropData.mintTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    }
                </CardContent>
            </UpcomingContent>
        </Container>
    )
}

export default Drop