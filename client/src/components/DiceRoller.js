import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";

import { rollDice } from '../actions';


class DiceRoller extends Component {
	constructor(props) {
		super(props);

		this.state = {modalIsOpen: true};
	}

	clickHandler() {
		this.props.rollDice("d6", 3, [1, 2, 3]);

		this.closeModal();
	}

	inputHandler(e) {
		//TODO
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
						<input id="diceType" name="diceType" type="text" size="3" value="6" 
							onChange={this.inputHandler.bind(this)} />
					</div>
				</div>

				<div>
					<label htmlFor="diceNum"># of dice</label>
					<div>
						<span>x</span>
						&nbsp;
						<input id="diceNum" name="diceNum" type="text" size="3" value="3"
							onChange={this.inputHandler.bind(this)} />
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
	state => state.isDiceRollerOpen || {},
	{ rollDice }
)(DiceRoller);
