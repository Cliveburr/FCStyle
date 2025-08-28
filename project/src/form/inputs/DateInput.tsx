import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';

/**
 * Propriedades do componente DateInput
 * 
 * Input para seleção de datas com validação
 * 
 * Exemplo de uso:
 * ```tsx
 * import { DateInput } from 'fcstyle';
 * 
 * <DateInput
 *   value="2023-12-25"
 *   onChange={(date) => console.log(date)}
 *   min="2023-01-01"
 *   max="2023-12-31"
 *   leftIcon="calendar"
 * />
 * ```
 */
export interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  leftIcon?: string;
  loading?: boolean;
  format?: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
  showCalendarIcon?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  leftIcon = 'calendar',
  loading = false,
  format = 'YYYY-MM-DD',
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

  const formatDateForDisplay = (value: string) => {
    if (!value) return value;
    
    // Se o valor já está no formato correto, retorna
    if (format === 'YYYY-MM-DD') {
      return value;
    }
    
    // Converte de YYYY-MM-DD para outros formatos
    const dateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      
      switch (format) {
        case 'DD/MM/YYYY':
          return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
          return `${month}/${day}/${year}`;
        default:
          return value;
      }
    }
    
    return value;
  };

  const formatDateForValue = (displayValue: string) => {
    if (!displayValue) return displayValue;
    
    // Se já está no formato ISO, retorna
    if (/^\d{4}-\d{2}-\d{2}$/.test(displayValue)) {
      return displayValue;
    }
    
    // Converte outros formatos para YYYY-MM-DD
    let dateMatch;
    
    if (format === 'DD/MM/YYYY') {
      dateMatch = displayValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (dateMatch) {
        const [, day, month, year] = dateMatch;
        return `${year}-${month}-${day}`;
      }
    } else if (format === 'MM/DD/YYYY') {
      dateMatch = displayValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (dateMatch) {
        const [, month, day, year] = dateMatch;
        return `${year}-${month}-${day}`;
      }
    }
    
    return displayValue;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    const formattedValue = formatDateForValue(newValue);
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
    const baseClasses = ['date-input'];
    
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
    
    switch (format) {
      case 'DD/MM/YYYY':
        return 'DD/MM/AAAA';
      case 'MM/DD/YYYY':
        return 'MM/DD/YYYY';
      default:
        return 'YYYY-MM-DD';
    }
  };

  return (
    <div className="input-wrapper date-input-wrapper">
      <div className="input-container-with-icons">
        {(leftIcon || showCalendarIcon) && (
          <Icon name={leftIcon || 'calendar'} className="input-left-icon" />
        )}
        
        <input
          {...props}
          type="date"
          value={inputValue}
          onChange={handleInputChange}
          className={getInputClassNames()}
          placeholder={getPlaceholder()}
        />
        
        {getRightIcon()}
      </div>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
