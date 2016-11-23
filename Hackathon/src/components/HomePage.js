import React, { Component } from 'react';


class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Hi, Welcome Home!</h1>
              <p><a className="btn btn-success btn-lg" href="#/users" role="button">Go to Users Page</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
