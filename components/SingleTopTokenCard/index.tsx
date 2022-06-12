import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
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
import { WalletContext } from '../../contexts/wallet';

interface SingleTopTokenCardProps {
  card?: any;
}

export const SingleTopTokenCard = (props: SingleTopTokenCardProps) => {
  const { getNftMetadata } = useContext(WalletContext);
  const { card } = props;
  const { token, volume } = card;
  const [baseUri, setBaseUri] = useState<string>('');
  useEffect(() => {
    if (token && token.contract_id) {
      (async () => {
        const metadata = await getNftMetadata(token.contract_id)
        setBaseUri(metadata?.base_uri);
      })();
    }
  }, [token]);
  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={token?.metadata?.media.startsWith('http') ? token?.metadata?.media : `${baseUri}/${token?.metadata?.media}`} alt='' />
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
              {/* <a href='https://discord.com' target='_blank' rel="noreferrer">
                <img draggable={false} src='/assets/img/icons/discord.png' alt='' />
              </a>
              <a href='https://twitter.com' target='_blank' rel="noreferrer">
                <img draggable={false} src='/assets/img/icons/twitter.png' alt='' />
              </a>
              <a href='https://twitter.com' target='_blank' rel="noreferrer">
                <LinkIcon />
              </a> */}
              <button className='primary-btn'>
                <a href={`https://paras.id/token/${token?.contract_id}::${token?.token_series_id}/${token?.token_id}`} target="_blank" rel='noreferrer' style={{ color: "white" }}>
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
