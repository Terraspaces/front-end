import styled from 'styled-components';

export const Container = styled.div`
    border: 3px solid var(--primary-2);
    padding: 30px;
    border-radius: 40px;
    background-image: linear-gradient( 134.6deg,  #3f3359, #4f3372);
    max-width: 1100px;
    color: white;
    min-height: 300px;
    @media screen and (max-width: 700px) {
        height: calc(100vh - 100px);
        overflow: auto;
    }
`