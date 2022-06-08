import type { NextPage } from 'next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { HomeHero } from "../HomeHero";
import { HomeHeroWrapper } from "../Home/styles";

interface HeaderContentProps {
    overviewStatus: number;
}

const HeaderContent: NextPage<HeaderContentProps> = ({ overviewStatus }) => {
    const heroData = [
        {
            title: 'Check For Terraspaces Or Partnered NFTs To Stake.',
            description: 'Stake NFTs to access analytics and referral commission',
            list: [
                'Explore staking partners and stake their NFT to access dashboard.',
                'Tap-into the Refer-To-Earn program based an amount of staked NFTs.',
                'Earn up to $2000 upon successful referrals of new staking partners.',
                'Access our farm by staking specific NFTs to earn passive token emission.'
            ],
            button1: { title: 'Live on PARAS', link: 'https://paras.id/collection/terraspaces.near', _blank: true },
            button2: { title: 'Read Gitbook', link: '/stake', _blank: false }
        },
        {
            title: 'Stake To Access Dashboard And Referral Commission',
            description: 'Payouts up to $2000 with 40 Terraspaces NFTs Staked',
            list: [
                'User-friendly analytical dashboard for listings, floor price and volume',
                'Earn referral-based commission with Terraspaces or Partnered NFTs.',
                'Terraspaces can earn maximum $2000 with 40 NFTs staked per referral.',
                'Staking Partners can earn maximum $1000 with 40 NFTs staked per referral.'
            ],
            button1: { title: 'Make a Referral', link: 'https://paras.id/collection/terraspaces.near', _blank: true },
            button2: { title: 'Goto Dashboard', link: 'https://terraspaces.gitbook.io/', _blank: true }
        },
        {
            title: 'Refer-To-Earn Commission Via New Staking Partners.',
            description: 'Stake multiple NFTs to boost your commission.',
            list: [
                'Stake Terraspaces NFTs to earn 5% commission from successful referrals.',
                'Stake Partnered NFTs to earn 2.5% commission from successful referrals.',
                'Each NFT staked enables multiplier of 0.5x to boost commission.',
                'The maximum multiplier is capped at 40 NFTs staked per referral.'
            ],
            button1: { title: 'Live on PARAS', link: 'https://paras.id/collection/terraspaces.near', _blank: true },
            button2: { title: 'Read Gitbook', link: 'https://terraspaces.gitbook.io/', _blank: true }
        },
    ]

    const farmsData = [
        {
            title: 'Introducing $USN Stablecoin Rewards Via Terraspaces.',
            description: 'Terraspaces integrate $USN rewards.',
            list: [
                'Earn 2 $USN monthly per Terraspaces NFT being staked into the farm.',
                'Access the analytical dashboard for NFT staistics while staked into the farm.',
                'Access Refer-to-Earn benefits while staked into the farm.',
                'Expect increase in monthly $USN rewards as Terraspaces grows.'
            ],
            button1: { title: 'Live on PARAS', link: 'https://paras.id/collection/terraspaces.near', _blank: true },
            button2: { title: 'Stake Your NFTs', link: '/stake', _blank: false }
        },
        {
            title: 'Introducing $SAGA Token Rewards For Monarchs',
            description: 'Terraspaces integrates $SAGA by Haven',
            list: [
                'Earn 9 $SAGA tokens per day staking your Normal Type Monarchs By Haven.',
                'Earn 18 $SAGA tokens per day staking your Origin Type Monarchs By Haven.',
                '$SAGA is a  utility token with max supply of 12,000,000 tokens.',
                '$SAGA will pay for Haven\'s utilities, services and mint future collections.'
            ],
            button1: { title: 'Live on PARAS', link: 'https://paras.id/collection/terraspaces.near', _blank: true },
            button2: { title: 'Read Gitbook', link: 'https://terraspaces.gitbook.io/', _blank: true }
        }
    ]
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        overviewStatus !== 3 ? (
            <HomeHeroWrapper className='container'>
                <HomeHero data={heroData[overviewStatus]} />
            </HomeHeroWrapper>
        ) : (
            <HomeHeroWrapper className='container'>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    infinite={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", 'desktop']}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    className="partner-container"
                    showDots={true}
                    ssr={true}
                    autoPlay={true}
                >
                    {farmsData.map((item, i) => (
                        <HomeHero key={i} data={item} />
                    ))}
                </Carousel>
            </HomeHeroWrapper>
        )
    )
}

export default HeaderContent