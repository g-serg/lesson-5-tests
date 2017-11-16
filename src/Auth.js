import React, {Component} from 'react';
import {authorizeUser} from './AuthorizeApi';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
  state = {
    email: 'student@loftschool.ru',
    password: '123',
    isAuthorized: false,
    error: false
  };

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  };

  handleSubmit = () => {
    const {email, password} = this.state;
    const isAuthorized = authorizeUser(email, password);
    const error = !isAuthorized;

    this.setState({isAuthorized, error});
  };

  render() {
    const {isAuthorized, error, email, password} = this.state;

    return (
      <div>
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Enter</button>
        {error && <p className="error">error</p>}
        {isAuthorized && <Redirect to="/" />}
      </div>
    );
  }
}

export default Auth;
