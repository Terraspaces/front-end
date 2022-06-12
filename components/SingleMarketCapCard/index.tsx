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
}

export const SingleMarketCapCard = (props: SingleMarketCapCardProps) => {
  const { card } = props;
  const { name, photo, est_market_cap, social_media, collection_id } = card;
  const { discord, twitter, website } = social_media;
  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={photo} alt='' />
        <FooterWrapper>
          <TitleWrapper>
            <h2>{name}</h2>
            <VerifiedIcon />
          </TitleWrapper>
          <Content>
            <InfoWrapper>
              <p>Est. Marketcap</p>
              <p className="price">${est_market_cap.toFixed(0)}</p>
            </InfoWrapper>
            <SocialList>
              {/* {discord && (<a href={`https://discord.gg/${discord}`} target='_blank' rel="noreferrer">
                <img draggable={false} src='/assets/img/icons/discord.png' alt='' />
              </a>)}
              {twitter && (
                <a href={`https://twitter.com/${twitter}`} target='_blank' rel="noreferrer">
                  <img draggable={false} src='/assets/img/icons/twitter.png' alt='' />
                </a>
              )}
              {website && (
                <a href={website.startsWith('http') ? website : `https://${website}`} target='_blank' rel="noreferrer">
                  <LinkIcon />
                </a>
              )} */}
              <button className='primary-btn'>
                <a href={`https://paras.id/collection/${collection_id}`} target="_blank" rel='noreferrer' style={{ color: "white" }}>
                  <span>PARAS</span>
                </a>
              </button>
            </SocialList>
          </Content>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
