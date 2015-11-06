import React, { Component } from 'react';
import moment from 'moment';

export class WinnersList extends Component {
	render(){
		return(
			<div style={{ 
        background: '#101010', 
        position: 'absolute', 
        width: '20%', 
        bottom: '0px', 
        top: '66', 
        right: '0px', 
        textAlign: 'center', 
        overflowY: 'hidden',
      }}> 
          <div style={{ marginTop: '0', background: '#101010', color: 'tomato', padding: '3%', fontFamily: "Courier", position: 'absolute', width: '100%', height: '85px'}}>
            
            Recent Leader: {this.props.leader} with {this.props.max} wins
            <h1 style={{ marginTop: '10px'}}>Winners</h1>
          </div>
          <div style={{ width: '100%', textAlign: 'center', position: 'absolute', top: '85px', bottom: '10px', overflowY: 'scroll'}}>	
            <table style={{ width: '100%', textAlign: 'center', position: 'absolute', top: '0px', bottom: '0px', overflowY: 'scroll'}} >
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
                    <td class="hide-mobile" style={{ paddingLeft: '10px'}} > {index + 1}. </td>
          					<td style={{textAlign: 'center'}} > {winner.email.split('@')[0] || "no split"} </td>
                    <td style={{textAlign: 'center'}} className="hide-mobile"> {winner.game} </td>
                    <td style={{textAlign: 'center'}} className="hide-mobile"> { timeStamp } </td>
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