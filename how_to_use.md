# FCStyle Framework Documentation

## Core Concepts

### Class Builder System

FCStyle uses a sophisticated class builder system that converts component props into CSS classes. This allows for:

- **Prop-based styling**: Pass style properties as component props
- **Theme support**: Automatic application of theme variables
- **Performance**: CSS classes are generated efficiently
- **Consistency**: Standardized naming and behavior

### Theme System

The framework supports multiple color themes (white, black, gray1-5, one-seven, success, warning, danger) with automatic hover and selected states.

## Components

### Class Builder System

FCStyle uses a sophisticated class builder system that converts component props into CSS classes. This allows for:

- **Prop-based styling**: Pass style properties as component props
- **Theme support**: Automatic application of theme variables
- **Performance**: CSS classes are generated efficiently
- **Consistency**: Standardized naming and behavior

### Theme System

The framework supports multiple color themes (white, black, gray1-5, one-seven, success, warning, danger) with automatic hover and selected states.

## Components

### Button

A versatile button component with support for icons, links, and various styles.

```tsx
import { Button } from 'fcstyle';

// Basic button
<Button>Click me</Button>

// With left icon
<Button li="user" leftIcon={{ name: 'user' }}>Profile</Button>

// As link
<Button as="link" href="/home">Home</Button>

// With color theme
<Button success>Success</Button>

// With custom class
<Button className="my-button">Custom</Button>

// Button with right icon
<Button ri="chevron-right">Next</Button>

// Button with both icons
<Button li="user" ri="chevron-right">Profile Settings</Button>

// Disabled button
<Button disabled>Disabled</Button>

// Button as submit
<Button as="submit">Submit Form</Button>

// Button with all style shortcuts
<Button one p3 m2 round2 border1 hoverable>Styled Button</Button>

// Button with size shortcuts
<Button w100 h50>Full Width Button</Button>

// Button with flex shortcuts
<Button row gap2 justifyCenter alignCenter>Centered Content</Button>

// Button with spacing shortcuts
<Button mt3 mb3 ml2 mr2 pt2 pb2 pl3 pr3>Spaced Button</Button>

// Button with color variations
<Button white>White Theme</Button>
<Button black>Black Theme</Button>
<Button gray1>Gray 1</Button>
<Button gray2>Gray 2</Button>
<Button gray3>Gray 3</Button>
<Button gray4>Gray 4</Button>
<Button gray5>Gray 5</Button>
<Button one>Primary Blue</Button>
<Button two>Secondary Blue</Button>
<Button three>Third Blue</Button>
<Button four>Fourth Blue</Button>
<Button five>Fifth Blue</Button>
<Button six>Sixth Blue</Button>
<Button seven>Seventh Blue</Button>
<Button success>Success Green</Button>
<Button warning>Warning Orange</Button>
<Button danger>Danger Red</Button>

// Button with inverse colors
<Button white_inv>Inverted White</Button>
<Button one_inv>Inverted Primary</Button>
<Button success_inv>Inverted Success</Button>

// Button with states
<Button hoverable>Hoverable</Button>
<Button selected>Selected</Button>

// Button with border variations
<Button border1>Thin Border</Button>
<Button border2>Thick Border</Button>
<Button round1>Slightly Rounded</Button>
<Button round2>Medium Rounded</Button>
<Button round3>Very Rounded</Button>

// Button with size variations
<Button minW200>Min Width 200px</Button>
<Button maxH100>Max Height 100px</Button>

// Complex button example
<Button 
  one 
  p3 
  m2 
  round2 
  border1 
  hoverable 
  li="star" 
  ri="chevron-right"
  className="custom-button"
  style={{ fontWeight: 'bold' }}
>
  Complex Button
</Button>
```

**Props:**
- `children`: Button content
- `className`: Additional CSS classes
- `style`: Inline styles
- `li` / `leftIcon`: Left icon (string name or IconSet object)
- `ri` / `rightIcon`: Right icon
- `as`: 'button' | 'link' | 'submit' | 'reset'
- `href`: URL for link mode
- `disabled`: Disable button
- All style shortcuts (colors, margins, borders, etc.)

### Icon

Display icons with theme support.

```tsx
import { Icon } from 'fcstyle';

// Basic icon
<Icon name="user" />

// With color themes
<Icon name="chevron-down" one />
<Icon name="star" className="large-icon" />
<Icon name="heart" success />
<Icon name="warning" warning />
<Icon name="error" danger />

// With different sizes
<Icon name="user" w20 h20 />
<Icon name="star" w32 h32 />
<Icon name="chevron-right" w16 h16 />

// With spacing
<Icon name="user" m2 />
<Icon name="star" p1 />
<Icon name="heart" mt1 mr2 mb1 ml2 />

// With borders and rounding
<Icon name="user" border1 round1 />
<Icon name="star" border2 round2 />
<Icon name="circle" round3 />

// With states
<Icon name="star" hoverable />
<Icon name="heart" selected />

// With inverse colors
<Icon name="user" one_inv />
<Icon name="star" success_inv />

// As different HTML elements
<Icon name="user" as="i" />
<Icon name="star" as="span" />

// With tooltips
<Icon name="info" title="Information" />

// Complex icon example
<Icon 
  name="star" 
  one 
  w24 
  h24 
  m1 
  border1 
  round2 
  hoverable 
  title="Favorite"
  className="favorite-icon"
  style={{ cursor: 'pointer' }}
/>
```

**Props:**
- `name`: Icon name
- `className`: Additional classes
- `style`: Inline styles
- `as`: 'i' | 'span'
- `title`: Tooltip text
- All style shortcuts

### Modal

A modal dialog component that displays content in an overlay with a clickable background to close.

```tsx
import { Modal } from 'fcstyle';

// Basic modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>This is the modal content.</p>
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Modal>

// Modal with custom close handler
<Modal 
  isOpen={isOpen} 
  onClose={(event) => {
    if (confirm('Are you sure you want to close?')) {
      setIsOpen(false);
    } else {
      return false; // Cancel close
    }
  }}
>
  <h2>Unsaved Changes</h2>
  <p>You have unsaved changes. Do you really want to close?</p>
</Modal>

// Modal with styling
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  className="custom-modal"
  p4
  round3
>
  <div>Styled modal content</div>
</Modal>

// Disable overlay click to close
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  closeOnOverlayClick={false}
>
  <p>This modal can only be closed by the close button.</p>
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Modal>
```

**Props:**
- `children`: Modal content (React component)
- `isOpen`: Boolean to control modal visibility
- `onClose`: Callback function when close is requested. Return `false` to cancel close.
- `closeOnOverlayClick`: Enable/disable closing by clicking the overlay (default: true)
- `className`: Additional CSS classes
- `style`: Inline styles
- All style shortcuts (colors, margins, borders, etc.)

### Notification System

Sistema completo de notificações com hook `useNotifications` para gerenciamento centralizado. Não requer Provider - funciona direto com estado global interno.

