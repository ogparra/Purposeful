import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './HomePage.css';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import NavBar from '../NavBar/NavBar';

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			uid: "",
			isLoggedIn : false
		};

	}



	componentDidMount () {
		console.log("(HOMEPAGE.JS) componentDidMount history:", this.props.history);

		const recieved_state = this.props.history.location.state;
		if (recieved_state != null) {
			this.setState( recieved_state );
		};
	}

	render () {

		/* conditionally render form content depending on whether youve signed up or not */
		return (
			
						<div id="home-content" className="row">
								<NavBar />
							<div className="activity-feeds col l10 push-l1" >
								<ActivityFeed title="Activity in Your Network" linkTo="/home" />
								<ActivityFeed title="Mentorship" linkTo="/mentorship" />
								<ActivityFeed title="Collaboration" linkTo="/mentorship" />
							</div>
						</div>
					);
	}
}

export default withRouter(HomePage);
