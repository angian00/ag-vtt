import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";

import { rollDice, closeTool } from '../actions';
import { roll } from '../utils/random';


class DiceRoller extends Component {
	constructor(props) {
		super(props);

		this.typeInput = React.createRef();
		this.numInput = React.createRef();

		this.state = {
			diceType: "20",
			diceNum: 1,
		};
	}

	componentDidMount() {
		if (this.typeInput.current) {
			console.log(this.typeInput.current);
			this.typeInput.current.focus();
		}
	}

	keyHandler(e) {
		//console.log("key handled: " + e.key);

		if (e.key === "Enter")
			this.clickHandler();
		
		else if (e.key === "x" || e.key === "X")
			this.numInput.current.focus();
		
		else if (e.key === "d" || e.key === "D")
			this.typeInput.current.focus();

		if ((e.key !== "Tab") && (isNaN(parseInt(e.key))) )
			e.preventDefault();
	}

	focusHandler(e) {
		e.target.select();
	}

	typeInputHandler(e) {
		this.setState({diceType: e.target.value});
	}

	numInputHandler(e) {
		this.setState({diceNum: e.target.value});
	}

	clickHandler() {
		let diceType;

		if (this.state.diceType === "00")
			diceType = "100";
		else if (this.state.diceType === "0")
			diceType = "10";
		else
			diceType = this.state.diceType;


		let maxRoll = parseInt(diceType);

		let rolls = [];
		let total = 0;
		for (let i=0; i < this.state.diceNum; i++) {
			let currRoll = roll(maxRoll);
			rolls.push(currRoll);
			total += currRoll;
		}

		this.props.rollDice("d" + diceType, this.state.diceNum, rolls, total);
	}


	render() {
		return (
			<ReactModal
				isOpen={this.props.isOpen}
				onRequestClose={e => {this.props.closeTool("DiceRoller")}}
				contentLabel="Dice Roller"
				ariaHideApp={false}
				className="tool-dialog" 
				onAfterOpen={() => this.typeInput.current && this.typeInput.current.focus()} >

				<h3>Dice Roller</h3>
				<div>
					<label htmlFor="diceType">type of dice</label> 
					<div>
						<span>d</span>
						&nbsp;
						<input id="diceType" name="diceType" type="text" size="3" value={this.state.diceType}
							onKeyDown={this.keyHandler.bind(this)} onChange={this.typeInputHandler.bind(this)} 
							onFocus={this.focusHandler}
							ref={this.typeInput} />
					</div>
				</div>

				<div>
					<label htmlFor="diceNum"># of dice</label>
					<div>
						<span>x</span>
						&nbsp;
						<input id="diceNum" name="diceNum" type="text" size="3" value={this.state.diceNum}
							onKeyPress={this.keyHandler.bind(this)} onChange={this.numInputHandler.bind(this)}
							onFocus={this.focusHandler}
							ref={this.numInput} />
					</div>
				</div>

				{/*
				<div className="optional">
					<label htmlFor="target">type of effect</label>
					<div>
						<select>
							<option></option>
							<option>damage (hp-)</option>
							<option>cure   (hp+)</option>
						</select>
					</div>
				</div>

				<div className="optional">
					<label htmlFor="target">target</label>
					<div>
						<select>
							<option></option>
							<option>dwarf</option>
							<option>dragon</option>
						</select>
					</div>
				</div>
				*/}

				<input type="submit" onClick={this.clickHandler.bind(this)} value="Roll!" />
			</ReactModal>
		);
	}
}


export default connect(
	state => ({ isOpen: state.isDiceRollerOpen }),
	{ rollDice, closeTool }
)(DiceRoller);
