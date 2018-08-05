import React, { Component } from "react";
import logo from "./logo.svg";
import MenuButton from "./MenuButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null
    };
  }
  getSelectionText() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }
  menuClick(color, text) {
    this.setState({ color, active: text });
  }
  selectText() {
    const text = this.getSelectionText();
    if (text.length < 2 || !this.state.color) return;
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, this.state.color);
    window.getSelection().collapse(null);
  }
  renderMenuButton(text, color) {
    return (
      <MenuButton
        color={color}
        onClick={() => this.menuClick(color, text)}
        value={text}
        active={this.state.active}
      />
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">כאמד"ט</h1>
        </header>
        <div className="editor-wrap">
          <div
            className="text-box"
            contentEditable="true"
            onMouseUp={() => this.selectText()}
          >
            אלו מציאות שלו, ואלו חייב להכריז?
            <br />
            אלו מציאות שלו:
            <br />
            מצא פירות מפוזרין, מעות מפוזרות, כריכות ברשות הרבים, ועיגולי דבילה,
            ככרות של נחתום,
            <br />
            מחרוזות של דגים, וחתיכות של בשר, וגיזי צמר הבאות ממדינתן, ואניצי
            פשתן, ולשונות של ארגמן, הרי אלו שלו -<br />
            דברי רבי מאיר.
            <br />
            רבי יהודה אומר:
            <br />
            כל שיש בו שינוי, חייב להכריז.
            <br />
            כיצד? מצא עיגול ובתוכו חרס, ככר ובתוכו מעות.
            <br />
            רבי שמעון בן אלעזר אומר:
            <br />
            כל כלי אנפוריא אינו חייב להכריז.
          </div>
          <div className="menu">
            <ul>
              {this.renderMenuButton("כותרת", "#AA7700")}
              {this.renderMenuButton("אומר", "#AA0000")}
              {this.renderMenuButton("מקרה", "#AA0077")}
              {this.renderMenuButton("דין", "#00AA00")}
              {this.renderMenuButton("טעם", "#3355AA")}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
