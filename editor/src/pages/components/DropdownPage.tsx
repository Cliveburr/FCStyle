import React, { useState } from 'react';
import { Dropdown, DropdownRender, Button, Place } from 'fcstyle';
import { ListItem, ListLabel, ListSeparator } from 'fcstyle';

export const DropdownPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isControlledOpen, setIsControlledOpen] = useState(false);

  return (
    <Place m>
      <h1>Dropdown Component - REFACTOR COMPLETO! 🎉</h1>
      
      <div style={{ 
        padding: '1rem', 
        background: '#d4edda', 
        border: '2px solid #28a745', 
        borderRadius: '8px', 
        marginBottom: '2rem' 
      }}>
        <h2 style={{ color: '#155724', margin: '0 0 1rem 0' }}>✅ NOVA API SIMPLIFICADA!</h2>
        <p style={{ margin: '0', color: '#155724' }}>
          <strong>Refactor completo da estrutura do Dropdown!</strong><br/>
          • <code>Dropdown</code> - cria automaticamente header button + aceita ListItems diretos<br/>
          • <code>DropdownRender</code> - igual ao Dropdown, mas filhos são conteúdo customizado<br/>
          • Suporte a <code>type="link"</code> para header como &lt;a&gt;
        </p>
      </div>

      <section>
        <h2>🚀 NOVA API SIMPLIFICADA</h2>
        
        <h3>1. Dropdown Simples - Nova API</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Sem precisar de DropdownButton + DropdownMenu:</strong></p>
          <Dropdown w4
            label="Nova API Dropdown" 
            li="user"
            success
            selectedValue={selectedOption}
            onSelect={(value: any) => setSelectedOption(value)}
          >
            <ListItem value="nova1">Nova Opção 1</ListItem>
            <ListItem value="nova2">Nova Opção 2</ListItem>
            <ListSeparator />
            <ListLabel>Nova Categoria</ListLabel>
            <ListItem value="nova3">Nova Opção 3</ListItem>
          </Dropdown>
          <p style={{ marginTop: '1rem' }}>
            <strong>Selecionado:</strong> {selectedOption || 'Nenhum'}
          </p>
        </div>

        <h3>2. DropdownRender - Nova API</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Conteúdo customizado direto:</strong></p>
          <DropdownRender 
            label="DropdownRender Novo" 
            danger
            li="user"
          >
            <div style={{ padding: '1rem', minWidth: '250px' }}>
              <h4 style={{ color: '#dc3545' }}>🎨 Nova API DropdownRender!</h4>
              <p>Não precisa mais de wrapper, conteúdo vai direto nos children!</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Button success two>Salvar</Button>
                <Button danger two>Cancelar</Button>
              </div>
            </div>
          </DropdownRender>
        </div>

        <h3>3. Dropdown tipo Link</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Header como &lt;a&gt; tag:</strong></p>
          <Dropdown 
            label="Link Dropdown" 
            as="link"
          >
            <ListItem value="link1">Link Item 1</ListItem>
            <ListItem value="link2">Link Item 2</ListItem>
          </Dropdown>
        </div>

        <h3>4. Comparação: API Antiga vs Nova</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '2rem',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1rem', background: '#fff3cd' }}>
              <h4 style={{ color: '#856404', margin: '0 0 1rem 0' }}>🔸 API Antiga (removida - apenas para referência)</h4>
              <p style={{ color: '#856404', margin: 0, fontSize: '0.9em' }}>
                Componentes DropdownButton e DropdownMenu foram removidos.<br/>
                Use a nova API do Dropdown diretamente.
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: '#d4edda' }}>
              <h4 style={{ color: '#155724', margin: '0 0 1rem 0' }}>✅ API Nova (recomendada)</h4>
              <Dropdown 
                label="API Nova" 
                selectedValue={selectedCategory}
                onSelect={(value: any) => setSelectedCategory(value)}
              >
                <ListItem value="new1">Item Novo 1</ListItem>
                <ListItem value="new2">Item Novo 2</ListItem>
              </Dropdown>
            </div>
          </div>
          <p style={{ marginTop: '1rem' }}>
            <strong>Categoria selecionada:</strong> {selectedCategory || 'Nenhuma'}
          </p>
        </div>

        <h3>5. Estado Controlado</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Controle externo:</strong></p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Dropdown 
              label={`Controlado ${isControlledOpen ? '(Aberto)' : '(Fechado)'}`}
              isOpen={isControlledOpen}
              onToggle={setIsControlledOpen}
            >
              <ListItem value="c1">Item Controlado 1</ListItem>
              <ListItem value="c2">Item Controlado 2</ListItem>
            </Dropdown>
            
            <Button 
              onClick={() => setIsControlledOpen(!isControlledOpen)}
            >
              {isControlledOpen ? 'Fechar' : 'Abrir'}
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2>📋 DOCUMENTAÇÃO API ANTIGA (ainda funciona)</h2>
        
        <h3>6. DropdownRender para Conteúdo Customizado</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>DropdownRender com conteúdo personalizado:</strong></p>
          <DropdownRender 
            label="DropdownRender Customizado"
            li="star"
          >
            <div style={{ padding: '1rem', minWidth: '250px' }}>
              <h4 style={{ color: '#28a745' }}>🎨 DropdownRender!</h4>
              <p>Este é conteúdo customizado usando o DropdownRender!</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Button success>Salvar</Button>
                <Button danger>Cancelar</Button>
              </div>
            </div>
          </DropdownRender>
        </div>
      </section>

      <div style={{ 
        padding: '1rem', 
        background: '#f8f9fa', 
        border: '1px solid #dee2e6', 
        borderRadius: '8px', 
        marginTop: '2rem' 
      }}>
        <h3>📝 Resumo do Refactor</h3>
        <ul>
          <li><strong>Nova API Dropdown:</strong> Cria automaticamente o header button e aceita ListItems diretamente</li>
          <li><strong>Nova API DropdownRender:</strong> Igual ao Dropdown, mas os children são conteúdo customizado</li>
          <li><strong>type="button":</strong> (padrão) Header como Button component</li>
          <li><strong>type="link":</strong> Header como tag &lt;a&gt;</li>
          <li><strong>API Antiga removida:</strong> DropdownButton e DropdownMenu foram removidos</li>
          <li><strong>Simplificação total:</strong> API mais limpa e intuitiva</li>
        </ul>
      </div>
    </Place>
  );
};
