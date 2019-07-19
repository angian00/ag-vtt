import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { logout } from '../actions/userActions';


class DashboardPage extends Component {

	renderInfoBox(key, title, text, targetUrl) {
		return (
			<div key={key}>
				<h3><a href={targetUrl}>{title}</a></h3>
				<p>{text}</p>
			</div>
		);
	}

	render() {
		return (
			<Fragment>
				<h2>{this.props.user.nickname}'s Dashboard</h2>

				<div>
					{
						this.props.ongoingSessions.length == 0
							|| (<h2>Ongoing Game Sessions</h2>)
					}
					{
						this.props.ongoingSessions.map((s, i) => this.renderInfoBox(i, 
							moment(s.startTs).format('YYYY-MM-DD HH:MM') + " --> ...",
							s.campaignName, s.targetUrl))	
					}
				</div>
				<div>
					<h2>Past Game Sessions</h2>
					{
						this.props.pastSessions.map((s, i) => this.renderInfoBox(i, 
							moment(s.startTs).format('YYYY-MM-DD HH:MM') + " --> " + moment(s.endTs).format('YYYY-MM-DD HH:MM'), 
							s.campaignName, s.targetUrl))	
					}

				</div>

				<div>
					<h2>Your Campaigns</h2>
					{
						this.props.campaigns.map((c, i) => 
							this.renderInfoBox(i, c.name + " (" + (c.role === "player" ? "PL" : "GM") + ")", 
								c.description, c.targetUrl))	
					}

					<button>Create New Campaign</button>
				</div>
			</Fragment>
		);
	}
}


export default connect(
	//DEBUG
	state => ({
		user: {
			nickname: "nickfake",
		},

		ongoingSessions: [
			{ campaignName: "Campaign Name 1", startTs: new Date(), targetUrl: "/game" }
		],
		
		pastSessions: [
			{ campaignName: "Campaign Name 1", startTs: new Date(), endTs: new Date(), targetUrl: "http://repubblica.it" }
		],
		campaigns: [
			{ id: 123, name: "Campaign Name 1", description: "aaaa", targetUrl: "http://google.com", role: "player" }
		],

	}),
	{ logout }
)(DashboardPage);
