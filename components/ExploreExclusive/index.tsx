import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { SingleExploreCard } from '../SingleExploreCard';
import { LeftArrowIcon, RightArrowIcon } from '../Shared/SvgIcons';
import {
  Container,
  Header,
  TitleTabWrapper,
  SliderWrapper,
  CarouselButtonGroup,
  ArrowButton
} from './styles';

const exploreList = [
  { name: 'Antisocial Ape Club', photo: '/assets/partners/asac.jpg', description: 'A collection of 3333 pixel art ape NFTs stored an the NEAR blockchain' },
  { name: 'Boo Monsters', photo: '/assets/partners/boomonsters.png', description: 'A limited collection of Boo Monsters roaming the blockchain' },
  { name: 'Mara Gen1', photo: '/assets/partners/mara.png', description: '1000 unique Mara holding one of these gives access to loads of benefits from MARADAO.' },
  { name: 'Boo Monsters', photo: '/assets/partners/boomonsters.png', description: 'A limited collection of Boo Monsters roaming the blockchain' },
  { name: 'Mara Gen1', photo: '/assets/partners/mara.png', description: '1000 unique Mara holding one of these gives access to loads of benefits from MARADAO.' },
  { name: 'Boo Monsters', photo: '/assets/partners/boomonsters.png', description: 'A limited collection of Boo Monsters roaming the blockchain' }
]

export const ExploreExclusive = () => {
  const carouselRef = useRef<any>();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2.5,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.5,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.3,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const goToNext = () => {
    const nextSlide = carouselRef.current.state.currentSlide + 1;
    carouselRef.current.goToSlide(nextSlide)
  }

  const gotToPrev = () => {
    const prevSlide = carouselRef.current.state.currentSlide - 1;
    carouselRef.current.goToSlide(prevSlide)
  }

  return (
    <Container>
      <Header className='container'>
        <TitleTabWrapper>
          <h1>Explore Our Exclusive Staking Partners</h1>
        </TitleTabWrapper>
        <CarouselButtonGroup>
          <ArrowButton onClick={gotToPrev}>
            <LeftArrowIcon />
          </ArrowButton>
          <ArrowButton onClick={goToNext} active={true}>
            <RightArrowIcon />
          </ArrowButton>
        </CarouselButtonGroup>
      </Header>
      <SliderWrapper className='container'>
        <div>
          <Carousel
            ref={(el) => (carouselRef.current = el)}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", 'desktop']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="partner-container"
            showDots={false}
            arrows={false}
            autoPlay={true}
            ssr={true}
          >
            {exploreList.map((item, i) => (
              <SingleExploreCard key={i} card={item} />
            ))}
          </Carousel>
        </div>
      </SliderWrapper>
    </Container>
  )
}
