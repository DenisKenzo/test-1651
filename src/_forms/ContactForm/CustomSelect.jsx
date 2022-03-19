import { options } from 'preact';
import React, { Component } from 'react';

class CustomSelect extends Component {
  state = { isOpen: false };

  _close = () => this.setState({ isOpen: false });

  _open = () => this.setState({ isOpen: true });

  render() {
    const { isOpen } = this.state;
    console.log('optionsSelect', this.props.options);
    return (
      <div className={`custom-select-field ${isOpen ? 'open' : 'closed'}`}>
        <div className="field" onClick={isOpen ? this._close : this._open}>
          <div className="display-p">
            <p>{this._renderDisplay()}</p>
          </div>
          <div className="button">
            <img src={`../assets/images/chevron-up.svg`} />
          </div>
        </div>
        {isOpen ? <div className="options">{this._renderOptions()}</div> : null}
        {isOpen ? <div className="overlay" onClick={this._close} /> : null}
      </div>
    );
  }

  _handleClick = (value) => () => {
    this._setValue(value);
    this._close();
  };

  _renderDisplay = () => {
    const { options, value, textLabel } = this.props;
    const found = options.find((option) => option === value);
    if (found) return found.display;
    return textLabel;
  };

  _renderOptions = () => this.props.options.map((option) => (
    <div className="option" key={option} onClick={this._handleClick(option)}>
      <p>{option.display}</p>
    </div>
  ));

  _setValue = (value) => {
    this.props.setFieldValue(this.props.name, value);
  };
}

export default CustomSelect;
