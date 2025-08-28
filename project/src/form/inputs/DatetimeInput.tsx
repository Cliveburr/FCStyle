import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';

/**
 * Propriedades do componente DatetimeInput
 * 
 * Input para seleção de data e hora combinadas
 * 
 * Exemplo de uso:
 * ```tsx
 * import { DatetimeInput } from 'fcstyle';
 * 
 * <DatetimeInput
 *   value="2023-12-25T14:30"
 *   onChange={(datetime) => console.log(datetime)}
 *   min="2023-01-01T00:00"
 *   max="2023-12-31T23:59"
 *   leftIcon="calendar-clock"
 * />
 * ```
 */
export interface DatetimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  leftIcon?: string;
  loading?: boolean;
  showSeconds?: boolean;
  showCalendarIcon?: boolean;
}

export const DatetimeInput: React.FC<DatetimeInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  leftIcon = 'calendar-clock',
  loading = false,
  showSeconds = false,
  showCalendarIcon = true,
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

  const formatDatetimeValue = (value: string) => {
    if (!value) return value;
    
    // Se não tem segundos e o valor incluí segundos, remove
    if (!showSeconds && value.includes(':') && value.split(':').length === 3) {
      const parts = value.split('T');
      if (parts.length === 2) {
        const timeParts = parts[1].split(':');
        return `${parts[0]}T${timeParts[0]}:${timeParts[1]}`;
      }
    }
    
    return value;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const formattedValue = formatDatetimeValue(newValue);
    
    setInputValue(formattedValue);
    updateValidation(formattedValue);
    
    if (onChange) {
      onChange(formattedValue);
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
    const baseClasses = ['datetime-input'];
    
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

  const getPlaceholder = () => {
    if (props.placeholder) return props.placeholder;
    
    return showSeconds ? 'YYYY-MM-DD HH:MM:SS' : 'YYYY-MM-DD HH:MM';
  };

  const getStepValue = () => {
    if (props.step) return props.step;
    return showSeconds ? 1 : 60;
  };

  // Função para obter data/hora atual formatada
  const getCurrentDatetime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    if (showSeconds) {
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleNowClick = () => {
    if (props.disabled) return;
    
    const currentDatetime = getCurrentDatetime();
    setInputValue(currentDatetime);
    updateValidation(currentDatetime);
    
    if (onChange) {
      onChange(currentDatetime);
    }
  };

  return (
    <div className="input-wrapper datetime-input-wrapper">
      <div className="input-container-with-icons">
        {(leftIcon || showCalendarIcon) && (
          <Icon name={leftIcon || 'calendar-clock'} className="input-left-icon" />
        )}
        
        <input
          {...props}
          type="datetime-local"
          value={inputValue}
          onChange={handleInputChange}
          className={getInputClassNames()}
          placeholder={getPlaceholder()}
          step={getStepValue()}
        />
        
        {/* Botão para definir data/hora atual */}
        <button
          type="button"
          className="datetime-now-button"
          onClick={handleNowClick}
          disabled={props.disabled}
          title="Agora"
        >
          <Icon name="clock" className="datetime-now-icon" />
        </button>
        
        {getRightIcon()}
      </div>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
