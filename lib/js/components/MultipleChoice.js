var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AbstractMultiSelection from './AbstractMultiSelection';
import MultipleChoiceReact from '../components-react/MultipleChoice';

var MultipleChoice = function (_AbstractMultiSelecti) {
  _inherits(MultipleChoice, _AbstractMultiSelecti);

  function MultipleChoice() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MultipleChoice);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultipleChoice.__proto__ || Object.getPrototypeOf(MultipleChoice)).call.apply(_ref, [this].concat(args))), _this), _this._reactComponentClass = MultipleChoiceReact, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MultipleChoice, [{
    key: 'setValue',
    value: function setValue(value) {
      this._setValue(value);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this._getState().value;
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      return this._getState().items;
    }
  }, {
    key: 'getItem',
    value: function getItem(index) {
      return this._getState().items[index];
    }
  }, {
    key: 'addItem',
    value: function addItem(item) {
      var prevState = this._getState();
      this._setState({ items: prevState.items ? prevState.items.concat([item]) : [item] });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(index) {
      this._removeItem(index);
    }
  }, {
    key: 'disable',
    value: function disable() {
      return this._setState({ isDisabled: true });
    }
  }, {
    key: 'enable',
    value: function enable() {
      return this._setState({ isDisabled: false });
    }
  }, {
    key: 'disableItem',
    value: function disableItem(value) {
      return this._setDisabledItem(value, true);
    }
  }, {
    key: 'enableItem',
    value: function enableItem(value) {
      return this._setDisabledItem(value, false);
    }
  }]);

  return MultipleChoice;
}(AbstractMultiSelection);

export default MultipleChoice;