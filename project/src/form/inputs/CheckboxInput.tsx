import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';

/**
 * Propriedades do componente CheckboxInput
 * 
 * Checkbox com ícone e texto com suporte a validação
 * 
 * Exemplo de uso:
 * ```tsx
 * import { CheckboxInput } from 'fcstyle';
 * 
 * <CheckboxInput
 *   label="Aceito os termos de uso"
 *   icon="shield-check"
 *   checked={isChecked}
 *   onChange={(checked) => setIsChecked(checked)}
 * />
 * ```
 */
export interface CheckboxInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (checked: boolean) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  label?: string;
  icon?: string;
  loading?: boolean;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  label,
  icon,
  loading = false,
  checked = false,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
  const [validationMessage, setValidationMessage] = useState<string>('');

  // Atualiza o valor inicial se props.checked mudar
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

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
  }, [validatorControl, isChecked, onValidationChange]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    updateValidation(newChecked);
    
    if (onChange) {
      onChange(newChecked);
    }
  };

  const updateValidation = (value: boolean) => {
    if (validatorControl) {
      validatorControl.setValue(value.toString());
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
      return <Icon name="spinner" spin className="checkbox-validation-icon loading" />;
    }
    
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="checkbox-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="checkbox-validation-icon danger" />;
    }
    
    return null;
  };

  const getCheckboxClassNames = () => {
    const baseClasses = ['checkbox-input'];
    
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

  const getContainerClassNames = () => {
    const baseClasses = ['checkbox-container'];
    
    if (props.disabled) {
      baseClasses.push('disabled');
    }
    
    return baseClasses.join(' ');
  };

  return (
    <div className="input-wrapper checkbox-input-wrapper">
      <Place row alignCenter gap2 className={getContainerClassNames()}>
        <div className="checkbox-wrapper">
          <input
            {...props}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={getCheckboxClassNames()}
          />
          <div className="checkbox-custom">
            {isChecked && <Icon name="check" className="checkbox-check-icon" />}
          </div>
        </div>
        
        {icon && (
          <Icon name={icon} className="checkbox-icon" />
        )}
        
        {label && (
          <label className="checkbox-label" onClick={() => !props.disabled && handleCheckboxChange({ target: { checked: !isChecked } } as any)}>
            {label}
          </label>
        )}
        
        <div className="flex-grow" />
        
        {getValidationIcon()}
      </Place>
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
