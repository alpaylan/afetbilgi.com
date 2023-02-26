import React from 'react';
import { Login } from './components/Login';
import { DataTable } from './components/Table';

interface AppState {
  loggedIn: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  handleLogin = (username: string, password: string) => {
    // Perform login logic here, e.g. call an API to check credentials
    if (username === 'example' && password === 'password') {
      this.setState({ loggedIn: true });
    }
  };

  render() {
    const { loggedIn } = this.state;

    if (!loggedIn) {
      return <Login onLogin={this.handleLogin} />;
    }

    return <DataTable />;


    
  }
}

export default App;
