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

// Solução para HMR: usar window global em dev, instância normal em produção
let globalStore: NotificationStore | null = null;

const getNotificationStore = (): NotificationStore => {
  // Em desenvolvimento, usar window global para persistir durante HMR
  if (typeof window !== 'undefined' && (import.meta as any).env?.DEV) {
    const STORE_KEY = '__fcstyle_notification_store__';
    if (!(window as any)[STORE_KEY]) {
      (window as any)[STORE_KEY] = new NotificationStore();
    }
    return (window as any)[STORE_KEY];
  }
  
  // Em produção ou SSR, usar instância singleton normal
  if (!globalStore) {
    globalStore = new NotificationStore();
  }
  return globalStore;
};

// Obter a instância global
const getStore = () => getNotificationStore();

interface UseNotificationsReturn {
  notifications: NotificationData[];
  addNotification: (type: NotificationType, message: string, options?: NotificationOptions) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (message: string, options?: NotificationOptions) => string;
  error: (message: string, options?: NotificationOptions) => string;
  warning: (message: string, options?: NotificationOptions) => string;
  info: (message: string, options?: NotificationOptions) => string;
}

// Hook para usar o store
export const useNotifications = (): UseNotificationsReturn => {
  const [, forceUpdate] = useState({});

  // Force re-render quando o store mudar
  const rerender = () => forceUpdate({});

  // Subscribe/unsubscribe
  useEffect(() => {
    const store = getStore();
    const unsubscribe = store.subscribe(rerender);
    return unsubscribe;
  }, []);

  const store = getStore();

  return {
    notifications: store.getNotifications(),
    addNotification: store.addNotification.bind(store),
    removeNotification: store.removeNotification.bind(store),
    clearAll: store.clearAll.bind(store),
    success: (message: string, options?: NotificationOptions) => 
      store.addNotification('success', message, options),
    error: (message: string, options?: NotificationOptions) => 
      store.addNotification('error', message, options),
    warning: (message: string, options?: NotificationOptions) => 
      store.addNotification('warning', message, options),
    info: (message: string, options?: NotificationOptions) => 
      store.addNotification('info', message, options),
  };
};
