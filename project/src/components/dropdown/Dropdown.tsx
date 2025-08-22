import React, { useState, useRef, useEffect, cloneElement, isValidElement } from 'react';
import { BorderBuilder, BorderShortcuts, classBuilder, ColorBuilder, ColorShortcuts, FlexChildrenBuilder, FlexChildrenShortcuts, MarginBuilder, MarginShortcuts, SizeBuilder, SizeShortcuts } from '../../helpers';
import { DropdownHeaderProps } from './DropdownHeader';
import { DropdownContentProps } from './DropdownContent';

export type DropdownDirection = 'up' | 'down' | 'left' | 'right';

export interface DropdownProps extends BorderShortcuts, ColorShortcuts, FlexChildrenShortcuts, MarginShortcuts, SizeShortcuts {
  // Filhos: deve conter um header e um content
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  
  // Configurações específicas do dropdown
  direction?: DropdownDirection;
  
  // Estado e eventos
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnItemSelect?: boolean;
  
  // Posicionamento
  offset?: number;
  zIndex?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  className,
  style,
  
  direction = 'down',
  
  isOpen: controlledIsOpen,
  onToggle,
  closeOnClickOutside = true,
  closeOnItemSelect = true,
  
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
  
  // Item select handler para Content
  const handleItemClick = (value?: any) => {
    if (closeOnItemSelect) {
      handleClose();
    }
  };
  
  const { domProps, classNames } = classBuilder('dropdown')
    .add(className)
    .addBuilder(ColorBuilder)
    .addBuilder(MarginBuilder)
    .addBuilder(BorderBuilder)
    .addBuilder(FlexChildrenBuilder)
    .addBuilder(SizeBuilder)
    .build(props);
  
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
  
  // Processar os children para injetar propriedades
  const processedChildren = React.Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;
    
    const childType = child.type as any;
    
    // Se é um componente header (DropdownButton, etc)
    if (childType && (
      childType.name === 'DropdownButton' || 
      childType.displayName === 'DropdownHeader' ||
      (child.props as DropdownHeaderProps).onClick !== undefined
    )) {
      return cloneElement(child as React.ReactElement<DropdownHeaderProps>, {
        onClick: handleToggle,
        className: classBuilder()
          .add((child.props as DropdownHeaderProps).className)
          .add('dropdown-trigger')
          .build({}).classNames
      });
    }
    
    // Se é um componente content (DropdownMenu, DropdownRender, etc)
    if (childType && (
      childType.name === 'DropdownMenu' || 
      childType.name === 'DropdownRender' ||
      childType.displayName === 'DropdownContent' ||
      (child.props as DropdownContentProps).onItemClick !== undefined
    )) {
      return isOpen ? (
        <div className={contentClasses} style={contentStyle} key="dropdown-content">
          {cloneElement(child as React.ReactElement<DropdownContentProps>, {
            onItemClick: handleItemClick,
            onClose: handleClose,
            className: classBuilder()
              .add((child.props as DropdownContentProps).className)
              .add('dropdown-content-inner')
              .build({}).classNames
          })}
        </div>
      ) : null;
    }
    
    return child;
  });
  
  return (
    <div ref={dropdownRef} className={classNames} {...domProps}>
      {processedChildren}
    </div>
  );
};
