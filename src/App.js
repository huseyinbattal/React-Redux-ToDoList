import React from "react";
import { connect } from "react-redux";
import {
  addMessage,
  editMessage,
  deleteMessage,
} from "./store/actions/updateList";
import "./index.css";

// React:
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);

  }



  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }
  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.submitMessage();
    }
  }
  submitMessage() {
    if (this.state.input === "") {
      return;
    }
    this.props.addMessage(this.state.input);
    this.setState({
      input: "",
    });
  }

  render() {
    return (
      <div id="toDoApp" className="container bg-danger" >
        <label id="toDoTitle" htmlFor="basic-input">
          <h2 className="text-monospace mt-3">JUST DO IT!</h2>
        </label>
        <div id="toDoAdd" className="input-group">
          <input
            id="basic-input"
            className="form-control"
            type="text"
            placeholder="Thing to do"
            value={this.state.input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-dark"
              onClick={this.submitMessage}
            >
              Add
            </button>
          </div>
        </div>
        {this.props.messages.length > 0 ? (
          <List
            messages={this.props.messages}
            editMessage={this.props.editMessage}
            deleteMessage={this.props.deleteMessage}
          />
        ) : (
          <NoList />
        )}
      </div>
    );
  }
}

const List = (props) => {
  return (
    <div id="toDoList" className="container bg-warning mt-4">
      <label htmlFor="basic-input">
        <span className="text-monospace">Things to do:</span>
      </label>
      <div className="list-group">
        {props.messages.map((x, i) => {
          let rand = Math.floor(Math.random() * 10000 + 1);
          let key = "id" + i + "" + rand;
          return (
            <ListItem
              key={key}
              text={x}
              index={i}
              editMessage={props.editMessage}
              delete={props.deleteMessage}
            />
          );
        })}
      </div>
    </div>
  );
};

const NoList = () => {
  return (
    <div
      id="toDoList"
      className="d-flex align-items-center justify-content-center"
    >
      <p className="text-monospace mt-5">Your list is empty</p>
    </div>
  );
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInput: this.props.text,
      x:false
    };
    this.itemInputChange = this.itemInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

  }


  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.editItem();
    }

  }

  itemInputChange(event) {
    this.setState({
      itemInput: event.target.textContent,
    });
  }




  editItem() {
    //let spanToDo = document.getElementById("checkspan");
    //spanToDo.innerText="623639"
    // if (this.state.itemInput === "") {
    //   this.setState({
    //     itemInput: this.props.text
    //   });
    //   return;
    // }
    // let x = this.state.itemInput;
    // this.xChange();
    // this.props.editMessage(this.props.index, x)
    // if (this.state.input==="") {
    //   this.setState({
    //     itemInput: spanToDo
    //   });
    //   return;
    // }
    this.setState({
      x: true
    })


  }


  deleteItem() {
      this.props.delete(this.props.index);
  }

  render() {
    //console.log(this.state.x)
    return (
      <div className="list-group-item list-group-item-action d-flex justify-content-between">
        <a
          href="www.#.com"
          draggable="false"
        >
          <span className={this.state.x ? "checkspan" : ""}
            //contentEditable={true}
            //value={this.state.itemInput}
            //onInput={this.itemInputChange}
            onKeyPress={this.handleKeyPress}
          >
            {this.props.text}
          </span>
        </a>
        <div className="btn-group btn-group-sm" role="group">
          <button
            className="btn btn-success"
            type="button"
            onClick={this.editItem}
          >
            Done
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.deleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

// React-Redux
const MapStateToProps = (state) => {
  let _state = localStorage.state ? localStorage.state : state;
  return { messages: _state };
};

const MapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => {
      dispatch(addMessage(message));
    },
    editMessage: (index, message) => {
      dispatch(editMessage(index, message));
    },
    deleteMessage: (index) => {
      dispatch(deleteMessage(index));
    },
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
