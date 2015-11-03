import React, { Component } from 'react';
import { LoginForm } from './LoginForm.react';
import { Link } from 'react-router';
import toastr from 'toastr';

toastr.options = {
	"positionClass": "toast-top-center"
}

export class AboutPage extends Component {
	render(){
		return(
			<div className="container" style={{ textAlign: 'center'}}>
				<Link to="play"><button style= {{ background: '#33691E', color: "rgba(255,255,255,0.87)", margin: '20px auto 20px', height: '60px', border: '1px solid gray' }}> I know how to play already! </button> </Link>
				<p style={{ background: '#ECEFF1', padding: '20px', border: '2px solid tomato'}} > 5 Problems </p> 
				<p style={{ background: '#CFD8DC', padding: '20px', border: '2px solid tomato'}}> Each with 3 Numbers and 1 operation  </p> 
				<p style={{ background: '#B0BEC5', padding: '20px', border: '2px solid tomato'}}> Addition or Multiplication </p> 
				<p style={{ background: '#90A4AE', padding: '20px', color: 'rgba(255,255,255,0.87)', border: '2px solid tomato'}}> Be the first to answer any problem successfully... </p> 
				<p style={{ background: '#78909C', padding: '20px', color: 'rgba(255,255,255,0.87)', border: '2px solid tomato'}}> And watch your name get sent to the Winners column </p> 
				<p style={{ background: '#607D8B', padding: '20px', color: 'rgba(255,255,255,0.87)', border: '2px solid tomato'}}> Each problem automatically regenerates when a correct solution is submitted </p> 
				<p style={{ background: '#546E7A', padding: '20px', color: 'rgba(255,255,255,0.87)', border: '2px solid tomato' }}> Not Signed Up Yet? No Problem! </p>
				<p style={{ background: '#455A64', padding: '20px', color: 'rgba(255,255,255,0.87)', border: '2px solid tomato' }}> Enter a Username and Password to Login... </p> 
				<p style={{ background: '#37474F', padding: '20px', color: 'rgba(255,255,255,0.87)', border: '2px solid tomato' }}> And if the account doesnt exist, it will be created and signed in automatically </p> 
				<p style={{ background: '#263238', padding: '20px', color: 'rgba(255,255,255,0.87)', border: '2px solid tomato' }}> Oh, and this is real-time so you're competing against anyone else playing, and you're all seeing the same screen and getting updates as soon as they happen! </p> 
				<Link to="play"><button style= {{ background: '#33691E', color: "rgba(255,255,255,0.87)", margin: '10px auto 50px', height: '60px', border: '1px solid gray' }}> Got it? Ok, now go Play! </button> </Link>
				<p> FYI: Click on ThinkQuick! in the top left corner of the game screen to see these instructions again </p>
			</div>
		);
	}
}