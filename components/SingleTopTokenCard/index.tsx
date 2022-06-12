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

import { parseEther } from '../../utils/bignumber';
import { X_PARAS_COLLECTIONS } from '../../contexts/wallet';

interface SingleTopTokenCardProps {
  card?: any;
}

export const SingleTopTokenCard = (props: SingleTopTokenCardProps) => {
  const { card } = props;
  const { token, volume } = card;

  console.log(X_PARAS_COLLECTIONS.includes(token?.metadata?.contract_id) ? ("https://ipfs.fleek.co/ipfs/" + token?.metadata?.media) : (token?.metadata?.media).startsWith('https') ? (token?.metadata?.media) : (token?.metadata?.media))
  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={token?.metadata?.media} alt='' />
        <FooterWrapper>
          <TitleWrapper>
            <h2>{token?.metadata?.title}</h2>
            <VerifiedIcon />
          </TitleWrapper>
          <Content>
            <InfoWrapper>
              <p>Sold For</p>
              <p className='price'>{parseEther(volume)} N</p>
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
