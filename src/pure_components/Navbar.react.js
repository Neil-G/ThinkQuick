import React, { Component } from 'react';
import { LoginForm } from './LoginForm.react';
import toastr from 'toastr';
import { Link } from 'react-router';

toastr.options = {
	"positionClass": "toast-top-center"
}

export class NavBar extends Component {
	componentWillMount() {
		this.props.firebaseRef.onAuth( authData => {
			this.forceUpdate();
		});
	}
	render(){
		return(
			<nav style={{ borderRadius: '0', margin: '0', overflow: 'hidden', background: 'white', height: '80px', position: 'fixed', left: '0px', right: '0px', top: '0px', padding: '0', borderBottom: '1px solid #CFD8DC' }}>
      	{  

      		// Check if user is logged in
      		this.props.firebaseRef.getAuth() === null ? 

      			// SignUp/In Form 
	      		<LoginForm firebaseRef={this.props.firebaseRef} />	
	      		
	      		:

      			// Log Out Button 
	      		<button 
	        		style={{ border: '1px solid #ccc', marginRight: '10px', float: 'right', marginTop: '10px', background: '#455A64', color: 'white', border: '1px solid #455A64'}}
	        		onClick={ () => {
	        			this.props.firebaseRef.unauth();
	        			toastr.warning('Logged Out!');
	        		} }> Log Out 
	        	</button>
      	}
			        
	      <div style={{ padding: '0', margin: '5px 0 0 15px', fontSize: '250%', color: '#ECEFF1'  }} >
	      	{ 
		      	this.props.firebaseRef.getAuth() == null ?
			      	<span>
			      	 	<Link to="/" style={{ color: '#EF9A9A' }} className="hide-small"> ThinkQuick! </Link>
			      		<span style={{ fontSize: '50%', color: '#EF9A9A' }} className="hide-large"> Free-for-all race to solve problems in real time! </span>
			      		<span style={{ fontSize: "0.3em", position: 'absolute', bottom: '4px', color: 'white' }} className="show-small"> 
			      			<Link to="/" style={{ color: '#EF9A9A' }}> ThinkQuick! Free-for-all race to solve problems in real time! </Link>
			      		</span>
			      	</span>  
			      	 : 
			      	 <span> <Link to="/" style={{ color: '#ECEFF1' }}> ThinkQuick </Link> {String(this.props.firebaseRef.getAuth().password.email.split('@')[0]) + "!"}</span>
	      	}
	      </div>
			    
			</nav>
		);
	}
}


 // <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	// 		        <span className="sr-only">Toggle navigation</span>
	// 		        <span className="icon-bar"></span>
	// 		        <span className="icon-bar"></span>
	// 		        <span className="icon-bar"></span>
	// 		      </button>

	// className="navbar navbar-default navbar-inverse"