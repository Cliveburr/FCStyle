import React, { useState, useEffect, useRef } from 'react';
import { ValidatorControl } from '../../validator/ValidatorControl';
import { ValidationStatus } from '../../validator/ValidationStatus';
import { Icon } from '../../components/Icon';
import { Place } from '../../grid/Place';

/**
 * Propriedades do componente FileInput
 * 
 * Input para upload de arquivos com preview e validação
 * 
 * Exemplo de uso:
 * ```tsx
 * import { FileInput } from 'fcstyle';
 * 
 * <FileInput
 *   accept="image/*"
 *   multiple
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   onChange={(files) => console.log(files)}
 *   onError={(error) => console.error(error)}
 * />
 * ```
 */
export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'onError'> {
  validatorControl?: ValidatorControl;
  className?: string;
  onChange?: (files: FileList | null) => void;
  onValidationChange?: (status: ValidationStatus, message: string) => void;
  onError?: (error: string) => void;
  maxSize?: number; // em bytes
  maxFiles?: number;
  showPreview?: boolean;
  allowedTypes?: string[];
  dragAndDrop?: boolean;
  loading?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
  validatorControl,
  className = '',
  onChange,
  onValidationChange,
  onError,
  maxSize,
  maxFiles = 1,
  showPreview = true,
  allowedTypes,
  dragAndDrop = true,
  loading = false,
  multiple = false,
  ...props
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(ValidationStatus.Pristine);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  }, [validatorControl, selectedFiles, onValidationChange]);

  // Cleanup previews quando componente desmonta
  useEffect(() => {
    return () => {
      Object.values(previews).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const validateFiles = (files: File[]): { valid: boolean; error?: string } => {
    // Verifica número máximo de arquivos
    if (files.length > maxFiles) {
      return { valid: false, error: `Máximo de ${maxFiles} arquivo(s) permitido(s)` };
    }

    for (const file of files) {
      // Verifica tamanho do arquivo
      if (maxSize && file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
        return { valid: false, error: `Arquivo muito grande. Máximo: ${maxSizeMB}MB` };
      }

      // Verifica tipos permitidos
      if (allowedTypes && !allowedTypes.includes(file.type)) {
        return { valid: false, error: `Tipo de arquivo não permitido: ${file.type}` };
      }
    }

    return { valid: true };
  };

  const generatePreviews = (files: File[]) => {
    const newPreviews: { [key: string]: string } = {};
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newPreviews[file.name] = URL.createObjectURL(file);
      }
    });
    
    // Cleanup previews anteriores
    Object.values(previews).forEach(url => URL.revokeObjectURL(url));
    setPreviews(newPreviews);
  };

  const handleFilesChange = (files: File[]) => {
    const validation = validateFiles(files);
    
    if (!validation.valid) {
      if (onError) {
        onError(validation.error!);
      }
      setValidationStatus(ValidationStatus.Invalid);
      setValidationMessage(validation.error!);
      return;
    }

    setSelectedFiles(files);
    
    if (showPreview) {
      generatePreviews(files);
    }
    
    updateValidation(files);
    
    if (onChange) {
      const fileList = new DataTransfer();
      files.forEach(file => fileList.items.add(file));
      onChange(fileList.files);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFilesChange(Array.from(files));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (!dragAndDrop || props.disabled) return;
    
    const files = Array.from(event.dataTransfer.files);
    handleFilesChange(files);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    
    if (showPreview) {
      generatePreviews(newFiles);
    }
    
    updateValidation(newFiles);
    
    if (onChange) {
      const fileList = new DataTransfer();
      newFiles.forEach(file => fileList.items.add(file));
      onChange(fileList.files);
    }
  };

  const updateValidation = (files: File[]) => {
    if (validatorControl) {
      validatorControl.setValue(files.length.toString());
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
      return <Icon name="spinner" spin className="file-validation-icon loading" />;
    }
    
    if (validationStatus === ValidationStatus.Valid) {
      return <Icon name="check" className="file-validation-icon success" />;
    } else if (validationStatus === ValidationStatus.Invalid) {
      return <Icon name="exclamation-circle" className="file-validation-icon danger" />;
    }
    
    return null;
  };

  const getContainerClassNames = () => {
    const baseClasses = ['file-input-container'];
    
    if (isDragOver) {
      baseClasses.push('drag-over');
    }
    
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="input-wrapper file-input-wrapper">
      <div 
        className={getContainerClassNames()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          {...props}
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          onChange={handleInputChange}
          className="file-input-hidden"
          style={{ display: 'none' }}
        />
        
        <Place column alignCenter gap2 className="file-input-content">
          <Icon name="cloud-upload" className="file-upload-icon" />
          
          <div className="file-input-text">
            {selectedFiles.length > 0 ? (
              <span>{selectedFiles.length} arquivo(s) selecionado(s)</span>
            ) : (
              <>
                <span>Clique para selecionar ou arraste arquivos aqui</span>
                {maxSize && (
                  <small>Tamanho máximo: {formatFileSize(maxSize)}</small>
                )}
                {allowedTypes && (
                  <small>Tipos permitidos: {allowedTypes.join(', ')}</small>
                )}
              </>
            )}
          </div>
          
          {getValidationIcon()}
        </Place>
      </div>
      
      {/* Preview dos arquivos */}
      {showPreview && selectedFiles.length > 0 && (
        <div className="file-preview-container">
          {selectedFiles.map((file, index) => (
            <Place key={index} row alignCenter gap2 className="file-preview-item">
              {previews[file.name] ? (
                <img 
                  src={previews[file.name]} 
                  alt={file.name}
                  className="file-preview-image"
                />
              ) : (
                <Icon name="file" className="file-preview-icon" />
              )}
              
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>
              
              <Icon 
                name="times" 
                className="file-remove-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              />
            </Place>
          ))}
        </div>
      )}
      
      {validationStatus === ValidationStatus.Invalid && validationMessage && (
        <span className="input-error-message">{validationMessage}</span>
      )}
    </div>
  );
};
