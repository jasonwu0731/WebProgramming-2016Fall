import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';

class SingleUserPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const id = this.props.id;
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user,
        });
      });
  }

  componentDidUpdate() {
    const id = this.props.id;
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user,
        });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container omg">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              <h1>{user.name} <small>{user.age} years old</small></h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-2">
            <div className="thumbnail">
              <img src={user.avatar} alt={`${user.name}-avatar`} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <a href="#/users" className="btn btn-default">
              <span className="glyphicon glyphicon-arrow-left" aria-hidden="true" /> Back
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleUserPage;
