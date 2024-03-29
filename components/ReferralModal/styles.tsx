import styled, { css } from 'styled-components';

export const Container = styled.div`
    border: 3px solid var(--primary-2);
    padding: 70px;
    border-radius: 40px;
    background-image: linear-gradient( 134.6deg,  #3f3359, #4f3372);
    max-width: 1100px;
    height: calc(100vh - 120px);
    overflow: auto;
    @media screen and (max-width: 600px) {
        padding: 60px 35px;
    }
`

export const BodyContainer = styled.div`
    display: flex;
    margin-top: 50px;
`

export const IconContent = styled.div`
    background-color: var(--primary-2);
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`

export const TimelineContent = styled.div`
    position: relative;
`

export const DetailContent = styled.div`
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .dropdownList {
        border-radius: 15px;
        height: 54px;
        margin-right: -.5rem;
        margin-left: -.5rem;
        width: calc(100% + 1rem);
        padding: 15px;
        color: white;
        background-color: #63517e;
        border: none;
        padding-left: 20px;
        input {
            width: max-content;
            font-size: 16px;
            color: white;
            ::placeholder {
                font-size: 15px;
            }
        }
        .react-dropdown-select-dropdown {
            background-color: #63517e;
            border-radius: 15px;
            border: none;
            max-height: 220px;
            span {
                border-bottom: none;
                padding: 10px 16px;
                :hover {
                    background-color: #00000015;
                }
            }
        }
    }
    .warning-text {
        color: #c71d1d;
    }
    @media screen and (max-width: 600px) {
        padding-left: 0px;
        .value-group {
            margin-top: 40px;
        }
    }
`

export const ModalInput = styled.input`
    background-color: transparent;
    caretColor: transparent;
    padding: 15px;
    color: white;
    width: 100%;
`

export const InputContent = styled.div`
    background-color: #ffffff25;
    border-radius: 15px;
    margin-top: 10px;
    display: flex;
    padding-right: 10px;
    align-items: center;
    justify-content: space-between;
    position: relative;
    svg {
        color: #a194bb;
        cursor: pointer;
        transition: .3s all;
        :hover {
            color: white;
        }
    }
`

export const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? "block" : "none")};
  right: 0;
  left: 0;
  text-align: center;
  background-color: var(--primary-2);
  color: white;
  border-radius: 16px;
  opacity: 0.7;
`;