#### Configuração Global

```tsx
// App.tsx
import { NotificationContainer } from 'fcstyle';

function App() {
  return (
    <>
      {/* NotificationContainer único e global */}
      <NotificationContainer />
      
      {/* Seu resto da aplicação */}
      <YourAppComponents />
    </>
  );
}
```

#### Hook useNotifications

```tsx
import { useNotifications } from 'fcstyle';

function MyComponent() {
  const {
    success,
    error,
    warning,
    info,
    clearAll
  } = useNotifications();

  return (
    <>
      <button onClick={() => success('Operação realizada com sucesso!')}>
        Mostrar Success
      </button>

      <button onClick={() => error('Erro ao processar dados')}>
        Mostrar Error
      </button>

      <button onClick={() => warning('Atenção: verifique os campos')}>
        Mostrar Warning
      </button>

      <button onClick={() => info('Nova atualização disponível')}>
        Mostrar Info
      </button>

      <button onClick={clearAll}>
        Limpar Todas
      </button>
    </>
  );
}
```

#### Métodos do Hook

- `success(message, options?)` - Notificação de sucesso (verde)
- `error(message, options?)` - Notificação de erro (vermelho)
- `warning(message, options?)` - Notificação de aviso (laranja)
- `info(message, options?)` - Notificação informativa (azul)
- `clearAll()` - Remove todas as notificações

#### Opções das Notificações

```tsx
const options = {
  title: 'Título opcional',           // Título da notificação
  duration: 5000,                     // Duração em ms (0 = não fecha automaticamente)
  closable: true                      // Mostra botão de fechar
};

// Exemplos
success('Mensagem', { title: 'Sucesso!', duration: 3000 });
error('Erro crítico', { duration: 0 }); // Não fecha automaticamente
warning('Atenção', { closable: false }); // Sem botão de fechar
```

#### Características do Sistema

- ✅ **Container Global**: Um único `NotificationContainer` para toda a aplicação
- ✅ **Posicionamento Fixo**: Sempre no canto superior direito
- ✅ **Gerenciamento Centralizado**: Via hook `useNotifications`
- ✅ **Suporte Ilimitado**: Quantidade ilimitada de notificações encadeadas
- ✅ **Limitação Automática**: Máximo de 5 notificações simultâneas
- ✅ **Tipos Pré-definidos**: success, error, warning, info
- ✅ **Animações Suaves**: Entrada/saída com deslize lateral
- ✅ **Auto-close Customizável**: Timer configurável por notificação
- ✅ **Ícones Específicos**: Cada tipo tem seu ícone característico
- ✅ **Suporte a Títulos**: Títulos opcionais para as notificações
- ✅ **Estilos Centralizados**: Todos os estilos estão definidos no arquivo `notification.scss`


### Tab

A tab component that can be used horizontally or vertically to switch between different content panels.

```tsx
import { Tab } from 'fcstyle';

// Basic horizontal tabs
const horizontalTabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content for Tab 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content for Tab 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content for Tab 3</div> }
];

<Tab items={horizontalTabs} />

// Vertical tabs
const verticalTabs = [
  { id: 'profile', label: 'Profile', content: <div>Profile settings</div> },
  { id: 'security', label: 'Security', content: <div>Security options</div> },
  { id: 'notifications', label: 'Notifications', content: <div>Notification preferences</div> }
];

<Tab items={verticalTabs} orientation="vertical" />

// With custom active tab and change handler
<Tab 
  items={tabs} 
  defaultActiveId="tab2"
  onChange={(activeId) => console.log('Active tab:', activeId)}
/>

// With disabled tabs
const tabsWithDisabled = [
  { id: 'enabled', label: 'Enabled', content: <div>Enabled content</div> },
  { id: 'disabled', label: 'Disabled', content: <div>Disabled content</div>, disabled: true }
];

<Tab items={tabsWithDisabled} />

// With custom styling
<Tab 
  items={tabs}
  className="custom-tabs"
  p3
  round2
  variant="primary"
/>
```

**Props:**
- `items`: Array of tab items with `id`, `label`, `content`, and optional `disabled` properties
- `defaultActiveId`: ID of the initially active tab
- `orientation`: Layout orientation - 'horizontal' (default) or 'vertical'
- `onChange`: Callback function called when active tab changes, receives the active tab ID
- `children`: Alternative content to display (used when not providing content in items)
- `className`: Additional CSS classes
- `style`: Inline styles
- All style shortcuts (colors, margins, borders, etc.)

### Dropdown

A dropdown menu component with trigger button and menu content.

```tsx
import { Dropdown, ListItem } from 'fcstyle';

// Basic dropdown
<Dropdown label="Options">
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
  <ListItem value="option3" disabled>Disabled Option</ListItem>
</Dropdown>

// Dropdown with different directions
<Dropdown label="Options" direction="up">
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
</Dropdown>

<Dropdown label="Options" direction="left">
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
</Dropdown>

<Dropdown label="Options" direction="right">
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
</Dropdown>

// Controlled dropdown
const [isOpen, setIsOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState('');

<Dropdown 
  label="Options"
  isOpen={isOpen}
  onToggle={setIsOpen}
  selectedValue={selectedValue}
  onSelect={setSelectedValue}
>
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
  <ListItem value="option3">Option 3</ListItem>
</Dropdown>

// Dropdown with icons
<Dropdown label="Actions">
  <ListItem li="edit" value="edit">Edit</ListItem>
  <ListItem li="copy" value="copy">Copy</ListItem>
  <ListItem li="delete" value="delete" danger>Delete</ListItem>
</Dropdown>

// Dropdown with styling
<Dropdown 
  label="Styled Dropdown" 
  one 
  p2 
  m1 
  round2 
  border1
  hoverable
>
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
</Dropdown>

// Dropdown with custom positioning
<Dropdown 
  label="Positioned Dropdown"
  offset={10}
  zIndex={2000}
>
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
</Dropdown>

// Dropdown with close on click outside disabled
<Dropdown 
  label="Stay Open Dropdown"
  closeOnClickOutside={false}
  closeOnItemSelect={false}
>
  <ListItem value="option1">Option 1</ListItem>
  <ListItem value="option2">Option 2</ListItem>
</Dropdown>

// Dropdown with custom trigger (overrides label)
const [color, setColor] = useState('#ff0000');

<Dropdown
  label=""
  trigger={
    <div className="color-preview" style={{ backgroundColor: color }}>
      <Icon name="droplet" className="color-preview-icon" />
    </div>
  }
>
  <ListItem onClick={() => setColor('#ff0000')}>Red</ListItem>
  <ListItem onClick={() => setColor('#00ff00')}>Green</ListItem>
  <ListItem onClick={() => setColor('#0000ff')}>Blue</ListItem>
</Dropdown>
```

