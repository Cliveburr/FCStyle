import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface RadioOption {
  value: string;
  label: string;
  icon?: IconSet;
  disabled?: boolean;
}

export interface RadioInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  options: RadioOption[];
  value?: string;
  li?: string;
  leftIcon?: IconSet;
  loading?: boolean;
  direction?: 'vertical' | 'horizontal';
}

export const RadioInput: React.FC<RadioInputProps> = ({
  className,
  
  validatorControl,
  onChange,
  onValidationChange,
  options,
  value = '',
  li,
  leftIcon,
  loading = false,
  direction = 'vertical',

  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const [inputId] = useState<string>(`radioinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;

  // Atualiza o valor inicial se props.value mudar
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Monitora mudanças no ValidatorControl
  useEffect(() => {
    if (validatorControl) {
      const currentResult = validatorControl.validate();
      
      if (onValidationChange) {
        onValidationChange(currentResult.status, currentResult.messages[0] || '');
      }
    }
  }, [validatorControl, selectedValue, onValidationChange]);

  const handleRadioChange = (optionValue: string) => {
    setSelectedValue(optionValue);
    updateValidation(optionValue);
    
    if (onChange) {
      onChange(optionValue);
    }
  };

  const updateValidation = (val: string) => {
    if (validatorControl) {
      validatorControl.setValue(val);
      const result = validatorControl.validate();
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
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
    if (loading) {
      return (<label htmlFor={inputId} >
        <Icon name="spinner" spin className="loading" />
      </label>)
    }
    
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

  const getContainerClassNames = () => {
    const baseClasses = ['radio-input-container'];
    
    if (validationStatus === ValidationStatus.Valid) {
      baseClasses.push('valid');
    } else if (validationStatus === ValidationStatus.Invalid) {
      baseClasses.push('invalid');
    }
    
    if (props.disabled) {
      baseClasses.push('disabled');
    }
    
    if (className) {
      baseClasses.push(className);
    }
    
    return baseClasses.join(' ');
  };

  const getOptionClassNames = (option: RadioOption) => {
    const baseClasses = ['radio-option'];
    
    if (selectedValue === option.value) {
      baseClasses.push('selected');
    }
    
    if (option.disabled || props.disabled) {
      baseClasses.push('disabled');
    }
    
    return baseClasses.join(' ');
  };

  const { domProps, classNames } = classBuilder('input gap1 radio-input-wrapper')
    .add(className)
    .if('valid', validationStatus === ValidationStatus.Valid)
    .if('invalid', validationStatus === ValidationStatus.Invalid)
    .if('radio-horizontal', direction === 'horizontal')
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
      <div className="radio-options">
        {options.map((option, index) => (
          <Place key={index} row alignCenter gap2 className="radio-option">
            <div className="radio-wrapper">
              <input
                type="radio"
                name={inputId}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleRadioChange(option.value)}
                disabled={option.disabled || props.disabled}
                className="radio-input"
              />
              <div className="radio-custom">
                {selectedValue === option.value && <div className="radio-dot" />}
              </div>
            </div>
            
            {option.icon && (
              <Icon icon={option.icon} className="radio-icon" />
            )}
            
            <label 
              className="radio-label"
              onClick={() => !option.disabled && !props.disabled && handleRadioChange(option.value)}
            >
              {option.label}
            </label>
          </Place>
        ))}
      </div>
      {getRightIcon()}
    </div>
  );
};
