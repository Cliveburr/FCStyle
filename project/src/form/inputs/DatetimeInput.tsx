import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface DatetimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  leftIcon?: IconSet;
  loading?: boolean;
  showSeconds?: boolean;
  showCalendarIcon?: boolean;
  li?: string;
}

export const DatetimeInput: React.FC<DatetimeInputProps> = ({
  validatorControl,
  className,
  onChange,
  onValidationChange,
  leftIcon,
  loading = false,
  showSeconds = false,
  showCalendarIcon = true,
  li,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '');
  const [inputId] = useState<string>(`datetimeinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;
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
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const getLeftIcon = () => {
    const resolvedLeftIcon: IconSet | undefined = leftIcon || (li ? { name: li } : (showCalendarIcon ? { name: 'calendar-clock' } : undefined));

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

  const { domProps, classNames } = classBuilder('input gap1 datetime-input-wrapper input-container-with-icons')
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
        type="datetime-local"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={getPlaceholder()}
        step={getStepValue()}
  className="datetime-input"
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
  );
};
