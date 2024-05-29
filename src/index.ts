import { elements, vars, xinProxy, bindings } from 'xinjs'
import './style.ts'

const { h1, img, p, button, label, span, input, br } = elements

const { app } = xinProxy({
  app: {
    caption: 'hello xinjs',
    angle: 45,
  },
}, true)

declare global {
  interface Window {
    app: typeof app
  }
}

window.app = app

bindings.rotate = {
  toDOM(elt, angle) {
    elt.style.transform = `rotateZ(${angle}deg)`
  },
}

// comment
document.body.append(
  h1(
    img({
      alt: 'xinjs logo',
      src: 'logo.svg',
      style: {
        maxHeight: '32px',
        marginRight: vars.gap,
      },
    }),
    span({ bindText: app.caption })
  ),
  img({
    src: 'bunlogo.svg',
    bindRotate: app.angle,
    style: {
      maxHeight: '128px',
      transition: '0.25s ease-out',
    },
  }),
  p('a paragraph'),
  label(
    'rotate logo',
    input({ type: 'range', min: 0, max: 360, bindValue: app.angle as any })
  ),
  label('app caption', input({ bindValue: app.caption })),
  br(),
  button('click me', {
    onClick() {
      app.angle = (app.angle + 45 + Math.random() * 45) % 360
    }
  })
)
