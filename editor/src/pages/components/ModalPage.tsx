import React, { useState } from 'react'
import { Modal, Button, Columns } from 'fcstyle'

const ModalPage: React.FC = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [styledModalOpen, setStyledModalOpen] = useState(false)
  const [noOverlayModalOpen, setNoOverlayModalOpen] = useState(false)

  const handleConfirmClose = () => {
    if (confirm('Tem certeza que deseja fechar o modal?')) {
      setConfirmModalOpen(false)
    } else {
      return false // Cancela o fechamento
    }
  }

  return (
    <div>
      <h1>Modal Component</h1>
      <p>O componente Modal permite exibir conteúdo em uma janela sobreposta.</p>

      <Columns gap m>
        <Button onClick={() => setBasicModalOpen(true)} one>
          Modal Básico
        </Button>

        <Button onClick={() => setConfirmModalOpen(true)} warning>
          Modal com Confirmação
        </Button>

        <Button onClick={() => setStyledModalOpen(true)} success>
          Modal Estilizado
        </Button>

        <Button onClick={() => setNoOverlayModalOpen(true)} danger>
          Sem Overlay Click
        </Button>
      </Columns>

      {/* Modal Básico */}
      <Modal
        isOpen={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
      >
        <h2>Modal Básico</h2>
        <p>Este é um modal simples com conteúdo personalizado.</p>
        <p>O background é clicável para fechar.</p>
        <Button onClick={() => setBasicModalOpen(false)}>Fechar</Button>
      </Modal>

      {/* Modal com Confirmação */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={handleConfirmClose}
      >
        <h2>Confirmação Necessária</h2>
        <p>Este modal requer confirmação antes de fechar.</p>
        <p>Clique em "Fechar" ou no overlay para ver a confirmação.</p>
        <Columns gap>
          <Button onClick={() => setConfirmModalOpen(false)} success>
            Fechar
          </Button>
          <Button onClick={handleConfirmClose} danger>
            Cancelar
          </Button>
        </Columns>
      </Modal>

      {/* Modal Estilizado */}
      <Modal
        isOpen={styledModalOpen}
        onClose={() => setStyledModalOpen(false)}
        className="custom-modal"
        p4
        br3
      >
        <h2 style={{ color: 'var(--one-color)' }}>Modal Estilizado</h2>
        <p>Este modal usa classes de estilo do FCStyle.</p>
        <div style={{ backgroundColor: 'var(--gray1-bg)', padding: '1rem', borderRadius: '8px' }}>
          <p>Conteúdo com fundo personalizado</p>
        </div>
        <Button onClick={() => setStyledModalOpen(false)} one>
          Fechar
        </Button>
      </Modal>

      {/* Modal sem overlay click */}
      <Modal
        isOpen={noOverlayModalOpen}
        onClose={() => setNoOverlayModalOpen(false)}
        closeOnOverlayClick={false}
      >
        <h2>Modal sem Overlay Click</h2>
        <p>Este modal só pode ser fechado pelo botão.</p>
        <p>O overlay não responde a cliques.</p>
        <Button onClick={() => setNoOverlayModalOpen(false)} danger>
          Fechar
        </Button>
      </Modal>
    </div>
  )
}

export default ModalPage
