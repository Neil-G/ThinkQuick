import React, { Component } from 'react';
import moment from 'moment';

export class WinnersList extends Component {
	render(){
		return(
			<div className=""
        style={{ 
          transition: 'all 1s',
          // transform: 'scaleX(600px)',
        background: 'white', 
        position: 'absolute', 
        width: '40%', 
        bottom: '0px', 
        top: '80', 
        right: '-000px', 
        textAlign: 'center', 
        borderLeft: '1px solid #CFD8DC', 
        boxSizing: 'border-box', 
        // overflowY: 'hidden',
      }}> 
          {/* Top Panel */}
          <div style={{ height: '100px', marginTop: '0', background: 'white', color: '#EF9A9A', padding: '3%', fontFamily: "Courier", position: 'absolute', width: '100%', background: '#FFEBEE', borderBottom: '1px solid #CFD8DC' }}>
            <p style={{ textAlign: 'center' }}>Recent Leader: {this.props.leader} with {this.props.max} wins</p>
            <h3 style={{ marginTop: '10px'}}>Winners</h3>
          </div>

          {/* Scrollable Winner's Table */}
          <div style={{ width: '100%', textAlign: 'center', position: 'absolute', top: '100px', bottom: '1px', overflowY: 'scroll'}}> 
            <table style={{ width: '100%', textAlign: 'center', position: 'absolute', top: '0px', bottom: '0px', overflowY: 'hidden'}}>
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
                    {/* GAME NUMBER */}
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