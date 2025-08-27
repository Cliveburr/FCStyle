import React from 'react';
import { BorderBuilder, BorderShortcuts, classBuilder, ColorBuilder,
    ColorShortcuts, EffectsBuilder, FlexBuilder, FlexShortcuts, PaddingBuilder, PaddingShortcuts, ShadowShortcurts, SizeBuilder, SizeShortcuts } from '../helpers';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>,
  BorderShortcuts, ColorShortcuts, FlexShortcuts, PaddingShortcuts, SizeShortcuts,
  ShadowShortcurts {

  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void | boolean;
  closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  style,
  isOpen = false,
  onClose,
  closeOnOverlayClick = true,
  ...props
}) => {

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      if (onClose) {
        const result = onClose(event);
        if (result === false) {
          event.preventDefault();
          return; // Cancel close
        }
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  // Extract the props for modal-content
  const { domProps: leftDomProps, classNames: contentClassNames } = classBuilder("modal-content")
    .addBuilder(ColorBuilder, { variant: 'white' })
    .addBuilder(PaddingBuilder, { size: 3 })
    .addBuilder(BorderBuilder, { round: 2 })
    .addBuilder(EffectsBuilder, { shadow: { shadow: 3} })
    .build(props);

  const { domProps, classNames } = classBuilder("modal-overlay")
    .add(className)
    .addBuilder(FlexBuilder)
    .addBuilder(SizeBuilder)
    .build(leftDomProps);

  return (
    <div className={classNames} style={style} onClick={handleOverlayClick} {...domProps}>
      <div className={contentClassNames}>
        {children}
      </div>
    </div>
  );
};
