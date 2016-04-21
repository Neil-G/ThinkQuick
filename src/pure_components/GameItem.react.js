import React, { Component, PropTypes } from 'react';
import guid from 'guid';
import firebase from 'firebase';
import toastr from 'toastr';
var _ = require('lodash');
import { colors } from './../utils'

toastr.options = {
	"positionClass": "toast-top-center"
}

var makeGame = function (name) {
	var ref = new firebase("https://thinkquick.firebaseio.com/games");
	var a = Math.floor((Math.random() * 10) + 1);
	var b = Math.floor((Math.random() * 10) + 1);
	var c = Math.floor((Math.random() * 10) + 1);
	var d = Math.floor((Math.random() * 3) + 1);

	ref.child(name).set({
			number1: a
		,	number2: b
		,	number3: c
		, operation: d != 1 ? 'ADD' : 'MULTIPLY'
		,	answer: d != 1 ? (a + b + c) : (a * b * c)
		,	id: guid.raw()
		,	winner: ref.getAuth() == null ? 'unknown' : ref.getAuth().password.email.split('@')[0]
	});
}


var makeWinner = function (gameId, gameNumber, color) {
	var ref = new firebase("https://thinkquick.firebaseio.com")
	ref.child('winners')
		.child(gameId)
		.set({
				email: ref.getAuth() == null ? 'unknown' : ref.getAuth().password.email
			,	game: gameNumber
			,	timeStamp: firebase.ServerValue.TIMESTAMP
		});
}

export class GameItem extends Component {
	constructor(props) {
    super(props);
    this.state = { answer: undefined, flashColor: false }
  }

  componentWillReceiveProps(nextProps) {

		// makes the box flash when it is being refreshed
  	if(nextProps.game.id != this.props.game.id) {
  		this.setState({ answer: undefined, flashColor: true });
	  	setTimeout( () => this.setState({ flashColor: false }) , 500 )
  	}
  }

   
	render(){
		const { game, flashColor, background, color, firebaseRef } = this.props;
		return(
			<div style={{ background: this.state.flashColor ? flashColor : background, color: color, width: '100%', height: '20%', overflow: 'hidden', transition: 'all 0.5s', position: 'relative' }}>
				
				{/* GAME WINNER NAME that flashes */}
				<span style={{ position: 'absolute', top: '2px', left: '6px', color: this.state.flashColor ? color : background }}> {game.winner || 'unknown'} got it! </span>
				<table style={{ width: '100%', height: '100%', margin: 'auto', textAlign: 'center' }}>
					<tbody>
						<tr style={{height: '100%'}}>
							
							{/* GAME OPERATION */}
							<td style={{textAlign: 'center', width: '20%'}}> {game.operation} </td>
							
							{/* GAME NUMBERS */}
							<td style={{textAlign: 'center', width: '20%'}}> {game.number1} </td>
							<td style={{textAlign: 'center', width: '20%'}}> {game.number2} </td>
							<td style={{textAlign: 'center', width: '20%'}}> {game.number3} </td>
							<td style={{textAlign: 'center', width: '20%'}}>
							
							{/* GAME SUBMIT FORM */}
								<form 
									style={{ height: '100%', marginBottom: '0', borderLeft: '0px solid black' }}
									onSubmit={ this.handleSubmit }>
									
									{/* ANSWER INPUT */}
									<input 
										style={{ width: '100%', height: '50%', textAlign: 'center', color: 'green', border: '0px solid black', overflow: "hidden" }} 
										type="number" 
										value={this.state.answer || ""}
										onChange={ e => {
											this.setState({ answer: e.target.value });
										} }/>
										
										{/* SUBMIT BUTTON */}
										<button style={{ width: '100%', height: '50%', border: '0', color: color }}> submit </button>
								</form>
							</td>
						</tr>
					</tbody>
				</table>				
			</div>
		);		
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.firebaseRef
			.child('winners')
			.once('value',  dataSnapshot => {
				if(
					!(this.props.game.id in dataSnapshot.val()) && 					// check if game is already won
					this.props.game.answer == Number(this.state.answer)			// the correct answer was entered
				){ 
					makeGame(this.props.game.key);  // make a new game in firebase database
					makeWinner(this.props.game.id, this.props.game.key, String(this.props.game.color));  // record winner in firebase database
					toastr.success('Got ' + this.props.game.key + '!');  // alert user that she won
				}
			})
	}
}


GameItem.propTypes = {
		game: PropTypes.shape({
			  number1: PropTypes.number
			, number2: PropTypes.number
			, number3: PropTypes.number
			, key: PropTypes.string
			, answer: PropTypes.number
			, operation: PropTypes.string
			, winner: PropTypes.string
		})
	,	flashColor: PropTypes.string 
	,	background: PropTypes.string 
	,	color: PropTypes.string 
	,	firebaseRef: PropTypes.object
}

