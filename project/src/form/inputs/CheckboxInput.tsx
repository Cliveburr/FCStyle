import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface CheckboxInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (checked: boolean) => void;
  label?: string;
  li?: string;
  leftIcon?: IconSet;
  loading?: boolean;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  className,
  
  validatorControl,
  onChange,
  label,
  li,
  leftIcon,
  loading = false,
  checked = false,

  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [inputId] = useState<string>(`checkboxinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;

  // Atualiza o valor inicial se props.checked mudar
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    updateValidation(newChecked);
    
    if (onChange) {
      onChange(newChecked);
    }
  };

  const updateValidation = (value: boolean) => {
    if (validatorControl) {
      validatorControl.setValue(value.toString());
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

  const { domProps, classNames } = classBuilder('checkbox gap1')
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
      <div className="checkbox-wrapper">
        <input
          {...domProps}
          id={inputId}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="checkbox-input"
        />
        <div className="checkbox-custom">
          {isChecked && <Icon name="check" className="checkbox-check-icon" />}
        </div>
      </div>
      
      {label && (
        <label 
          htmlFor={inputId}
          className="checkbox-label"
        >
          {label}
        </label>
      )}
      
      {getRightIcon()}
    </div>
  );
};