**Props:**
- `children`: Menu items (ListItem components)
- `label`: Button text
- `trigger`: Custom ReactNode for the trigger button content (if provided, it replaces `label`)
- `direction`: 'up' | 'down' | 'left' | 'right'
- `isOpen`: Controlled open state
- `onToggle`: Open state change callback
- `selectedValue`: Currently selected value
- `onSelect`: Selection callback
- `closeOnClickOutside`: Close on outside click (default: true)
- `closeOnItemSelect`: Close on item selection (default: true)
- `offset`: Positioning offset in pixels
- `zIndex`: Z-index for dropdown
- All button and style props

### Menu

Container for menu items with support for horizontal/vertical layout.

```tsx
import { Menu, ListItem, ListSeparator, ListLabel } from 'fcstyle';

// Basic vertical menu
<Menu>
  <ListLabel>Actions</ListLabel>
  <ListItem li="edit">Edit</ListItem>
  <ListItem li="copy">Copy</ListItem>
  <ListSeparator />
  <ListItem li="delete" danger>Delete</ListItem>
</Menu>

// Horizontal menu
<Menu horizontal>
  <ListItem>Home</ListItem>
  <ListItem>About</ListItem>
  <ListItem>Contact</ListItem>
</Menu>

// Menu with selection
<Menu selectedValue="edit">
  <ListItem value="edit" li="edit">Edit</ListItem>
  <ListItem value="copy" li="copy">Copy</ListItem>
  <ListItem value="delete" li="delete" danger>Delete</ListItem>
</Menu>

// Menu with styling
<Menu one p2 m1 round2 border1>
  <ListItem li="user">Profile</ListItem>
  <ListItem li="settings">Settings</ListItem>
</Menu>

// Menu with all components
<Menu>
  <ListLabel>Navigation</ListLabel>
  <ListItem li="home" ri="chevron-right" value="home">Home</ListItem>
  <ListItem li="user" ri="chevron-right" value="profile">Profile</ListItem>
  <ListSeparator />
  <ListLabel>Actions</ListLabel>
  <ListItem li="edit" value="edit">Edit</ListItem>
  <ListItem li="copy" value="copy">Copy</ListItem>
  <ListItem li="delete" value="delete" danger>Delete</ListItem>
</Menu>
```

**Props:**
- `children`: Menu content
- `horizontal`: Horizontal layout
- `selectedValue`: Selected item value
- `onItemSelect`: Selection callback
- All style shortcuts

### ListItem

Individual menu item with icon support.

```tsx
<ListItem li="user" ri="chevron-right" value="profile">
  Profile
</ListItem>

// With different icons
<ListItem li="edit" value="edit">Edit</ListItem>
<ListItem li="copy" value="copy">Copy</ListItem>
<ListItem li="delete" value="delete" danger>Delete</ListItem>

// With right icons only
<ListItem ri="chevron-right" value="next">Next</ListItem>
<ListItem ri="arrow-right" value="forward">Forward</ListItem>

// With left icons only
<ListItem li="home" value="home">Home</ListItem>
<ListItem li="settings" value="settings">Settings</ListItem>

// Disabled items
<ListItem li="lock" disabled value="locked">Locked</ListItem>
<ListItem disabled value="disabled">Disabled</ListItem>

// Selected items
<ListItem li="star" selected value="favorite">Favorite</ListItem>
<ListItem selected value="selected">Selected</ListItem>

// With styling
<ListItem li="user" one p2 m1 round1 hoverable value="styled">
  Styled Item
</ListItem>

// With custom classes
<ListItem li="custom" className="custom-item" value="custom">
  Custom Item
</ListItem>

// With inline styles
<ListItem 
  li="style" 
  value="styled"
  style={{ fontWeight: 'bold', color: 'blue' }}
>
  Styled Item
</ListItem>
```

**Props:**
- `children`: Item content
- `li` / `leftIcon`: Left icon
- `ri` / `rightIcon`: Right icon
- `disabled`: Disable item
- `selected`: Selected state
- `value`: Item value
- `onSelect`: Click callback
- All style shortcuts

### Input

Basic input field with validation support.

```tsx
import { Input, ValidatorControl, CommonValidators } from 'fcstyle';

const emailValidator = new ValidatorControl([
  CommonValidators.required('Email is required'),
  CommonValidators.email('Invalid email')
]);

<Input
  type="email"
  placeholder="Enter email"
  validatorControl={emailValidator}
  onValidationChange={(status, message) => console.log(status, message)}
/>

// Input with different types
<Input type="text" placeholder="Text input" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="tel" placeholder="Phone" />
<Input type="url" placeholder="Website" />
<Input type="search" placeholder="Search" />

// Input with styling
<Input 
  type="text" 
  placeholder="Styled input"
  one 
  p2 
  m1 
  round2 
  border1
  hoverable
/>

// Input with validation states
<Input 
  type="email"
  placeholder="Email with validation"
  validatorControl={emailValidator}
  className="email-input"
/>

// Input with custom onChange
<Input 
  type="text"
  placeholder="Custom change handler"
  onChange={(value) => console.log('Value changed:', value)}
/>

// Input with all props combined
<Input
  type="email"
  placeholder="Complete example"
  validatorControl={emailValidator}
  onChange={(value) => console.log(value)}
  onValidationChange={(status, message) => console.log(status, message)}
  className="custom-input"
  style={{ fontSize: '16px' }}
  one
  p3
  m2
  round2
  border1
  hoverable
  disabled={false}
  required
/>
```

**Props:**
- `validatorControl`: Validation controller
- `onChange`: Value change callback
- `onValidationChange`: Validation status callback
- All standard input props and style shortcuts

### InputField

Input with label and error message display.

```tsx
<InputField
  label="Email"
  type="email"
  placeholder="Enter email"
  validatorControl={emailValidator}
  errorMessage="Please enter a valid email"
/>

// InputField with different types
<InputField
  label="Password"
  type="password"
  placeholder="Enter password"
/>

<InputField
  label="Age"
  type="number"
  placeholder="Enter age"
/>

// InputField with styling
<InputField
  label="Styled Field"
  type="text"
  placeholder="Styled input"
  one
  p2
  m1
  round2
  border1
  hoverable
/>

// InputField with custom error message
<InputField
  label="Custom Error"
  type="email"
  placeholder="Enter email"
  errorMessage="Custom error message"
/>

// InputField with validation
<InputField
  label="Validated Email"
  type="email"
  placeholder="Enter email"
  validatorControl={emailValidator}
/>

// InputField with all props combined
<InputField
  label="Complete Example"
  type="email"
  placeholder="Enter email"
  validatorControl={emailValidator}
  errorMessage="Please enter a valid email"
  className="custom-field"
  style={{ fontSize: '16px' }}
  one
  p3
  m2
  round2
  border1
  hoverable
  disabled={false}
  required
/>
```

**Props:**
- `label`: Field label
- `errorMessage`: Custom error message
- All Input props

## Advanced Input Components

FCStyle provides a comprehensive set of specialized input components for different use cases, all following the same philosophy and validation patterns.

### ColorInput

