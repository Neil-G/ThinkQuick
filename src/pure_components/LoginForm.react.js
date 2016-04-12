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
			<form style={{ position: 'absolute', top: '8px', marginBottom: '0' }} className="float-left-on-small" >
        
          <input 
          	type="text" 
          	className="form-control" 
          	placeholder="username" 
          	style={{ marginRight: '2px', marginLeft: '2px', width: '32%', display: 'inline-block' }} 
          	value={this.state.email}
          	onChange={ e => this.setState({ email: e.target.value })} />

          <input 
          	type="password" 
          	className="form-control" 
          	placeholder="password" 
          	style={{ marginRight: '2px', width: '32%', display: 'inline-block' }} 
          	value={this.state.password}
          	onChange={ e => this.setState({ password: e.target.value })}/>
        

        <button 
        	type="submit" 
        	className="btn btn-default" 
        	style={{ marginRight: '5px', borderRadius: '0px', background: '#455A64', width: '32%', display: 'inline-block', color: 'white', border: '0', fontSize: "0.7em" }} 
        	onClick={this.login}>  Sign Up | Sign In </button>
      </form>
		);
	}

	login = e => {
		e.preventDefault();
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

		// this.props.firebaseRef.authWithPassword(this.state, (error, authData) => {
		//   if (error) {
		//     toastr.info("Login Failed!", error);
		//   } else {
		//     toastr.info("Logged In", authData);
  //       console.log(authData);

		// //   }
		// // });
	}

}