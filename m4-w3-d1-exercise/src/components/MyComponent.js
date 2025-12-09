// src/components/MyComponent.js
import React from 'react';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="input"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
