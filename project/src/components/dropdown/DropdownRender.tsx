import React from 'react';
import { DropdownContentProps } from './DropdownContent';

export interface DropdownRenderProps extends DropdownContentProps {
}

export const DropdownRender: React.FC<DropdownRenderProps> = ({
  children,
  className,
  style,
  onItemClick,
  onClose
}) => {
  
  const handleClick = (event: React.MouseEvent) => {
    // Se o elemento clicado tem um atributo data-value, usar como valor
    const target = event.target as HTMLElement;
    const value = target.getAttribute('data-value');
    
    if (value !== null) {
      onItemClick?.(value);
    } else {
      onItemClick?.();
    }
  };

  return (
    <div 
      className={`dropdown-render ${className || ''}`}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
