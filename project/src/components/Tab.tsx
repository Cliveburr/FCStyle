import React, { useState } from 'react';
import { BorderBuilder, BorderShortcuts, classBuilder, ColorBuilder, ColorShortcuts, FlexBuilder, FlexShortcuts, PaddingBuilder, PaddingShortcuts, SizeBuilder, SizeShortcuts } from '../helpers';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
  BorderShortcuts, ColorShortcuts, FlexShortcuts, PaddingShortcuts, SizeShortcuts {

  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  items: TabItem[];
  defaultActiveId?: string;
  orientation?: 'horizontal' | 'vertical';
  onChange?: (activeId: string) => void;
}

export const Tab: React.FC<TabProps> = ({
  children,
  className,
  style,
  items,
  defaultActiveId,
  orientation = 'horizontal',
  onChange,
  ...props
}) => {
  const [activeId, setActiveId] = useState<string>(defaultActiveId || items[0]?.id || '');

  const handleTabClick = (item: TabItem) => {
    if (item.disabled) return;
    setActiveId(item.id);
    onChange?.(item.id);
  };

  const isVertical = orientation === 'vertical';

  // Build container classes
  const { domProps, classNames } = classBuilder("tab")
    .add(className)
    .add(isVertical ? 'tab-vertical' : 'tab-horizontal')
    .addBuilder(ColorBuilder)
    .addBuilder(BorderBuilder)
    .addBuilder(PaddingBuilder)
    .addBuilder(SizeBuilder)
    .build(props);

  // Build tab list classes
  const tabListClasses = classBuilder("tab-list")
    .add(isVertical ? 'tab-list-vertical' : 'tab-list-horizontal')
    .addBuilder(FlexBuilder)
    .build(isVertical ? { column: true, gap1: true } : { row: true, gap1: true })
    .classNames;

  // Build content classes
  const contentClasses = classBuilder("tab-content")
    .build({})
    .classNames;

  const activeItem = items.find(item => item.id === activeId);

  return (
    <div className={classNames} style={style} {...domProps}>
      <div className={tabListClasses}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const tabClasses = classBuilder("tab-item")
            .add(isActive ? 'tab-item-active' : '')
            .add(item.disabled ? 'tab-item-disabled' : '')
            .build({})
            .classNames;

          return (
            <button
              key={item.id}
              className={tabClasses}
              onClick={() => handleTabClick(item)}
              disabled={item.disabled}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className={contentClasses}>
        {activeItem?.content || children}
      </div>
    </div>
  );
};
