import React, { Component } from "react";
import logo from "./logo.svg";
import MenuButton from "./MenuButton";
import Chart from "./Chart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      chart: 0,
      spans: 0
    };
  }
  selectText() {
    const text = this.getSelectionText();
    if (text.length < 2 || !this.state.color) return;
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, this.state.color);
    window.getSelection().collapse(null);
    this.setState({
      spans: document.getElementById("mishna-text").getElementsByTagName("span")
        .length
    });
  }
  getSelectionText() {
    this.snapSelectionToWord();
    let text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }
  snapSelectionToWord() {
    /* https://stackoverflow.com/a/7381574/1305911 */
    let sel;

    // Check for existence of window.getSelection() and that it has a
    // modify() method. IE 9 has both selection APIs but no modify() method.
    if (window.getSelection && (sel = window.getSelection()).modify) {
      sel = window.getSelection();
      if (!sel.isCollapsed) {
        // Detect if selection is backwards
        const range = document.createRange();
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, sel.focusOffset);
        const backwards = range.collapsed;
        range.detach();

        // modify() works on the focus of the selection
        const endNode = sel.focusNode,
          endOffset = sel.focusOffset;
        sel.collapse(sel.anchorNode, sel.anchorOffset);

        var direction = [];
        if (backwards) {
          direction = ["backward", "forward"];
        } else {
          direction = ["forward", "backward"];
        }

        sel.modify("move", direction[0], "character");
        sel.modify("move", direction[1], "word");
        sel.extend(endNode, endOffset);
        sel.modify("extend", direction[1], "character");
        sel.modify("extend", direction[0], "word");
      }
    } else if ((sel = document.selection) && sel.type !== "Control") {
      var textRange = sel.createRange();
      if (textRange.text) {
        textRange.expand("word");
        // Move the end back to not include the word's trailing space(s),
        // if necessary
        while (/ $/.test(textRange.text)) {
          textRange.moveEnd("character", -1);
        }
        textRange.select();
      }
    }
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
  renderChart() {
    if (this.state.chart === 0) return <div />;

    const nodes = [];
    const spans = document
      .getElementById("mishna-text")
      .getElementsByTagName("span");
    for (var i = 0, l = spans.length; i < l; i++) {
      const text = spans[i].textContent || spans[i].innerText;
      const color = window.getComputedStyle(spans[i]).getPropertyValue("color");
      nodes.push({
        text,
        color
      });
    }

    return <Chart nodes={nodes} />;
  }
  menuClick(color, text) {
    this.setState({ color, active: text });
  }
  chartClick() {
    this.setState({ chart: this.state.chart + 1 });
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
            id="mishna-text"
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
        <button
          disabled={this.state.spans < 2}
          onClick={() => this.chartClick()}
        >
          התרשים!
        </button>
        {this.renderChart()}
      </div>
    );
  }
}

export default App;
