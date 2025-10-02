import React, { useState, useEffect, useRef } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';
import { classBuilder, ColorBuilder, MarginBuilder, PaddingBuilder, BorderBuilder, FlexChildrenBuilder, SizeBuilder, ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts } from '../../helpers';

/**
 * Propriedades do componente TagsInput
 * 
 * Input para gerenciamento de tags/chips com auto-complete
 * 
 * Exemplo de uso:
 * ```tsx
 * import { TagsInput } from 'fcstyle';
 * 
 * <TagsInput
 *   value={['React', 'TypeScript', 'CSS']}
 *   onChange={(tags) => setTags(tags)}
 *   suggestions={['JavaScript', 'Vue', 'Angular', 'React', 'TypeScript']}
 *   placeholder="Digite uma tag..."
 *   maxTags={10}
 * />
 * ```
 */
export interface TagsInputProps extends ColorShortcuts, PaddingShortcuts, MarginShortcuts, BorderShortcuts, SizeShortcuts, FlexChildrenShortcuts {
  value?: string[];
  onChange?: (tags: string[]) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  validatorControl?: ValidatorControl;
  className?: string;
  placeholder?: string;
  suggestions?: string[];
  maxTags?: number;
  allowDuplicates?: boolean;
  separator?: string[];
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
  li?: string;
  tagColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  allowCustomTags?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const TagsInput: React.FC<TagsInputProps> = ({
  value = [],
  onChange,
  onValidationChange,
  validatorControl,
  className = '',
  placeholder = 'Digite uma tag...',
  suggestions = [],
  maxTags,
  allowDuplicates = false,
  separator = [',', ';', 'Enter'],
  disabled = false,
  loading = false,
  leftIcon,
  tagColor = 'primary',
  allowCustomTags = true,
  minLength = 1,
  maxLength = 50,
}) => {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
  const [validationMessage, setValidationMessage] = useState<string>('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Atualiza tags quando value prop muda
  useEffect(() => {
    if (value !== undefined) {
      setTags(value);
    }
  }, [value]);

  // Filtra sugestões com base no input
  useEffect(() => {
    if (inputValue && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
        (allowDuplicates || !tags.includes(suggestion))
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestionIndex(-1);
  }, [inputValue, suggestions, tags, allowDuplicates]);

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
  }, [validatorControl, tags, onValidationChange]);

  const validateTag = (tag: string): { valid: boolean; error?: string } => {
    if (tag.length < minLength) {
      return { valid: false, error: `Tag deve ter pelo menos ${minLength} caractere(s)` };
    }
    
    if (tag.length > maxLength) {
      return { valid: false, error: `Tag deve ter no máximo ${maxLength} caracteres` };
    }
    
    if (!allowDuplicates && tags.includes(tag)) {
      return { valid: false, error: 'Tag já existe' };
    }
    
    if (maxTags && tags.length >= maxTags) {
      return { valid: false, error: `Máximo de ${maxTags} tags permitidas` };
    }
    
    if (!allowCustomTags && !suggestions.includes(tag)) {
      return { valid: false, error: 'Apenas tags sugeridas são permitidas' };
    }
    
    return { valid: true };
  };

  const addTag = (tag: string) => {
    if (!tag.trim() || disabled) return;
    
    const trimmedTag = tag.trim();
    const validation = validateTag(trimmedTag);
    
    if (!validation.valid) {
      setValidationStatus(ValidationStatus.Invalid);
      setValidationMessage(validation.error!);
      return;
    }
    
    const newTags = [...tags, trimmedTag];
    setTags(newTags);
    setInputValue('');
    setShowSuggestions(false);
    updateValidation(newTags);
    
    if (onChange) {
      onChange(newTags);
    }
  };

  const removeTag = (index: number) => {
    if (disabled) return;
    
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    updateValidation(newTags);
    
    if (onChange) {
      onChange(newTags);
    }
  };

  const updateValidation = (tagList: string[]) => {
    if (validatorControl) {
      validatorControl.setValue(tagList.join(','));
      const result = validatorControl.validate();
      setValidationStatus(result.status);
      setValidationMessage(result.messages[0] || '');
      
      if (onValidationChange) {
        onValidationChange(result.status, result.messages[0] || '');
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    // Verifica se algum separador foi digitado
    for (const sep of separator) {
      if (sep !== 'Enter' && newValue.includes(sep)) {
        const parts = newValue.split(sep);
        const tagToAdd = parts[0];
        const remaining = parts.slice(1).join(sep);
        
        if (tagToAdd.trim()) {
          addTag(tagToAdd);
        }
        
        setInputValue(remaining);
        return;
      }
    }
    
    setInputValue(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (selectedSuggestionIndex >= 0 && filteredSuggestions[selectedSuggestionIndex]) {
          addTag(filteredSuggestions[selectedSuggestionIndex]);
        } else if (inputValue.trim()) {
          addTag(inputValue);
        }
        break;
        
      case 'Backspace':
        if (!inputValue && tags.length > 0) {
          removeTag(tags.length - 1);
        }
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        if (showSuggestions) {
          setSelectedSuggestionIndex(prev => 
            prev < filteredSuggestions.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (showSuggestions) {
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : filteredSuggestions.length - 1
          );
        }
        break;
        
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
  };

  const getValidationIcon = () => {
    if (loading) {
      return <Icon name="spinner" spin className="tags-validation-icon loading" />;
    }
    
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="tags-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="tags-validation-icon danger" />;
    }
    
    return null;
  };

  const getContainerClassNames = () => {
    const baseClasses = ['tags-input-container'];
    
    if (validationStatus === ValidationStatus.Valid) {
      baseClasses.push('valid');
    } else if (validationStatus === ValidationStatus.Invalid) {
      baseClasses.push('invalid');
    }
    
    if (disabled) {
      baseClasses.push('disabled');
    }
    
    if (className) {
      baseClasses.push(className);
    }
    
    return baseClasses.join(' ');
  };

  const getTagClassNames = () => {
    return `tag tag-${tagColor}`;
  };

  const { domProps, classNames } = classBuilder('input gap1 tags-input-wrapper')
    .add(className)
    .addBuilder(ColorBuilder, { variant: 'white', inverse: false })
    .addBuilder(MarginBuilder)
    .addBuilder(PaddingBuilder, { size: 2})
    .addBuilder(BorderBuilder, { width: 2, round: 2})
    .addBuilder(FlexChildrenBuilder)
    .addBuilder(SizeBuilder)
    .build({});

  const containerStateClass = [
    'tags-input-container',
    validationStatus === ValidationStatus.Valid ? 'valid' : '',
    validationStatus === ValidationStatus.Invalid ? 'invalid' : '',
    disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className={containerStateClass} onClick={() => inputRef.current?.focus()}>
        {(leftIcon || undefined) && (
          <Icon name={leftIcon} className="tags-left-icon" />
        )}

        <div className="tags-content">
          {/* Tags existentes */}
          {tags.length > 0 && (
            <div className="tags-list">
              {tags.map((tag, index) => (
                <Place key={index} row alignCenter gap1 className={getTagClassNames()}>
                  <span className="tag-text">{tag}</span>
                  {!disabled && (
                    <Icon 
                      name="times" 
                      className="tag-remove-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(index);
                      }}
                    />
                  )}
                </Place>
              ))}
            </div>
          )}
          
          {/* Input para nova tag */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(filteredSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={disabled || (maxTags ? tags.length >= maxTags : false)}
            className="tags-input"
          />
          
          {/* Sugestões */}
          {showSuggestions && (
            <div ref={suggestionsRef} className="tags-suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`tags-suggestion ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {getValidationIcon()}
      </div>
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
      
      {maxTags && (
        <small className="tags-counter">
          {tags.length} / {maxTags} tags
        </small>
      )}
    </div>
  );
};
