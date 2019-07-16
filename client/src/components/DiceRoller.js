import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";

import { rollDice } from '../actions';
import { roll } from '../utils/random';


class DiceRoller extends Component {
	constructor(props) {
		super(props);

		this.state = {
			diceType: "20",
			diceNum: 1,
		};
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


	closeModal() {
		this.setState({modalIsOpen: false});
	}

	render() {
		return (
			<ReactModal
				isOpen={this.state.modalIsOpen}
				onRequestClose={this.closeModal.bind(this)}
				contentLabel="Dice Roller"
				ariaHideApp={false}
				className="tool-dialog">
				<h3>Dice Roller</h3>
				<div>
					<label htmlFor="diceType">type of dice</label> 
					<div>
						<span>d</span>
						&nbsp;
						<input id="diceType" name="diceType" type="text" size="3" value={this.state.diceType}
							onChange={this.typeInputHandler.bind(this)} />
					</div>
				</div>

				<div>
					<label htmlFor="diceNum"># of dice</label>
					<div>
						<span>x</span>
						&nbsp;
						<input id="diceNum" name="diceNum" type="text" size="3" value={this.state.diceNum}
							onChange={this.numInputHandler.bind(this)} />
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
	{ rollDice }
)(DiceRoller);
