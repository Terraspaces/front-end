import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react';
import {
    DropDownHeader,
    DropDownListContainer,
    DropDownContainer,
    DropDownList,
    ListItem,
    SelectProps,
    OptionProps
} from './styles'

const SelectContainer: React.FunctionComponent<SelectProps> = ({ options, onChange }) => {
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

export default SelectContainer
