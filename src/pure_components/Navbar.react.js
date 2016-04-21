import React, { Component, PropTypes } from 'react';
import { LoginForm } from './LoginForm.react';
import toastr from 'toastr';
import { Link } from 'react-router';
import randomcolor from 'randomcolor'

toastr.options = {
	"positionClass": "toast-top-center"
}

export class NavBar extends Component {
	constructor(props){
		super(props)
		this.state = {
			headerColor: randomcolor({luminosity: 'light'}),
			headerText: randomcolor({luminosity: 'dark'})
		}
	}

	componentWillMount() { this.props.firebaseRef.onAuth( authData => this.forceUpdate() )	}

	render(){
		const { headerColor, headerText } = this.state
		const { firebaseRef, toggleWinnersColumnDisplay } = this.props
		const userIsLoggedIn = this.props.firebaseRef.getAuth() !== null
		return(
			<nav style={{ borderRadius: '0', margin: '0', overflow: 'hidden', background: headerColor, height: '80px', position: 'fixed', left: '0px', right: '0px', top: '0px', padding: '0', borderBottom: '1px solid tomato', boxSizing: 'border-box' }}>
      	
      	{/* TEXT TO TOGGLE WINNDERS TABLE DISPLAY */}
      	<span className="navbar-winner-toggle" onClick={toggleWinnersColumnDisplay}>WINNERS</span>

      	{  

      		// Check if user is logged in
      		userIsLoggedIn ? 

      			<div> 
      				{/* Log Out Button */}
		      		<button 
		        		style={{ marginRight: '10px', float: 'right', marginTop: '18px', background: 'tomato', color: 'white', border: '0px solid #E57373', fontWeight: 'bold'}}
		        		onClick={ () => {
		        			firebaseRef.unauth();
		        			toastr.warning('Logged Out!');
		        		} }> Log Out 
		        	</button>
		      		{/* Personalized greeting */}
		      		<div style={{ border: '0px solid tomato', padding: '8px 0 0 6px', color: '#ECEFF1', height: '100%'  }}>
			      		<Link to="/" style={{ color: headerText, display: 'inline-block' }}> 
			      			<h3 style={{ margin: '0'}}>
				      			ThinkQuick, <br/> 
				      			{String(firebaseRef.getAuth().password.email.split('@')[0]) + "!"} 
			      			</h3>
			      		</Link>
		      		</div> 
	      		</div> 
	      			
	      		
	      		:

      		<div>
      			{/* SignUp/In Form */} 
	      		<LoginForm firebaseRef={firebaseRef} headerText={headerText} />

		      		{/* Generic title display for players not signed in */}
	      			<div style={{ border: '0px solid tomato', padding: '8px 0 0 6px', color: headerText, height: '100%', maxWidth: '300px' }}>
			      	 	<Link to="/" style={{ color: headerText }} className="hide-small"> 
			      	 		<h3 style={{ margin: '0', lineHeight: '0.8', color: headerText }}>ThinkQuick! 
			      	 			<br/> 
			      	 			<span style={{ fontSize: '0.5em', color: headerText }} > Free-for-all race to solve problems in real time!</span>
			      	 		</h3> 
			      	 	</Link>
			      	</div>
			      </div>
      	}
			        
			</nav>
		);
	}
}

NavBar.propTypes = {
  firebaseRef: PropTypes.object,
  toggleWinnersColumnDisplay: PropTypes.func
}
