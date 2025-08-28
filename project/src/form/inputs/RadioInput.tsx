import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';

/**
 * Propriedades do componente RadioInput
 * 
 * Radio button com opções múltiplas
 * 
 * Exemplo de uso:
 * ```tsx
 * import { RadioInput } from 'fcstyle';
 * 
 * const options = [
 *   { value: 'option1', label: 'Opção 1', icon: 'star' },
 *   { value: 'option2', label: 'Opção 2', icon: 'heart' },
 *   { value: 'option3', label: 'Opção 3', disabled: true }
 * ];
 * 
 * <RadioInput
 *   name="choice"
 *   options={options}
 *   value={selectedValue}
 *   onChange={(value) => setSelectedValue(value)}
 * />
 * ```
 */
export interface RadioOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface RadioInputProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  validatorControl?: ValidatorControl;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
}

export const RadioInput: React.FC<RadioInputProps> = ({
  name,
  options,
  value = '',
  onChange,
  onValidationChange,
  validatorControl,
  className = '',
  loading = false,
  disabled = false,
  direction = 'vertical'
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
  const [validationMessage, setValidationMessage] = useState<string>('');

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
      setValidationStatus(currentResult.status);
      setValidationMessage(currentResult.messages[0] || '');
      
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
      setValidationStatus(result.status);
      setValidationMessage(result.messages[0] || '');
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const getValidationIcon = () => {
    if (loading) {
      return <Icon name="spinner" spin className="radio-validation-icon loading" />;
    }
    
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="radio-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="radio-validation-icon danger" />;
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
    
    if (disabled) {
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
    
    if (option.disabled || disabled) {
      baseClasses.push('disabled');
    }
    
    return baseClasses.join(' ');
  };

  return (
    <div className="input-wrapper radio-input-wrapper">
      <Place className={getContainerClassNames()}>
        <Place 
          className="radio-options"
          column={direction === 'vertical'}
          gap2
        >
          {options.map((option, index) => (
            <Place key={index} row alignCenter gap2 className={getOptionClassNames(option)}>
              <div className="radio-wrapper">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => handleRadioChange(option.value)}
                  disabled={option.disabled || disabled}
                  className="radio-input"
                />
                <div className="radio-custom">
                  {selectedValue === option.value && <div className="radio-dot" />}
                </div>
              </div>
              
              {option.icon && (
                <Icon name={option.icon} className="radio-icon" />
              )}
              
              <label 
                className="radio-label"
                onClick={() => !option.disabled && !disabled && handleRadioChange(option.value)}
              >
                {option.label}
              </label>
            </Place>
          ))}
        </Place>
        
        {getValidationIcon()}
      </Place>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
