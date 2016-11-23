import 'isomorphic-fetch';
import React, { Component } from 'react';


class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json.users,
        });
      });
  }

  renderUser() {
    const { users } = this.state;
    return users.map(user => (
      <tr>
        <th><a href={`#/users/${user.id}`}>{user.id}</a></th>
        <td><a href={`#/users/${user.id}`}>{user.name}</a></td>
        <td><a href={`#/users/${user.id}`}>{user.age}</a></td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {this.renderUser()}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <a href="#/" className="btn btn-default">
              <span className="glyphicon glyphicon-arrow-left" aria-hidden="true" /> Back
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersPage;
