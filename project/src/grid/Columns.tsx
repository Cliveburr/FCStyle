import React from 'react';
import { Place, PlaceProps } from './Place';

export interface ColumnsProps extends PlaceProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Columns: React.FC<ColumnsProps> = ({
  children,
  className,
  style,
  ...props
}) => {

  return (
    <Place row className={className} style={style} {...props}>
      {children}
    </Place>
  );
};
