import styled, { css } from 'styled-components'


export const DropDownHeader = styled.div`
  width: calc(100% + 1rem);
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  border-radius: 16px;
  background: #63517e;
  transition: border-radius 0.15s;
  margin-right: -.5rem;
  margin-left: -.5rem;
`

export const DropDownListContainer = styled.div`
  min-width: calc(100% + 1rem);
  height: 0;
  position: absolute;
  overflow: hidden;
  background: #63517e;
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  margin-right: -.5rem;
  margin-left: -.5rem;
`

export const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: 100%;
  position: relative;
  background: transparent;
  border-radius: 16px;
  height: 54px;
  min-width: 100%;
  color: white;

  ${(props) =>
        props.isOpen &&
        css`
      ${DropDownHeader} {
        border-radius: 16px 16px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border-top-width: 0;
        border-radius: 0 0 16px 16px;
        max-height: 120px;
        overflow: auto;
        overflow-x: hidden;
      }
    `}

  svg {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
`

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`

export const ListItem = styled.li`
  list-style: none;
  padding: 10px 16px;
  color: white;
  &:hover {
    background: #63517e;
  }
`

export interface SelectProps {
    options: OptionProps[]
    onChange?: (option: OptionProps) => void
}

export interface OptionProps {
    label: string
    value: any
}
