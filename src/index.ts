import { elements, vars, xinProxy, bindings } from 'xinjs'
import './style.ts'

const { h1, img, p, button, label, span, input, br } = elements

const { app } = xinProxy({
  app: {
    caption: 'hello xinjs',
    angle: 45,
  }
})

window.app = app

bindings.rotate = {
  toDOM(elt, angle) {
    elt.style.transform = `rotateZ(${angle}deg)`
  }
}


// comment
document.body.append(
  h1( 
    img({
      alt: 'xinjs logo', 
      src: 'logo.svg',
      style: {
        maxHeight: '32px',
        marginRight: vars.gap
      },
    }),
    span({bindText: 'app.caption'})
  ),
  img({
    src: 'bunlogo.svg',
    bindRotate: 'app.angle',
    style: {
      maxHeight: '128px'
    }
  }),
  p( 'a paragraph' ),
  label(
    'rotate logo',
    input({ type:"range", min: 0, max: 360, bindValue: 'app.angle' })
  ),
  label(
    'app caption',
    input({ bindValue: 'app.caption' })
  ),
  br(),
  button('click me')
)