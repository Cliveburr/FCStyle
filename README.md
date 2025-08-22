
Um framework CSS em React com componentes reutilizáveis e customizáveis via variáveis SCSS.

## Estrutura do Projeto

```
/project     - Framework principal (componentes React + SCSS)
/editor      - Editor React para visualizar e customizar componentes
```

## Como usar

### 1. Instalar dependências
```bash
npm run install:all
```

### 2. Build do projeto principal
```bash
npm run build:project
```

### 3. Executar editor
```bash
npm run dev:editor
```

### 4. Ou executar tudo junto
```bash
npm start
```

## Componentes Disponíveis

### Grid System

### Components

### Form

### Validation

## Editor

O editor permite:

Acesse em: http://localhost:5173 após executar `npm run dev:editor`
# FCStyle

[🔗 Veja a demonstração no GitHub Pages](https://cliveburr.github.io/FCStyle/docs/)

Framework CSS em React para ser utilizado por outros projetos React.

---

## Instalação

```bash
npm install fcstyle
```

## Uso Básico

```jsx
import React from 'react';
import { Column, Row, Button } from 'fcstyle';

function App() {
  return (
    <Column>
      <Button primary>This is the primary button!</Button>
      <Button second>This is the second button!</Button>
    </Column>
  );
}

export default App;
```

---

## Estrutura do Projeto

```
/project     - Framework principal (componentes React + SCSS)
/editor      - Editor React para visualizar e customizar componentes
```

---

## Scripts disponíveis

- `npm run build:project` - Build do framework
- `npm run dev:project` - Desenvolvimento com watch
- `npm run build:editor` - Build do editor
- `npm run dev:editor` - Servidor de desenvolvimento do editor
- `npm run build:all` - Build completo
- `npm start` - Build do projeto + executar editor

---

## Componentes

### Grid Components

#### Column
Componente que define display flex para colunas.

```jsx
<Column inverse={false}>
  {/* Conteúdo */}
</Column>
```

**Props:**
- `children`: React.ReactNode - Conteúdo do componente
- `inverse?: boolean` - Inverte a direção das colunas (column-reverse)
- `className?: string` - Classes CSS adicionais
- `style?: React.CSSProperties` - Estilos inline

#### Row
Componente que define display flex para linhas.

```jsx
<Row inverse={false}>
  {/* Conteúdo */}
</Row>
```

**Props:**
- `children`: React.ReactNode - Conteúdo do componente
- `inverse?: boolean` - Inverte a direção das linhas (row-reverse)
- `className?: string` - Classes CSS adicionais
- `style?: React.CSSProperties` - Estilos inline

### Components

#### Button
Componente de botão com estilos predefinidos.

```jsx
<Button primary>Primary Button</Button>
<Button second>Secondary Button</Button>
```

**Props:**
- `children`: React.ReactNode - Conteúdo do botão
- `primary?: boolean` - Aplica estilo primário
- `second?: boolean` - Aplica estilo secundário
- `className?: string` - Classes CSS adicionais
- Herda todas as props de `HTMLButtonElement`

---

## Formulários e Validação

#### Input
Campo de entrada com validação.

#### InputField
Campo completo com label e mensagens de validação.

#### ValidatorControl
Sistema de validação robusto.

#### ValidationStatus
Estados de validação (Pristine, Valid, Invalid).

#### IValidator
Interface para validadores customizados.

---

## Customização de Tema

O FCStyle utiliza variáveis CSS para permitir customização completa dos estilos. Você pode alterar as variáveis globalmente ou aplicar um tema customizado.

### Aplicar Tema Programaticamente

```jsx
import { applyTheme, defaultTheme } from 'fcstyle';

// Aplicar tema customizado
const customTheme = {
  '--fcstyle-display-gap': '24px',
  '--fcstyle-button-primary-bg': '#28a745',
  '--fcstyle-button-primary-hover-bg': '#218838',
  // ... outras variáveis
};

applyTheme(customTheme);
```

### Variáveis CSS Disponíveis

#### Grid
- `--fcstyle-display-gap`: Gap entre elementos nos componentes Column e Row (padrão: 16px)

#### Button
- `--fcstyle-button-primary-bg`: Cor de fundo do botão primário
- `--fcstyle-button-primary-color`: Cor do texto do botão primário
- `--fcstyle-button-primary-border`: Borda do botão primário
- `--fcstyle-button-primary-hover-bg`: Cor de fundo do botão primário no hover
- `--fcstyle-button-primary-hover-border`: Borda do botão primário no hover
- `--fcstyle-button-second-bg`: Cor de fundo do botão secundário
- `--fcstyle-button-second-color`: Cor do texto do botão secundário
- `--fcstyle-button-second-border`: Borda do botão secundário
- `--fcstyle-button-second-hover-bg`: Cor de fundo do botão secundário no hover
- `--fcstyle-button-second-hover-border`: Borda do botão secundário no hover
- `--fcstyle-button-padding`: Padding interno dos botões
- `--fcstyle-button-border-radius`: Border radius dos botões
- `--fcstyle-button-font-size`: Tamanho da fonte dos botões
- `--fcstyle-button-font-weight`: Peso da fonte dos botões
- `--fcstyle-button-transition`: Transição dos botões

### Customização via CSS

Você também pode customizar as variáveis diretamente no seu CSS:

```css
:root {
  --fcstyle-display-gap: 20px;
  --fcstyle-button-primary-bg: #ff6b6b;
  --fcstyle-button-primary-hover-bg: #ff5252;
}
```

---

## Exemplo de uso avançado

```tsx
import { Button, Column, Row, Input, ValidatorControl, ValidationStatus } from 'fcstyle'

// Validator
const emailValidator = new ValidatorControl([
  {
    validator: (value: string) => 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
        ? ValidationStatus.Valid 
        : ValidationStatus.Invalid,
    message: 'Email inválido'
  }
])

// Componente
function MyForm() {
  return (
    <Column gap="large">
      <Row>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </Row>
      <Input 
        type="email" 
        placeholder="Digite seu email"
        validatorControl={emailValidator}
      />
    </Column>
  )
}
```

---

## Editor

O editor React permite:
- Visualizar todos os componentes interativamente
- Customizar variáveis CSS em tempo real
- Exportar temas personalizados
- Ver exemplos de código para cada componente
- Navegação entre diferentes componentes
- Demonstração visual de cada componente
- Importação dos estilos SCSS do projeto principal
- Layout responsivo
- Showcase interativo dos componentes

### Como executar o editor

```bash
# Instalar dependências
cd editor
npm install

# Build do projeto principal (necessário para o editor funcionar)
cd ../project
npm run build
cd ../editor

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## Estrutura de arquivos

### /project
```
src/
  components/     - Componentes React (Button, etc)
  grid/           - Sistema de grid (Column, Row)
  form/           - Componentes de formulário (Input, InputField)
  validator/      - Sistema de validação
  styles/         - Estilos SCSS com variáveis customizáveis
```

### /editor
```
src/
  components/    - Componentes do editor (Layout, Navigation, ThemeCustomizer)
  pages/         - Páginas de demonstração dos componentes
  styles/        - Estilos específicos do editor
```

---

## Build

Para fazer o build do projeto:

```bash
npm run build
```

Para desenvolvimento com watch mode:

```bash
npm run dev
```

## Desenvolvimento

### Scripts disponíveis:
- `npm run build:project` - Build do framework
- `npm run dev:project` - Desenvolvimento com watch
- `npm run build:editor` - Build do editor
- `npm run dev:editor` - Servidor de desenvolvimento do editor
- `npm run build:all` - Build completo
- `npm start` - Build do projeto + executar editor

### Estrutura de pastas:

#### /project
```
src/
  components/     - Componentes React (Button, etc)
  grid/          - Sistema de grid (Column, Row)
  form/          - Componentes de formulário (Input, InputField)
  validator/     - Sistema de validação
  styles/        - Estilos SCSS com variáveis customizáveis
```

#### /editor
```
src/
  components/    - Componentes do editor (Layout, Navigation, ThemeCustomizer)
  pages/         - Páginas de demonstração dos componentes
  styles/        - Estilos específicos do editor
```

## Customização

Use o **ThemeCustomizer** no editor para alterar:
- Cores primárias, secundárias, etc.
- Tamanhos de fontes
- Espaçamentos
- E exportar o tema como JSON

## Exemplo de uso no projeto

```tsx
import { Button, Column, Row, Input, ValidatorControl, ValidationStatus } from 'fcstyle'

// Validator
const emailValidator = new ValidatorControl([
  {
    validator: (value: string) => 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
        ? ValidationStatus.Valid 
        : ValidationStatus.Invalid,
    message: 'Email inválido'
  }
])

// Componente
function MyForm() {
  return (
    <Column gap="large">
      <Row>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </Row>
      <Input 
        type="email" 
        placeholder="Digite seu email"
        validatorControl={emailValidator}
      />
    </Column>
  )
}
```
