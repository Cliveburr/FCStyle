import React, { useState, useRef, useEffect } from 'react';
import { ColorShortcuts, BorderShortcuts, BorderBuilder, classBuilder, ColorBuilder, EffectsShortcuts, EffectsBuilder, FlexChildrenBuilder, FlexChildrenShortcuts, MarginBuilder, MarginShortcuts, SizeBuilder, SizeShortcuts, IconSet } from '../../helpers';
import { Button } from '../Button';
import { Place } from '../../grid';

export type DropdownDirection = 'up' | 'down' | 'left' | 'right';

export interface DropdownRenderProps extends FlexChildrenShortcuts, MarginShortcuts, SizeShortcuts,
  ColorShortcuts, BorderShortcuts, EffectsShortcuts {
  // Filhos: conteúdo customizado direto
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  
  // Props do header button
  label?: React.ReactNode;
  type?: 'button' | 'link';
  disabled?: boolean;
  buttonClassName?: string;
  
  // Ícone do button (apenas esquerda)
  leftIcon?: IconSet;
  li?: string;
  
  // Props do Button (cores, tamanhos, etc)
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  secondary?: boolean;
  
  // Configurações específicas do dropdown
  direction?: DropdownDirection;
  
  // Estado e eventos
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnItemSelect?: boolean;
  
  // Eventos para content customizado
  onItemClick?: (value?: any) => void;
  onClose?: () => void;
  
  // Posicionamento
  offset?: number;
  zIndex?: number;
}

export const DropdownRender: React.FC<DropdownRenderProps> = ({
  children,
  className,
  style,
  
  label = 'Dropdown',
  type = 'button',
  disabled = false,
  buttonClassName,
  
  leftIcon,
  li,
  
  success,
  danger,
  warning,
  info,
  secondary,
  
  direction = 'down',
  
  isOpen: controlledIsOpen,
  onToggle,
  closeOnClickOutside = true,
  closeOnItemSelect = true,
  
  onItemClick,
  onClose,
  
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
    onClose?.();
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

  const { domProps: sharedDomProps, classNames: sharedClassNames } = classBuilder()
    .addBuilder(SizeBuilder)
    .build(props);

  // Extract props for Button
  const { domProps: leftDomProps, classNames: buttonClassNames } = classBuilder('dropdown-trigger')
    .addBuilder(ColorBuilder)
    .addBuilder(BorderBuilder)
    .build(sharedDomProps);

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
    success,
    danger,
    warning,
    info,
    secondary,
    li: (typeof leftIcon === 'string' ? leftIcon : undefined) || li,
    ri: isOpen ? 'chevron-up' : 'chevron-down',
    leftIcon: (typeof leftIcon !== 'string' ? leftIcon : undefined),
    disabled,
    className: buttonClassNames
  };

  const handleClick = (event: React.MouseEvent) => {
    // Se o elemento clicado tem um atributo data-value, usar como valor
    const target = event.target as HTMLElement;
    const value = target.getAttribute('data-value');
    
    onItemClick?.(value);
    
    if (closeOnItemSelect) {
      handleClose();
    }
  };

  const { domProps: contentDomProps, classNames: contentClassNames } = classBuilder('dropdown-render')
    .add('dropdown-content-inner')
    // .addBuilder(ColorBuilder)
    // .addBuilder(BorderBuilder)
    // .addBuilder(EffectsBuilder)
    .build({});

  return (
    <div ref={dropdownRef} className={classNames} {...domProps}>
      {type === 'link' ? (
        <a {...buttonProps} onClick={handleToggle} style={{ cursor: 'pointer' }}>
          {label}
        </a>
      ) : (
        <Button {...buttonProps} onClick={handleToggle}>
          {label}
        </Button>
      )}
      
      {isOpen && (
        <div className={contentClasses} style={contentStyle}>
          <Place 
            className={contentClassNames} 
            onClick={handleClick}
            {...contentDomProps}
            white sh b    //TODO: parametrizar
          >
            {children}
          </Place>
        </div>
      )}
    </div>
  );
};
