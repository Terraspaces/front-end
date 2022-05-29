import React from 'react';
import { VerifiedIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  Description,
  ButtonWrapper
} from './styles';

interface SingleExplorecardProps {
  card?: any;
}

export const SingleExploreCard = (props: SingleExplorecardProps) => {
  const { card } = props;

  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={card?.photo} alt='' />
        <FooterWrapper>
          <TitleWrapper>
            <h2>{card?.name}</h2>
            <VerifiedIcon />
          </TitleWrapper>
          <Description>{card?.description}</Description>
          <ButtonWrapper>
            <button className='primary-btn'>
              <span>View on PARAS</span>
            </button>
            <button className='primary-btn-naked'>
              <span>Stake Your NFTs</span>
            </button>
          </ButtonWrapper>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
