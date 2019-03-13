const {Component} = require("inferno");
const h = require("inferno-hyperscript").h;

module.exports = class InfernoCanvasComponent extends Component {
    getChildContext() {
        const {context, props, canvasElement} = this;
        const ctx = canvasElement && canvasElement.getContext('2d');
        const realtime = (context && context.realtime) || props.realtime;
        return {ctx, realtime};
    }

    constructor(props) {
        super(props);
        this.refDOM = this.refDOM.bind(this);
        this.requestAnimationFrameCallback = this.requestAnimationFrameCallback.bind(this);
    }

    componentDidMount() {
        this.forceUpdate();
        requestAnimationFrame(this.requestAnimationFrameCallback);
    }

    render() {
        const {props, context} = this;
        const {draw, realtime, top, left, ...other} = props;
        requestAnimationFrame(this.requestAnimationFrameCallback)
        return h("canvas", {ref: this.refDOM, key: "canvas", ...other}, props.children);
    }

    refDOM(element) {
        this.canvasElement = element;
    }

    requestAnimationFrameCallback(time) {
        if (this.previousFrameTime !== time) {
            const {props, context, canvasElement} = this;
            const {draw, top, left} = props;
            const ctx = canvasElement && canvasElement.getContext('2d');
            const realtime = (context && context.realtime) || props.realtime;
            let delta = 0;
            if (realtime) {
                requestAnimationFrame(this.requestAnimationFrameCallback);
                if (this.previousFrameTime) {
                    delta = time - this.previousFrameTime;
                }
                else {
                    this.previousFrameTime = time;
                }
                this.previousFrameTime = time;
            }
            draw({time, delta, ctx});
        }
    }
};