import React, { Component } from 'react';

class App extends Component {
  state = {
    values: []
  } 
  componentDidMount() {
    this.setState({
      values: [{id: 1,  name: "Value 101"}, {id: 2, name: "Value 102"}]
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            {this.state.values.map((value: any) => (
              <li>{value.name}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
