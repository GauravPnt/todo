import React, { Component } from 'react'
import *as jwt_decode from 'jwt-decode'
import { editTodo, createTodo, deleteTodo, grantEdit, grantView, edit } from './UserFunctions';

// Edit Todo list
class Edit extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      list: [],
      tempText: '',
      tempPriority: 0,
      slectedID: '',
      option: 0
    }
  }

  // Track Controlled forms inputs
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Submit form to client, form is common for new creates, edits, granting view and granting edits based on target id
  onSubmit = (e) => {
    e.preventDefault()

    // Create new Todo
    if (e.target.id == 0) {
      const todo = {
        senderID: this.state.id,
        text: this.state.tempText,
        priority: this.state.tempPriority
      }

      createTodo(todo).then(res => {
        return;
      })
    }

    // Edit current Todo
    if (e.target.id == 1) {
      const todo = {
        id: this.state.slectedID,
        text: this.state.tempText,
        priority: this.state.tempPriority
      }

      edit(todo).then(res => {
        return;
      })
    }

    // Grant view permission
    if (e.target.id == 2) {
      const todo = {
        id: this.state.slectedID,
        email: this.state.tempText
      }

      grantView(todo).then(res => {
        return;
      })
    }

    // Grant edit permission
    if (e.target.id == 3) {
      const todo = {
        id: this.state.slectedID,
        email: this.state.tempText
      }

      grantEdit(todo).then(res => {
        return;
      })
    }

    // Reload Window for changes
    window.location.reload();
  }

  // Delete Todo 
  deletetodo = (e) => {
    deleteTodo(e.target.id);
    this.setState({
      list: this.state.list.sort((a, b) => a.priority > b.priority)
    });
    window.location.reload();
  }

  componentDidMount() {

    const token = localStorage.usertoken
    const decoded = jwt_decode(token);

    this.setState({
      id: decoded._id
    })

    // Print Todo list on screen sorted acc to priority
    editTodo(decoded._id).then(res => {
      if (res) {
        let temp = res.canEdit;
        temp.sort((a, b) => a.priority - b.priority)
        this.setState({
          list: temp
        })
      }
    })
  }

  // Decides what form is taking value as input
  choose = (e) => {
    this.setState({
      option: e.target.id,
      tempText: e.currentTarget.dataset.text,
      tempPriority: e.currentTarget.dataset.priority,
      slectedID: e.currentTarget.dataset.id
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Can Edit</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            < tbody >
              <tr>
                <td>Name</td>
                <td>Priority</td>
                <td></td>
              </tr>
              {
                this.state.list.map((todo, i) => {
                  return (
                    <tr key={i}>
                      <td>{todo.text}</td>
                      <td>{todo.priority}</td>
                      <td><button id={todo._id} onClick={this.deletetodo}>Delete</button></td>
                      <td><button id={1} data-id={todo._id} data-text={todo.text} data-priority={todo.priority} onClick={this.choose}>Edit</button></td>
                      <td><button id={2} data-id={todo._id} onClick={this.choose}>Grant View</button></td>
                      <td><button id={3} data-id={todo._id} onClick={this.choose}>Grant Edit</button></td>
                    </tr>)
                })
              }
            </tbody>
          </table>
          {this.state.option == 0 &&
            <form noValidate id={0} onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Create New</h1>
              <div className="form-group">
                <label htmlFor="tempText">ToDo</label>
                <input type="text"
                  className="form-control"
                  name="tempText"
                  placeholder="Enter ToDo"
                  value={this.state.tempText}
                  onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="tempPriority">Priority</label>
                <input type="text"
                  className="form-control"
                  name="tempPriority"
                  placeholder="Enter Priority"
                  value={this.state.tempPriority}
                  onChange={this.onChange} />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Create
            </button>
            </form>}
          {this.state.option == 1 &&
            <form noValidate id={1} onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Edit</h1>
              <div className="form-group">
                <label htmlFor="tempText">ToDo</label>
                <input type="text"
                  className="form-control"
                  name="tempText"
                  placeholder={this.state.alt}
                  value={this.state.tempText}
                  onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="tempPriority">Priority</label>
                <input type="text"
                  className="form-control"
                  name="tempPriority"
                  placeholder={this.state.altp}
                  value={this.state.tempPriority}
                  onChange={this.onChange} />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Edit
            </button>
            </form>}
          {this.state.option == 2 &&
            <form noValidate id={2} onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Grant View</h1>
              <div className="form-group">
                <label htmlFor="tempText">User Email</label>
                <input type="text"
                  className="form-control"
                  name="tempText"
                  placeholder="Enter User Email"
                  value={this.state.tempText}
                  onChange={this.onChange} />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Grant permission
            </button>
            </form>}{this.state.option == 3 &&
              <form noValidate id={3} onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Grant Edit</h1>
                <div className="form-group">
                  <label htmlFor="tempText">User Email</label>
                  <input type="text"
                    className="form-control"
                    name="tempText"
                    placeholder="Enter User Email"
                    value={this.state.tempText}
                    onChange={this.onChange} />
                </div>
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Grant permission
            </button>
              </form>}
        </div>
      </div>
    )
  }
}

export default Edit