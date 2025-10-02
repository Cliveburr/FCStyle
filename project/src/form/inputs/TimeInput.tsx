import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  leftIcon?: IconSet;
  loading?: boolean;
  format?: '12h' | '24h';
  showSeconds?: boolean;
  showClockIcon?: boolean;
  li?: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  validatorControl,
  className,
  onChange,
  onValidationChange,
  leftIcon,
  loading = false,
  format = '24h',
  showSeconds = false,
  showClockIcon = true,
  li,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '');
  const [inputId] = useState<string>(`timeinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
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
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const getLeftIcon = () => {
    const resolvedLeftIcon: IconSet | undefined = leftIcon || (li ? { name: li } : (showClockIcon ? { name: 'clock' } : undefined));

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

  const { domProps, classNames } = classBuilder('input gap1 time-input-wrapper input-container-with-icons')
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
        type={getInputType()}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={getPlaceholder()}
        step={getStepValue()}
  className="time-input"
      />
      {getRightIcon()}
    </div>
  );
};
