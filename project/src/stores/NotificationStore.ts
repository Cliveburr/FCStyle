import { useState, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationData {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  timestamp: number;
}

interface NotificationOptions {
  title?: string;
  duration?: number;
  closable?: boolean;
}

// Estado global simples
class NotificationStore {
  private notifications: NotificationData[] = [];
  private listeners: Set<() => void> = new Set();
  private timers: Map<string, number> = new Map();
  private maxNotifications = 5;

  // Adicionar listener para mudanças
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notificar mudanças
  private notify() {
    this.listeners.forEach(listener => listener());
  }

  // Gerar ID único
  private generateId() {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Obter notificações atuais
  getNotifications() {
    return [...this.notifications];
  }

  // Adicionar notificação
  addNotification(type: NotificationType, message: string, options: NotificationOptions = {}) {
    const id = this.generateId();
    const duration = options.duration ?? 5000;
    const closable = options.closable ?? true;

    const notification: NotificationData = {
      id,
      type,
      message,
      title: options.title,
      duration,
      closable,
      timestamp: Date.now(),
    };

    this.notifications = [...this.notifications, notification].slice(-this.maxNotifications);
    this.notify();

    // Auto-close
    if (duration > 0) {
      const timer = window.setTimeout(() => {
        this.removeNotification(id);
      }, duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  // Remover notificação
  removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    
    this.notify();
  }

  // Limpar todas
  clearAll() {
    this.notifications = [];
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    this.notify();
  }
}

// Instância global
const notificationStore = new NotificationStore();

// Hook para usar o store
export const useNotificationStore = () => {
  const [, forceUpdate] = useState({});

  // Force re-render quando o store mudar
  const rerender = () => forceUpdate({});

  // Subscribe/unsubscribe
  useEffect(() => {
    const unsubscribe = notificationStore.subscribe(rerender);
    return unsubscribe;
  }, []);

  return {
    notifications: notificationStore.getNotifications(),
    addNotification: notificationStore.addNotification.bind(notificationStore),
    removeNotification: notificationStore.removeNotification.bind(notificationStore),
    clearAll: notificationStore.clearAll.bind(notificationStore),
    success: (message: string, options?: NotificationOptions) => 
      notificationStore.addNotification('success', message, options),
    error: (message: string, options?: NotificationOptions) => 
      notificationStore.addNotification('error', message, options),
    warning: (message: string, options?: NotificationOptions) => 
      notificationStore.addNotification('warning', message, options),
    info: (message: string, options?: NotificationOptions) => 
      notificationStore.addNotification('info', message, options),
  };
};
