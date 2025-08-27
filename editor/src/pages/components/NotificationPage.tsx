import React from 'react';
import { Button, Columns } from 'fcstyle';
import { useNotifications } from 'fcstyle';

const NotificationPage: React.FC = () => {
  // Hook para gerenciar notificações
  const {
    success,
    error,
    warning,
    info,
    clearAll
  } = useNotifications();

  const demoNotifications = () => {
    success('Operação realizada com sucesso!');
    setTimeout(() => info('Esta é uma informação importante'), 1000);
    setTimeout(() => warning('Atenção: verifique os dados'), 2000);
    setTimeout(() => error('Erro: falha ao processar'), 3000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Notification System</h1>
      <p>Sistema completo de notificações com hook useNotifications. O NotificationContainer já está incluído globalmente no App.tsx.</p>

      <h2>🎉 Sistema com Hook useNotifications</h2>
      <div style={{ marginBottom: '2rem' }}>
        <Columns gap>
          <Button onClick={demoNotifications} success>Demo Completo</Button>
          <Button onClick={() => success('Sucesso!')} success>Success</Button>
          <Button onClick={() => error('Erro!')} danger>Error</Button>
          <Button onClick={() => warning('Atenção!')} warning>Warning</Button>
          <Button onClick={() => info('Informação!')} one>Info</Button>
          <Button onClick={clearAll} danger>Clear All</Button>
        </Columns>
      </div>

      <h2>Notificações Customizadas</h2>
      <div style={{ marginBottom: '2rem' }}>
        <Columns gap>
          <Button onClick={() => success('Custom success message', {
            title: 'Título Customizado',
            duration: 3000
          })}>
            Custom Success
          </Button>
          <Button onClick={() => error('Custom error message', {
            title: 'Erro Customizado',
            duration: 0 // Não fecha automaticamente
          })}>
            Custom Error (Persistente)
          </Button>
        </Columns>
      </div>

      <h2>Características do Sistema</h2>
      <div style={{ marginBottom: '2rem' }}>
        <ul>
          <li>✅ Gerenciamento centralizado via hook</li>
          <li>✅ Suporte ilimitado a notificações encadeadas</li>
          <li>✅ Tipos pré-definidos (success, error, warning, info)</li>
          <li>✅ Posicionamento fixo no canto superior direito</li>
          <li>✅ Animações suaves de entrada/saída</li>
          <li>✅ Auto-close com timer customizável</li>
          <li>✅ Máximo de 5 notificações simultâneas</li>
          <li>✅ Ícones específicos por tipo</li>
          <li>✅ Suporte a títulos opcionais</li>
          <li>✅ Container global único na aplicação</li>
        </ul>
      </div>

      <h2>Como Usar</h2>
      <div style={{ marginBottom: '2rem' }}>
        <pre style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.9em',
          overflow: 'auto'
        }}>
{`import { useNotifications } from 'fcstyle';

function App() {
  const {
    success,
    error,
    warning,
    info,
    clearAll
  } = useNotifications();

  return (
    <>
      {/* NotificationContainer já está incluído globalmente */}

      <button onClick={() => success('Operação realizada!')}>
        Success
      </button>

      <button onClick={() => error('Erro crítico!', { duration: 0 })}>
        Error Persistente
      </button>

      <button onClick={() => warning('Atenção!', { title: 'Alerta' })}>
        Warning com Título
      </button>
    </>
  );
}`}
        </pre>
      </div>
    </div>
  );
};

export default NotificationPage;