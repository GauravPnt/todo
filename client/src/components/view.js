import React, { Component } from 'react'
import *as jwt_decode from 'jwt-decode'
import { viewTodo } from './UserFunctions';

class View extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      list: []
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token);

    this.setState({
      id: decoded._id
    })

    viewTodo(decoded._id).then(res => {
      if (res) {
        let temp = res.canView;
        temp.sort((a, b) => a.priority - b.priority)
        this.setState({
          list: temp
        })
        console.log(res);
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Can View</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
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
                    </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default View