Input for color selection with integrated color picker.

```tsx
import { ColorInput } from 'fcstyle';

// Basic color input
<ColorInput
  placeholder="Selecione uma cor"
  value="#ff0000"
  onChange={(color) => console.log(color)}
/>

// With validation
const colorValidator = new ValidatorControl([
  CommonValidators.required('Cor é obrigatória'),
  CommonValidators.pattern(/^#[0-9A-F]{6}$/i, 'Formato inválido')
]);

<ColorInput
  leftIcon="palette"
  validatorControl={colorValidator}
  onChange={(color) => setSelectedColor(color)}
/>
```

**Props:**
- `leftIcon`: Left icon name
- `onChange`: Color change callback
- All standard input and validation props

Note: The color picker dropdown now shows the selected color directly in its trigger (no separate preview button).

### NumberInput

Input specifically for numeric values with automatic validation.

```tsx
import { NumberInput } from 'fcstyle';

// Basic number input
<NumberInput
  placeholder="Digite um número"
  min={0}
  max={100}
  leftIcon="calculator"
  onChange={(value) => console.log(value)}
/>

// With validation
const numberValidator = new ValidatorControl([
  CommonValidators.required('Número é obrigatório'),
  CommonValidators.min(0, 'Deve ser positivo'),
  CommonValidators.max(100, 'Máximo 100')
]);

<NumberInput
  validatorControl={numberValidator}
  loading={isValidating}
  onChange={(value) => setNumber(parseFloat(value))}
/>
```

**Props:**
- `leftIcon`: Left icon name
- `loading`: Show loading spinner
- `onChange`: Value change callback
- All standard input and validation props

### TextInput

General text input with mask support and textarea option. Features clickable icons that focus the input and visual states applied to the container. Uses a flexible CSS system with custom properties for responsive icon and padding management.

```tsx
import { TextInput } from 'fcstyle';

// Basic text input with clickable left icon
<TextInput
  placeholder="Digite seu texto"
  leftIcon="user"
  onChange={(value) => console.log(value)}
/>

// As textarea with icon
<TextInput
  placeholder="Digite seu comentário"
  asTextarea
  areaRows={4}
  leftIcon="comment"
  onChange={(value) => setComment(value)}
/>

// With mask and validation
<TextInput
  placeholder="(00) 00000-0000"
  mask="(99) 99999-9999"
  leftIcon="phone"
  validatorControl={phoneValidator}
  onChange={(value) => setPhone(value)}
/>

// With different icon sizes and spacing
<TextInput
  placeholder="Large icons"
  leftIcon="search"
  className="input-large-icons"
  one p br b
/>

<TextInput
  placeholder="Small icons"
  leftIcon="search"
  className="input-small-icons"
  one p br b
/>

<TextInput
  placeholder="Tight spacing"
  leftIcon="search"
  className="input-tight"
  one p br b
/>

<TextInput
  placeholder="Loose spacing"
  leftIcon="search"
  className="input-loose"
  one p br b
/>
```

**Key Features:**
- **Clickable Icons**: Left icon acts as a label that focuses the input when clicked
- **Container States**: Focus, valid, and invalid states are applied to the div container
- **Flexible Layout**: Input takes full available space with automatic padding adjustment
- **Dynamic Spacing**: CSS custom properties automatically calculate spacing based on icon size
- **Responsive Icons**: Support for different icon sizes (small, normal, large)
- **Accessibility**: Proper label association with input for screen readers

**CSS Architecture:**
- Uses CSS Custom Properties for dynamic calculations
- `flex: 1` ensures input takes all available space
- Automatic padding adjustment based on icon presence and size
- Supports icon size variations via CSS classes

**Props:**
- `leftIcon`: Left icon name (clickable, focuses input)
- `loading`: Show loading spinner on right
- `asTextarea`: Render as textarea
- `areaRows`: Textarea rows (default: 3)
- `mask`: Input mask pattern
- `validatorControl`: Validation controller
- All standard input props and style shortcuts

**CSS Modifier Classes:**
- `input-large-icons`: Larger icons (1.5rem)
- `input-small-icons`: Smaller icons (1rem)
- `input-tight`: Reduced side spacing
- `input-loose`: Increased side spacing

**Mask Patterns:**
- `9`: Numeric digit
- `A`: Uppercase letter
- `a`: Lowercase letter
- `*`: Any character

### CheckboxInput

Checkbox with enhanced styling and validation.

```tsx
import { CheckboxInput } from 'fcstyle';

// Basic checkbox
<CheckboxInput
  label="Aceito os termos de uso"
  icon="shield-check"
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
/>

// With validation
const termsValidator = new ValidatorControl([
  CommonValidators.custom(
    (value) => value === 'true' ? ValidationStatus.Valid : ValidationStatus.Invalid,
    'Você deve aceitar os termos'
  )
]);

<CheckboxInput
  label="Aceito os termos"
  validatorControl={termsValidator}
  onChange={(checked) => setAcceptedTerms(checked)}
/>
```

**Props:**
- `label`: Checkbox label
- `icon`: Icon name
- `loading`: Show loading spinner
- `onChange`: Checked state callback
- All standard input and validation props

### RadioInput

Radio button group with multiple options.

```tsx
import { RadioInput } from 'fcstyle';

const options = [
  { value: 'option1', label: 'Opção 1', icon: 'star' },
  { value: 'option2', label: 'Opção 2', icon: 'heart' },
  { value: 'option3', label: 'Opção 3', disabled: true }
];

// Basic radio group
<RadioInput
  name="choice"
  options={options}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
/>

// Horizontal layout
<RadioInput
  name="choice"
  options={options}
  direction="horizontal"
  onChange={(value) => setChoice(value)}
/>
```

**Props:**
- `name`: Radio group name
- `options`: Array of radio options
- `value`: Selected value
- `direction`: 'vertical' | 'horizontal'
- `loading`: Show loading spinner
- `onChange`: Selection callback
- All validation props

### FileInput

File upload with drag & drop, preview, and validation.

```tsx
import { FileInput } from 'fcstyle';

// Basic file input
<FileInput
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  onChange={(files) => console.log(files)}
  onError={(error) => console.error(error)}
/>

// With restrictions
<FileInput
  maxFiles={3}
  allowedTypes={['image/jpeg', 'image/png']}
  showPreview
  dragAndDrop
  onChange={(files) => setSelectedFiles(files)}
/>
```

**Props:**
- `maxSize`: Maximum file size in bytes
- `maxFiles`: Maximum number of files
- `showPreview`: Show file previews
- `allowedTypes`: Array of allowed MIME types
- `dragAndDrop`: Enable drag & drop
- `onError`: Error callback
- All standard input and validation props

### SliderInput

Range slider for numeric values.

