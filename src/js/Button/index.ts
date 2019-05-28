import Control, {ControlProps} from '../Control';

type ButtonProps = ControlProps & {
  text: string;
  type: 'normal' | 'submit';
}

class Button extends Control {
  protected _props: ButtonProps = {
    ...this._props,
    ...{
      text: 'Button',
      type: 'normal'
    }
  }
  constructor(params: ButtonProps) {
    super();
    if (params) {
      this._props = {...this._props, ...params};
    }
    this.element = document.createElement('button');
    this.element.className = this._getClassName();
    this.element.innerHTML = this._props.text;

  }

  rerender(changedAttr?: string[]) {
    super.rerender();
    if (!changedAttr) return;
    if (changedAttr.indexOf('type') !== -1) {
      this.element.className = this._getClassName();
    }
    if (changedAttr.indexOf('text') !== -1) {
      this.element.innerHTML = this._props.text;
    }
  }

  setText(text: string) {
    this._props.text = text;
    this.rerender(['text']);
  }

  setType(type: 'normal' | 'submit') {
    this._props.type = type;
    this.rerender(['type']);
  }

  private _getClassName() {
    return [
      'kuc-btn',
      this._props.type === 'submit' ? 'submit' : 'normal'
    ].join(' ').trim();
  }
}

export default Button;