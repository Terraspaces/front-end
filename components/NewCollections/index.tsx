import { listItemSecondaryActionClasses } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { LeftArrowIcon, RightArrowIcon } from '../Shared/SvgIcons';
import { SingleCollectionCard } from '../SingleCollectionCard';
import {
  Container,
  Header,
  TitleTabWrapper,
  SliderWrapper,
  CarouselButtonGroup,
  ArrowButton
} from './styles';
import { getNewCollections } from '../../utils/api/third_party_api';

export const NewCollections = () => {
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
      items: 2,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 100
    }
  };

  const [publications, setPublications] = useState<any[]>([]);

  const getPublications = async () => {
    const collections = await getNewCollections();
    setPublications(collections.map((collection: any) => ({
      name: collection.title,
      photo: `https://ipfs.io/ipfs/${collection.thumbnail.split("ipfs://")[1]}`
    })))
  }

  const goToNext = () => {
    const maxSlide = carouselRef.current.state.totalItems - carouselRef.current.state.slidesToShow;
    const nextSlide = (carouselRef.current.state.currentSlide + 1) >= Math.ceil(maxSlide) ? maxSlide : carouselRef.current.state.currentSlide + 1;
    carouselRef.current.goToSlide(nextSlide)
  }

  const gotToPrev = () => {
    let prevSlide = carouselRef.current.state.currentSlide > 0 && carouselRef.current.state.currentSlide - 1;
    prevSlide = prevSlide < 0 ? 0 : prevSlide
    carouselRef.current.goToSlide(prevSlide)
  }

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <Container>
      <Header className='container'>
        <TitleTabWrapper>
          <h1>New Collections on PARAS</h1>
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
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", 'desktop']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="partner-container"
            showDots={false}
            arrows={false}
            ssr={true}
            shouldResetAutoplay={false}
            partialVisbile
          >
            {publications.map((item, i) => (
              <SingleCollectionCard key={i} card={item} />
            ))}
          </Carousel>
        </div>
      </SliderWrapper>
    </Container>
  )
}
