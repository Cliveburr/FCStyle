import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ButtonPage from './pages/components/ButtonPage'
import { DropdownPage } from './pages/components/DropdownPage'
import MenuPage from './pages/components/MenuPage'
import ModalPage from './pages/components/ModalPage'
import { TagPage } from './pages/components/TagPage'
import ColumnPage from './pages/grid/ColumnPage'
import RowPage from './pages/grid/RowPage'
import DivisorPage from './pages/grid/DivisorPage'
import InputPage from './pages/form/InputPage'
import InputFieldPage from './pages/form/InputFieldPage'
import PlacePage from './pages/grid/PlacePage'
import { TypographyPage } from './pages/TypographyPage'
import { EffectsPage } from './pages/EffectsPage'
import ColorPage from './pages/utilities/ColorPage'

function App() {
  // Use Vite's BASE_URL so dev uses "/" and production (demo) uses "/FCStyle/"
  const basename = (import.meta as any).env?.BASE_URL?.replace(/\/+$/, '') || ''

  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/utilities/colors" element={<ColorPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/components/button" element={<ButtonPage />} />
          <Route path="/components/dropdown" element={<DropdownPage />} />
          <Route path="/components/menu" element={<MenuPage />} />
          <Route path="/components/modal" element={<ModalPage />} />
          <Route path="/components/tab" element={<TagPage />} />
          <Route path="/grid/place" element={<PlacePage />} />
          <Route path="/grid/column" element={<ColumnPage />} />
          <Route path="/grid/row" element={<RowPage />} />
          <Route path="/grid/divisor" element={<DivisorPage />} />
          <Route path="/form/input" element={<InputPage />} />
          <Route path="/form/input-field" element={<InputFieldPage />} />
          <Route path="/effects" element={<EffectsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
