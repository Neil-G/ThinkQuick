import React, { Component } from 'react';
import toastr from 'toastr';
import { Link } from 'react-router';

toastr.options = {
  "positionClass": "toast-top-center"
}

const add_email = state => {
  return {
    email: state.email.trim() + '@thinkQuick.com',
    password: state.password
  };
}

export class LoginForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
        email: ""
      , password: ""
    } 
  }
	render() {
		return(
      <div 
        className='login-box'
        style={{ margin: '0', boxSizing: 'border-box', height: '100%', display: 'inline-block', maxWidth: '100%' }}>
  			<form>
          <button 
          	type="submit" 
          	className="btn btn-default" 
          	style={{ float: 'right', borderRadius: '0', background: '#B9F6CA', height: '50px', border: '1px solid #CFD8DC' }} 
          	onClick={this.login}>  Sign Up | Sign In </button>

            <input 
              type="password"              
              placeholder="password" 
              style={{ width: '100px', float: 'right', boxSizing: 'border-box', height: '50px', border: '1px solid #CFD8DC', marginRight: '4px' }} 
              // style={{ marginRight: '5px', width: '25%', display: 'inline-block' }} 
              value={this.state.password}
              onChange={ e => this.setState({ password: e.target.value })}/>
            
            <input 
              type="text" 
              placeholder="username" 
              style={{ width: '100px', float: 'right', boxSizing: 'border-box', height: '50px', border: '1px solid #CFD8DC', marginRight: '4px' }} 
              // style={{ marginRight: '5px', width: '25%', display: 'inline-block' }} 
              value={this.state.email}
              onChange={ e => this.setState({ email: e.target.value })} />
        </form>
        <span style={{ fontSize: "0.7em", position: 'absolute', top: '4px', color: 'white' }} className="show-small"> 
          <Link to="/" style={{ color: '#EF9A9A' }}> ThinkQuick! Free-for-all race to solve problems in real time! </Link>
        </span>
      </div>
		);
	}

	login = e => {
		e.preventDefault();

    // if nothing is entered into username or password
    if ( this.state.email == "" && this.state.password == "") {
      toastr.info("To sign up, enter a username and password. If the username isn't taken it will be automatically created and logged in.")
      return
    }

    // if nothing is entered into username 
    if (this.state.email == "") {
      toastr.info("username can't be blank");
      return
    }

    // attempt to create a new user 
    this.props.firebaseRef.createUser(
      add_email(this.state),
      (error, userData) => {
        if (error) {
          switch (error.code) {
            // if username exists, attempt to login
            case "EMAIL_TAKEN":
              this.props.firebaseRef.authWithPassword(
                add_email(this.state), 
                (error, authData) => {
                  if (error) {
                    console.log(error);
                    toastr.warning("Login Failed! " + String(error));
                  } else {
                    toastr.success("Logged In As:  " + String(add_email(this.state).email.split('@')[0]));
                    // console.log(authData);
                  }
                }
              );
              break;
            default:
              break;
          }
        } else {
            // if username didn't exist before it is now created, so attempt to login
          this.props.firebaseRef.authWithPassword(
            add_email(this.state), 
            (error, authData) => {
              if (error) {
                console.log(error);
                toastr.warning("Login Failed!");
              } else {
                toastr.success("User Created and Logged In as:  " + String(add_email(this.state).email.split('@')[0]));
                // console.log(authData);
              }
            }
          );
        }
      }
    );
	}
}