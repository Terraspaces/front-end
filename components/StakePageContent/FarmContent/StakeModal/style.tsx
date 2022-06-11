import styled, { css } from 'styled-components';

export const Container = styled.div`
    border: 3px solid var(--primary-2);
    padding: 30px;
    border-radius: 40px;
    background-image: linear-gradient( 134.6deg,  #3f3359, #4f3372);
    max-width: 1100px;
    color: white;
    min-height: 300px;
    @media screen and (max-width: 600px) {
        width: calc(100vw - 40px);
    }
`

export const StakeModalHeader = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;   
    }
`

export const NFTStakeContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: 300px;
        border-radius: 20px;
        margin-top: 20px;
    }
    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;   
        img {
            width: 100%;
        }
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media screen and (max-width: 600px) {
        flex-direction: row;
        justify-content: space-between;
        button:nth-child(1) {
            margin-right: 10px;
        }
    }
`