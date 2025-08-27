import React, { useState } from 'react'
import { Place, Columns, Rows, Divisor, Button } from 'fcstyle'

const ColorPage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [showInverse, setShowInverse] = useState(false)
  const [showHoverable, setShowHoverable] = useState(true)

  // Definindo todas as cores disponíveis
  const colors = [
    { name: 'white', label: 'White' },
    { name: 'black', label: 'Black' },
    { name: 'gray1', label: 'Gray 1 (Lightest)' },
    { name: 'gray2', label: 'Gray 2' },
    { name: 'gray3', label: 'Gray 3' },
    { name: 'gray4', label: 'Gray 4' },
    { name: 'gray5', label: 'Gray 5 (Darkest)' },
    { name: 'one', label: 'One (Blue)' },
    { name: 'two', label: 'Two (Dark Blue)' },
    { name: 'three', label: 'Three (Medium Blue)' },
    { name: 'four', label: 'Four (Cyan)' },
    { name: 'five', label: 'Five (Purple)' },
    { name: 'six', label: 'Six (Light Blue)' },
    { name: 'seven', label: 'Seven (Blue Gray)' },
    { name: 'success', label: 'Success (Green)' },
    { name: 'warning', label: 'Warning (Yellow)' },
    { name: 'danger', label: 'Danger (Red)' }
  ]

  const createColorPlace = (color: any, variant: 'normal' | 'inverse' | 'selected' = 'normal') => {
    const colorProps: any = {}
    
    if (variant === 'inverse') {
      colorProps[`${color.name}_inv`] = true
    } else {
      colorProps[color.name] = true
    }

    if (variant === 'selected') {
      colorProps.selected = true
    }

    if (showHoverable) {
      colorProps.hoverable = true
    }

    return (
      <Place
        key={`${color.name}-${variant}`}
        {...colorProps}
        p
        pointer
        onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
      >
        {color.label}
        {variant === 'inverse' && ' (Inverse)'}
        {variant === 'selected' && ' (Selected)'}
      </Place>
    )
  }

  return (
    <Rows gap m>
      {/* Controles */}
      <Place white p br>
        <Rows gap>
          <h2>Color System Showcase</h2>
          <Columns gap>
            <Button 
              gray3 
              selected={showInverse} 
              onClick={() => setShowInverse(!showInverse)}
            >
              {showInverse ? 'Hide' : 'Show'} Inverse Colors
            </Button>
            <Button 
              gray3 
              selected={showHoverable} 
              onClick={() => setShowHoverable(!showHoverable)}
            >
              {showHoverable ? 'Hide' : 'Show'} Hoverable
            </Button>
          </Columns>
          {selectedColor && (
            <Place gray1 p br>
              <strong>Selected Color:</strong> {selectedColor}
            </Place>
          )}
        </Rows>
      </Place>

      <Divisor />

      {/* Cores básicas (White, Black, Grays) */}
      <Place white p br>
        <Rows gap>
          <h3>Basic Colors</h3>
          <Columns gap>
            {colors.slice(0, 7).map(color => createColorPlace(color))}
          </Columns>
          {showInverse && (
            <>
              <h4>Inverse Variants</h4>
              <Columns gap>
                {colors.slice(0, 7).map(color => createColorPlace(color, 'inverse'))}
              </Columns>
            </>
          )}
        </Rows>
      </Place>

      <Divisor />

      {/* Cores numeradas (One a Seven) */}
      <Place white p br>
        <Rows gap>
          <h3>Numbered Colors</h3>
          <Columns gap>
            {colors.slice(7, 14).map(color => createColorPlace(color))}
          </Columns>
          {showInverse && (
            <>
              <h4>Inverse Variants</h4>
              <Columns gap>
                {colors.slice(7, 14).map(color => createColorPlace(color, 'inverse'))}
              </Columns>
            </>
          )}
        </Rows>
      </Place>

      <Divisor />

      {/* Cores semânticas */}
      <Place white p br>
        <Rows gap>
          <h3>Semantic Colors</h3>
          <Columns gap>
            {colors.slice(14).map(color => createColorPlace(color))}
          </Columns>
          {showInverse && (
            <>
              <h4>Inverse Variants</h4>
              <Columns gap>
                {colors.slice(14).map(color => createColorPlace(color, 'inverse'))}
              </Columns>
            </>
          )}
        </Rows>
      </Place>

      <Divisor />

      {/* Estados especiais */}
      <Place white p br>
        <Rows gap>
          <h3>Special States</h3>
          <Rows gap>
            <h4>Selected State</h4>
            <Columns gap>
              {colors.slice(0, 5).map(color => createColorPlace(color, 'selected'))}
            </Columns>
            
            <h4>Mixed Combinations</h4>
            <Columns gap>
              <Place one hoverable selected p pointer>
                One + Selected + Hoverable
              </Place>
              <Place success_inv hoverable p pointer>
                Success Inverse + Hoverable
              </Place>
              <Place gray3 selected hoverable p pointer>
                Gray3 + Selected + Hoverable
              </Place>
              <Place danger hoverable p pointer>
                Danger + Hoverable
              </Place>
              <Place black_inv selected p pointer>
                Black Inverse + Selected
              </Place>
            </Columns>
          </Rows>
        </Rows>
      </Place>

      <Divisor />

      {/* Demonstração de uso prático */}
      <Place white p br>
        <Rows gap>
          <h3>Practical Usage Examples</h3>
          <Rows gap>
            <h4>Navigation Menu Style</h4>
            <Columns gap>
              <Place gray1 p hoverable pointer>Home</Place>
              <Place gray1 p hoverable pointer>About</Place>
              <Place gray1 p hoverable selected pointer>Products</Place>
              <Place gray1 p hoverable pointer>Contact</Place>
            </Columns>

            <h4>Status Indicators</h4>
            <Columns gap>
              <Place success p br>✓ Success</Place>
              <Place warning p br>⚠ Warning</Place>
              <Place danger p br>✗ Error</Place>
            </Columns>

            <h4>Theme Variants</h4>
            <Columns gap>
              <Place one p hoverable pointer>Primary Action</Place>
              <Place two p hoverable pointer>Secondary Action</Place>
              <Place gray3 p hoverable pointer>Neutral Action</Place>
              <Place white p hoverable pointer>Light Action</Place>
              <Place black p hoverable pointer>Dark Action</Place>
            </Columns>

            <h4>Card Examples</h4>
            <Columns gap>
              <Place gray1 p br>
                <Rows gap>
                  <Place gray5 p br>Header</Place>
                  <div>Content in light card</div>
                </Rows>
              </Place>
              <Place black p br>
                <Rows gap>
                  <Place gray3 p br>Header</Place>
                  <div>Content in dark card</div>
                </Rows>
              </Place>
              <Place five p br>
                <Rows gap>
                  <Place white p br>Header</Place>
                  <div>Content in purple card</div>
                </Rows>
              </Place>
            </Columns>

            <h4>Border Radius Examples</h4>
            <Columns gap>
              <Place gray3 p br0>No radius (br0)</Place>
              <Place gray3 p br1>Small radius (br1)</Place>
              <Place gray3 p br>Medium radius (br)</Place>
              <Place gray3 p br3>Large radius (br3)</Place>
              <Place gray3 p circle>Circle</Place>
            </Columns>

            <h4>Border Width Examples</h4>
            <Columns gap>
              <Place gray1 p b0>No border (b0)</Place>
              <Place gray1 p b1>Thin border (b1)</Place>
              <Place gray1 p b>Normal border (b)</Place>
              <Place gray1 p b3>Thick border (b3)</Place>
            </Columns>

            <h4>Size Examples with CSS</h4>
            <Columns gap>
              <Place gray2 p style={{ height: '50px' }}>Fixed height</Place>
              <Place gray2 p style={{ width: '100px' }}>Fixed width</Place>
              <Place gray2 p style={{ width: '80px', height: '80px' }}>Square 80px</Place>
            </Columns>
          </Rows>
        </Rows>
      </Place>

      <Divisor />

      {/* Paleta de cores completa */}
      <Place white p br>
        <Rows gap>
          <h3>Complete Color Palette</h3>
          <Rows gap>
            <h4>All Colors Grid</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              {colors.map(color => (
                <Place
                  key={color.name}
                  {...{ [color.name]: true }}
                  p
                  br
                  hoverable
                  pointer
                  style={{ textAlign: 'center', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{color.name}</div>
                    <div style={{ fontSize: '12px' }}>{color.label}</div>
                  </div>
                </Place>
              ))}
            </div>
          </Rows>
        </Rows>
      </Place>

      <Divisor />

      {/* Referência rápida */}
      <Place gray1 p br>
        <Rows gap>
          <h3>Quick Reference</h3>
          <div>
            <strong>Available Colors:</strong> white, black, gray1-gray5, one-seven, success, warning, danger
          </div>
          <div>
            <strong>Modifiers:</strong> _inv (inverse), hoverable, selected, pointer
          </div>
          <div>
            <strong>Border Radius:</strong> br0, br1, br, br3, circle
          </div>
          <div>
            <strong>Border Width:</strong> b0, b1, b, b3
          </div>
          <div>
            <strong>Usage:</strong> {`<Place colorName p>Content</Place>`} or {`<Place colorName_inv hoverable selected>Content</Place>`}
          </div>
        </Rows>
      </Place>
    </Rows>
  )
}

export default ColorPage
