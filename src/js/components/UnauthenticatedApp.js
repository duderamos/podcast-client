import React from 'react';
import { AuthContext } from '../contexts/AuthContext';

class UnauthenticatedApp extends React.Component {
  static contextType = AuthContext;

  render() {
    const authContext = this.context;
    return (
      <div className="app-container">
        <p>Not authenticated :( </p>
        <form onSubmit={authContext.login}>
          <div>
            <input
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default UnauthenticatedApp;
