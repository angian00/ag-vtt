import React, { Component } from "react";
import { runTool } from '../utils/tools';


let registeredShortcuts = [];

const shortcuts = {
	toolRollDice(event) {
		if (event.key !== 'r')
			return false;
		
		runTool("rollDice");
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



export default class Shortcut extends Component {
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
