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
import SourceSample from '@/components/SourceSample'

const InputPage: React.FC = () => {
  const [colorValue, setColorValue] = useState('#ff0000')
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
            li="user"
          />
          <SourceSample code={`<TextInput
  placeholder="Nome do usuário"
  li="user"
/>`} />
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
            <TextInput w4 placeholder="Disabled" li='ban' disabled />
            <TextInput w4 white placeholder="Loading" loading />
            <TextInput w4 white placeholder="Valid" validatorControl={validControl} />
            <TextInput w4 white placeholder="Invalid" validatorControl={invalidControl} />
          </Columns>
        </Rows>

        <Place gap b p gray1>
          <h2>NumberInput - Apenas Números</h2>
          <NumberInput w4
              placeholder="Digite um número (0-100)"
              li="calculator"
          />
          <SourceSample code={`<NumberInput
    placeholder="Digite um número (0-100)"
    li="calculator"
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>CheckboxInput - Checkbox Estilizado</h2>
          <CheckboxInput
            label="Aceito os termos de uso"
            li="shield-check"
            checked={checkboxValue}
            onChange={(checked) => setCheckboxValue(checked)}
          />
          <SourceSample code={`<CheckboxInput
  label="Aceito os termos de uso"
  icon="shield-check"
  checked={checkboxValue}
  onChange={(checked) => setCheckboxValue(checked)}
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>TextInput como Textarea</h2>
          <TextInput
            placeholder="Digite seu comentário..."
            asTextarea
            areaRows={4}
            li="comment"
          />
          <SourceSample code={`<TextInput
  placeholder="Digite seu comentário..."
  asTextarea
  areaRows={4}
  li="comment"
/>`} />
        </Place>













        <Place gap b p gray1>
          <h2>ColorInput - Seletor de Cores</h2>
          <ColorInput w4
            placeholder="Selecione uma cor"
            value={colorValue}
            onChange={(color) => setColorValue(color)}
            li="palette"
          />
          <SourceSample code={`<ColorInput
  placeholder="Selecione uma cor"
  value={colorValue}
  onChange={(color) => setColorValue(color)}
  li="palette"
/>`} />
        </Place>

        <section className="editor-example">
          <h2>TextInput - Texto com Máscara</h2>
          <div className="editor-showcase">
            <TextInput
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              value={textValue}
              onChange={(value) => setTextValue(value)}
              li="phone"
            />
          </div>
          <pre className="editor-code">
{`<TextInput
  placeholder="(00) 00000-0000"
  mask="(99) 99999-9999"
  value={textValue}
  onChange={(value) => setTextValue(value)}
  li="phone"
/>`}
          </pre>
        </section>

        <section className="editor-example">
          <h2>TextInput - Funcionalidades Avançadas</h2>
          <div className="editor-showcase">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextInput
                placeholder="Clique no ícone para focar"
                li="search"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Input com validação simulada"
                li="user"
                className="valid"
                success
                p
                br
                b
              />
              <TextInput
                placeholder="Input com erro simulado"
                li="envelope"
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
  li="search"
  one p br b
/>

// Estados visuais na div container
<TextInput
  placeholder="Input válido"
  li="user"
  className="valid"
  success p br b
/>

<TextInput
  placeholder="Input inválido" 
  li="envelope"
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
                li="star"
                className="input-large-icons"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Ícones normais"
                li="star"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Ícones pequenos"
                li="star"
                className="input-small-icons"
                one
                p
                br
                b
              />
              <TextInput
                placeholder="Espaçamento apertado"
                li="star"
                className="input-tight"
                two
                p
                br
                b
              />
              <TextInput
                placeholder="Espaçamento largo"
                li="star"
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
  li="star"
  className="input-large-icons"
  one p br b
/>

<TextInput
  placeholder="Ícones pequenos"
  li="star"
  className="input-small-icons"
  one p br b
/>

<TextInput
  placeholder="Espaçamento apertado"
  li="star"
  className="input-tight"
  two p br b
/>

<TextInput
  placeholder="Espaçamento largo"
  li="star"
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
                li="search"
                className="input-compact"
                four
                br
                b
              />
              <TextInput
                placeholder="Padding confortável (padrão)"
                li="search"
                five
                br
                b
              />
              <TextInput
                placeholder="Padding extra"
                li="search"
                className="input-comfortable"
                six
                br
                b
              />
              <TextInput
                placeholder="Padding máximo + ícones grandes"
                li="search"
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
  li="search"
  className="input-compact"
  four br b
/>

<TextInput
  placeholder="Padding confortável"
  li="search"
  className="input-comfortable"
  six br b
/>

<TextInput
  placeholder="Padding extra + ícones grandes"
  li="search"
  className="input-extra-padding input-large-icons"
  seven br b
/>`}
          </pre>
        </section>

        <Place gap b p gray1>
          <h2>RadioInput - Grupo de Opções</h2>
          <RadioInput w4
            options={radioOptions as any}
            value={radioValue}
            onChange={(value) => setRadioValue(value)}
          />
          <SourceSample code={`<RadioInput
  options={radioOptions}
  value={radioValue}
  onChange={(value) => setRadioValue(value)}
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>FileInput - Upload de Arquivos</h2>
          <FileInput w5
            accept="image/*"
            multiple
            maxSize={5 * 1024 * 1024}
            showPreview
            onChange={(files) => console.log(files)}
          />
          <SourceSample code={`<FileInput
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
  showPreview
  onChange={(files) => console.log(files)}
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>SliderInput - Controle Deslizante</h2>
          <SliderInput w5
            min={0}
            max={100}
            step={1}
            value={sliderValue}
            onChange={(value) => setSliderValue(value)}
            showValue
            unit="%"
          />
          <SourceSample code={`<SliderInput
  min={0}
  max={100}
  step={1}
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  showValue
  unit="%"
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>SwitchInput - Interruptor</h2>
          <SwitchInput w4
            checked={switchValue}
            onChange={(checked) => setSwitchValue(checked)}
            label="Ativar notificações"
            li="bell"
            switchSize="medium"
            switchColor="success"
          />
          <SourceSample code={`<SwitchInput
  checked={switchValue}
  onChange={(checked) => setSwitchValue(checked)}
  label="Ativar notificações"
  li="bell"
  switchSize="medium"
  switchColor="success"
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>DateInput - Seletor de Data</h2>
          <DateInput w4
            value={dateValue}
            onChange={(date) => setDateValue(date)}
            li="calendar"
          />
          <SourceSample code={`<DateInput
  value={dateValue}
  onChange={(date) => setDateValue(date)}
  li="calendar"
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>TimeInput - Seletor de Hora</h2>
          <TimeInput w4
            value={timeValue}
            onChange={(time) => setTimeValue(time)}
            li="clock"
          />
          <SourceSample code={`<TimeInput
  value={timeValue}
  onChange={(time) => setTimeValue(time)}
  li="clock"
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>DatetimeInput - Data e Hora</h2>
          <DatetimeInput w5
            value={datetimeValue}
            onChange={(datetime) => setDatetimeValue(datetime)}
            li="calendar-clock"
          />
          <SourceSample code={`<DatetimeInput
  value={datetimeValue}
  onChange={(datetime) => setDatetimeValue(datetime)}
  li="calendar-clock"
/>`} />
        </Place>

        <Place gap b p gray1>
          <h2>TagsInput - Gerenciamento de Tags</h2>
          <TagsInput w6
            value={tagsValue}
            onChange={(tags) => setTagsValue(tags)}
            suggestions={tagSuggestions}
            placeholder="Digite uma tag..."
            maxTags={10}
            tagColor="primary"
          />
          <SourceSample code={`<TagsInput
  value={tagsValue}
  onChange={(tags) => setTagsValue(tags)}
  suggestions={tagSuggestions}
  placeholder="Digite uma tag..."
  maxTags={10}
  tagColor="primary"
/>`} />
        </Place>
      </Rows>
    </div>
  )
}

export default InputPage
