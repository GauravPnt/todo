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
      if (res)
        this.setState({
          list: res
        })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              {this.state.list.map((todo, i) => {
                <tr>
                  <td key={i}>{todo}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default View