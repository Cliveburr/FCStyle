import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Place } from '../../grid/Place';

/**
 * Propriedades do componente ColorInput
 * 
 * Input para seleção de cores com ColorPicker integrado no dropdown
 * 
 * Exemplo de uso:
 * ```tsx
 * import { ColorInput } from 'fcstyle';
 * 
 * <ColorInput
 *   placeholder="Selecione uma cor"
 *   value="#ff0000"
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 */
export interface ColorInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  leftIcon?: string;
}

const PRESET_COLORS = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000000',
  '#FFFFFF', '#DC143C', '#32CD32', '#4169E1', '#FFD700', '#FF1493',
  '#00CED1', '#FF4500', '#9370DB', '#90EE90', '#CD853F', '#2F4F4F'
];

export const ColorInput: React.FC<ColorInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  leftIcon,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '');
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setInputValue(newValue);
    updateValidation(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleColorSelect = (color: string) => {
    setInputValue(color);
    updateValidation(color);
    setIsDropdownOpen(false);
    
    if (onChange) {
      onChange(color);
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

  const getValidationIcon = () => {
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="input-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="input-validation-icon danger" />;
    }
    return null;
  };

  const getInputClassNames = () => {
    const baseClasses = ['color-input'];
    
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

  const isValidColor = (color: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const ColorPicker = () => (
    <Place className="color-picker" p2>
      <div className="color-grid">
        {PRESET_COLORS.map((color, index) => (
          <div
            key={index}
            className={`color-swatch ${inputValue === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            title={color}
          />
        ))}
      </div>
      <Place className="custom-color-section" mt2 pt2>
        <input
          type="color"
          value={isValidColor(inputValue) ? inputValue : '#000000'}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="native-color-picker"
        />
      </Place>
    </Place>
  );

  return (
    <div className="input-wrapper color-input-wrapper">
      <div className="input-container-with-icons">
        {leftIcon && (
          <Icon name={leftIcon} className="input-left-icon" />
        )}
        
        <input
          {...props}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={getInputClassNames()}
        />
        
        <Dropdown
          label=""
          isOpen={isDropdownOpen}
          onToggle={setIsDropdownOpen}
          closeOnClickOutside={true}
          closeOnItemSelect={false}
          direction="down"
          className="color-dropdown-trigger"
        >
          <ColorPicker />
        </Dropdown>
        
        <div 
          className="color-preview"
          style={{ backgroundColor: isValidColor(inputValue) ? inputValue : 'transparent' }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Icon name="droplet" className="color-preview-icon" />
        </div>
        
        {getValidationIcon()}
      </div>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
