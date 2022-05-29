import React from 'react'
import { VerifiedIcon } from '../Shared/SvgIcons'
import {
  Container,
  ContentWrapper,
  InfoWrapper,
  InfoItem,
  DetailWrapper,
  VolumeWrapper,
  InfoCard
} from './styles'

interface SingleRankCardProps {
  card?: any;
  index?: any;
}

export const SingleRankCard = (props: SingleRankCardProps) => {
  const { card, index } = props;

  return (
    <Container>
      <span>{index ?? 1}</span>
      <ContentWrapper>
        <DetailWrapper>
          <img draggable={false} src='/assets/img/home/collection3.png' alt='' />
          <InfoWrapper>
            <InfoItem>
              <span>Terraspaces</span>
              <VerifiedIcon />
            </InfoItem>
            <VolumeWrapper>
              <span className='title'>7 day volume:</span>
              <span className='value'>+15.30%</span>
            </VolumeWrapper>
          </InfoWrapper>
        </DetailWrapper>
        <div className='row'>
          <div className="col-md-4 col-sm-4">
            <InfoCard>
              <p className='title'>Floor Price</p>
              <p className='value'>8 N</p>
            </InfoCard>
          </div>
          <div className="col-md-4 col-sm-4">
            <InfoCard>
              <p className='title'>Floor Price</p>
              <p className='value'>100/777</p>
            </InfoCard>
          </div>
          <div className="col-md-4 col-sm-4">
            <InfoCard>
              <p className='title'>Floor Price</p>
              <p className='value'>2000 N</p>
            </InfoCard>
          </div>
        </div>
      </ContentWrapper>
    </Container>
  )
}