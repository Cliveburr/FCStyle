import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts, IconSet } from '../../helpers';

export interface SliderInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (value: number) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  showValue?: boolean;
  unit?: string;
  formatValue?: (value: number) => string;
  loading?: boolean;
  li?: string;
  leftIcon?: IconSet;
  marks?: { value: number; label: string }[];
}

export const SliderInput: React.FC<SliderInputProps> = ({
  validatorControl,
  className,
  onChange,
  onValidationChange,
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  showValue = false,
  unit = '',
  formatValue,
  loading = false,
  li,
  leftIcon,
  marks = [],
  ...props
}) => {
  const [sliderValue, setSliderValue] = useState<number>(value);
  const [inputId] = useState<string>(`sliderinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;
  const [validationMessage, setValidationMessage] = useState<string>('');

  // Atualiza o valor inicial se props.value mudar
  useEffect(() => {
    if (value !== undefined) {
      setSliderValue(value);
    }
  }, [value]);

  // Monitora mudanças no ValidatorControl
  useEffect(() => {
    if (validatorControl) {
      const currentResult = validatorControl.validate();
      
      if (onValidationChange) {
        onValidationChange(currentResult.status, currentResult.messages[0] || '');
      }
    }
  }, [validatorControl, sliderValue, onValidationChange]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setSliderValue(newValue);
    updateValidation(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const updateValidation = (val: number) => {
    if (validatorControl) {
      validatorControl.setValue(val.toString());
      const result = validatorControl.validate();
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const getLeftIcon = () => {
    const resolvedLeftIcon: IconSet | undefined = leftIcon || (li ? { name: li } : undefined);

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

  const getSliderClassNames = () => {
    const baseClasses = ['slider-input'];
    
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

  const getFormattedValue = () => {
    if (formatValue) {
      return formatValue(sliderValue);
    }
    return `${sliderValue}${unit}`;
  };

  const getPercentage = () => {
    return ((sliderValue - min) / (max - min)) * 100;
  };

  const { domProps, classNames } = classBuilder('input gap1 slider-input-wrapper')
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
      <div className="slider-container">
        {/* Label com valor atual */}
        {showValue && (
          <Place row justifyBetween alignCenter className="slider-header">
            <span className="slider-min-label">{min}{unit}</span>
            <span className="slider-value-display">{getFormattedValue()}</span>
            <span className="slider-max-label">{max}{unit}</span>
          </Place>
        )}
        
        {/* Container do slider */}
        <div className="slider-track-container">
          <input
            {...domProps}
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider-input"
          />
          
          {/* Track preenchida */}
          <div 
            className="slider-fill-track"
            style={{ width: `${getPercentage()}%` }}
          />
          
          {/* Marcações */}
          {marks.length > 0 && (
            <div className="slider-marks">
              {marks.map((mark, index) => (
                <div
                  key={index}
                  className="slider-mark"
                  style={{ left: `${((mark.value - min) / (max - min)) * 100}%` }}
                >
                  <div className="slider-mark-dot" />
                  <span className="slider-mark-label">{mark.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Ícone de validação */}
        {getRightIcon()}
      </div>
      
      {validationStatus === ValidationStatus.Invalid && (
        <span className="input-error-message">Invalid value</span>
      )}
    </div>
  );
};
