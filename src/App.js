import React, {Component} from 'react';
import {addListener, removeListener} from './AuthorizeApi';
import {Switch, Redirect, Route, Link} from 'react-router-dom';
import Home from './Home';
import Public from './Public';
import Auth from './Auth';
import Private from './Private';
import './App.css';

class App extends Component {
  state = {
    isAuthorized: false
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({isAuthorized});
  };

  render() {
    const {isAuthorized} = this.state;

    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/public">Public</Link>
          <Link to="/auth">Auth</Link>
          <Link to="/private">Private</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/public" component={Public} />
          <Route path="/auth" component={Auth} />
          {isAuthorized && <Route path="/private" component={Private} />}
          {!isAuthorized && <Redirect from="/private" to="/auth" />}
          {!isAuthorized && <Redirect to="/" />}
        </Switch>
      </div>
    );
  }
}

export default App;
