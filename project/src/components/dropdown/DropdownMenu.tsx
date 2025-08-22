import React from 'react';
import { Menu, MenuProps } from '../menu/Menu';
import { DropdownContentProps } from './DropdownContent';

export interface DropdownMenuProps extends Omit<MenuProps, 'onItemSelect'> {
  onItemClick?: (value?: any) => void;
  onClose?: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className,
  style,
  onItemClick,
  onClose,
  ...menuProps
}) => {
  
  const handleItemSelect = (value: any) => {
    onItemClick?.(value);
    // O fechamento será controlado pelo componente pai Dropdown
  };

  menuProps.white = true;  

  return (
    <Menu
      {...menuProps}
      className={className}
      style={style}
      onItemSelect={handleItemSelect}
    >
      {children}
    </Menu>
  );
};
