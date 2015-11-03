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
			<form style={{ float: 'right', marginTop: '10px', marginRight: '-10px'}}>

          <input 
          	type="text" 
          	 
          	placeholder="username" 
          	style={{ marginRight: '5px', width: '25%', display: 'inline-block' }} 
          	value={this.state.email}
          	onChange={ e => this.setState({ email: e.target.value })} />

          <input 
          	type="password" 
          	 
          	placeholder="password" 
          	style={{ marginRight: '5px', width: '25%', display: 'inline-block' }} 
          	value={this.state.password}
          	onChange={ e => this.setState({ password: e.target.value })}/>
        

        <button 
        	type="submit" 
        	className="btn btn-default" 
        	style={{ marginRight: '5px', borderRadius: '0px', background: '#455A64', width: '20%', display: 'inline-block', color: 'white', border: '0' }} 
        	onClick={this.login}> Log In  </button>
        <button
          type="submit" 
          className="btn btn-default" 
          style={{ marginRight: '5px', borderRadius: '0px', background: '#455A64', width: '20%', display: 'inline-block', color: 'white', border: '0' }}
          onClick={this.signUpHint}> Sign up </button>
      </form>
		);
	}

	login = e => {
		e.preventDefault();
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

  signUpHint = e => {
    e.preventDefault();
    toastr.info("The Log In Form is also the Sign Up Form. If the username isn't taken it will be automatically created and logged in.");
  }

}