import React, { useEffect, useState } from 'react'
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
  const { card: collection, index } = props;
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (collection?.name.length > 12) {
      setTitle(collection?.name.substring(0, 12) + '...')
    } else {
      setTitle(collection?.name)
    }
  })

  return (
    <Container>
      <span>{index ?? 1}</span>
      <ContentWrapper>
        <DetailWrapper>
          <img draggable={false} src={collection?.photo} alt='' />
          <InfoWrapper>
            <InfoItem>
              <span>{title}</span>
              <VerifiedIcon />
            </InfoItem>
            {/* <VolumeWrapper>
              <span className='title'>7 day volume:</span>
              <span className='value'>+15.30%</span>
            </VolumeWrapper> */}
          </InfoWrapper>
        </DetailWrapper>
        <div className='row mt-2'>
          <div className="col-4">
            <InfoCard>
              <p className='title'>Floor Price</p>
              <p className='value'>{collection?.floor_price.toFixed(0)} N</p>
            </InfoCard>
          </div>
          <div className="col-4">
            <InfoCard>
              <p className='title'>Listed</p>
              <p className='value'>{collection?.total_listed}</p>
            </InfoCard>
          </div>
          <div className="col-4">
            <InfoCard>
              <p className='title'>Volume</p>
              <p className='value'>{collection?.total_volume.toFixed(0)} N</p>
            </InfoCard>
          </div>
        </div>
      </ContentWrapper>
    </Container>
  )
}