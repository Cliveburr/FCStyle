import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface SwitchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (checked: boolean) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  label?: string;
  leftIcon?: IconSet;
  loading?: boolean;
  li?: string;
  switchSize?: 'small' | 'medium' | 'large';
  switchColor?: 'primary' | 'success' | 'warning' | 'danger';
}

export const SwitchInput: React.FC<SwitchInputProps> = ({
  validatorControl,
  className,
  onChange,
  onValidationChange,
  label,
  leftIcon,
  loading = false,
  li,
  checked = false,
  switchSize = 'medium',
  switchColor = 'primary',
  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [inputId] = useState<string>(`switchinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;
  const [validationMessage, setValidationMessage] = useState<string>('');

  // Atualiza o valor inicial se props.checked mudar
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  // Monitora mudanças no ValidatorControl
  useEffect(() => {
    if (validatorControl) {
      const currentResult = validatorControl.validate();
      
      if (onValidationChange) {
        onValidationChange(currentResult.status, currentResult.messages[0] || '');
      }
    }
  }, [validatorControl, isChecked, onValidationChange]);

  const handleSwitchChange = () => {
    if (props.disabled) return;
    
    const newChecked = !isChecked;
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
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const getValidationIcon = () => {
    if (loading) {
      return <Icon name="spinner" spin className="switch-validation-icon loading" />;
    }
    
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="switch-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="switch-validation-icon danger" />;
    }
    
    return null;
  };

  const getSwitchClassNames = () => {
    const baseClasses = ['switch-input'];
    
    if (isChecked) {
      baseClasses.push('checked');
    }
  baseClasses.push(`switch-${switchSize}`);
  if (isChecked) baseClasses.push(`switch-${switchColor}`);
    
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

  const getContainerClassNames = () => {
    const baseClasses = ['switch-container'];
    
    if (props.disabled) {
      baseClasses.push('disabled');
    }
    
    return baseClasses.join(' ');
  };

  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <Place row alignCenter gap1>
        {leftIcon && <Icon icon={leftIcon} className="switch-label-icon" />}
        <label 
          className="switch-label"
          onClick={handleSwitchChange}
        >
          {label}
        </label>
      </Place>
    );
  };

  const renderSwitch = () => (
    <div className="switch-wrapper">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {}} // Controlled via onClick
        className="switch-input-hidden"
        style={{ display: 'none' }}
      />
      
      <div 
        className={getSwitchClassNames()}
        onClick={handleSwitchChange}
        role="switch"
        aria-checked={isChecked}
        tabIndex={props.disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleSwitchChange();
          }
        }}
      >
        <div className="switch-track">
          <div className="switch-thumb">
            {loading && (
              <Icon name="spinner" spin className="switch-thumb-icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const { domProps, classNames } = classBuilder('input gap1 switch-input-wrapper')
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
      {renderLabel()}
      {renderSwitch()}
    </div>
  );
};
