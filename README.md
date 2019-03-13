# inferno-canvas-component


A componenet to use Canvas (HTML element) on [Inferno](https://infernojs.org) apps.  

This project is an update of [nhz-io/inferno-canvas-component](https://github.com/nhz-io/inferno-canvas-component).

## Install
```
npm i inferno-canvas-component-2
```

## Usage
```javascript
const {Component, render} = require("inferno");
const h = require("inferno-hyperscript").h;
const Canvas = require("inferno-canvas-component-2");

class Main extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    function drawCanvas({ctx, time}) {
      const {width, height} = ctx.canvas;
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'black';
      ctx.translate(width / 2, height / 2);
      ctx.rotate(((time / 10) % 360) * Math.PI / 180);
      ctx.fillRect(-1 * width / 4, -1 * height / 4, width / 2, height / 2);
      ctx.restore();
    }
    return h("span", {}, h("div", {}, h(Canvas, {draw: drawCanvas, width: 400, height: 400, realtime: true})));
  }
}

window.onload = () => {
  render(h(Main), document.getElementById("main"));
};
```

## LICENSE

### [MIT](LICENSE)
