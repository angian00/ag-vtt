import React, { Component } from "react";
import { connect } from "react-redux";

import { runTool } from '../actions';


let actions = null;
let registeredShortcuts = [];

const shortcuts = {
	toolRollDice(event) {
		if (event.key !== 'r')
			return false;
		
		actions.runTool("DiceRoller");
		return true;
	},

};


const handleKeyDown = event => {
	for (let i = 0; i < registeredShortcuts.length; i++) {
		const shortcut = registeredShortcuts[i];
		if (shortcuts[shortcut] && shortcuts[shortcut](event)) {
			event.preventDefault();
			break;
		}
	}
};

document.addEventListener('keydown', handleKeyDown);



class Shortcut extends Component {
	constructor(props) {
		super(props);

		actions = this.props;
	}

	componentDidMount() {
		if (!registeredShortcuts.includes(this.props.name)) {
			registeredShortcuts = [
				...registeredShortcuts,
				this.props.name,
			];
		}
	}

	componentWillUnmount() {
		registeredShortcuts = [
			...registeredShortcuts.filter(x => x !== this.props.name),
		];
	}

	render() {
		return this.props.children || null;
	}
}


function mapStateToProps(state) {
	if (state) {
		const { viewMetadata } = state || null;
		return { viewScale: viewMetadata.viewScale };
	} else
		return { viewScale: 15 };
}

export default connect(
	mapStateToProps,
	{ runTool }
)(Shortcut);
