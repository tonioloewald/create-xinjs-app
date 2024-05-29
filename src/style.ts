import {
  XinStyleSheet,
  bind,
  invertLuminance,
  css,
  vars,
  elements,
  Color,
} from 'xinjs'
const { style } = elements

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
const BRAND_COLOR = Color.fromCss('rgb(8, 131, 88)')
const SHADE_COLOR = Color.fromCss('rgb(241, 241, 188)')
const TEXT_COLOR = Color.fromCss('#222222')
const BG_COLOR = Color.fromCss('#f0f0f0')
const INPUT_BG = Color.fromCss('white')

bind(document.body, 'app.darkmode', {
  toDOM(elt, value) {
    switch (value) {
      case 'dark':
        elt.classList.add('darkmode')
        break
      case 'light':
        elt.classList.remove('darkmode')
        break
      default:
        const autoSetting = getComputedStyle(document.body).getPropertyValue(
          '--darkmode'
        )
        elt.classList.toggle('darkmode', autoSetting === 'true')
    }
  },
})

const cssVars = {
  _font: "'Roboto Slab', Serif",
  _codeFont: "'Space Mono', monospace",
  _fontSize: 16,
  _codeFontSize: 16,
  _lineHeight: 25,
  _pad: 16,
  _gap: vars.pad50,
  _roundedRadius: vars.pad25,
  _textColor: TEXT_COLOR.html,
  _itemSpacing: vars.pad50,
  _background: BG_COLOR.html,
  _inputBg: INPUT_BG.html,
  _buttonBg: SHADE_COLOR.opacity(0.25).html,
  _hoverBg: SHADE_COLOR.opacity(0.5).html,
  _activeBg: SHADE_COLOR.html,
  _lightBorderColor: BRAND_COLOR.opacity(0.4).html,
  _borderColor: BRAND_COLOR.opacity(0.8).html,
  _lightBorderShadow: `0 0 0 1px ${vars.lightBorderColor}`,
  _borderShadow: `0 0 0 1px ${vars.borderColor}`,
  _toolbarHeight: `calc(${vars.lineHeight} + ${vars.pad})`,
  _placeHolderOpacity: 0.5,
  _vh: '100vh',
}

const brandColors = {
  _brandColor: BRAND_COLOR.html,
  _brandTextColor: SHADE_COLOR.html,
}

const codeVars = {
  _codeColor: vars.textColor,
  _codeBg: BRAND_COLOR.brighten(0.25).saturate(1).opacity(0.1).html,
}

const rules: XinStyleSheet = {
  '@import': FONTS_URL,

  body: {
    ...cssVars, ...brandColors, ...codeVars,
    fontFamily: vars.font,
    background: vars.background,
    color: vars.textColor,
    margin: vars.pad,
    fontSize: vars.fontSize,
    lineHeight: vars.lineHeight,
    accentColor: vars.brandColor,
  },
  '*': {
    fontFamily: vars.font,
  },
  '@media (prefers-color-scheme: dark)': {
    body: {
      _darkmode: 'true',
    },
  },
  '.darkmode': { ...invertLuminance(cssVars) },
  h1: {
    color: vars.brandColor,
    fontSize: vars.fontSize200,
    lineHeight: vars.lineHeight200,
    margin: `${vars.pad200} 0 ${vars.gap}`,
  },
  p: {
    margin: `0 0 ${vars.gap}`,
  },
  'button, input': {
    // background: vars.buttonBg,
    padding: `${vars.pad50} ${vars.pad75}`,
    border: 0,
    fontSize: vars.fontSize,
    boxShadow: vars.lightBorderShadow,
  },
  button: {
    borderRadius: vars.roundedRadius,
  },
  input: {
    borderRadius: vars.roundedRadius50,
  },
  'input[type="range"]': {
    boxShadow: 'none',
  },
  'button:hover, .clickable:hover': {
    background: vars.hoverBg,
  },
  'button:active, .clickable:active': {
    background: vars.activeBg,
    boxShadow: vars.borderShadow,
  },
  label: {
    display: 'inline-flex',
    gap: vars.gap,
    alignItems: 'center',
  },
  ':focus': {
    outline: 'none',
  },
}

document.head.append(style({ id: 'base-style' }, css(rules)))

// adapted from https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const setTrueHeight = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
}
setTrueHeight()
window.addEventListener('resize', setTrueHeight)
