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
import { SingleRankCard } from '../SingleRankCard';

export const Top30Ranked = () => {
  const carouselRef = useRef<any>();

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
          <h1>Top 30 Ranked Over Last 7 Days</h1>
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
          <div className='row'>
            <div className="col-md-4">
              {[...Array(5).keys()].map(i => (
                <SingleRankCard key={i} index={i + 1} />
              ))}
            </div>
            <div className="col-md-4">
              {[...Array(5).keys()].map(i => (
                <SingleRankCard key={i} index={i + 6} />
              ))}
            </div>
            <div className="col-md-4">
              {[...Array(5).keys()].map(i => (
                <SingleRankCard key={i} index={i + 11} />
              ))}
            </div>
          </div>
        </Carousel>
      </SliderWrapper>
    </Container>
  )
}
