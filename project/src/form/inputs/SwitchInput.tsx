import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';

/**
 * Propriedades do componente SwitchInput
 * 
 * Switch toggle estilizado para alternar entre estados
 * 
 * Exemplo de uso:
 * ```tsx
 * import { SwitchInput } from 'fcstyle';
 * 
 * <SwitchInput
 *   checked={isEnabled}
 *   onChange={(checked) => setIsEnabled(checked)}
 *   label="Ativar notificações"
 *   leftIcon="bell"
 *   size="medium"
 * />
 * ```
 */
export interface SwitchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (checked: boolean) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  label?: string;
  leftIcon?: string;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  labelPosition?: 'left' | 'right';
}

export const SwitchInput: React.FC<SwitchInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  label,
  leftIcon,
  loading = false,
  size = 'medium',
  color = 'primary',
  labelPosition = 'right',
  checked = false,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
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
      setValidationStatus(currentResult.status);
      setValidationMessage(currentResult.messages[0] || '');
      
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
      setValidationStatus(result.status);
      setValidationMessage(result.messages[0] || '');
      
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
    const baseClasses = ['switch-input', `switch-${size}`, `switch-${color}`];
    
    if (isChecked) {
      baseClasses.push('checked');
    }
    
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
        {leftIcon && <Icon name={leftIcon} className="switch-label-icon" />}
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
        {...props}
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
            {loading && size !== 'small' && (
              <Icon name="spinner" spin className="switch-thumb-icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="input-wrapper switch-input-wrapper">
      <Place row alignCenter gap2 className={getContainerClassNames()}>
        {labelPosition === 'left' && renderLabel()}
        
        {renderSwitch()}
        
        {labelPosition === 'right' && renderLabel()}
        
        <div className="flex-grow" />
        
        {getValidationIcon()}
      </Place>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
