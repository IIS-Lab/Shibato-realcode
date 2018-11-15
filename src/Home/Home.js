import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="App">
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
    );
  }
}

export default Home;
