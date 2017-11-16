import React, {Component} from 'react';
import {authorizeUser} from './AuthorizeApi';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isAuthorized: false,
    error: false
  };

  handleSubmit = () => {
    const {email, password} = this.state;
    const isAuthorized = authorizeUser(
      email,
      password
    );
    const error = !isAuthorized;

    this.setState({isAuthorized, error});
  };

  render() {
    const {isAuthorized, error} = this.state;

    return (
      <div>
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button onClick={this.handleSubmit}>
          Enter
        </button>
        {error && <p className="error">error</p>}
        {isAuthorized && <Redirect to="/" />}
      </div>
    );
  }
}

export default Auth;
