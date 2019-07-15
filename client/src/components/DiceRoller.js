import React, { Component } from "react";
import ReactModal from "react-modal";


export default class DiceRoller extends Component {
	closeModal() {
		this.setState({modalIsOpen: false});
	}

	render() {
		return (
			<ReactModal
				//isOpen={this.state && this.state.modalIsOpen}
				isOpen={true}
				onRequestClose={this.closeModal.bind(this)}
				contentLabel="Dice Roller"
				className="tool-dialog">
				<h3>Dice Roller</h3>
				<div>
					<label htmlFor="diceType">type of dice</label> 
					<div>
						<span>d</span>
						&nbsp;
						<input id="diceType" name="diceType" type="text" size="3" value="6" />
					</div>
				</div>

				<div>
					<label htmlFor="diceType"># of dice</label>
					<div>
						<span>x</span>
						&nbsp;
						<input id="diceNum" name="diceNum" type="text" size="3" value="3" />
					</div>
				</div>

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

				<input type="submit" onClick={this.closeModal.bind(this)} value="Roll!" />
			</ReactModal>
		);
	}
}
