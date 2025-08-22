import React from 'react';

export interface DropdownContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onItemClick?: (value?: any) => void;
  onClose?: () => void;
}

export interface DropdownContent {
  (props: DropdownContentProps): React.ReactElement;
}
