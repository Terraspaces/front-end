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
  const { discord, twitter, website } = card?.social_media;
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
          {/* <SocialList>
            {discord && (<a href={`https://discord.gg/${discord}`} target='_blank' rel="noreferrer">
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
            )}
          </SocialList> */}
          <SocialList>
            <button className='primary-btn'>
              <a href={`https://paras.id/collection/${card?.collection_id}`} target="_blank" rel='noreferrer' style={{ color: "white" }}>
                <span>View on PARAS</span>
              </a>
            </button>
          </SocialList>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
