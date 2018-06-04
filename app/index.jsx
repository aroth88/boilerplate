import '../public/index.css'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../reducer';
import axios from 'axios';


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.googleLogin = this.googleLogin.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/login', this.state)
      .then(res => {
        console.log(res);
      })
  }

  // googleLogin(event) {
  //   console.log('go to google')
  //   return axios.get('/auth/google')
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.email} name="email" onChange={this.handleChange} />
          <input value={this.state.password} name="password" onChange={this.handleChange} />
          <button type="submit">submit</button>
        </form>
        <a href='/auth/google'>Login with google</a>
        {/* <button onClick={this.googleLogin}>Login with google</button> */}
      </div>
    )
  }
}


ReactDOM.render(
  <Provider store={store}>
    <div>
      <h2>Hello World</h2>
      < Signup />
    </div>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);