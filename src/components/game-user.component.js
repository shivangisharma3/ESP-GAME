import React, {Component } from 'react';
import axios from 'axios';
import {
  getFromStorage, setInStorage,
} from '../utils/storage';
export default class LoginUser extends Component {
  constructor(props) {
      super(props);
      this.state = {
        token: '',
        isLoading: true,
        level: 1,
        game_id: -1,
        q1: -1,
        q2: -1,
        q3: -1,
        q4:-1,
        q5:-1,
        begin: false,
        score: 0,
        selectedOption:'0',
        test: false,

       
      };
      this.handleOptionChange=this.handleOptionChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.logout = this.logout.bind(this);
      this.login = this.login.bind(this);

    }
  componentDidMount() {
    const obj = getFromStorage('ESP');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      axios.get('http://localhost:5000/users/login/verify?token='+token)
        .then(res => {
          if (res.data.success) {
            this.setState({
              token
            });
            const obj1 = getFromStorage('Games');
            if (obj1!=null && obj1.game_id!=null&& obj1.q1!=null&&obj1.q2!=null &&obj1.q3!=null &&obj1.q4!=null&&obj1.q5!=null&&obj1.begin!=null) {
              const {game_id,q1,q2,q3,q4,q5,begin } = obj1;
              this.setState({
                game_id,
                q1,
                q2,
                q3,
                q4,
                q5,
                begin
              });
            }
            else
            {
              console.log("no obj1")
            }
          }
          else
          {
            this.setState({
              isLoading: false
            })
          }
        })
        .catch(err => {console.log(err)});
    } 
  }
  handleSubmit(e)
  {
    e.preventDefault();
    this.setState({
      test:true
    })
  axios.post('http://localhost:5000/exercises/update',{game_id:this.state.game_id,
  begin:this.state.begin,
  value:this.state.selectedOption,
  level:this.state.level
  })
  .then(res=>{
    //console.log(res.data);
    if(res.data.success)
    {
      var tmp=this.state.level+1;
      this.setState({
        level:res.data.levelv,
        isLoading:false
      })
      //console.log(this.state.level)
      if(this.state.begin){
      this.setState({
        score:res.data.score
      })
    }
  
      
    }
    else
    {
      //console.log("errrrr")
      this.setState({
        level:6,
        isLoading:false
      })
    }
  })
  .catch(err=>{
    //console.log("error error error")
    this.setState({
      level:6,
      isLoading:false
    })
  })
  }
  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }
  login(){
      window.location='/login';
  }
  logout() {
    const obj = getFromStorage('ESP');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      axios.get('http://localhost:5000/users/logout?token=' + token)
        .then(res => {
          if (res.data.success) {
            this.setState({
              token: '',
              isLoading: false,
            });
          }
        });
    }
  }
  render() {
    const {
      token,
      game_id,
      isLoading,
      level,test,score,
      q1,q2,q3,q4,q5,begin
    } = this.state;
    if(!token&&isLoading)
    {
      return(
      <div>
        <p> Loading Game .......</p>
      </div>
      );
    }
    if (!token) {
      return (
        <div> 
            <button onClick={this.login}>Sign In</button> 
          </div>
      );
    }
    var letterStyle = {
      padding: 10,
      margin: 10,
      color: "#334",
      display: "inline-block",
      fontFamily: "monospace",
      fontSize: 24,
      textAlign: "center"
  };
    return (
      
      <span>
      <div style={letterStyle}>
        {
              (game_id!==-1) ? (
                <h3>Game ID : {game_id}</h3>
              ) : (null)
        }
        {(level<6)? (
          <div>
          <p><img src={"/images/"+eval("q"+level)+".jpeg"} style={{height:200,width:200}} alt={"img"}/></p>
          <h3>Select a similar image: </h3>
          <form onSubmit={this.handleSubmit}>
          {" "}<div className="radio">
            <label>
              
            <input type="radio" value ='1'
                            checked={this.state.selectedOption === '1'} 
                            onChange={this.handleOptionChange} />{" "}
              <img src={"/images/"+eval("q"+level)+"/"+"1.jpeg"} style={{height:150,width:150}} alt={"img"}/>
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value='2'
                            checked={this.state.selectedOption === '2'} 
                            onChange={this.handleOptionChange} />{" "}
              <img src={"/images/"+eval("q"+level)+"/"+"2.jpeg"} style={{height:150,width:150}} alt={"img"}/>
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value='3'
                            checked={this.state.selectedOption === '3'} 
                            onChange={this.handleOptionChange} />{" "}
              <img src={"/images/"+eval("q"+level)+"/"+"3.jpeg"} style={{height:150,width:150}} alt={"img"}/>
            </label>
          </div>
          <button type="submit">Save</button>
        </form>
        
          </div>
          )
          : (null)
        }
        {(level==6&&!begin) ?("Game Finished !!")
          :(null)
        }
        {(level==6&&begin) ?("Game Finished !!"+"Score is ="+score)
          :(null)
        }
        <p></p>
        <p>
          <button onClick={this.logout}>Logout</button>
        </p>
      </div>
      </span>


    );
  }
}