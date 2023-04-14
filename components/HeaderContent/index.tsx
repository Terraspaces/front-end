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
            description: 'Stake NFTs for access to exclusive Terraspaces holdership features',
            list: [
                'Explore Staking Partners and Stake Their NFT For Access to Collaborative Terraspaces Experiences.',
                'Contact Terraspaces\' For Staking NFT Integration via Management@Terraspaces.io.',
                'Stake Terraspaces\' NFTs Using Our Read-Only Snapshot Mechanism To Opt-In For Future Project Airdrops.',
                'View Floor Price, & Total Value via Wallet When You Stake Compatible NEAR NFTs With Terraspaces.'
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
        <HomeHeroWrapper className="container">
            {/* {overviewStatus !== 3 ? ( */}
                <HomeHero data={heroData[overviewStatus]} />
            {/* ) : (
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
            )} */}
        </HomeHeroWrapper>
    )
}

export default HeaderContent