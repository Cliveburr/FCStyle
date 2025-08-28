import React, { useState } from 'react'
import { 
  ColorInput,
  NumberInput,
  TextInput,
  CheckboxInput,
  RadioInput,
  FileInput,
  SliderInput,
  SwitchInput,
  DateInput,
  TimeInput,
  DatetimeInput,
  TagsInput,
  Rows,
  Place,
  Columns,
  ValidatorControl,
  CommonValidators
} from 'fcstyle'

const InputPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [colorValue, setColorValue] = useState('#ff0000')
  const [numberValue, setNumberValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState('')
  const [sliderValue, setSliderValue] = useState(50)
  const [switchValue, setSwitchValue] = useState(false)
  const [dateValue, setDateValue] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [datetimeValue, setDatetimeValue] = useState('')
  const [tagsValue, setTagsValue] = useState<string[]>(['React', 'TypeScript'])

  const radioOptions = [
    { value: 'option1', label: 'Opção 1', icon: 'star' },
    { value: 'option2', label: 'Opção 2', icon: 'heart' },
    { value: 'option3', label: 'Opção 3', icon: 'shield' }
  ]

  const tagSuggestions = ['JavaScript', 'Vue', 'Angular', 'React', 'TypeScript', 'CSS', 'SCSS', 'HTML']

  const validControl = new ValidatorControl();
  validControl.validate();

  const invalidControl = new ValidatorControl([CommonValidators.required()]);
  invalidControl.validate();

  return (
    <div className="editor-page">
      <h1>Input Components</h1>
      <p>Explore todas as possibilidades de configuração dos componentes Input do FCStyle.</p>
      
      <Rows gap m className="editor-examples">

        <Place gap b p gray1>
          <h2>TextInput - Input de texto</h2>
          <TextInput w4
            placeholder="Nome do usuário"
            leftIcon="user"
          />
          <pre className="editor-code">
{`<ColorInput
  placeholder="Nome do usuário"
  value={colorValue}
  onChange={(color) => setColorValue(color)}
  leftIcon="user"
/>`}
          </pre>
        </Place>

        <Rows gap b p gray1>
          <h2>TextInput - Variations</h2>
          <Columns gap flexWrap>
            <TextInput w4 white placeholder="Color white" />
            <TextInput w4 black placeholder="Color black" />
            <TextInput w4 one_inv placeholder="Color one inverse" />
            <TextInput w4 two_inv placeholder="Color two inverse" />
            <TextInput w4 three_inv placeholder="Color three inverse" />
            <TextInput w4 four_inv placeholder="Color four inverse" />
            <TextInput w4 five_inv placeholder="Color five inverse" />
            <TextInput w4 six_inv placeholder="Color six inverse" />
            <TextInput w4 seven_inv placeholder="Color seven inverse" />
            <TextInput w4 gray1 placeholder="Color gray1 inverse" />
            <TextInput w4 gray2_inv placeholder="Color gray2 inverse" />
            <TextInput w4 gray3_inv placeholder="Color gray3 inverse" />
            <TextInput w4 gray4_inv placeholder="Color gray4 inverse" />
            <TextInput w4 gray5_inv placeholder="Color gray5 inverse" />
            <TextInput w4 placeholder="Simple" />
            <TextInput w4 placeholder="Disabled" leftIcon='ban' disabled />
            <TextInput w4 white placeholder="Loading" loading />
            <TextInput w4 white placeholder="Valid" validatorControl={validControl} />
            <TextInput w4 white placeholder="Invalid" validatorControl={invalidControl} />
          </Columns>
        </Rows>

        <section className="editor-example">
          <h2>ColorInput - Seletor de Cores</h2>
          <div className="editor-showcase">
            <ColorInput
              placeholder="Selecione uma cor"
              value={colorValue}
              onChange={(color) => setColorValue(color)}
              leftIcon="palette"
            />
          </div>
          <pre className="editor-code">
{`<ColorInput
  placeholder="Selecione uma cor"
  value={colorValue}
  onChange={(color) => setColorValue(color)}
  leftIcon="palette"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>NumberInput - Apenas Números</h2>
          <div className="editor-showcase">
            <NumberInput
              placeholder="Digite um número (0-100)"
              value={numberValue}
              onChange={(value) => setNumberValue(value)}
              leftIcon="calculator"
            />
          </div>
          <pre className="editor-code">
{`<NumberInput
  placeholder="Digite um número (0-100)"
  value={numberValue}
  onChange={(value) => setNumberValue(value)}
  leftIcon="calculator"
  validatorControl={numberValidator}
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TextInput - Texto com Máscara</h2>
          <div className="editor-showcase">
            <TextInput
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              value={textValue}
              onChange={(value) => setTextValue(value)}
              leftIcon="phone"
            />
          </div>
          <pre className="editor-code">
{`<TextInput
  placeholder="(00) 00000-0000"
  mask="(99) 99999-9999"
  value={textValue}
  onChange={(value) => setTextValue(value)}
  leftIcon="phone"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TextInput como Textarea</h2>
          <div className="editor-showcase">
            <TextInput
              placeholder="Digite seu comentário..."
              asTextarea
              areaRows={4}
              leftIcon="comment"
            />
          </div>
          <pre className="editor-code">
{`<TextInput
  placeholder="Digite seu comentário..."
  asTextarea
  areaRows={4}
  leftIcon="comment"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TextInput - Funcionalidades Avançadas</h2>
          <div className="editor-showcase">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextInput
                placeholder="Clique no ícone para focar"
                leftIcon="search"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Input com validação simulada"
                leftIcon="user"
                className="valid"
                success
                p
                br
                b
              />
              <TextInput
                placeholder="Input com erro simulado"
                leftIcon="envelope"
                className="invalid"
                danger
                p
                br
                b
              />
            </div>
          </div>
          <pre className="editor-code">
{`// Ícone clicável que foca o input
<TextInput
  placeholder="Clique no ícone para focar"
  leftIcon="search"
  one p br b
/>

// Estados visuais na div container
<TextInput
  placeholder="Input válido"
  leftIcon="user"
  className="valid"
  success p br b
/>

<TextInput
  placeholder="Input inválido" 
  leftIcon="envelope"
  className="invalid"
  danger p br b
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TextInput - Variações de Tamanho</h2>
          <div className="editor-showcase">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextInput
                placeholder="Ícones grandes"
                leftIcon="star"
                className="input-large-icons"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Ícones normais"
                leftIcon="star"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Ícones pequenos"
                leftIcon="star"
                className="input-small-icons"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Espaçamento apertado"
                leftIcon="star"
                className="input-tight"
                two
                p
                br
                b
              />
              <TextInput
                placeholder="Espaçamento largo"
                leftIcon="star"
                className="input-loose"
                three
                p
                br
                b
              />
            </div>
          </div>
          <pre className="editor-code">
{`// Diferentes tamanhos de ícones e espaçamentos
<TextInput
  placeholder="Ícones grandes"
  leftIcon="star"
  className="input-large-icons"
  one p br b
/>

<TextInput
  placeholder="Ícones pequenos"
  leftIcon="star"
  className="input-small-icons"
  one p br b
/>

<TextInput
  placeholder="Espaçamento apertado"
  leftIcon="star"
  className="input-tight"
  two p br b
/>

<TextInput
  placeholder="Espaçamento largo"
  leftIcon="star"
  className="input-loose"
  three p br b
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TextInput - Variações de Padding Interno</h2>
          <div className="editor-showcase">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextInput
                placeholder="Padding compacto"
                leftIcon="search"
                className="input-compact"
                four
                br
                b
              />
              <TextInput
                placeholder="Padding confortável (padrão)"
                leftIcon="search"
                five
                br
                b
              />
              <TextInput
                placeholder="Padding extra"
                leftIcon="search"
                className="input-comfortable"
                six
                br
                b
              />
              <TextInput
                placeholder="Padding máximo + ícones grandes"
                leftIcon="search"
                className="input-extra-padding input-large-icons"
                seven
                br
                b
              />
            </div>
          </div>
          <pre className="editor-code">
{`// Variações de padding interno que mantêm alinhamento
<TextInput
  placeholder="Padding compacto"
  leftIcon="search"
  className="input-compact"
  four br b
/>

<TextInput
  placeholder="Padding confortável"
  leftIcon="search"
  className="input-comfortable"
  six br b
/>

<TextInput
  placeholder="Padding extra + ícones grandes"
  leftIcon="search"
  className="input-extra-padding input-large-icons"
  seven br b
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>CheckboxInput - Checkbox Estilizado</h2>
          <div className="editor-showcase">
            <CheckboxInput
              label="Aceito os termos de uso"
              icon="shield-check"
              checked={checkboxValue}
              onChange={(checked) => setCheckboxValue(checked)}
            />
          </div>
          <pre className="editor-code">
{`<CheckboxInput
  label="Aceito os termos de uso"
  icon="shield-check"
  checked={checkboxValue}
  onChange={(checked) => setCheckboxValue(checked)}
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>RadioInput - Grupo de Opções</h2>
          <div className="editor-showcase">
            <RadioInput
              name="example"
              options={radioOptions}
              value={radioValue}
              onChange={(value) => setRadioValue(value)}
            />
          </div>
          <pre className="editor-code">
{`const radioOptions = [
  { value: 'option1', label: 'Opção 1', icon: 'star' },
  { value: 'option2', label: 'Opção 2', icon: 'heart' },
  { value: 'option3', label: 'Opção 3', icon: 'shield' }
]

<RadioInput
  name="example"
  options={radioOptions}
  value={radioValue}
  onChange={(value) => setRadioValue(value)}
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>FileInput - Upload de Arquivos</h2>
          <div className="editor-showcase">
            <FileInput
              accept="image/*"
              multiple
              maxSize={5 * 1024 * 1024}
              showPreview
              onChange={(files) => console.log(files)}
            />
          </div>
          <pre className="editor-code">
{`<FileInput
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
  showPreview
  onChange={(files) => console.log(files)}
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>SliderInput - Controle Deslizante</h2>
          <div className="editor-showcase">
            <SliderInput
              min={0}
              max={100}
              step={1}
              value={sliderValue}
              onChange={(value) => setSliderValue(value)}
              showValue
              unit="%"
            />
          </div>
          <pre className="editor-code">
{`<SliderInput
  min={0}
  max={100}
  step={1}
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  showValue
  unit="%"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>SwitchInput - Interruptor</h2>
          <div className="editor-showcase">
            <SwitchInput
              checked={switchValue}
              onChange={(checked) => setSwitchValue(checked)}
              label="Ativar notificações"
              leftIcon="bell"
              size="medium"
              color="success"
            />
          </div>
          <pre className="editor-code">
{`<SwitchInput
  checked={switchValue}
  onChange={(checked) => setSwitchValue(checked)}
  label="Ativar notificações"
  leftIcon="bell"
  size="medium"
  color="success"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>DateInput - Seletor de Data</h2>
          <div className="editor-showcase">
            <DateInput
              value={dateValue}
              onChange={(date) => setDateValue(date)}
              leftIcon="calendar"
            />
          </div>
          <pre className="editor-code">
{`<DateInput
  value={dateValue}
  onChange={(date) => setDateValue(date)}
  leftIcon="calendar"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TimeInput - Seletor de Hora</h2>
          <div className="editor-showcase">
            <TimeInput
              value={timeValue}
              onChange={(time) => setTimeValue(time)}
              leftIcon="clock"
            />
          </div>
          <pre className="editor-code">
{`<TimeInput
  value={timeValue}
  onChange={(time) => setTimeValue(time)}
  leftIcon="clock"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>DatetimeInput - Data e Hora</h2>
          <div className="editor-showcase">
            <DatetimeInput
              value={datetimeValue}
              onChange={(datetime) => setDatetimeValue(datetime)}
              leftIcon="calendar-clock"
            />
          </div>
          <pre className="editor-code">
{`<DatetimeInput
  value={datetimeValue}
  onChange={(datetime) => setDatetimeValue(datetime)}
  leftIcon="calendar-clock"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TagsInput - Gerenciamento de Tags</h2>
          <div className="editor-showcase">
            <TagsInput
              value={tagsValue}
              onChange={(tags) => setTagsValue(tags)}
              suggestions={tagSuggestions}
              placeholder="Digite uma tag..."
              maxTags={10}
              tagColor="primary"
            />
          </div>
          <pre className="editor-code">
{`<TagsInput
  value={tagsValue}
  onChange={(tags) => setTagsValue(tags)}
  suggestions={tagSuggestions}
  placeholder="Digite uma tag..."
  maxTags={10}
  tagColor="primary"
/>`}
          </pre>
        </section>
      </Rows>
    </div>
  )
}

export default InputPage
