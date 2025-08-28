import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';

/**
 * Propriedades do componente TimeInput
 * 
 * Input para seleção de horários com validação
 * 
 * Exemplo de uso:
 * ```tsx
 * import { TimeInput } from 'fcstyle';
 * 
 * <TimeInput
 *   value="14:30"
 *   onChange={(time) => console.log(time)}
 *   step={60} // 1 minuto
 *   leftIcon="clock"
 * />
 * ```
 */
export interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  leftIcon?: string;
  loading?: boolean;
  format?: '12h' | '24h';
  showSeconds?: boolean;
  showClockIcon?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  leftIcon = 'clock',
  loading = false,
  format = '24h',
  showSeconds = false,
  showClockIcon = true,
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

  const formatTimeForDisplay = (value: string) => {
    if (!value || format === '24h') return value;
    
    // Converte de 24h para 12h
    const timeMatch = value.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (timeMatch) {
      let [, hours, minutes, seconds] = timeMatch;
      const hoursNum = parseInt(hours, 10);
      const period = hoursNum >= 12 ? 'PM' : 'AM';
      const displayHours = hoursNum === 0 ? 12 : hoursNum > 12 ? hoursNum - 12 : hoursNum;
      
      const formattedTime = showSeconds && seconds 
        ? `${displayHours.toString().padStart(2, '0')}:${minutes}:${seconds} ${period}`
        : `${displayHours.toString().padStart(2, '0')}:${minutes} ${period}`;
      
      return formattedTime;
    }
    
    return value;
  };

  const formatTimeForValue = (displayValue: string) => {
    if (!displayValue || format === '24h') return displayValue;
    
    // Converte de 12h para 24h
    const timeMatch = displayValue.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
    if (timeMatch) {
      let [, hours, minutes, seconds, period] = timeMatch;
      let hoursNum = parseInt(hours, 10);
      
      if (period.toUpperCase() === 'PM' && hoursNum !== 12) {
        hoursNum += 12;
      } else if (period.toUpperCase() === 'AM' && hoursNum === 12) {
        hoursNum = 0;
      }
      
      const formattedTime = showSeconds && seconds 
        ? `${hoursNum.toString().padStart(2, '0')}:${minutes}:${seconds}`
        : `${hoursNum.toString().padStart(2, '0')}:${minutes}`;
      
      return formattedTime;
    }
    
    return displayValue;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    const formattedValue = formatTimeForValue(newValue);
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
    const baseClasses = ['time-input'];
    
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
    
    if (format === '12h') {
      return showSeconds ? 'HH:MM:SS AM/PM' : 'HH:MM AM/PM';
    }
    
    return showSeconds ? 'HH:MM:SS' : 'HH:MM';
  };

  const getInputType = () => {
    return showSeconds ? 'time' : 'time';
  };

  const getStepValue = () => {
    if (props.step) return props.step;
    return showSeconds ? 1 : 60;
  };

  return (
    <div className="input-wrapper time-input-wrapper">
      <div className="input-container-with-icons">
        {(leftIcon || showClockIcon) && (
          <Icon name={leftIcon || 'clock'} className="input-left-icon" />
        )}
        
        <input
          {...props}
          type={getInputType()}
          value={inputValue}
          onChange={handleInputChange}
          className={getInputClassNames()}
          placeholder={getPlaceholder()}
          step={getStepValue()}
        />
        
        {getRightIcon()}
      </div>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
