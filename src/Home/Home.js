import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { localStorageKey } from '../Const';
var jsdiff = require('diff');
require('colors');

const api_endpoint = "http://localhost:8080/api/exercise";


class Home extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
      , isError: false
      , exercise: null

    };

    // binding
    this.getExerciseFromApiAsync = this.getExerciseFromApiAsync.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;
    // console.log(cookies.get(localStorageKey));

    if (!this.state.exercise){
      this.getExerciseFromApiAsync();
    }
      
  }

  /**
   * fetch an exercise
   */
  async getExerciseFromApiAsync() {
    this.setState({
      isLoading: true,
    });

    const self = this;

    await fetch(api_endpoint)
      .then(function(response) {
        return response.json();
      })
      .then(function(content) {
        const exercise =  content.exercise;
        self.setState({
          isLoading: false,
          exercise: exercise,
        })
      })
      .catch(function(err) {
        console.error(err);
        self.setState({
          isLoading: false,
          isError: true,
        })
        return;
      })
  }



  render() {

    if (this.state.isError) {
      return (
        <div className="App">
          <p>An error occurred.</p>
        </div>
      )
    }

    if (this.state.isLoading | this.state.exercise === null) {
      return (
        <div className="App">
          <p>Loading...</p>
        </div>
      )
    }

    // extract information
    const exercise_raw = this.state.exercise;
    const exercise = {
      title: exercise_raw.title
      , bodyHTML: exercise_raw.bodyHTML
      , answerTitle: exercise_raw.pull_request.title
      , answerBodyHTML: exercise_raw.pull_request.bodyHTML
      , code_before: exercise_raw.code_change.before_body.split("\n")
      , code_after: exercise_raw.code_change.after_body.split("\n")
    }

    // Calculate code diff
    var code_diff_components = [];
    var diff = jsdiff.diffChars(exercise_raw.code_change.before_body, exercise_raw.code_change.after_body);
    diff.forEach(function(part){
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
      code_diff_components.push(
        <span style={{color: color}}>
          {part.value}
        </span>
      )
      
      // span = document.createElement('span');
      // span.style.color = color;
      // span.appendChild(document
      //   .createTextNode(part.value));
      // fragment.appendChild(span);
    });

    return (
      <div className="container">

        {/* Exercise title and body */}
        <div className="row">
          <h2 className="font-weight-light mb-4">Q: { exercise.title }</h2>
        </div>
        <div className="row" dangerouslySetInnerHTML={{__html: exercise.bodyHTML}}></div>

        <hr></hr>

        {/* Answer */}
        <div className="row">
          <h2 className="font-weight-light mb-4">Answer: { exercise.answerTitle }</h2>
        </div>
        <div className="row" dangerouslySetInnerHTML={{__html: exercise.answerBodyHTML}}></div>
        {/* <div className="row">
          <div className="col-6">
            <code>{ exercise.code_before }</code>
          </div>
          <div className="col-6">
            <code>{ exercise.code_after }</code>
          </div>
        </div> */}
        {code_diff_components}

        {/* <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto w-50">
            <h3 className="font-weight-light mb-4">サインイン</h3>
            <form>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">名前</label>
                <input type="text" className="col-sm-7 form-control" placeholder="Enter name"/>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">メールアドレス</label>
                <input type="email" className="col-sm-7 form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">ユーザ登録</button>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-outline-primary">サインイン</button>
              </div>
            </form>
          </div> */}
      </div>
    );
  }
}

export default withCookies(Home);
