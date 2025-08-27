import React, { useEffect, useState } from 'react';
import { Icon } from '../components/Icon';
import { classBuilder } from '../helpers';

export interface NotificationItemProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  closable?: boolean;
  onClose: (id: string) => void;
  index: number; // Para posicionamento na pilha
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  type,
  title,
  message,
  closable = true,
  onClose,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Delay para animação de saída antes de remover
    setTimeout(() => onClose(id), 300);
  };

  const getIconName = (type: string) => {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'times-circle';
      case 'warning': return 'exclamation-triangle';
      case 'info': return 'info-circle';
      default: return 'bell';
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'one';
      default: return 'one';
    }
  };

  const { classNames } = classBuilder('notification-item')
    .add(getColorClass(type))
    .add('br')
    .add('p3')
    .add('shadow1')
    .if('notification-visible', isVisible)
    .build({});

  return (
    <div
      className={classNames}
    >
      <div className="notification-icon">
        <Icon name={getIconName(type)} />
      </div>

      <div className="notification-content">
        {title && <div className="notification-title">{title}</div>}
        <div className="notification-message">{message}</div>
      </div>

      {closable && (
        <button
          className="notification-close"
          onClick={handleClose}
          aria-label="Fechar notificação"
        >
          <Icon name="times" />
        </button>
      )}
    </div>
  );
};