```tsx
import { SliderInput } from 'fcstyle';

// Basic slider
<SliderInput
  min={0}
  max={100}
  step={1}
  value={50}
  onChange={(value) => console.log(value)}
  showValue
  unit="%"
/>

// With marks
const marks = [
  { value: 0, label: 'Min' },
  { value: 50, label: 'Mid' },
  { value: 100, label: 'Max' }
];

<SliderInput
  min={0}
  max={100}
  marks={marks}
  formatValue={(value) => `${value}%`}
  onChange={(value) => setSliderValue(value)}
/>
```

**Props:**
- `min`, `max`, `step`: Range configuration
- `showValue`: Display current value
- `unit`: Value unit suffix
- `formatValue`: Custom value formatter
- `marks`: Array of slider marks
- All validation props

### SwitchInput

Toggle switch with multiple sizes and colors.

```tsx
import { SwitchInput } from 'fcstyle';

// Basic switch
<SwitchInput
  checked={isEnabled}
  onChange={(checked) => setIsEnabled(checked)}
  label="Ativar notificações"
  leftIcon="bell"
/>

// Different sizes and colors
<SwitchInput
  size="large"
  color="success"
  labelPosition="left"
  onChange={(checked) => setFeatureEnabled(checked)}
/>
```

**Props:**
- `label`: Switch label
- `leftIcon`: Left icon name
- `size`: 'small' | 'medium' | 'large'
- `color`: 'primary' | 'success' | 'warning' | 'danger'
- `labelPosition`: 'left' | 'right'
- All validation props

### DateInput

Date selection with format support.

```tsx
import { DateInput } from 'fcstyle';

// Basic date input
<DateInput
  value="2023-12-25"
  onChange={(date) => console.log(date)}
  min="2023-01-01"
  max="2023-12-31"
  leftIcon="calendar"
/>

// Different formats
<DateInput
  format="DD/MM/YYYY"
  onChange={(date) => setSelectedDate(date)}
/>
```

**Props:**
- `format`: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY'
- `showCalendarIcon`: Show calendar icon
- All standard input and validation props

### TimeInput

Time selection with format options.

```tsx
import { TimeInput } from 'fcstyle';

// Basic time input
<TimeInput
  value="14:30"
  onChange={(time) => console.log(time)}
  step={60}
  leftIcon="clock"
/>

// With seconds and 12h format
<TimeInput
  format="12h"
  showSeconds
  onChange={(time) => setSelectedTime(time)}
/>
```

**Props:**
- `format`: '12h' | '24h'
- `showSeconds`: Include seconds
- `showClockIcon`: Show clock icon
- All standard input and validation props

### DatetimeInput

Combined date and time selection.

```tsx
import { DatetimeInput } from 'fcstyle';

// Basic datetime input
<DatetimeInput
  value="2023-12-25T14:30"
  onChange={(datetime) => console.log(datetime)}
  min="2023-01-01T00:00"
  max="2023-12-31T23:59"
  leftIcon="calendar-clock"
/>

// With seconds and "now" button
<DatetimeInput
  showSeconds
  onChange={(datetime) => setSelectedDatetime(datetime)}
/>
```

**Props:**
- `showSeconds`: Include seconds
- `showCalendarIcon`: Show calendar icon
- All standard input and validation props

### TagsInput

Tag/chip input with autocomplete.

```tsx
import { TagsInput } from 'fcstyle';

// Basic tags input
<TagsInput
  value={['React', 'TypeScript', 'CSS']}
  onChange={(tags) => setTags(tags)}
  placeholder="Digite uma tag..."
/>

// With suggestions and limits
<TagsInput
  suggestions={['JavaScript', 'Vue', 'Angular', 'React', 'TypeScript']}
  maxTags={10}
  allowCustomTags
  tagColor="primary"
  onChange={(tags) => setSelectedTags(tags)}
/>
```

**Props:**
- `suggestions`: Array of suggested tags
- `maxTags`: Maximum number of tags
- `allowDuplicates`: Allow duplicate tags
- `separator`: Array of separators
- `tagColor`: Tag color theme
- `allowCustomTags`: Allow custom tags
- `minLength`, `maxLength`: Tag length limits
- All validation props

## Grid System

### Place

Fundamental layout component with flexbox support.

```tsx
import { Place } from 'fcstyle';

// Flex column with gap
<Place column gap2>
  <div>Item 1</div>
  <div>Item 2</div>
</Place>

// Centered content
<Place justifyCenter alignCenter>
  <div>Centered</div>
</Place>

// Place with different flex directions
<Place row>Horizontal layout</Place>
<Place column>Vertical layout</Place>
<Place row-reverse>Horizontal reverse</Place>
<Place column-reverse>Vertical reverse</Place>

// Place with flex wrap
<Place flexWrap>Wrap items</Place>
<Place flexNowrap>No wrap</Place>
<Place flexWrapReverse>Wrap reverse</Place>

// Place with justify content
<Place justifyStart>Start alignment</Place>
<Place justifyEnd>End alignment</Place>
<Place justifyCenter>Center alignment</Place>
<Place justifyBetween>Space between</Place>
<Place justifyAround>Space around</Place>
<Place justifyEvenly>Space evenly</Place>

// Place with align items
<Place alignStart>Align start</Place>
<Place alignEnd>Align end</Place>
<Place alignCenter>Align center</Place>
<Place alignStretch>Align stretch</Place>
<Place alignBaseline>Align baseline</Place>

// Place with gaps
<Place gap0>No gap</Place>
<Place gap1>Small gap</Place>
<Place gap2>Medium gap</Place>
<Place gap3>Large gap</Place>
<Place gap4>Extra large gap</Place>
<Place gap5>Huge gap</Place>

// Place with colors
<Place white>White background</Place>
<Place black>Black background</Place>
<Place one>Primary color</Place>
<Place success>Success color</Place>
<Place danger>Danger color</Place>

// Place with spacing
<Place p1>Padding 1</Place>
<Place p2>Padding 2</Place>
<Place m1>Margin 1</Place>
<Place m2>Margin 2</Place>

// Place with borders
<Place border1>Thin border</Place>
<Place border2>Thick border</Place>
<Place round1>Slightly rounded</Place>
<Place round2>Medium rounded</Place>
<Place round3>Very rounded</Place>

// Place with sizes
<Place w100>Full width</Place>
<Place h50>Half height</Place>
<Place minW200>Min width 200px</Place>
<Place maxH300>Max height 300px</Place>

// Complex Place example
<Place 
  column 
  gap3 
  one 
  p3 
  m2 
  round2 
  border1 
  hoverable
  justifyCenter 
  alignCenter
  className="custom-place"
  style={{ minHeight: '200px' }}
>
  <div>Centered content</div>
  <Button>Action button</Button>
</Place>
```

**Props:**
- `children`: Content
- `pointer`: Add pointer cursor
- All flex, color, margin, padding, border, size shortcuts

### Columns

Horizontal flex container.

