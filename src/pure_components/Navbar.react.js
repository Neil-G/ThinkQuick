import React, { Component, PropTypes } from 'react';
import { LoginForm } from './LoginForm.react';
import toastr from 'toastr';
import { Link } from 'react-router';
import randomcolor from 'randomcolor'

toastr.options = {
	"positionClass": "toast-top-center"
}

const salmon = '#F06373'

export class NavBar extends Component {
	constructor(props){
		super(props)
		this.state = {
			headerColor:'white',
			headerText: salmon
		}

		this.initialColorChange = setTimeout(
			() => this.setState({ headerColor: randomcolor({luminosity: 'light'}), headerText: randomcolor({luminosity: 'dark'}) }),
			0
		)

		this.glowHeader = setInterval(
			() => this.setState({ headerColor: randomcolor({luminosity: 'light'}), headerText: randomcolor({luminosity: 'dark'}) }),
			15000
		)
	}

	componentDidMount(){
		// this.setState({ headerColor: 'white', headerText: salmon })
		// this.setState({ headerColor: randomcolor({luminosity: 'light'}), headerText: randomcolor({luminosity: 'dark'}) })
	}

	componentWillMount() { 
		this.props.firebaseRef.onAuth( authData => this.forceUpdate() )	
	}

	componentWillUnmount() {
		clearInterval(this.glowHeader)
	}

	render(){
		const { headerColor, headerText } = this.state
		const { firebaseRef, toggleWinnersColumnDisplay } = this.props
		const userIsLoggedIn = this.props.firebaseRef.getAuth() !== null
		return(
			<nav className='nav-header' style={{ background: headerColor, transition: '15s all' }}>
      	
      	{/* TEXT TO TOGGLE WINNDERS TABLE DISPLAY */}
      	<span className="navbar-winner-toggle" onClick={toggleWinnersColumnDisplay}>WINNERS</span>

      	{  

      		// Check if user is logged in
      		userIsLoggedIn ? 

      			<div> 
      				{/* Log Out Button */}
		      		<button 
		        		className='logout'
		        		onClick={ () => {
		        			firebaseRef.unauth();
		        			toastr.warning('Logged Out!');
		        		} }> Log Out 
		        	</button>
		      		{/* Personalized greeting */}
		      		<div style={{ border: '0px solid tomato', padding: '8px 0 0 6px', color: '#ECEFF1', height: '100%'  }}>
			      		<Link to="/" style={{ color: headerText, display: 'inline-block', transition: '15s all' }}> 
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
	      			<div style={{ border: '0px solid tomato', padding: '8px 0 0 6px', height: '100%', maxWidth: '300px' }}>
			      	 	<Link to="/" style={{ color: headerText, transition: '15s all' }} className="hide-small"> 
			      	 		<h3 style={{ margin: '0', lineHeight: '0.8' }}>ThinkQuick! 
			      	 			<br/> 
			      	 			<span style={{ fontSize: '0.6em' }}> Free-for-all race to solve problems in real time!</span>
			      	 		</h3> 
			      	 	</Link>
			      	</div>
			      </div>
      	}

      	{
      		// COLOR TOGGLE TEXT
				  // <span className='color-swap-toggle'
				  // 	onClick={ this.setState.bind(this, { headerColor: randomcolor({luminosity: 'light'}), headerText: randomcolor({luminosity: 'dark'})  }) }
				  // 	style={{  fontSize: '0.6em', cursor: 'pointer', position: 'absolute', bottom: '2px',  height: '6px', color: 'gray' }}> 
				  // 	change colors 
				  // </span> 
      	}

			</nav>
		);
	}
}

NavBar.propTypes = {
  firebaseRef: PropTypes.object,
  toggleWinnersColumnDisplay: PropTypes.func
}
