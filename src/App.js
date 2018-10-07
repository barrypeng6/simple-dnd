import React, { Component } from "react";
import Cube from "./cube";
import convert from "./covert";

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  height: 40,
  border: "1px solid rgb(221, 221, 221)",
  justifyContent: "flex-start"
};

class App extends Component {
  state = {
    items: [
      { id: "1", row: 0, column: 1 },
      { id: "2", row: 0, column: 0 },
      { id: "3", row: 1, column: 0 }
    ],
    selected: null
  };

  handleShowDropZone = idx => {
    this.setState({ selected: idx });
  };

  handleChangeItem = (data, targetRow) => {
    // console.log(data, targetRow);
    const { items } = this.state;
    const newItems = items.map(
      item => (item.id === data.id ? { ...item, row: targetRow } : item)
    );
    // console.log("NEW>>>", newItems);
    this.setState({ items: newItems });
  }

  handleChangeItemColumn = (data, targetData, position) => {
    console.log(">>", data, targetData, position);
    const { items } = this.state;
    const newItems = items.map(item => {
      if (item.id === data.id) {
        return { ...item, row: targetData.row, column: position === 'right' ? targetData.column + 1 : targetData.column };
      }
      if (item.id === targetData.id) {
        return { ...item, row: targetData.row, column: position === 'right' ? targetData.column : targetData.column + 1 }
      }
      return item;
    });
    console.log("NEW>>>", newItems);
    this.setState({ items: newItems });
  }

  render() {
    console.log(this.state.items)
    // console.log("Arg: ", this.state.items);
    const rows = convert(this.state.items);
    // console.log("Result: ", rows);
    return (
      <>
        {rows.map((items, idx) => (
          <div
            key={idx}
            style={{
              ...rowStyle,
              backgroundColor: this.state.selected === idx ? "#ddd" : "#fff"
            }}
            onDragEnter={e => {
              e.preventDefault();
              this.handleShowDropZone(idx);
            }}
            onDragOver={e => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={e => {
              e.preventDefault();
              this.handleShowDropZone(null);
              if (items.length === 0) {
                const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                this.handleChangeItem(data, idx);
              }
            }}
          >
            {items.map(item => (
              <Cube item={item} handleShowDropZone={this.handleShowDropZone} handleChangeItemColumn={this.handleChangeItemColumn} />
            ))}
          </div>
        ))}
      </>
    );
  }
}

export default App;
