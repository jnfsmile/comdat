import React, { Component } from "react";

class MenuButton extends Component {
  render() {
    return (
      <li
        onClick={() => {
          this.props.onClick();
        }}
        className={
          "type " +
          this.props.value +
          (this.props.active === this.props.value ? " active" : "")
        }
      >
        {this.props.value}
      </li>
    );
  }
}

export default MenuButton;
