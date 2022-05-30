import React from 'react';
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

export const SinglePopularCard = () => {
  return (
    <Container>
      <InnerContainer>
        <DetailWrapper>
          <img draggable={false} src='/assets/img/home/collection3.png' alt='' />
          <InfoWrapper>
            <InfoItem>
              <span>Terraspaces</span>
              <VerifiedIcon />
            </InfoItem>
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
          </InfoWrapper>
        </DetailWrapper>
        <InfoCardWrapper className='row'>
          <div className="col-md-4">
            <InfoCard>
              <p>Floor</p>
              <p>333</p>
            </InfoCard>
          </div>
          <div className="col-md-4">
            <InfoCard>
              <p>Floor</p>
              <p>333</p>
            </InfoCard>
          </div>
          <div className="col-md-4">
            <InfoCard>
              <p>Floor</p>
              <p>333</p>
            </InfoCard>
          </div>
        </InfoCardWrapper>
      </InnerContainer>
    </Container>
  )
}
