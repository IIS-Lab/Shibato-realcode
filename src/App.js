import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Login from './login/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 class="my-0 mr-md-auto font-weight-normal">RealCode</h5>
            <nav class="my-2 my-md-0 mr-md-3">
              <a class="p-2 text-dark" href="#">About</a>
              <a class="p-2 text-dark" href="#">IIS-Lab</a>
            </nav>
            <a class="btn btn-outline-primary" href="/login">Log in or Sign up</a>
          </div>
          <Route path="/login" component={Login} />

          <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto w-50">
            <h3 class="font-weight-light mb-4">サインイン</h3>
            <form>
              <div class="form-group row">
                <label className="col-sm-3 col-form-label">名前</label>
                <input type="text" class="col-sm-7 form-control" placeholder="Enter name"/>
              </div>
              <div class="form-group row">
                <label className="col-sm-3 col-form-label">メールアドレス</label>
                <input type="email" class="col-sm-7 form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                  <button type="submit" class="btn btn-primary">ユーザ登録</button>
              </div>
              <div className="form-group">
                <button type="submit" class="btn btn-outline-primary">サインイン</button>
              </div>
            </form>
          </div>

        </div>
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload. <Link to="/login">login</Link>
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <Route path="/login" component={Login} />
        </div> */}
      </Router>
    );
  }
}

export default App;
