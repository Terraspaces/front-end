import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Icon } from '@iconify/react';

const DropDownHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  border-radius: 16px;
  background: #3e2959;
  transition: border-radius 0.15s;
  margin-top: 20px;
`

const DropDownListContainer = styled.div`
  min-width: 100%;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: #3e2959;
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: 100%;
  position: relative;
  background: #00000030;
  border-radius: 16px;
  height: 50px;
  min-width: 100%;

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
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  &:hover {
    background: #3e2949;
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

const Select: React.FunctionComponent<SelectProps> = ({ options, onChange }) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const toggling = () => setIsOpen(!isOpen)

  const onOptionClicked = (option: OptionProps) => () => {
    setSelectedOption(option)
    setIsOpen(false)

    if (onChange) {
      onChange(option)
    }
  }

  useEffect(() => {
    setContainerSize({
      width: (dropdownRef.current as any).offsetWidth, // Consider border
      height: (dropdownRef.current as any).offsetHeight,
    })
  }, [])

  return (
    <DropDownContainer isOpen={isOpen} ref={containerRef} {...containerSize}>
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={toggling}>
          <p>{selectedOption?.label}</p>
        </DropDownHeader>
      )}
      <Icon icon="gridicons:dropdown" onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option) =>
            option.label !== selectedOption?.label ? (
              <ListItem onClick={onOptionClicked(option)} key={option.label}>
                <p>{option.label}</p>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select