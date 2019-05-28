import Control, {ControlProps} from "../../Control";

type RGB = {
    r: number
    g: number
    b: number
}

type HueSpectrumProps = ControlProps & {
    width: number
    height: number
    onSelect: (rgbObj: RGB) => void
}

class HueSpectrum extends Control {
    private width: number
    private height: number
    private onSelect: (rgbObj: RGB) => void
    private colorCanvas: HTMLCanvasElement
    private containerEl: ClientRect | DOMRect
    private isMouseDown: boolean
    private hasInitLayout: boolean

    constructor({
        width,
        height,
        onSelect,
        isDisabled = false,
        isVisible = true,
    }: HueSpectrumProps) {
        super()
        this.width = width
        this.height = height
        this.onSelect = onSelect
        this.isDisabled = isDisabled
        this.isVisible = isVisible

        this.element = document.createElement('div')
        this.colorCanvas = document.createElement('canvas')

        this.colorCanvas.width = this.width
        this.colorCanvas.height = this.height
        this.colorCanvas.onmousedown = this.handleMouseDown.bind(this)
        this.colorCanvas.onmouseup = this.handleMouseUp.bind(this)
        this.colorCanvas.onmousemove = this.handleMouseMove.bind(this)
        this.colorCanvas.onmouseleave = this.handleMouseLeave.bind(this)

        this.element.appendChild(this.colorCanvas)

        this.initLayout();
    }

    initLayout() {
        if (!this.hasInitLayout && this.colorCanvas) {
            
            let ctx = this.colorCanvas.getContext("2d");
            if (ctx) {
                ctx.rect(0, 0, this.width, this.height);
                let grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
                grd1.addColorStop(0, "rgb(255, 0, 0)"); // red
                grd1.addColorStop(0.17, "rgb(255, 0, 255)"); // magenta
                grd1.addColorStop(0.34, "rgb(0, 0, 255)"); // blue
                grd1.addColorStop(0.51, "rgb(0, 255, 255)"); // aqua
                grd1.addColorStop(0.68, "rgb(0, 255, 0)"); // green
                grd1.addColorStop(0.85, "rgb(255, 255, 0)"); // yellow
                grd1.addColorStop(1, "rgb(255, 0, 0)"); // red
                ctx.fillStyle = grd1;
                ctx.fill();
                this.hasInitLayout = true
            }
        }
    }

    rerender(changedAttr?: Array<string>) {
        super.rerender()
        if (!changedAttr) return;
        if (changedAttr.indexOf('isMouseDown') !== -1) {
            // this.fillSatSpectrumCanvas();
        }
    }

    initContainerEl() {
        if (this.element) {
            this.containerEl = this.element.getBoundingClientRect()
        }
    }

    handleMouseLeave() {
        this.isMouseDown = false
        this.rerender(['isMouseDown'])
    }

    handleMouseMove(e: MouseEvent) {
        if (this.isMouseDown) {
            this.triggerSelect(e.clientY);
        }
    }

    handleMouseDown() {
        this.isMouseDown = true
        this.rerender(['isMouseDown'])
    }

    handleMouseUp(e: MouseEvent) {
        this.triggerSelect(e.clientY);
        this.isMouseDown = false
        this.rerender(['isMouseDown'])
    }

    triggerSelect(clientY: number) {
        if (!this.containerEl) {
            this.initContainerEl();
        }
        let x = this.width / 2;
        let y = clientY - this.containerEl.top;
        if (this.colorCanvas && this.colorCanvas) {
            const ctx = this.colorCanvas.getContext("2d");
            if (ctx) {
                const imageData = ctx.getImageData(x, y, 1, 1).data;
                this.onSelect({ r: imageData[0], g: imageData[1], b: imageData[2] });
            }
        }
    }
}

export {HueSpectrumProps, RGB}
export default HueSpectrum