```tsx
<Columns gap2>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Columns>

// Columns with different gaps
<Columns gap0>No gap</Columns>
<Columns gap1>Small gap</Columns>
<Columns gap2>Medium gap</Columns>
<Columns gap3>Large gap</Columns>
<Columns gap4>Extra large gap</Columns>
<Columns gap5>Huge gap</Columns>

// Columns with colors
<Columns white>White background</Columns>
<Columns black>Black background</Columns>
<Columns one>Primary color</Columns>
<Columns success>Success color</Columns>
<Columns danger>Danger color</Columns>

// Columns with spacing
<Columns p1>Padding 1</Columns>
<Columns p2>Padding 2</Columns>
<Columns m1>Margin 1</Columns>
<Columns m2>Margin 2</Columns>

// Columns with borders
<Columns border1>Thin border</Columns>
<Columns border2>Thick border</Columns>
<Columns round1>Slightly rounded</Columns>
<Columns round2>Medium rounded</Columns>
<Columns round3>Very rounded</Columns>

// Columns with sizes
<Columns w100>Full width</Columns>
<Columns h50>Half height</Columns>
<Columns minW200>Min width 200px</Columns>
<Columns maxH300>Max height 300px</Columns>

// Columns with justify content
<Columns justifyStart>Start alignment</Columns>
<Columns justifyEnd>End alignment</Columns>
<Columns justifyCenter>Center alignment</Columns>
<Columns justifyBetween>Space between</Columns>
<Columns justifyAround>Space around</Columns>
<Columns justifyEvenly>Space evenly</Columns>

// Columns with align items
<Columns alignStart>Align start</Columns>
<Columns alignEnd>Align end</Columns>
<Columns alignCenter>Align center</Columns>
<Columns alignStretch>Align stretch</Columns>
<Columns alignBaseline>Align baseline</Columns>

// Complex Columns example
<Columns 
  gap3 
  one 
  p3 
  m2 
  round2 
  border1 
  hoverable
  justifyCenter 
  alignCenter
  className="custom-columns"
  style={{ minHeight: '100px' }}
>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Columns>
```

### Rows

Vertical flex container.

```tsx
<Rows gap1>
  <div>Row 1</div>
  <div>Row 2</div>
</Rows>

// Rows with different gaps
<Rows gap0>No gap</Rows>
<Rows gap1>Small gap</Rows>
<Rows gap2>Medium gap</Rows>
<Rows gap3>Large gap</Rows>
<Rows gap4>Extra large gap</Rows>
<Rows gap5>Huge gap</Rows>

// Rows with colors
<Rows white>White background</Rows>
<Rows black>Black background</Rows>
<Rows one>Primary color</Rows>
<Rows success>Success color</Rows>
<Rows danger>Danger color</Rows>

// Rows with spacing
<Rows p1>Padding 1</Rows>
<Rows p2>Padding 2</Rows>
<Rows m1>Margin 1</Rows>
<Rows m2>Margin 2</Rows>

// Rows with borders
<Rows border1>Thin border</Rows>
<Rows border2>Thick border</Rows>
<Rows round1>Slightly rounded</Rows>
<Rows round2>Medium rounded</Rows>
<Rows round3>Very rounded</Rows>

// Rows with sizes
<Rows w100>Full width</Rows>
<Rows h50>Half height</Rows>
<Rows minW200>Min width 200px</Rows>
<Rows maxH300>Max height 300px</Rows>

// Rows with justify content
<Rows justifyStart>Start alignment</Rows>
<Rows justifyEnd>End alignment</Rows>
<Rows justifyCenter>Center alignment</Rows>
<Rows justifyBetween>Space between</Rows>
<Rows justifyAround>Space around</Rows>
<Rows justifyEvenly>Space evenly</Rows>

// Rows with align items
<Rows alignStart>Align start</Rows>
<Rows alignEnd>Align end</Rows>
<Rows alignCenter>Align center</Rows>
<Rows alignStretch>Align stretch</Rows>
<Rows alignBaseline>Align baseline</Rows>

// Complex Rows example
<Rows 
  gap3 
  one 
  p3 
  m2 
  round2 
  border1 
  hoverable
  justifyCenter 
  alignCenter
  className="custom-rows"
  style={{ minWidth: '200px' }}
>
  <div>Row 1</div>
  <div>Row 2</div>
  <div>Row 3</div>
</Rows>
```

### Divisor

Resizable divider component.

```tsx
<Divisor
  direction="vertical"
  initialSize={200}
  minSize={100}
  maxSize={400}
  onResize={(size) => console.log('New size:', size)}
/>

// Vertical divisor
<Divisor
  direction="vertical"
  initialSize={200}
  minSize={100}
  maxSize={400}
  thickness={4}
  onResize={(size) => console.log('Vertical size:', size)}
/>

// Horizontal divisor
<Divisor
  direction="horizontal"
  initialSize={150}
  minSize={50}
  maxSize={300}
  thickness={6}
  onResize={(size) => console.log('Horizontal size:', size)}
/>

// Divisor with localStorage persistence
<Divisor
  direction="vertical"
  name="sidebar-width"
  initialSize={250}
  minSize={150}
  maxSize={500}
  onResize={(size) => console.log('Persistent size:', size)}
/>

// Divisor with custom thickness
<Divisor
  direction="vertical"
  initialSize={200}
  minSize={100}
  maxSize={400}
  thickness={8}
  onResize={(size) => console.log('Thick size:', size)}
/>

// Divisor with all props
<Divisor
  direction="horizontal"
  name="content-height"
  initialSize={200}
  minSize={100}
  maxSize={400}
  thickness={4}
  className="custom-divisor"
  style={{ backgroundColor: '#ccc' }}
  onResize={(size) => console.log('Complete size:', size)}
/>
```

**Props:**
- `direction`: 'vertical' | 'horizontal'
- `name`: LocalStorage key for size persistence
- `initialSize`: Initial size in pixels
- `minSize`: Minimum size
- `maxSize`: Maximum size
- `thickness`: Divider thickness
- `onResize`: Size change callback

## Style Shortcuts

FCStyle provides extensive prop-based styling through shortcuts.

### Color Shortcuts

```tsx
// Theme colors
<Component white />        // White theme
<Component black />        // Black theme
<Component one />          // Primary blue
<Component success />      // Green
<Component danger />       // Red

// Inverse colors
<Component white_inv />    // Inverted white
<Component one_inv />      // Inverted primary

// States
<Component hoverable />    // Add hover effects
<Component selected />     // Selected state
```

### Spacing Shortcuts

```tsx
// Margins
<Component m2 />           // margin: 0.35rem
<Component mt3 />          // margin-top: 0.5rem
<Component mr0 />          // margin-right: 0
<Component mb4 />          // margin-bottom: 0.65rem
<Component ml5 />          // margin-left: 0.8rem
<Component mx2 />          // margin-left/right: 0.35rem
<Component my1 />          // margin-top/bottom: 0.2rem

// Padding
<Component p3 />           // padding: 0.5rem
<Component pt1 />          // padding-top: 0.2rem
<Component pr4 />          // padding-right: 0.65rem
<Component pb2 />          // padding-bottom: 0.35rem
<Component pl5 />          // padding-left: 0.8rem
<Component px3 />          // padding-left/right: 0.5rem
<Component py0 />          // padding-top/bottom: 0
```

