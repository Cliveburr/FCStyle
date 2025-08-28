import React from 'react';
import { Place, PlaceProps } from './Place';

export interface RowsProps extends PlaceProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Rows: React.FC<RowsProps> = ({
  children,
  className,
  style,
  ...props
}) => {

  return (
    <Place column className={className} style={style} {...props}>
      {children}
    </Place>
  );
};
