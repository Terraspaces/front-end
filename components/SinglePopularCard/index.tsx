import React, { useEffect, useState } from 'react';
import { VerifiedIcon, LinkIcon } from '../Shared/SvgIcons';
import {
  Container,
  DetailWrapper,
  InfoWrapper,
  InfoItem,
  SocialList,
  InfoCardWrapper,
  InfoCard,
  InnerContainer
} from './styles';

interface SinglePopularCardProps {
  card?: any;
}

export const SinglePopularCard = (props: SinglePopularCardProps) => {
  const { card } = props;
  const { name, photo, social_media, floor_price, total_volume, total_listed } = card;
  const { discord, twitter, website } = social_media;
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (name.length > 12) {
      setTitle(name.substring(0, 12) + '...')
    } else {
      setTitle(name)
    }
  })
  return (
    <Container>
      <InnerContainer>
        <DetailWrapper>
          <img draggable={false} src={photo} alt='' />
          <InfoWrapper>
            <InfoItem>
              <span>{title}</span>
              <VerifiedIcon />
            </InfoItem>
            <SocialList>
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
            </SocialList>
          </InfoWrapper>
        </DetailWrapper>
        <InfoCardWrapper className='row'>
          <div className="col-4">
            <InfoCard>
              <p>Floor</p>
              <p>{floor_price}</p>
            </InfoCard>
          </div>
          <div className="col-4">
            <InfoCard>
              <p>Volume</p>
              <p>{total_volume.toFixed(0)}</p>
            </InfoCard>
          </div>
          <div className="col-4">
            <InfoCard>
              <p>Listing</p>
              <p>{total_listed}</p>
            </InfoCard>
          </div>
        </InfoCardWrapper>
      </InnerContainer>
    </Container>
  )
}
