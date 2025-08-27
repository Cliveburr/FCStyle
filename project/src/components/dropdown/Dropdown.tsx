import React, { useState, useRef, useEffect } from 'react';
import { classBuilder, FlexChildrenBuilder, FlexChildrenShortcuts, MarginBuilder, MarginShortcuts, SizeBuilder, SizeShortcuts, IconSet, ColorBuilder, BorderBuilder, ColorShortcuts, BorderShortcuts } from '../../helpers';
import { Button } from '../Button';
import { Menu } from '../menu/Menu';

export type DropdownDirection = 'up' | 'down' | 'left' | 'right';

export interface DropdownProps extends
  ColorShortcuts, MarginShortcuts, BorderShortcuts, FlexChildrenShortcuts, SizeShortcuts {
  // Filhos: ListItems diretos
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

  // Props do button
  leftIcon?: IconSet;
  li?: string;
  as?: 'button' | 'link' | 'submit' | 'reset',
  label?: string;
  disabled?: boolean;
  
  // Configurações específicas do dropdown
  direction?: DropdownDirection;
  
  // Estado e eventos
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnItemSelect?: boolean;
  
  // Menu props
  selectedValue?: any;
  onSelect?: (value: any) => void;
  
  // Posicionamento
  offset?: number;
  zIndex?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  className,
  style,
  
  label = 'Dropdown',
  as,
  disabled = false,
  
  leftIcon,
  li,
  
  direction = 'down',
  
  isOpen: controlledIsOpen,
  onToggle,
  closeOnClickOutside = true,
  closeOnItemSelect = true,
  
  selectedValue,
  onSelect,
  
  offset = 4,
  zIndex = 1000,
  
  ...props
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Estado controlado vs não controlado
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    const newIsOpen = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    onToggle?.(newIsOpen);
  };
  
  const handleClose = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    onToggle?.(false);
  };
  
  // Click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside]);
  
  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);
  
  // Item select handler
  const handleItemSelect = (value?: any) => {
    onSelect?.(value);
    if (closeOnItemSelect) {
      handleClose();
    }
  };

  // Extract props for Button
  const { domProps: leftDomProps, classNames: buttonClassNames } = classBuilder('dropdown-trigger')
    .addBuilder(ColorBuilder)
    .addBuilder(BorderBuilder)
    .build(props);
  
  // Classes para o dropdown
  const { domProps, classNames } = classBuilder('dropdown')
    .add(className)
    .addBuilder(SizeBuilder)
    .addBuilder(MarginBuilder)
    .addBuilder(FlexChildrenBuilder)
    .build(leftDomProps);
  
  // Classes para o dropdown content baseado na direção
  const contentClasses = classBuilder('dropdown-content')
    .add(`dropdown-${direction}`)
    .if('dropdown-open', isOpen)
    .build({}).classNames;
  
  // Estilos inline para posicionamento e z-index
  const contentStyle: React.CSSProperties = {
    zIndex,
    ...style
  };
  
  // Button props
  const buttonProps = {
    li: (typeof leftIcon === 'string' ? leftIcon : undefined) || li,
    ri: isOpen ? 'chevron-up' : 'chevron-down',
    leftIcon: (typeof leftIcon !== 'string' ? leftIcon : undefined),
    disabled,
    as,
    className: buttonClassNames
  };

  return (
    <div ref={dropdownRef} className={classNames} {...domProps}>
      <Button {...buttonProps} onClick={handleToggle}>
        {label}
      </Button>
      
      {isOpen && (
        <div className={contentClasses} style={contentStyle}>
          <Menu
            selectedValue={selectedValue}
            onItemSelect={handleItemSelect}
            white sh b    //TODO: parametrizar
          >
            {children}
          </Menu>
        </div>
      )}
    </div>
  );
};
