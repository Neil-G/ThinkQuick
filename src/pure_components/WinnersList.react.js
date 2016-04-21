import React, { Component } from 'react';
import moment from 'moment';

export class WinnersList extends Component {
  render(){
    const { showWinnersColumn } = this.props
		return(
			<div className="winners-column" style={{ right: showWinnersColumn ? '0px' : '-200vw' }}> 
          {/* Top Panel */}
          <div className='winners-top-panel'>
            <p style={{ textAlign: 'center' }}> Recent Leader: {this.props.leader} with {this.props.max} wins </p>
            <h3 style={{ marginTop: '10px'}}> Winners </h3>
            <span onClick={this.props.toggleWinnersColumnDisplay} className='close-winners-column' style={{ fontWeight: 'bold'}} > X </span>
          </div>

          {/* Scrollable Winner's Table */}
          <div className='winners-column-container'> 
            <table className='winners-table'>
              <tbody>
              { this.props.winners.map( (winner, index) => {
                  let timeStamp = new Date(winner.timeStamp);
                  timeStamp = moment(timeStamp).fromNow();
                  var style = {
                      height: '60px',
                      background: index%2 == 0 ? "#FFEBEE" : "#FFEBEE"
                  };
                return(
                  <tr key={winner.timeStamp} style={style}>
                    {/* LAST WON INDEX */}
                    <td class="hide-mobile" style={{ paddingLeft: '10px'}} className="hide-medium" > {index + 1}. </td> 
                    
                    {/* GAME WINNER NAME */}
                    <td style={{textAlign: 'left', paddingLeft: '6px'}}> {winner.email.split('@')[0] || "no split"} </td>
                    
                    {/* GAME NUMBER */}
                    <td style={{textAlign: 'center', paddingRight: '4px' }}> game {winner.game[4]} </td>
                    
                    {/* GAME WIN DATE */}
                    <td style={{textAlign: 'right', paddingRight: '6px'}} className="hide-large"> { timeStamp } </td>
          				</tr>
          			);
          		})}
          		</tbody>
          	</table>
          </div>
      </div>
		);		
	}
}