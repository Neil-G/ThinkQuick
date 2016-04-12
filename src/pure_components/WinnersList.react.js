import React, { Component } from 'react';
import moment from 'moment';

export class WinnersList extends Component {
	render(){
		return(
			<div className="hide-small"
        style={{ 
        background: '#101010', 
        position: 'absolute', 
        width: '20%', 
        bottom: '0px', 
        top: '80', 
        right: '0px', 
        textAlign: 'center', 
        borderLeft: '4px solid tomato', 
        boxSizing: 'border-box', 
        // overflowY: 'hidden',
      }}> 
          <div style={{ marginTop: '0', background: '#101010', color: 'tomato', padding: '3%', fontFamily: "Courier", position: 'absolute', width: '100%' }}>
            
            Recent Leader: {this.props.leader} with {this.props.max} wins
            <h3 style={{ marginTop: '10px'}}>Winners</h3>
          </div>
          <div style={{ width: '100%', textAlign: 'center', position: 'absolute', top: '85px', bottom: '1px', overflowY: 'scroll'}}>	
            <table style={{ width: '100%', textAlign: 'center', position: 'absolute', top: '0px', bottom: '0px', overflowY: 'hidden'}} >
          		<tbody >
          		{ this.props.winners.map( (winner, index) => {
                  let timeStamp = new Date(winner.timeStamp);
                  timeStamp = moment(timeStamp).fromNow();
                  var style = {
                      height: '80px',
                      background: index%2 == 0 ? "#dae5f4" : "#b8d1f3"
                  };
          			return(
          				<tr key={winner.timeStamp} style={ style }>
                    <td class="hide-mobile" style={{ paddingLeft: '10px'}} className="hide-medium" > {index + 1}. </td>
          					<td style={{textAlign: 'left', paddingLeft: '6px'}}> {winner.email.split('@')[0] || "no split"} </td>
                    <td style={{textAlign: 'center' }}> {winner.game} </td>
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