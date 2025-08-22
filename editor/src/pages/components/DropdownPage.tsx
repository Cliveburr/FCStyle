import React, { useState } from 'react';
import { Dropdown, DropdownButton, DropdownMenu, DropdownRender, Button, Place } from 'fcstyle';
import { ListItem, ListLabel, ListSeparator } from 'fcstyle';

export const DropdownPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isControlledOpen, setIsControlledOpen] = useState(false);

  return (
    <Place m>
      <h1>Dropdown Component - Nova Estrutura Modular 🎉</h1>
      
      <div style={{ 
        padding: '1rem', 
        background: '#d4edda', 
        border: '2px solid #28a745', 
        borderRadius: '8px', 
        marginBottom: '2rem' 
      }}>
        <h2 style={{ color: '#155724', margin: '0 0 1rem 0' }}>✅ ESTRUTURA MODULAR FUNCIONANDO!</h2>
        <p style={{ margin: '0', color: '#155724' }}>
          <strong>Nova arquitetura com DropdownButton, DropdownMenu e DropdownRender!</strong> 
          Todos os exemplos abaixo usam a nova estrutura modular.
        </p>
      </div>

      <section>
        <h2>🎉 NOVA ESTRUTURA MODULAR</h2>
        
        <h3>1. DropdownButton + DropdownRender</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Conteúdo totalmente customizado:</strong></p>
          <Dropdown>
            <DropdownButton one>
              DropdownButton + DropdownRender
            </DropdownButton>
            <DropdownRender>
              <div style={{ padding: '1rem', minWidth: '250px' }}>
                <h4 style={{ color: '#28a745' }}>🎨 DropdownRender!</h4>
                <p>Este é conteúdo customizado usando o novo DropdownRender!</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <Button success>Salvar</Button>
                  <Button danger>Cancelar</Button>
                </div>
              </div>
            </DropdownRender>
          </Dropdown>
        </div>

        <h3>2. DropdownButton + DropdownMenu</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Menu estruturado com ListItems:</strong></p>
          <Dropdown closeOnItemSelect={true}>
            <DropdownButton two ri="chevron-down">
              DropdownButton + DropdownMenu
            </DropdownButton>
            <DropdownMenu two
              selectedValue={selectedOption}
              onSelect={(value: any) => setSelectedOption(value)}
            >
              <ListItem value="nova1">Nova Opção 1</ListItem>
              <ListItem value="nova2">Nova Opção 2</ListItem>
              <ListSeparator />
              <ListLabel>Nova Categoria</ListLabel>
              <ListItem value="nova3">Nova Opção 3</ListItem>
            </DropdownMenu>
          </Dropdown>
          <p style={{ marginTop: '1rem' }}>
            <strong>Selecionado:</strong> {selectedOption || 'Nenhum'}
          </p>
        </div>

        <h3>3. Diferentes Estilos de DropdownButton</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>DropdownButton herda todas as props do Button:</strong></p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            
            <Dropdown>
              <DropdownButton three li="user">
                Com Ícone Esquerda
              </DropdownButton>
              <DropdownRender>
                <div style={{ padding: '1rem' }}>
                  <p>DropdownButton herda todas as props do Button!</p>
                </div>
              </DropdownRender>
            </Dropdown>

            <Dropdown>
              <DropdownButton success ri="caret-down">
                Success + Ícone Direita
              </DropdownButton>
              <DropdownMenu>
                <ListItem>Success Item 1</ListItem>
                <ListItem>Success Item 2</ListItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownButton danger li="warning" ri="chevron-down">
                Danger + Ambos Ícones
              </DropdownButton>
              <DropdownRender>
                <div style={{ padding: '1rem' }}>
                  <p>⚠️ Componente com estilo danger!</p>
                </div>
              </DropdownRender>
            </Dropdown>
          </div>
        </div>

        <h3>4. Estado Controlado</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Dropdown controlado externamente:</strong></p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Dropdown 
              isOpen={isControlledOpen}
              onToggle={setIsControlledOpen}
            >
              <DropdownButton five>
                Controlado {isControlledOpen ? '(Aberto)' : '(Fechado)'}
              </DropdownButton>
              <DropdownMenu>
                <ListItem>Item Controlado 1</ListItem>
                <ListItem>Item Controlado 2</ListItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button 
              onClick={() => setIsControlledOpen(!isControlledOpen)}
              six
            >
              {isControlledOpen ? 'Fechar' : 'Abrir'}
            </Button>
          </div>
        </div>

        <h3>5. Diferentes Direções</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>4 direções de abertura:</strong></p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '2rem' 
          }}>
            
            <div style={{ textAlign: 'center' }}>
              <h4>Para Baixo</h4>
              <Dropdown direction="down">
                <DropdownButton>Down ↓</DropdownButton>
                <DropdownMenu>
                  <ListItem>Opção Down 1</ListItem>
                  <ListItem>Opção Down 2</ListItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4>Para Cima</h4>
              <Dropdown direction="up">
                <DropdownButton>Up ↑</DropdownButton>
                <DropdownMenu>
                  <ListItem>Opção Up 1</ListItem>
                  <ListItem>Opção Up 2</ListItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4>Para a Direita</h4>
              <Dropdown direction="right">
                <DropdownButton>Right →</DropdownButton>
                <DropdownMenu>
                  <ListItem>Opção Right 1</ListItem>
                  <ListItem>Opção Right 2</ListItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4>Para a Esquerda</h4>
              <Dropdown direction="left">
                <DropdownButton>Left ←</DropdownButton>
                <DropdownMenu>
                  <ListItem>Opção Left 1</ListItem>
                  <ListItem>Opção Left 2</ListItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <h3>6. Conteúdo Customizado Complexo</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Formulário interativo:</strong></p>
          <Dropdown closeOnClickOutside={false}>
            <DropdownButton>Formulário Login</DropdownButton>
            <DropdownRender>
              <div style={{ padding: '1.5rem', minWidth: '300px' }}>
                <h4>Login</h4>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem', 
                  marginTop: '1rem' 
                }}>
                  <input 
                    type="text" 
                    placeholder="Usuário" 
                    style={{ 
                      padding: '0.5rem', 
                      border: '1px solid #ccc', 
                      borderRadius: '4px' 
                    }}
                  />
                  <input 
                    type="password" 
                    placeholder="Senha" 
                    style={{ 
                      padding: '0.5rem', 
                      border: '1px solid #ccc', 
                      borderRadius: '4px' 
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button success>Entrar</Button>
                    <Button>Cancelar</Button>
                  </div>
                </div>
              </div>
            </DropdownRender>
          </Dropdown>
        </div>

        <h3>7. Múltiplos Dropdowns</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <p><strong>Vários dropdowns juntos:</strong></p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Dropdown>
              <DropdownButton>Filtro 1</DropdownButton>
              <DropdownMenu>
                <ListItem>Opção A</ListItem>
                <ListItem>Opção B</ListItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownButton>Filtro 2</DropdownButton>
              <DropdownMenu>
                <ListItem>Opção X</ListItem>
                <ListItem>Opção Y</ListItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownButton>Ações</DropdownButton>
              <DropdownRender>
                <div style={{ padding: '1rem' }}>
                  <Button style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }}>
                    Exportar
                  </Button>
                  <Button style={{ display: 'block', width: '100%' }}>
                    Importar
                  </Button>
                </div>
              </DropdownRender>
            </Dropdown>
          </div>
        </div>

        <h3>8. Menu com Seleção de Categoria</h3>
        <div className="showcase" style={{ marginBottom: '2rem' }}>
          <Dropdown closeOnItemSelect={true}>
            <DropdownButton>
              Categoria: {selectedCategory || 'Selecione uma Categoria'}
            </DropdownButton>
            <DropdownMenu 
              selectedValue={selectedCategory}
              onSelect={(value: any) => setSelectedCategory(value)}
            >
              <ListItem value="tech">Tecnologia</ListItem>
              <ListItem value="design">Design</ListItem>
              <ListItem value="business">Negócios</ListItem>
              <ListSeparator />
              <ListLabel>Outros</ListLabel>
              <ListItem value="education">Educação</ListItem>
              <ListItem value="health">Saúde</ListItem>
            </DropdownMenu>
          </Dropdown>
          <p style={{ marginTop: '1rem' }}>
            <strong>Categoria selecionada:</strong> {selectedCategory || 'Nenhuma'}
          </p>
        </div>
      </section>

      <section>
        <h2>🏆 Resumo da Nova Estrutura</h2>
        <div className="showcase">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem' 
          }}>
            
            <div style={{ 
              padding: '1rem', 
              background: '#d4edda', 
              borderRadius: '4px', 
              border: '1px solid #c3e6cb' 
            }}>
              <h4 style={{ color: '#155724', margin: '0 0 0.5rem 0' }}>✅ DropdownButton</h4>
              <p style={{ color: '#155724', margin: 0, fontSize: '0.9rem' }}>
                Herda todas as props do Button. Pode ter ícones à esquerda e direita,
                cores, tamanhos e estilos customizados.
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#d4edda', 
              borderRadius: '4px', 
              border: '1px solid #c3e6cb' 
            }}>
              <h4 style={{ color: '#155724', margin: '0 0 0.5rem 0' }}>✅ DropdownMenu</h4>
              <p style={{ color: '#155724', margin: 0, fontSize: '0.9rem' }}>
                Para menus estruturados com ListItem, ListLabel e ListSeparator.
                Suporte completo a seleção e eventos.
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#d4edda', 
              borderRadius: '4px', 
              border: '1px solid #c3e6cb' 
            }}>
              <h4 style={{ color: '#155724', margin: '0 0 0.5rem 0' }}>✅ DropdownRender</h4>
              <p style={{ color: '#155724', margin: 0, fontSize: '0.9rem' }}>
                Para conteúdo completamente customizado. Formulários, botões,
                qualquer JSX pode ser renderizado.
              </p>
            </div>
          </div>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: '#f8f9fa', 
            borderRadius: '4px' 
          }}>
            <h4>📋 Padrão de Uso:</h4>
            <pre style={{ 
              background: '#ffffff', 
              padding: '1rem', 
              borderRadius: '4px', 
              overflow: 'auto',
              margin: '0.5rem 0'
            }}>
{`// Menu estruturado
<Dropdown>
  <DropdownButton>Menu</DropdownButton>
  <DropdownMenu>
    <ListItem value="1">Item 1</ListItem>
    <ListItem value="2">Item 2</ListItem>
  </DropdownMenu>
</Dropdown>

// Conteúdo customizado
<Dropdown>
  <DropdownButton>Custom</DropdownButton>
  <DropdownRender>
    <div>Qualquer conteúdo aqui</div>
  </DropdownRender>
</Dropdown>`}
            </pre>
          </div>
        </div>
      </section>
    </Place>
  );
};
