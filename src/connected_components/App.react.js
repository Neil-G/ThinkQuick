import React, { Component } from 'react';
import firebase from 'firebase';
import { NavBar } from './../pure_components/Navbar.react';
import { GameItem } from './../pure_components/GameItem.react';
import { WinnersList } from './../pure_components/WinnersList.react';
import lodash from 'lodash';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        games: []
      , winners: []
      , leader: ""
      , max: 0
    } 
  }

  componentWillMount() {
    this.ref = new firebase("https://thinkquick.firebaseio.com");
    this.ref.on('value', dataSnapshot => {
      let games = [];
      for (var key in dataSnapshot.val().games) {
        let game = dataSnapshot.child('games').child(key).val();
        game.key = dataSnapshot.child('games').child(key).key();
        games.push(game);
      }
      this.setState({ games: games });
    }.bind(this));

    this.winnersRef = new firebase("https://thinkquick.firebaseio.com/winners");
    this.winnersRef.orderByChild('timeStamp').limitToLast(40).on('value', snapshot => {
      let winners = [];
      let winnerEmails = [];
      for (var key in snapshot.val()) {
        let winner = snapshot.child(key).val();
        winners.push(winner);
        winnerEmails.push(winner.email);
      }
      winnerEmails = lodash.groupBy(winnerEmails);
      delete winnerEmails.unknown;
      let leader = '';
      let max = 0;
      for (const key in winnerEmails) {
        if(winnerEmails[key].length > max) {
          max = winnerEmails[key].length;
          leader = String(key).split('@')[0];
        }
      }
      this.setState({ 
        winners: winners.sort( (a,b) => { return b.timeStamp - a.timeStamp; }),
        leader: leader,
        max: max
      });
    }.bind(this));
  }  

  render() {
    return (
      <div style={{position: 'fixed', top: '0', right: '0', bottom: '0', left: '0'}}>
        <NavBar firebaseRef={this.ref} />

      {/*  */}
        <div style={{ background: '#101010', position: 'fixed', width: '100%', bottom: '0px', top: '80', left: '0px'}}>
         { this.state.games.map( (game, index) => {
          const color = ["#CFD8DC", '#B0BEC5', '#90A4AE', '#78909C', '#607D8B'];
          const flashColor = ["#FFAB91", '#FF8A65', '#FF7043', '#FF5722', '#F4511E'];
          return <GameItem 
                    key={game.key} 
                    game={game} 
                    firebaseRef={this.ref} 
                    background={color[index]} 
                    color={ index < 3 ? 'black' : 'white' }
                    flashColor={ flashColor[index] }
                    submitColor={color[index]} />;
             
         })}
        </div>
        {/* <WinnersList winners={this.state.winners} leader={this.state.leader} max={this.state.max} /> */}
      </div>
    );
  }

  logout = () => {
    this.firebaseRef.unauth();
  }

  signUp = e => {
    e.preventDefault();
    this.firebaseRef.createUser(
      this.state,
      (error, userData) => {
        if (error) {
          console.log(error);
        } else {
          console.log('sign up successful', userData);
        }
      }
    );
  }

  signIn = e => {
    e.preventDefault();
    this.firebaseRef.authWithPassword(
      this.state,
      (error, authData) => {
        if (error) {
          console.log(error);
        } else {
          console.log('sign in successful', authData);
        }
      }
    );
  }
}