### Flex Shortcuts

```tsx
// Direction
<Component row />          // flex-direction: row
<Component column />       // flex-direction: column

// Wrap
<Component flexWrap />     // flex-wrap: wrap
<Component flexNowrap />   // flex-wrap: nowrap

// Justify
<Component justifyCenter /> // justify-content: center
<Component justifyBetween /> // justify-content: space-between

// Align
<Component alignCenter />   // align-items: center
<Component alignStretch />  // align-items: stretch

// Gap
<Component gap2 />         // gap: 0.35rem
<Component gap4 />         // gap: 0.65rem
```

### Border Shortcuts

```tsx
<Component border1 />      // border-width: 1px
<Component border2 />      // border-width: 1.5px
<Component round2 />       // border-radius: 6px
<Component round3 />       // border-radius: 8px
```

### Size Shortcuts

```tsx
<Component w100 />         // width: 100%
<Component h50 />          // height: 50%
<Component minW200 />      // min-width: 200px
<Component maxH300 />      // max-height: 300px
```

## Validation System

### ValidatorControl

Manages validation for form fields.

```tsx
import { ValidatorControl, CommonValidators } from 'fcstyle';

const validator = new ValidatorControl([
  CommonValidators.required('This field is required'),
  CommonValidators.minLength(3, 'Must be at least 3 characters'),
  CommonValidators.email('Invalid email format')
]);

// Use with Input
<Input validatorControl={validator} />

// Manual validation
const result = validator.validate();
console.log(result.status); // 'valid' | 'invalid' | 'pristine'
console.log(result.messages); // Array of error messages
```

### CommonValidators

Pre-built validation functions:

```tsx
CommonValidators.required(message)
CommonValidators.minLength(min, message)
CommonValidators.maxLength(max, message)
CommonValidators.email(message)
CommonValidators.numeric(message)
CommonValidators.min(min, message)
CommonValidators.max(max, message)
CommonValidators.pattern(regex, message)
CommonValidators.custom(validatorFunction, message)
```

### FormManager

Manages multiple form fields and their validation.

```tsx
import { FormManager } from 'fcstyle';

const formConfig = {
  email: {
    validators: [CommonValidators.required(), CommonValidators.email()],
    initialValue: ''
  },
  password: {
    validators: [CommonValidators.required(), CommonValidators.minLength(8)],
    initialValue: ''
  }
};

const formManager = new FormManager(formConfig);

// Validate all fields
const result = formManager.validate();
if (result.isValid) {
  // Submit form
}

// Get field value
const emailValue = formManager.getValue('email');

// Set field value
formManager.setValue('password', 'newpassword');
```

## Theming

### Applying Custom Themes

```tsx
import { applyTheme } from 'fcstyle';

// Apply custom CSS variables
applyTheme({
  '--fcstyle-one-bg': '#ff0000',
  '--fcstyle-one-color': '#ffffff',
  '--fcstyle-success-bg': '#00ff00'
});
```

### Available Theme Variables

The framework uses CSS custom properties for theming. Each color theme has variables for:
- `--{color}-bg`: Background color
- `--{color}-color`: Text color
- `--{color}-border`: Border color
- `--{color}-hover-bg`: Hover background
- `--{color}-hover-color`: Hover text
- `--{color}-selected-bg`: Selected background
- `--{color}-selected-color`: Selected text

## Advanced Usage

### Custom Components

Create custom components using the classBuilder system:

```tsx
import { classBuilder, ColorBuilder, MarginBuilder } from 'fcstyle';

interface CustomCardProps {
  children: React.ReactNode;
  title?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, title }) => {
  const { classNames } = classBuilder('custom-card', 'white', 'border1', 'round2')
    .addBuilder(ColorBuilder)
    .addBuilder(MarginBuilder)
    .build(props);

  return (
    <div className={classNames}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};
```

### Extending Validators

```tsx
import { IValidator, ValidationStatus } from 'fcstyle';

const customValidator: IValidator = {
  name: 'phone',
  message: 'Invalid phone number',
  validator: (value: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(value) ? ValidationStatus.Valid : ValidationStatus.Invalid;
  }
};
```

## Complete Examples

### Login Form

```tsx
import { Place, Rows, Columns, InputField, Button, ValidatorControl, CommonValidators } from 'fcstyle';

const LoginForm = () => {
  const emailValidator = new ValidatorControl([
    CommonValidators.required('Email is required'),
    CommonValidators.email('Invalid email')
  ]);

  const passwordValidator = new ValidatorControl([
    CommonValidators.required('Password is required'),
    CommonValidators.minLength(6, 'Password must be at least 6 characters')
  ]);

  return (
    <Place column gap3 one p4 round2 border1 style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        validatorControl={emailValidator}
      />
      
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        validatorControl={passwordValidator}
      />
      
      <Columns gap2>
        <Button success flex1>Login</Button>
        <Button white flex1>Forgot Password</Button>
      </Columns>
    </Place>
  );
};
```

### Navigation Menu

```tsx
import { Place, Menu, ListItem, ListSeparator, ListLabel } from 'fcstyle';

const Navigation = () => {
  return (
    <Place column gap0 one border1 round2 style={{ width: '250px' }}>
      <Menu selectedValue="dashboard">
        <ListLabel>Dashboard</ListLabel>
        <ListItem li="home" value="dashboard">Dashboard</ListItem>
        
        <ListSeparator />
        <ListLabel>Management</ListLabel>
        <ListItem li="users" value="users">Users</ListItem>
        <ListItem li="settings" value="settings">Settings</ListItem>
        <ListItem li="reports" value="reports">Reports</ListItem>
        
        <ListSeparator />
        <ListLabel>System</ListLabel>
        <ListItem li="database" value="database">Database</ListItem>
        <ListItem li="server" value="server">Server</ListItem>
        <ListItem li="logs" value="logs">Logs</ListItem>
      </Menu>
    </Place>
  );
};
```

### Data Table

```tsx
import { Place, Rows, Columns, Button, Icon } from 'fcstyle';

const DataTable = () => {
  const headers = ['Name', 'Email', 'Status', 'Actions'];
  const data = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' }
  ];

  return (
    <Place column gap0 white border1 round2>
      {/* Header */}
      <Rows gap0 border1 style={{ backgroundColor: '#f5f5f5' }}>
        {headers.map(header => (
          <Place p3 key={header} style={{ fontWeight: 'bold' }}>
            {header}
          </Place>
        ))}
      </Rows>
      
      {/* Data Rows */}
      {data.map((row, index) => (
        <Rows key={index} gap0 border1>
          <Place p3>{row.name}</Place>
          <Place p3>{row.email}</Place>
          <Place p3>
            <span className={row.status === 'Active' ? 'success' : 'danger'}>
              {row.status}
            </span>
          </Place>
          <Place p3>
            <Columns gap1>
              <Button one p1 round1>
                <Icon name="edit" />
              </Button>
              <Button danger p1 round1>
                <Icon name="trash" />
              </Button>
            </Columns>
          </Place>
        </Rows>
      ))}
    </Place>
  );
};
```

