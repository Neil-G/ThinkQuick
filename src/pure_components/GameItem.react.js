import React, { Component } from 'react';
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
		,	answer: d == 1 ? a + b + c : a * b * c
		,	id: guid.raw()
		, color: _.sample(colors)
	});
}


var makeWinner = function (gameId, gameNumber, color) {
	var ref = new firebase("https://thinkquick.firebaseio.com")
	ref.child('winners')
		.child(gameId)
		.set({
				email: ref.getAuth() == null ? 'unknown' : ref.getAuth().password.email
			,	color: color
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
  	if(nextProps.game.id != this.props.game.id) {
  		this.setState({ answer: undefined, flashColor: true });
	  	setTimeout( () => this.setState({ flashColor: false }) , 500 )
  	}
  }

   
	render(){
		return(
			<div style={{ background: this.state.flashColor ? this.props.flashColor : this.props.background, color: this.props.color, width: '100%', height: '20%', overflow: 'hidden', transition: 'all 0.5s' }}>
				<table style={{ width: '100%', height: '100%', margin: 'auto', textAlign: 'center' }}>
					<thead></thead>
					<tbody>
						<tr style={{height: '100%'}}>
							<td style={{textAlign: 'center', width: '20%'}}> {this.props.game.operation} </td>
							<td style={{textAlign: 'center', width: '20%'}}> {this.props.game.number1} </td>
							<td style={{textAlign: 'center', width: '20%'}}> {this.props.game.number2} </td>
							<td style={{textAlign: 'center', width: '20%'}}> {this.props.game.number3} </td>
							<td style={{textAlign: 'center', width: '20%'}}>
								<form 
									style={{ height: '100%', marginBottom: '0', borderLeft: '0px solid black' }}
									onSubmit={ this.handleSubmit }>
									<input 
										style={{ width: '100%', height: '50%', textAlign: 'center', color: 'green', border: '0px solid black', overflow: "hidden" }} 
										type="number" 
										value={this.state.answer || ""}
										onChange={ e => {
											this.setState({ answer: e.target.value });
										} }/>
										<button style={{ width: '100%', height: '50%', background: this.props.submitColor, border: '0', color: this.props.color }}> submit </button>
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
					!(this.props.game.id in dataSnapshot.val()) && // winners.gameId is null
					this.props.game.answer == this.state.answer			// the correct answer was entered
					// games.gameNumber.id == this.props.game.id so that we are answering for the correct game
				){ 
					makeGame(this.props.game.key);
					makeWinner(this.props.game.id, this.props.game.key, String(this.props.game.color));
					toastr.success('Got ' + this.props.game.key + '!');
				}
			})
	}
}


