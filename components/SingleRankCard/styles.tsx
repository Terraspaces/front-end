import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 35px;
  border-radius: 30px;
  background-color: #3f3359;
  border: 2px solid var(--primary-2);
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;

  > span {
    margin-right: 10px;
    font-weight: 500;
    font-size: 20px;
    padding: 0 20px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    margin-right: 0;
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 5px;
`

export const InfoWrapper = styled.div``

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 18px;
    margin-right: 5px;
    color: var(--white);
    font-weight: 500;
  }
  svg {
    width: 20px;
    min-width: 20px;
    height: 20px;
  }
`

export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 40px;
    height: 40px;
    min-width: 30px;
    border-radius: 8px;
    border: 2px solid white;
    margin-right: 10px;
  }
`

export const VolumeWrapper = styled.div`
  background-color: #554578;
  border-radius: 5px;
  padding: 0px 3px;
  width: fit-content;
  > span {
    font-size: 13px;
    &.title {
      color: var(--white);
    }
    &.value {
      color: #83bf0b;
    }
  }
`

export const InfoCard = styled.div`
  margin-top: 5px;
  padding: 0px;
  p {
    color: var(--white);
    &.title {
      opacity: 0.9;
      font-size: 14px !important;
    }
    &.value {
      font-weight: 500;
      font-size: 18px;
    }
  }
  @media (min-width: 576px) {
    margin-top: 15px;
    padding: 5px;
  }
`
