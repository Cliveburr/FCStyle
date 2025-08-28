import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';

/**
 * Propriedades do componente NumberInput
 * 
 * Input específico para números com validação automática
 * 
 * Exemplo de uso:
 * ```tsx
 * import { NumberInput } from 'fcstyle';
 * 
 * <NumberInput
 *   placeholder="Digite um número"
 *   min={0}
 *   max={100}
 *   leftIcon="calculator"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  leftIcon?: string;
  loading?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  leftIcon,
  loading = false,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '');
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
  const [validationMessage, setValidationMessage] = useState<string>('');

  // Atualiza o valor inicial se props.value mudar
  useEffect(() => {
    if (props.value !== undefined) {
      setInputValue(props.value.toString());
    }
  }, [props.value]);

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
  }, [validatorControl, inputValue, onValidationChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    // Permite apenas números, ponto decimal e sinal negativo
    const numericRegex = /^-?\d*\.?\d*$/;
    if (newValue === '' || numericRegex.test(newValue)) {
      setInputValue(newValue);
      updateValidation(newValue);
      
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const updateValidation = (value: string) => {
    if (validatorControl) {
      validatorControl.setValue(value);
      const result = validatorControl.validate();
      setValidationStatus(result.status);
      setValidationMessage(result.messages[0] || '');
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const getRightIcon = () => {
    if (loading) {
      return <Icon name="spinner" spin className="input-validation-icon loading" />;
    }
    
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="input-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="input-validation-icon danger" />;
    }
    
    return null;
  };

  const getInputClassNames = () => {
    const baseClasses = ['number-input'];
    
    if (validationStatus === ValidationStatus.Valid) {
      baseClasses.push('valid');
    } else if (validationStatus === ValidationStatus.Invalid) {
      baseClasses.push('invalid');
    }
    
    if (className) {
      baseClasses.push(className);
    }
    
    return baseClasses.join(' ');
  };

  return (
    <div className="input-wrapper number-input-wrapper">
      <div className="input-container-with-icons">
        {leftIcon && (
          <Icon name={leftIcon} className="input-left-icon" />
        )}
        
        <input
          {...props}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleInputChange}
          className={getInputClassNames()}
        />
        
        {getRightIcon()}
      </div>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
