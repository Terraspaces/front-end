import moment from 'moment';
import React from 'react';
import { VerifiedIcon, LinkIcon, HeartIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  DateIconWrapper,
  DateBox,
  SocialList,
  FavoriteBox
} from './styles';

interface SingleExplorecardProps {
  card?: any;
}

export const SingleCommunityCard = (props: SingleExplorecardProps) => {
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
          <div>
            <DateIconWrapper>
              <DateBox className='date-box'>{moment(card.timestamp).format('MMM DD | HH:mm') }</DateBox>
              <SocialList>
                <a href='https://discord.com' target='_blank' rel="noreferrer">
                  <img draggable={false} src='/assets/img/icons/discord.png' alt='' />
                </a>
                <a href='https://twitter.com' target='_blank' rel="noreferrer">
                  <img draggable={false} src='/assets/img/icons/twitter.png' alt='' />
                </a>
                <a href='https://twitter.com' target='_blank' rel="noreferrer">
                  <LinkIcon />
                </a>
              </SocialList>
            </DateIconWrapper>
            <FavoriteBox className='favorite-box'>
              <HeartIcon />
              <span>{card.favorite_count}</span>
            </FavoriteBox>
          </div>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
