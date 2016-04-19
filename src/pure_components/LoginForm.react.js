import React, { Component } from 'react';
import toastr from 'toastr';

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
      <div style={{  margin: '0', border: '0px solid tomato', boxSizing: 'border-box', height: '100%', padding: '8px', maxWidth: '100%' }} className="float-left-on-small">
  			<form>
          <button 
          	type="submit" 
          	className="btn btn-default" 
          	style={{ float: 'right', borderRadius: '0', background: '#B9F6CA', height: '50px', border: '1px solid #CFD8DC' }} 
          	onClick={this.login}>  Sign Up | Sign In </button>

            <input 
              type="password"              
              placeholder="password" 
              style={{ width: '112px', float: 'right', boxSizing: 'border-box', height: '50px', border: '1px solid #CFD8DC', marginRight: '4px' }} 
              // style={{ marginRight: '5px', width: '25%', display: 'inline-block' }} 
              value={this.state.password}
              onChange={ e => this.setState({ password: e.target.value })}/>
            
            <input 
              type="text" 
              placeholder="username" 
              style={{ width: '112px', float: 'right', boxSizing: 'border-box', height: '50px', border: '1px solid #CFD8DC', marginRight: '4px' }} 
              // style={{ marginRight: '5px', width: '25%', display: 'inline-block' }} 
              value={this.state.email}
              onChange={ e => this.setState({ email: e.target.value })} />
        </form>
      </div>
		);
	}

	login = e => {
		e.preventDefault();
    if ( this.state.email == "" && this.state.password == "") {
      toastr.info("To sign up, enter a username and password. If the username isn't taken it will be automatically created and logged in.")
      return
    }

    if (this.state.email == "") {
      toastr.info("username can't be blank");
      return
    }
    this.props.firebaseRef.createUser(
      add_email(this.state),
      (error, userData) => {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              this.props.firebaseRef.authWithPassword(
                add_email(this.state), 
                (error, authData) => {
                  if (error) {
                    console.log(error);
                    toastr.warning("Login Failed! " + String(error));
                  } else {
                    toastr.success("Logged In As:  " + String(add_email(this.state).email.split('@')[0]));
                    console.log(authData);
                  }
                }
              );
              break;
            default:
              break;
          }
        } else {
          this.props.firebaseRef.authWithPassword(
            add_email(this.state), 
            (error, authData) => {
              if (error) {
                console.log(error);
                toastr.warning("Login Failed!");
              } else {
                toastr.success("User Created and Logged In as:  " + String(add_email(this.state).email.split('@')[0]));
                console.log(authData);
              }
            }
          );
        }
      }
    );
	}
}