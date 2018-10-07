import React from "react";

const cubeStyle = {
  height: 40,
  width: "100%",
  border: "1px solid #111",
  backgroundColor: "#fff"
};

export default class extends React.Component {
  state = { isOver: false };
  render() {
    const { item, handleShowDropZone, handleChangeItemColumn } = this.props;
    return (
      <div
        key={item.id}
        style={{
          ...cubeStyle,
          backgroundColor: this.state.isOver ? "#ddd" : "#fff"
        }}
        onDragStart={e => {
          e.dataTransfer.setData("text/plain", JSON.stringify(item));
        }}
        draggable={true}
        onDragEnter={e => {
          e.preventDefault();
          this.setState({ isOver: true });
        }}
        onDragLeave={e => {
          e.preventDefault();
          this.setState({ isOver: false });
        }}
        onDragOver={e => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }}
        onDrop={e => {
          e.preventDefault();

          const bb = e.nativeEvent.target.getBoundingClientRect();
          const position = (e.pageX - (bb.left + bb.right)/2) > 0 ? 'right' : 'left';
          // console.log('>>', position)

          handleShowDropZone(null);
          this.setState({ isOver: false });
          const data = JSON.parse(e.dataTransfer.getData("text/plain"));
          

          handleChangeItemColumn(data, item, position)
        }}
      >
        {item.id}
      </div>
    );
  }
}
