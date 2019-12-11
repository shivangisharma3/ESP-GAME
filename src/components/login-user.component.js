import React, {Component } from 'react';
import axios from 'axios';
import {
  setInStorage,
  getFromStorage,
} from '../utils/storage';
export default class LoginUser extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        token: '',
        signUpError: '',
        signInError: '',
        signInUsername: '',
        signInPassword: '',
        signUpUsername: '',
        signUpPassword: '',
       
      };
 
      this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(this);
      this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
      this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
      this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
      this.onSignIn = this.onSignIn.bind(this);
      this.onSignUp = this.onSignUp.bind(this);
      this.logout = this.logout.bind(this);
      this.game = this.game.bind(this);

    }
  componentDidMount() {
    const obj = getFromStorage('ESP');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      axios.get('http://localhost:5000/users/login/verify?token='+token)
        //.then(res => res.json())
        .then(res => {
          if (res.data.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  onTextboxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  game(){
    const obj = getFromStorage('ESP');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      axios.get('http://localhost:5000/games/begin?token='+token)
        //.then(res => res.json())
        .then(res => {
          if (res.data.success) {
            console.log(res.data)
            setInStorage('Games', { game_id: res.data.game_token,q1:res.data.q1t,
              q2:res.data.q2t,
              q3:res.data.q3t,
              q4:res.data.q4t,
              q5:res.data.q5t,
              begin:res.data.begint
             });
            window.location='/game'
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  onSignUp() {
    // Grab state
    const {
      signUpUsername,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });
    axios.post('http://localhost:5000/users/add',{"username": signUpUsername,"password":signUpPassword})
    .then(res => {
          if (res.data.success) {
            this.setState({
              signUpError: 'Successful Sign Up',
              isLoading: false,
              signUpUsername: '',
              signUpPassword: '',
            });
          } else {
            this.setState({
              signUpError: 'Error',
              isLoading: false,
            });
          }
        });
  }

  onSignIn() {
    // Grab state
    const {
      signInUsername,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    axios.post('http://localhost:5000/users/login',{"username": signInUsername,"password":signInPassword})
    .then(res => {
        if (res.data.success) {
          setInStorage('ESP', { token: res.data.token });
          this.setState({
            signInError: res.data.message,
            isLoading: false,
            signInPassword: '',
            signInUsername: '',
            token: res.data.token,
          });
        } else {
          this.setState({
            signInError: res.data.message,
            isLoading: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          signInError: "No response",
          isLoading: false,
        });
      });
  }
  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('ESP');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      axios.get('http://localhost:5000/users/logout?token=' + token)
        //.then(res => res.json())
        .then(res => {
          if (res.data.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
      signUpUsername,
      signUpPassword,
      signUpError
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <div>
            
            <p>Sign In</p>
            <input
              type="Username"
              placeholder="Username"
              value={signInUsername}
              onChange={this.onTextboxChangeSignInUsername}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
          </div>
          <br />
          <br />
          <div>
           
            <p>Sign Up</p>
            <input
              type="Username"
              placeholder="Username"
              value={signUpUsername}
              onChange={this.onTextboxChangeSignUpUsername}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
          {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
          }
        </div>
      );
    }

    return (
      <div>
        <p>Welcome to your Account</p>
        <button onClick={this.game}>Begin Game</button>
        <button onClick={this.logout}>Logout</button>
      </div>


    );
  }
}