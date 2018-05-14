import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Cards from "./Cards";
import './App.css';

class LayoutPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showListCreatorButton: true,
        showListDescCreator: false,
        listHeaders: [],
        inputFieldValue: "",
        lists: [{
          text: "Sample List",
          listOfCards: [
            { id: 1, text: "Item 1" },
            { id: 2, text: "Item 2" },
            { id: 3, text: "Item 3" }
          ]
        }]
      };
      this.handleClick = this.handleClick.bind(this);
      this.createList = this.createList.bind(this);
      this.closeList = this.closeList.bind(this);
      this.handleinputFieldChange = this.handleinputFieldChange.bind(this);
  }

  handleClick() {
    let { showListCreatorButton, showListDescCreator } = this.state;
    this.setState({
      showListCreatorButton: !showListCreatorButton,
      showListDescCreator: !showListDescCreator,
    });
  }

  closeList() {
    let { showListCreatorButton, showListDescCreator } = this.state;
    this.setState({
      showListCreatorButton: !showListCreatorButton,
      showListDescCreator: !showListDescCreator,
    });
  }

  handleinputFieldChange(event) {
    this.setState({inputFieldValue: event.target.value});
  }

  createList() {
    let { showListCreatorButton, showListDescCreator, inputFieldValue } = this.state;
    
    let listHeaders = {
      text: inputFieldValue,
      listOfCards: []
    };
    
    this.setState({
      showListCreatorButton: !showListCreatorButton,
      showListDescCreator: !showListDescCreator,
    }, () => {
      if (inputFieldValue !== "") {
        this.setState({
          lists: [...this.state.lists, listHeaders],
          inputFieldValue: ""
        });
      }
    });
  }

  render() {
    let { showListCreatorButton, showListDescCreator, inputFieldValue } = this.state;
    const style = {
      paddingTop: "20px"
    };
    const { lists } = this.state;

    return (
      <div className="Main">

        <div style={{...style}}>
          {lists.map((list, i) => {
            return (
              <Cards key={i} id={i} list={list.listOfCards} listText={list.text} />
            )
          })}
        </div>
      
        <div className="ListCreateBtn">
          {this.state.showListCreatorButton ? <div>
            <Button onClick={this.handleClick}>Add a List...</Button>
            </div> : <div>
              <Input placeholder="Add a List..." value={this.state.inputFieldValue} onChange={this.handleinputFieldChange}/><br/>
              <Button onClick={this.createList}>Save</Button>
              <Button onClick={this.closeList}>Close</Button>
            </div> }
          
          
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(LayoutPage);