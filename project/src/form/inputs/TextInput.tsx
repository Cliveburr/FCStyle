import React, { useState, useEffect } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts } from '../../helpers';

/**
 * Propriedades do componente TextInput
 * 
 * Input de texto geral com suporte a mask e textarea
 * Não exibe mensagens de erro - isso é responsabilidade do TextField
 * 
 * Exemplo de uso:
 * ```tsx
 * import { TextInput } from 'fcstyle';
 * 
 * // Input simples
 * <TextInput
 *   placeholder="Digite seu texto"
 *   leftIcon="user"
 *   onChange={(value) => console.log(value)}
 * />
 * 
 * // Como textarea
 * <TextInput
 *   placeholder="Digite seu comentário"
 *   asTextarea
 *   rows={4}
 *   onChange={(value) => console.log(value)}
 * />
 * 
 * // Com máscara
 * <TextInput
 *   placeholder="(00) 00000-0000"
 *   mask="(99) 99999-9999"
 *   leftIcon="phone"
 *   onChange={(value) => console.log(value)}
 * />
 * 
 * // Com validação (apenas para ícones)
 * <TextInput
 *   placeholder="Email"
 *   leftIcon="envelope"
 *   validatorControl={emailValidator}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'>,
ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  className?: string;
  
  validatorControl?: ValidatorControl;
  onChange?: (value: string) => void;
  leftIcon?: string;
  loading?: boolean;
  asTextarea?: boolean;
  areaRows?: number;
  mask?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  className,
  
  validatorControl,
  onChange,
  leftIcon,
  loading = false,
  asTextarea = false,
  areaRows = 3,
  mask,

  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '');
  const [inputId] = useState<string>(`textinput-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const validationStatus = validatorControl?.getStatus() ?? ValidationStatus.Pristine;

  // Atualiza o valor inicial se props.value mudar
  useEffect(() => {
    if (props.value !== undefined) {
      setInputValue(props.value.toString());
    }
  }, [props.value]);

  const applyMask = (value: string, maskPattern: string) => {
    if (!maskPattern) return value;
    
    let maskedValue = '';
    let valueIndex = 0;
    
    for (let i = 0; i < maskPattern.length && valueIndex < value.length; i++) {
      const maskChar = maskPattern[i];
      const valueChar = value[valueIndex];
      
      if (maskChar === '9') {
        // Aceita apenas números
        if (/\d/.test(valueChar)) {
          maskedValue += valueChar;
          valueIndex++;
        } else {
          break;
        }
      } else if (maskChar === 'A') {
        // Aceita apenas letras
        if (/[A-Za-z]/.test(valueChar)) {
          maskedValue += valueChar.toUpperCase();
          valueIndex++;
        } else {
          break;
        }
      } else if (maskChar === 'a') {
        // Aceita apenas letras minúsculas
        if (/[A-Za-z]/.test(valueChar)) {
          maskedValue += valueChar.toLowerCase();
          valueIndex++;
        } else {
          break;
        }
      } else if (maskChar === '*') {
        // Aceita qualquer caractere
        maskedValue += valueChar;
        valueIndex++;
      } else {
        // Caractere fixo da máscara
        if (valueChar === maskChar) {
          maskedValue += valueChar;
          valueIndex++;
        } else {
          maskedValue += maskChar;
        }
      }
    }
    
    return maskedValue;
  };

  const removeMask = (value: string, maskPattern: string) => {
    if (!maskPattern) return value;
    
    let cleanValue = '';
    
    for (const char of value) {
      if (/[0-9A-Za-z]/.test(char)) {
        cleanValue += char;
      }
    }
    
    return cleanValue;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = event.target.value;
    
    // Aplica máscara se fornecida
    if (mask && !asTextarea) {
      const cleanValue = removeMask(newValue, mask);
      newValue = applyMask(cleanValue, mask);
    }
    
    setInputValue(newValue);
    updateValidation(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const updateValidation = (value: string) => {
    if (validatorControl) {
      validatorControl.setValue(value);
      const result = validatorControl.validate();
    }
  };

  const getLeftIcon = () => {
    return leftIcon && (
      <label htmlFor={inputId} >
        <Icon name={leftIcon} />
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

  const { domProps, classNames } = classBuilder('input gap1')
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

  if (asTextarea) {
    return (
      <div className="input-wrapper text-input-wrapper">
        <div className="input-container-with-icons textarea-container">
          {getLeftIcon()}
          <textarea
            id={inputId}
            value={inputValue}
            onChange={handleInputChange}
            className={classNames}
            rows={areaRows}
            placeholder={props.placeholder}
            disabled={props.disabled}
            required={props.required}
          />
          {getRightIcon()}
        </div>
      </div>
    );
  }

  return (
    <div className={classNames}>
      {getLeftIcon()}
      <input
        {...domProps}
        id={inputId}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      {getRightIcon()}
    </div>
  );
};
