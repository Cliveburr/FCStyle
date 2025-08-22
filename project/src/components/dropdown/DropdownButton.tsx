import React from 'react';
import { Button, ButtonProps } from '../Button';
import { DropdownHeaderProps } from './DropdownHeader';

export interface DropdownButtonProps extends Omit<ButtonProps, 'onClick' | 'children'>, DropdownHeaderProps {
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  onClick,
  className,
  style,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
