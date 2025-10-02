
# layout
    - margin
    - padding
    - width
    - height

# style
    - colors
    - border
    - shadow
    - transition
    - cursor
    effects => afentam os style
        - hover
        - focus
        - selected
        - valid
        - invalid
        - warning
        - disabled
        - hide


# Layout components

Columns - Rows => Componentes que define a direção dos filhos
    - controla gap e padding
    - presets de organização dos filhos
    - aplica diretamente se tiver filho unico ou abre div

Cell => Component que pode ir em Columns ou Rows apenas, especifico para aplicar alguma caracterista diferente aos demais childrens
    - aplica diretamente se tiver filho unico ou abre div

# Style components

Style => Component de estilização, controla apparence e variants
    - presets que aplica caracteristas
    - aplica diretamente se tiver filho unico ou abre div

# Generic components

Box => Component capaz de aplicar tudo e definir uma tag

Checagens de uso para até na criação de components gerais:

# Button
    - todas caractericas deseja são passada por layoutDef e styleDef
    <Box tag="button" layout={layoutDef} style={styleDef}>
        <Icon />
        {text}
        <Icon />
    <Box>

# Menu
    - define no layoutDef se é vertical ou horizontal
    <Box tag="button" layout={layoutDef} style={styleDef}>
    </Box>

