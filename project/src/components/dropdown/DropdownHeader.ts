import React from 'react';

export interface DropdownHeaderProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DropdownHeader {
  (props: DropdownHeaderProps): React.ReactElement;
}
