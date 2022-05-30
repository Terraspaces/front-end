import moment from 'moment';
import React from 'react';
import { VerifiedIcon, LinkIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  InfoWrapper,
  SocialList,
  Content
} from './styles';

interface SingleMarketCapCardProps {
  card?: any;
  isSales?: boolean;
}

export const SingleMarketCapCard = (props: SingleMarketCapCardProps) => {
  const { card, isSales } = props;

  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={card?.photo} alt='' />
        <FooterWrapper>
          <TitleWrapper>
            <h2>{card?.name}</h2>
            <VerifiedIcon />
          </TitleWrapper>
          <Content>
            <InfoWrapper>
              {isSales ? <p>Sold For</p> : <p>Est. Marketcap</p>}
              {isSales ? <p className='price'>{card.price} N</p> : <p className="price">${card.price}</p>}
            </InfoWrapper>
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
          </Content>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
