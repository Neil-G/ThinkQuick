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
        // populates the 5 game rows
        games: []
        // populates winners column
      , winners: []
        // name of user with most wins (except for unknown)
      , leader: ""
        // amount of wins the leader has
      , max: 0
        // display state of winners column
      , showWinnersColumn: false
    }

    this.toggleWinnersColumnDisplay = () => this.setState({ showWinnersColumn: !this.state.showWinnersColumn }) 
  }

  componentWillMount() {
    this.ref = new firebase("https://thinkquick.firebaseio.com");

    // get all games on startup and every time a new game is generated
    // this fetch needs to be optimized to only fetch the refreshed game
    this.ref.on('value', dataSnapshot => {
      let games = [];
      for (var key in dataSnapshot.val().games) {
        let game = dataSnapshot.child('games').child(key).val();
        game.key = dataSnapshot.child('games').child(key).key();
        games.push(game);
      }
      this.setState({ games: games });
    }.bind(this));


    // get last 40 winners every time somone wins a game
    // this fetch needs to be optimized to only get the latest winner
    this.winnersRef = this.ref.child("winners");
    this.winnersRef.orderByChild('timeStamp').limitToLast(40).on('value', snapshot => {
      let winners = [];
      let winnerEmails = [];
      for (var key in snapshot.val()) {
        let winner = snapshot.child(key).val();
        winners.push(winner);
        winnerEmails.push(winner.email);
      }

      // calculate who has the most wins and how many wins they have
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
        winners: winners.sort( (a,b) => b.timeStamp - a.timeStamp),
        leader: leader,
        max: max
      });
    }.bind(this));
  }  

  render() {
  const { showWinnersColumn } = this.state
    return (
      <div style={{position: 'fixed', top: '0', right: '0', bottom: '0', left: '0'}}>
        
        {/* TOP PANEL for AUTH */}
        <NavBar firebaseRef={this.ref} toggleWinnersColumnDisplay={this.toggleWinnersColumnDisplay} />

        {/* MAIN PANEL for the games */}
        <div 
          className="game-container"
          style={{ background: 'white', position: 'fixed', bottom: '0px', top: '80', left: '0px', right: '0px', width: '100%' }}>
         { 
          this.state.games.map( (game, index) => {
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
            })
          }
        </div>

        {/* MAIN PANEL for the games */}
        
        <WinnersList 
          winners={this.state.winners} 
          leader={this.state.leader} 
          max={this.state.max} 
          toggleWinnersColumnDisplay={this.toggleWinnersColumnDisplay}
          showWinnersColumn={showWinnersColumn} /> 
      </div>
    );
  }
}


