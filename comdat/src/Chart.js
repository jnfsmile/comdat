import React, { Component } from "react";
import {
  DiagramWidget,
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel
} from "storm-react-diagrams";

require("storm-react-diagrams/src/sass/main.scss");

class Chart extends Component {
  render() {
    //1) setup the diagram engine
    const engine = new DiagramEngine();
    engine.installDefaultFactories();

    //2) setup the diagram model
    const model = new DiagramModel();

    let pos = [100, 100];
    const nodes = [];

    //3) create default nodes
    console.log(this.props.nodes);
    this.props.nodes.forEach(n => {
      const node = new DefaultNodeModel(n.text, n.color);
      const port = node.addOutPort(" ");
      const port2 = node.addInPort(" ");
      node.setPosition(pos[0], pos[1]);
      pos[1] += 60;
      nodes.push(node);
    });

    // link the ports
    //let link1 = port.link(port2);

    //4) add the models to the root graph
    model.addAll(...nodes);

    //5) load model into engine
    engine.setDiagramModel(model);

    return (
      <div>
        <DiagramWidget className="srd-canvas" diagramEngine={engine} />
      </div>
    );
  }
}

export default Chart;
