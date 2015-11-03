var fb = require('firebase');
var guid = require('guid');
var _ = require('lodash');
var gamesRef = new fb("https://thinkquick.firebaseio.com/games");

var colors = [
		"#FFEBEE"
	,	"#FFCDD2"
	,	"#EF9A9A"
	,	"#E57373"
	,	"#EF5350"
	,	"#F44336"
	,	"#E53935"
	,	"#D32F2F"
	,	"#C62828"
	,	"#B71C1C"
];


var makeGame = function (name) {
	var a = Math.floor((Math.random() * 10) + 1);
	var b = Math.floor((Math.random() * 10) + 1);
	var c = Math.floor((Math.random() * 10) + 1);
	var d = Math.floor((Math.random() * 2) + 1);
	if (d == 1) {
		var operation = 'ADD';
		var answer = a + b + c;
	} else {
		var operation = 'Multiply';
		var answer = a * b * c;
	}
	var color = _.sample(colors);
	console.log(_.sample(colors), color);

	gamesRef.child(name).set({
			number1: a
		,	number2: b
		,	number3: c
		, operation: d == 1 ? 'ADD' : 'MULTIPLY'
		,	answer: d == 1 ? a + b + c : a * b * c
		,	id: guid.raw()
		, color: _.sample(colors)
	});
}


makeGame('game1');
makeGame('game2');
makeGame('game3');
makeGame('game4');
makeGame('game5');



var makeWinner = function (gameId, gameNumber) {
	var winnersRef = new fb("https://thinkquick.firebaseio.com/winners");
	winnersRef.set({
		gameId : {
			game: gameNumber,
			username: 'larry'
		}
	})
}



// console.log(_.sample(colors));