import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Place } from '../../grid/Place';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface ColorInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (value: string) => void;
  li?: string;
  leftIcon?: IconSet;
}

const PRESET_COLORS = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000000',
  '#FFFFFF', '#DC143C', '#32CD32', '#4169E1', '#FFD700', '#FF1493',
  '#00CED1', '#FF4500', '#9370DB', '#90EE90', '#CD853F', '#2F4F4F'
];

export const ColorInput: React.FC<ColorInputProps> = ({
  className,
  
  validatorControl,
  onChange,
  li,
  leftIcon,

  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '');
  const [inputId] = useState<string>(`colorinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;

  // Atualiza o valor inicial se props.value mudar
  useEffect(() => {
    if (props.value !== undefined) {
      setInputValue(props.value.toString());
    }
  }, [props.value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    updateValidation(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleColorSelect = (color: string) => {
    setInputValue(color);
    updateValidation(color);
    setIsDropdownOpen(false);
    
    if (onChange) {
      onChange(color);
    }
  };

  const updateValidation = (value: string) => {
    if (validatorControl) {
      validatorControl.setValue(value);
      const result = validatorControl.validate();
    }
  };

  const getLeftIcon = () => {
    const resolvedLeftIcon: IconSet | undefined = leftIcon || (li ? { name: li } : undefined);

    return resolvedLeftIcon && (
      <label htmlFor={inputId} >
        <Icon icon={resolvedLeftIcon} />
      </label>
    )
  }

  const getRightIcon = () => {
    if (validationStatus === ValidationStatus.Valid) {
      return (<label htmlFor={inputId} >
        <Icon name="check" className="success-inv" />
      </label>)
    } else if (validationStatus === ValidationStatus.Invalid) {
      return (<label htmlFor={inputId} >
        <Icon name="exclamation-circle" className="danger-inv" />
      </label>)
    }
    
    return null;
  };

  const isValidColor = (color: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const ColorPicker = () => (
    <Place className="color-picker" p2>
      <div className="color-grid">
        {PRESET_COLORS.map((color, index) => (
          <div
            key={index}
            className={`color-swatch ${inputValue === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            title={color}
          />
        ))}
      </div>
      <Place className="custom-color-section" mt2 pt2>
        <input
          type="color"
          value={isValidColor(inputValue) ? inputValue : '#000000'}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="native-color-picker"
        />
      </Place>
    </Place>
  );

  const { domProps, classNames } = classBuilder('input gap1 color-input-wrapper')
    .add(className)
    .if('valid', validationStatus === ValidationStatus.Valid)
    .if('invalid', validationStatus === ValidationStatus.Invalid)
    .addBuilder(ColorBuilder, { variant: 'white', inverse: false })
    .addBuilder(MarginBuilder)
    .addBuilder(PaddingBuilder, { size: 2})
    .addBuilder(BorderBuilder, { width: 2, round: 2})
    .addBuilder(FlexChildrenBuilder)
    .addBuilder(SizeBuilder)
    .build(props);

  return (
    <div className={classNames}>
      {getLeftIcon()}
      <input
        {...domProps}
        id={inputId}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
  className="color-input"
      />

      <Dropdown
        label=""
        trigger={
          <button
            type="button"
            className="color-trigger"
            aria-label="Selecionar cor"
            style={{ backgroundColor: isValidColor(inputValue) ? inputValue : 'transparent' }}
          />
        }
        isOpen={isDropdownOpen}
        onToggle={setIsDropdownOpen}
        closeOnClickOutside={true}
        closeOnItemSelect={false}
        direction="down"
        className="color-dropdown-trigger"
      >
        <ColorPicker />
      </Dropdown>

      {getRightIcon()}
    </div>
  );
};
