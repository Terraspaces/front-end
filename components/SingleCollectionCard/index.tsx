import React, { useEffect, useState } from 'react';
import { VerifiedIcon, LinkIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  SocialList
} from './styles';

interface SingleCollectionCardProps {
  card?: any;
}

export const SingleCollectionCard = (props: SingleCollectionCardProps) => {
  const { card } = props;
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (card?.name.length > 32) {
      setTitle(card?.name.substring(0, 32) + '...')
    } else {
      setTitle(card?.name)
    }
  })
  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={card?.photo} alt='' />
        <FooterWrapper>
          <TitleWrapper>
            <h2>{title}</h2>
            <VerifiedIcon />
          </TitleWrapper>
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
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