### Dashboard Layout

```tsx
import { Place, Rows, Columns, Button, Icon, Dropdown, ListItem } from 'fcstyle';

const Dashboard = () => {
  return (
    <Place column gap0 style={{ height: '100vh' }}>
      {/* Header */}
      <Place one p3 border1>
        <Columns justifyBetween alignCenter>
          <h1>Dashboard</h1>
          <Columns gap2 alignCenter>
            <Button white>
              <Icon name="bell" />
            </Button>
            <Dropdown label="User Menu">
              <ListItem li="user">Profile</ListItem>
              <ListItem li="settings">Settings</ListItem>
              <ListItem li="logout" danger>Logout</ListItem>
            </Dropdown>
          </Columns>
        </Columns>
      </Place>
      
      {/* Main Content */}
      <Place flex1 p3>
        <Columns gap3>
          {/* Sidebar */}
          <Place column gap3 style={{ width: '250px' }}>
            <Place white p3 round2 border1>
              <h3>Quick Stats</h3>
              <Rows gap2>
                <Columns justifyBetween>
                  <span>Users:</span>
                  <strong>1,234</strong>
                </Columns>
                <Columns justifyBetween>
                  <span>Revenue:</span>
                  <strong>$12,345</strong>
                </Columns>
                <Columns justifyBetween>
                  <span>Orders:</span>
                  <strong>567</strong>
                </Columns>
              </Rows>
            </Place>
            
            <Place white p3 round2 border1>
              <h3>Recent Activity</h3>
              <Rows gap2>
                <div>New user registered</div>
                <div>Order #123 completed</div>
                <div>Payment received</div>
              </Rows>
            </Place>
          </Place>
          
          {/* Main Area */}
          <Place flex1 column gap3>
            <Place white p3 round2 border1>
              <h3>Main Content</h3>
              <p>This is the main content area of the dashboard.</p>
            </Place>
            
            <Columns gap3>
              <Place white p3 round2 border1 flex1>
                <h4>Chart 1</h4>
                <p>Chart content here</p>
              </Place>
              <Place white p3 round2 border1 flex1>
                <h4>Chart 2</h4>
                <p>Chart content here</p>
              </Place>
            </Columns>
          </Place>
        </Columns>
      </Place>
    </Place>
  );
};
```

### Modal Dialog

```tsx
import { Place, Rows, Columns, Button, InputField } from 'fcstyle';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <Place 
      justifyCenter 
      alignCenter 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)' 
      }}
    >
      <Place 
        column 
        gap3 
        white 
        p4 
        round2 
        border1 
        style={{ minWidth: '400px', maxWidth: '600px' }}
      >
        <Rows justifyBetween alignCenter>
          <h2>{title}</h2>
          <Button white p1 round1 onClick={onClose}>
            ✕
          </Button>
        </Rows>
        
        {children}
        
        <Columns justifyEnd gap2>
          <Button white onClick={onClose}>Cancel</Button>
          <Button one>Save</Button>
        </Columns>
      </Place>
    </Place>
  );
};
```

## Best Practices

1. **Use semantic color names**: Prefer `success`, `danger` over specific colors for better theme support
2. **Leverage shortcuts**: Use prop shortcuts instead of custom CSS when possible
3. **Validate early**: Use ValidatorControl for form validation
4. **Theme consistently**: Apply themes at the root level for global consistency
5. **Responsive design**: Use flex utilities for responsive layouts

## Migration Guide

### From CSS Classes to Props

```tsx
// Old way
<div className="bg-primary text-white p-3 m-2 rounded">
  Content
</div>

// New way
<Place one p3 m2 round2>
  Content
</Place>
```

### From Other Frameworks

FCStyle's prop-based system is similar to styled-components but with better performance through CSS classes.

## Editor Components

### SourceSample

Component para exibição de códigos exemplos com syntax highlighting e botão de cópia.

```tsx
import SourceSample from './components/SourceSample';

// Exemplo básico
const codeExample = `import { Button } from 'fcstyle';

<Button one>
  Click me
</Button>`;

<SourceSample code={codeExample} />

// Com linguagem específica
<SourceSample 
  code={jsCode} 
  language="javascript" 
/>

// Com classe personalizada
<SourceSample 
  code={cssCode} 
  language="css"
  className="custom-sample"
/>
```

**Props:**
- `code`: Código a ser exibido (obrigatório)
- `language`: Linguagem do código (padrão: 'tsx')
- `className`: Classes CSS adicionais

**Características:**
- ✅ **Syntax Highlighting**: Destaque automático para keywords, strings e comentários
- ✅ **Botão de Cópia**: Botão flutuante no canto superior direito para copiar o código
- ✅ **Feedback Visual**: Ícone muda temporariamente após cópia bem-sucedida
- ✅ **Navegador Compatível**: Usa a API Clipboard do navegador
- ✅ **Estilo Integrado**: Usa os mesmos estilos do `.editor-code` existente
- ✅ **Responsivo**: Layout adaptável com header separado do código

**Exemplo de Uso nas Páginas:**
```tsx
import { Button, Columns } from 'fcstyle'
import SourceSample from '../../components/SourceSample'

const ButtonPage: React.FC = () => {
  const basicButtonCode = `import { Button, Columns } from 'fcstyle'

<Columns gap m>
  <Button li="save" one>Cor One</Button>
  <Button one disabled>Disabled</Button>
  <Button two href="/">As link</Button>
  <Button li="star" ri="caret-down" four>Dropdown</Button>
</Columns>`

  return (
    <div>
      <h1>Button Component</h1>
      <p>O componente Button oferece uma interface flexível para criação de botões.</p>
      
      <div className="editor-showcase">
        <Columns gap m>
          <Button li="save" one>Cor One</Button>
          <Button one disabled>Disabled</Button>
          <Button two href="/">As link</Button>
          <Button li="star" ri="caret-down" four>Dropdown</Button>
        </Columns>
      </div>

      <SourceSample code={basicButtonCode} />
    </div>
  )
}
```

## Troubleshooting

### Common Issues

1. **Styles not applying**: Ensure the CSS is imported
2. **Validation not working**: Check ValidatorControl configuration
3. **Theme not changing**: Use `applyTheme()` for dynamic theme changes

### Performance Tips

1. Use CSS classes over inline styles
2. Minimize prop changes to reduce re-renders
3. Use `React.memo` for custom components using FCStyle

## Contributing

FCStyle is designed to be extensible. To add new components:

1. Create the component using classBuilder
2. Add style utilities in SCSS
3. Export from main index
4. Add documentation

## License

MIT License - see package.json for details.