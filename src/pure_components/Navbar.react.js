import React, { Component } from 'react';
import { LoginForm } from './LoginForm.react';
import toastr from 'toastr';
import { Link } from 'react-router';

toastr.options = {
	"positionClass": "toast-top-center"
}

export class NavBar extends Component {
	componentWillMount() {
		this.props.firebaseRef.onAuth( authData => 	this.forceUpdate() )
	}
	render(){
		const userIsLoggedIn = this.props.firebaseRef.getAuth() !== null
		return(
			<nav style={{ borderRadius: '0', margin: '0', overflow: 'hidden', background: 'white', height: '80px', position: 'fixed', left: '0px', right: '0px', top: '0px', padding: '0', borderBottom: '1px solid tomato', boxSizing: 'border-box' }}>
      	{  

      		// Check if user is logged in
      		!userIsLoggedIn ? 

      		<div>
      			{/* SignUp/In Form */} 
	      		<LoginForm firebaseRef={this.props.firebaseRef} />

		      		{/* Generic title display for players not signed in */}
	      			<div style={{ border: '0px solid tomato', padding: '8px 0 0 6px', color: '#ECEFF1', height: '100%'  }} >
			      	 	<Link to="/" style={{ color: '#EF9A9A' }} className="hide-small"> 
			      	 		<h3 style={{ margin: '0', lineHeight: '0.8'}}>ThinkQuick! 
			      	 			<br/> 
			      	 			<span style={{ fontSize: '0.5em' }} > Free-for-all race to solve problems in real time!</span>
			      	 		</h3> 
			      	 	</Link>
			      	</div>
			      </div>
	      			
	      		
	      		:

      			<div> 
      				{/* Log Out Button */}
		      		<button 
		        		style={{ marginRight: '10px', float: 'right', marginTop: '10px', background: 'tomato', color: 'white', border: '0px solid #E57373', fontWeight: 'bold'}}
		        		onClick={ () => {
		        			this.props.firebaseRef.unauth();
		        			toastr.warning('Logged Out!');
		        		} }> Log Out 
		        	</button>
		      		{/* Personalized greeting */}
		      		<div style={{ border: '0px solid tomato', padding: '8px 0 0 6px', color: '#ECEFF1', height: '100%'  }}>
			      		<Link to="/" style={{ color: '#EF9A9A', display: 'inline-block' }}> 
			      			<h3 style={{ margin: '0'}}>ThinkQuick, {String(this.props.firebaseRef.getAuth().password.email.split('@')[0]) + "!"}> 
			      			</h3>
			      		</Link>
		      		</div> 
	      		</div> 
      	}
			        
	   
	      
			    
			</nav>
		);
	}
}

