import {expect} from 'chai'

function makeGame(){
	var a = Math.floor((Math.random() * 10) + 1);
	var b = Math.floor((Math.random() * 10) + 1);
	var c = Math.floor((Math.random() * 10) + 1);
	var d = Math.floor((Math.random() * 3) + 1);

	return {
		  number1: a
		, number2: b
		, number3: c
		, operation: d != 1 ? 'ADD' : 'MULTIPLY'
		, answer: d != 1 ? (a + b + c) : (a * b * c)
	}
}

describe('basic game composition', () => {

	const newGame = makeGame()

	it('consists of 3 numbers', () => {
		expect(newGame.number1).to.be.a('number')
		expect(newGame.number2).to.be.a('number')
		expect(newGame.number3).to.be.a('number')
	})

	it('(the 3 numbers between 1 and 10 exclusive)', () => {
		expect(newGame.number1).to.be.above(0)
		expect(newGame.number2).to.be.above(0)
		expect(newGame.number3).to.be.above(0)

		expect(newGame.number1).to.be.below(10)
		expect(newGame.number2).to.be.below(10)
		expect(newGame.number3).to.be.below(10)
	})

	it('consists of ADD or MULTIPLY as an operation', () => {
		expect(['ADD', 'MULTIPLY']).to.include(newGame.operation)
	})

	it('consists of a correct answer for the correct operation', () => {
		if (newGame.operation == 'ADD') expect(newGame.answer).to.eql(newGame.number1 + newGame.number2 + newGame.number3)
		else expect(newGame.answer).to.eql(newGame.number1 * newGame.number2 * newGame.number3)
	})
})