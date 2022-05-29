import React, { useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { LeftArrowIcon, RightArrowIcon } from '../Shared/SvgIcons';
import { SingleMarketCapCard } from '../SingleMarketCapCard';
import {
  Container,
  Header,
  TitleTabWrapper,
  SliderWrapper,
  CarouselButtonGroup,
  ArrowButton
} from './styles';

const communityList = [
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1891000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
  { name: 'Ultron Apes', photo: '/assets/img/home/collection1.png', price: 1991000 },
]

export const TopMarketCap = () => {
  const carouselRef = useRef<any>();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4.5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5,
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
          <h1>Top marketcap Projects</h1>
          <button className='primary-btn'>See All</button>
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
            {communityList.map((item, i) => (
              <SingleMarketCapCard key={i} card={item} />
            ))}
          </Carousel>
        </div>
      </SliderWrapper>
    </Container>
  )
}
