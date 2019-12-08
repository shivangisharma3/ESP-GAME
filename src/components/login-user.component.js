import React, {Component } from 'react';
import axios from 'axios';
export default class LoginUser extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: ''
        }
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
        axios.get('http://localhost:5000/users/login/'+this.state.username)
            .then(response => {
                console.log(response.data);
                })
            .catch((error) => {console.log(error);})
        window.location="/user";
      }
    
      render() {
        return (
          <div>
            <h3>User Login</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }
    }