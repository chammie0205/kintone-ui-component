import Control, {ControlProps} from "../Control";
type TabNameProps = ControlProps & {
  isActive: boolean
  tabName: string
  tabIndex: number
  onClickTabItem: (tabIndex: number) => void
}


class TabName extends Control {
  protected _props: TabNameProps = {
    ...this._props, ...{
      isActive: false,
      tabName: '',
      tabIndex: 0,
      onClickTabItem: (tabIndex: number) => {

      }
    }
  }

  constructor(params: TabNameProps) {
    super()
    if (params) {
      this._props = {...this._props, ...params}
    }

    let className = "kuc-tabs-container";
    if (this._props.isActive) {
      className += " kuc-tabs-container-selection";
    }

    if (this._props.isDisabled) {
      className += " kuc-tabs-disabled";
      this.element = document.createElement('li')
      this.element.className = className
      this.element.append(this._props.tabName)
    } else {
      this.element = document.createElement('li')
      this.element.className = className
      this.element.append(this._props.tabName)
    }  
    this.on('click', () => this._props.onClickTabItem(this._props.tabIndex));
    this.rerender()
  }

  rerender(changedAttr?: Array<string>){
    super.rerender()
    if (!changedAttr) return
    if (changedAttr.indexOf('isActive') !== -1) {
      if (this._props.isActive) {
        this.element.classList.add('kuc-tabs-container-selection')
      }
      else {
        this.element.classList.remove('kuc-tabs-container-selection')
      }
    }
    if (changedAttr.indexOf('isDisabled') !== -1) {
      if (this._props.isDisabled) {
        this.element.classList.add('kuc-tabs-disabled')
      }
      else {
        this.element.classList.remove('kuc-tabs-disabled')
      }
    }
  }

  select() {
    this._props.isActive = true
    this.rerender(['isActive'])
  }

  deselect() {
    this._props.isActive = false
    this.rerender(['isActive'])
  }
}

export default TabName;