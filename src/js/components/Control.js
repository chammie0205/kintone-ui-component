/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {render} from 'react-dom';
import withState from './withState';
import Message from '../constant/Message';
export default class Control {
  constructor(props) {
    this.props = props;
    this.events = {};
    this.validEventNames = ['click', 'change'];
  }

  _setState(state) {
    this.props = {...this.props, ...state};
    if (this._reactObject) {
      this._reactObject.setState(state);
    }
  }

  _getState() {
    return this._reactObject.state;
  }

  render() {
    const newEl = this._renderReactObject();
    if (this.el !== undefined) {
      this.el.parentNode.replaceChild(newEl, this.el);
    }
    this.el = newEl;
    return this.el;
  }

  _handleOnChange = (value) => {
    this._setStateAfterEventHandler(value);
    if (typeof this.onChange === 'function') {
      this._triggerOnChange(value);
    }
  }

  _handleOnPopupClose = () => {
    if (typeof this.onClose === 'function') {
      this.onClose();
    }
    this.hide();
  }

  _handleOnToggle = (toggle) => {
    if (typeof this.onToggle === 'function') {
      this.onToggle(toggle);
    }
    this._setState({toggle: toggle});
  };

  _setStateAfterEventHandler(value) {
    this._reactObject.setState({value});
  }

  _triggerOnChange(value) {
    this.onChange(value);
  }

  _renderReactObject() {
    const container = document.createElement('div');
    render(
      this._getReactElement(),
      container
    );
    return container;
  }

  _getReactElement() {
    const Component = withState(this._reactComponentClass);
    const additionalProps = {onChange: this._handleOnChange, onToggle: this._handleOnToggle};
    // eslint-disable-next-line react/jsx-filename-extension
    const reactElement = <Component {...this.props} {...additionalProps} ref={el => (this._reactObject = el)} />;
    return reactElement;
  }

  on(eventName, callback) {
    if (!this.validEventNames.some(event => event === eventName)) {
      throw new Error(Message.control.INVALID_EVENT + ' ' + this.validEventNames.join(','));
    }
    if (eventName === 'change') {
      this.onChange = callback;
      return;
    }
    this._reactObject.setState({['on' + eventName.charAt(0).toUpperCase() + eventName.slice(1)]: callback});
  }

  show() {
    this._setState({isVisible: true});
  }

  hide() {
    this._setState({isVisible: false});
  }

  disable() {
    this._setState({isDisabled: true});
  }

  enable() {
    this._setState({isDisabled: false});
  }
}
