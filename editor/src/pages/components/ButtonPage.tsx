import React from 'react'
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
      <p>O componente Button oferece uma interface flexível para criação de botões com diferentes estilos e funcionalidades.</p>
      
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

export default ButtonPage
