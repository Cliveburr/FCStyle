import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (value: string) => void;
  li?: string;
  leftIcon?: IconSet;
  loading?: boolean;
  format?: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
  showCalendarIcon?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({
  className,
  
  validatorControl,
  onChange,
  li,
  leftIcon,
  loading = false,
  format = 'YYYY-MM-DD',
  showCalendarIcon = true,

  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '');
  const [inputId] = useState<string>(`dateinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;

  // Atualiza o valor inicial se props.value mudar
  useEffect(() => {
    if (props.value !== undefined) {
      setInputValue(props.value.toString());
    }
  }, [props.value]);

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
    }
  };

  const getLeftIcon = () => {
    const resolvedLeftIcon: IconSet | undefined = leftIcon || (li ? { name: li } : (showCalendarIcon ? { name: 'calendar' } : undefined));

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

  const { domProps, classNames } = classBuilder('input gap1 date-input-wrapper input-container-with-icons')
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
        type="date"
        value={inputValue}
        onChange={handleInputChange}
  className="date-input"
        placeholder={getPlaceholder()}
      />
      {getRightIcon()}
    </div>
  );
};
