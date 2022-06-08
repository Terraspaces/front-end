import styled, { css } from 'styled-components';

export const Container = styled('div')`
  padding-top: 105px;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
`

export const UpcomingContent = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 70px;
  @media screen and (max-width: 600px) {
    margin-top: 0;
    .upcoming-text {
      margin-left: 10px;
      font-size: 24px;
      font-weight: bold;
    }
    .list-btn {
        margin-right: 10px;
    }
  }
`

export const ToggleContent = styled.label`
  position: relative;
  display: block;
  width: 240px;
  height: 42px;
  transition: all 200ms linear;
  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    &:checked + .base-color {
      .toggle-slider {
          margin-left: 50%;
      }
      .cash {
          color: white;
      }
      .token {
          color: #f7fafb;
      }
    }
  }
  input[type="checkbox"] + .base-color {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 150ms linear;
    background: transparent;
    border-radius: 10px;
    border: 1px solid var(--primary-2);
    .toggle-slider {
        display: block;
        position: absolute;
        content: " ";
        background: var(--primary-2);
        width: 50%;
        height: 100%;
        transition: margin 300ms linear;
        border-radius: 10px;
        height: 42px;
        background-color: var(--primary-2);
    }
    .cash {
        color: #f7fafb;
    }
  }
  .cash,
  .token {
      display: block;
      position: absolute;
      width: 50%;
      padding-top: 7.5px;
      color: white;
      text-align: center;
      cursor: pointer;
  }
  .cash {
      left: 0px;
  }
  .token {
      right: 0px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`

export const MobileToggle = styled.label`
  position: relative;
  height: 42px;
  margin: 10px 20px;
  transition: all 200ms linear;
  display: none;
  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    &:checked + .base-color {
      .toggle-slider {
          margin-left: 50%;
      }
      .cash {
          color: white;
      }
      .token {
          color: #f7fafb;
      }
    }
  }
  input[type="checkbox"] + .base-color {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 150ms linear;
    background: transparent;
    border-radius: 10px;
    border: 1px solid var(--primary-2);
    .toggle-slider {
        display: block;
        position: absolute;
        content: " ";
        background: var(--primary-2);
        width: 50%;
        height: 100%;
        transition: margin 300ms linear;
        border-radius: 10px;
        height: 42px;
        background-color: var(--primary-2);
    }
    .cash {
        color: #f7fafb;
    }
  }
  .cash,
  .token {
      display: block;
      position: absolute;
      width: 50%;
      padding-top: 7.5px;
      color: white;
      text-align: center;
      cursor: pointer;
  }
  .cash {
      left: 0px;
  }
  .token {
      right: 0px;
  }
  @media screen and (max-width: 600px) {
    display: block;
  }
`

export const CardContent = styled.div`
  margin: 60px 10px;
`

export const Card = styled.div`
  width: 100%;
  border: 2px solid var(--primary-2);
  border-radius: 24px;
  background: #ff90ff25;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 20px;
  img {
    width: 400px;
    border-radius: 20px;
    transform: scale(1.02);
  }
  @media screen and (max-width: 1200px) {
    img {
      height: 100%;
    }
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    .img-content {
      height: 250px;
      overflow: hidden;
      border-radius: 20px;
      transform: scale(1.02);
    }
    img {
      width: 100%;
      height: auto;
      margin-top: -50px;
    }
  }
`

export const CardBody = styled.div`
  padding: 40px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 100%;
  .card-title {
    font-size: 32px;
    color: white;
    font-weight: 500;
    margin-right: 20px;
  }
  .icon-set {
    margin-top: 10px
  }
  .card-head {
    display: flex;
    align-items: center;
    .card-subheader {
      .icon-set {
        display: none;
      }
    }
  }
  .description {
    color: white;
    margin-top: 20px;
  }
  .detail-content {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    img {
      width: 16px;
      height: 16px;
      border-radius: 0;
    }
    .subtitle {
      color: white;
      font-size: 14px;
    }
    .sub-detail {
      color: white;
      font-size: 18px;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 800px) {
    padding: 20px;
    width: 100%;
    .detail-content {
      margin-top: 20px;
      .col-md-5:nth-child(2) {
        margin-top: 20px;
      }
    }
    .card-head {
      justify-content: space-between;
      .card-subheader {
        .icon-set {
          display: block;
        }
      }
    }
    .card-title {
      font-size: 20px;
    }
    .icon-set {
      margin-top: -10px;
      display: none;
    }
  }
`

export const LoverCount = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff15;
  padding: 10px 12px;
  border-radius: 50px;
`