import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';

/**
 * Propriedades do componente SliderInput
 * 
 * Slider para seleção de valores numéricos com range
 * 
 * Exemplo de uso:
 * ```tsx
 * import { SliderInput } from 'fcstyle';
 * 
 * <SliderInput
 *   min={0}
 *   max={100}
 *   step={1}
 *   value={50}
 *   onChange={(value) => console.log(value)}
 *   showValue
 *   unit="%"
 * />
 * ```
 */
export interface SliderInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  validatorControl?: ValidatorControl;
  className?: string;
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
  marks?: { value: number; label: string }[];
}

export const SliderInput: React.FC<SliderInputProps> = ({
  validatorControl,
  className = '',
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
  marks = [],
  ...props
}) => {
  const [sliderValue, setSliderValue] = useState<number>(value);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
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
      setValidationStatus(currentResult.status);
      setValidationMessage(currentResult.messages[0] || '');
      
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
      setValidationStatus(result.status);
      setValidationMessage(result.messages[0] || '');
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const getValidationIcon = () => {
    if (loading) {
      return <Icon name="spinner" spin className="slider-validation-icon loading" />;
    }
    
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="slider-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="slider-validation-icon danger" />;
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

  return (
    <div className="input-wrapper slider-input-wrapper">
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
            {...props}
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            onChange={handleSliderChange}
            className={getSliderClassNames()}
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
        {getValidationIcon()}
      </div>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
