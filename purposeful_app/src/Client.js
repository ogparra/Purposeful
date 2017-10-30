/* React Client module for communicating with express server. 
*/

/* THIS MUST BE SET FALSE TO OPERATE THIS FILE THROUGH REACT IN A BROWSER,
* AND MUST BE SET TRUE TO OPERATE THIS FILE FROM THE COMMAND LINE USING NODE
*/
const COMMAND_LINE_TESTING = false;

/* duct tape for testing from command line node environment  */
var prepend_path = "";
if (COMMAND_LINE_TESTING) {
	//fetch = require("node-fetch");
	prepend_path = "http://localhost:3001";
}


/** This function creates a new user account with the name, email, and password
* arguments provided and returns the created user's information if successful.
*
* Arguments:
* name: new user's name
* email: new user's email
* pwd: new user's password
*
* Returns:  an object with the entry that was created in the database, like this:
*		{name: "NAME", id: 123, ...}	
*/
function add_new_user(name, email, pwd) {

	return fetch(prepend_path + "/api/users/new", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			email: email,
			password: pwd,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(result => {
		console.log("(CLIENT.JS->ADD_NEW_USER) Response OK with new user data obj: ", result.data);
		console.log("(CLIENT.JS->ADD_NEW_USER) responded with status OK"); 
		return result.data;
	})
	.catch(error => {  
		console.log("(CLIENT.JS->ADD_NEW_USER) Request Error:", error.message);
		console.log("(CLIENT.JS->ADD_NEW_USER) Request Failed with Errors.");
		throw error;

	});
}


function login(email, pwd) {

	return fetch(prepend_path + "/api/users/login", {
		method: "POST",
        credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			password: pwd,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(result => {
		console.log("(CLIENT.JS->LOGIN) Response OK with new user data obj: ", result.data);
		console.log("(CLIENT.JS->LOGIN) responded with status OK"); 
		return result.data;
	})
	.catch(error => {  
		console.log("(CLIENT.JS->LOGIN) Request Error:", error);
		console.log("(CLIENT.JS->LOGIN) Request Failed with Errors.");
		throw error;

	});
}

function logout(){
  return fetch(prepend_path + "api/users/logout", {
	method: "POST", 
	credentials: "same-origin", 
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	}
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(res => {
	return res;
  })
  .catch(error => {
	console.log("(CLIENT.JS->LOGOUT) Request Error:", error);
	console.log("(CLIENT.JS->LOGOUT) Request Failed with Errors.");
	throw error;
  });	

}


/* this function gets someone else's profile information by uid */
function get_user_by_uid (uid) {

	return fetch("/api/users/user/" + uid, {
			method: "GET",
			headers: {accept: "application/json"},
        	credentials: "same-origin",
		})
		.then(checkStatus)
		.then(parseJSON)
		.then(result => {
			console.log("(CLIENT.JS->GET_USER_BY_UID) Response OK with new user data obj: ", result.data);
			console.log("(CLIENT.JS->GET_USER_BY_UID) responded with status OK"); 
			return result.data;
		} )
		.catch(function(error) {  
			console.log("(CLIENT.JS->GET_USER_BY_UID) Request Error:", error);
			console.log("(CLIENT.JS->GET_USER_BY_UID) Request Failed with Errors.");
			throw error.body;  
		});
}


/* this function creates a mentorship relation between two users 
* Precondition: user must be logged in
*/
function add_mentorship(mentor_uid) {
	
	console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) called!");
	return fetch(prepend_path + "/api/mentorship/new", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			mentor_uid: mentor_uid,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(result => {
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) Response OK with new user data obj: ", result.data);
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) responded with status OK"); 
			return result.data;
		})
		.catch(function(error) {  
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) Request Error:", error);
			console.log("(CLIENT.JS->ADD_NEW_MENTORSHIP) Request Failed with Errors.");
			throw error.body;  
		});
}


function add_mentor_request(mentor_uid, message_from_mentee) {
	console.log("(CLIENT.JS->ADD_MENTOR_REQUEST) called. ");
	return fetch(prepend_path + "/api/mentorship/add_mentor_request", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
				mentor_uid: mentor_uid,
				mentee_message: message_from_mentee,
		}),
		

	})
	.then(checkStatus)
	.then(parseJSON)
	.then(result => {
		console.log("(CLIENT.JS->ADD_MENTOR_REQUEST) Response OK with new user data obj: ", result.data);
		console.log("(CLIENT.JS->ADD_MENTOR_REQUEST) responded with status OK"); 
		return result.data;
	})
	.catch(error => {  
		console.log("(CLIENT.JS->GET_MENTORSHIP_DASH) Request Error:", error);
		console.log("(CLIENT.JS->GET_MENTORSHIP_DASH) Request Failed with Errors.");
		throw error.body;  
	});
}


/* this function returns user information for all of the given user's mentors 
* Precondition: user must be logged in
*/
function get_mentors() {
	console.log("(CLIENT.JS->GET_MENTORS) called.");

	return fetch(prepend_path + "/api/mentorship/mentors/", {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(result => {
			console.log("(CLIENT.JS->GET_MENTORS) Response OK with new user data obj: ", result.data);
			console.log("(CLIENT.JS->GET_MENTORS) responded with status OK"); 
			return result.data;
		} )
		.catch(function(error) {  
			console.log("(CLIENT.JS-GET_MENTORS) Request Error:", error);
			console.log("(CLIENT.JS->GET_MENTORS) Request Failed with Errors.");
			throw error.body;  
		});
}


/* this function adds a new skill to a user's profile 
* Precondition: user must be logged in
*/
function add_user_skill(skill_name) {

	
	console.log("(CLIENT.JS->ADD_USER_SKILL) called!");
	return fetch(prepend_path +"/api/skills/new", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			skill_name: skill_name,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(CLIENT.JS->ADD_USER_SKILL) Created new user skill data obj: ", user_data.data);
		console.log("(CLIENT.JS->ADD_USER_SKILL) response recieved without error.");
		return user_data.data;
	} )
	.catch(error => {  
		console.log("(CLIENT.JS->ADD_USER_SKILL)Error: ", error); 
		console.log("CLIENT.JS->ADD_USER_SKILL) failed with errors. "); 
		throw error.body; 
	});
}


/* this function adds an array of skills to a user's profile 
* Precondition: user must be logged in
*/
function add_skills_and_interests(user_id, skills, interests) {
	const si_list = skills.concat(interests);
	const skill_name_arr = Array.from(new Set(si_list));

	console.log("(CLIENT.JS->ADD_USER_SKILLS) called!");
	return fetch(prepend_path + "/api/skills/add_skills", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			skill_names: skill_name_arr,
		})
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(CLIENT.JS->ADD_USER_SKILLS) Created new user skill data obj: ", user_data.data);
		console.log("(CLIENT.JS->ADD_USER_SKILLS) response recieved without error.");
		return user_data.data;
	} )
	.catch(error => {  
		console.log("(CLIENT.JS->ADD_USER_SKILLS) Error: ", error); 
		console.log("CLIENT.JS->ADD_USER_SKILLS) failed with errors. "); 
		throw error.body; 
	});
}


/* this function returns user information for all of the given user's skills 
*/
function get_user_skills(user_id) {

	console.log("(CLIENT.JS->GET_USER_SKILLS) called with user_id: ", user_id);

	return fetch(prepend_path + "/api/skills/get_skills/" + user_id, {
		headers: {
			"Accept": "application/json",
		},
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(CLIENT.JS->GET_USER_SKILLS) Recieved mentors data obj: ", user_data.data);
		console.log("(CLIENT.JS->GET_USER_SKILLS) Get User Skills Response recieved without error");
		return user_data.data;
	} )
	.catch(error => {  
		console.log("(CLIENT.JS->GET_USER_SKILLS) Error in Get Mentors test: ", error);
		console.log('(CLIENT.JS->GET_USER_SKILLS) Get User Skills Request failed with errors. ');
		throw error.body;  
	});
}


/* this function returns user information for all users with the requested skill
 */
function get_users_with_skill(skill_name) {

	console.log("(CLIENT.JS->GET_USERS_WITH_SKILL) called with skill_name: ", skill_name);

	return fetch(prepend_path + "/api/skills/get_users_with_skill/" + skill_name, {
		headers: {
			"Accept": "application/json",
		},
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(CLIENT.JS->GET_USERS_WITH_SKILL) Recieved skilled users data obj: ", user_data.data);
		console.log("(CLIENT.JS->GET_USERS_WITH_SKILL) Get Users With Skills Response recieved without error.");
		return user_data.data;
	})
	.catch(error => {  
		console.log("(CLIENT.JS->GET_USERS_WITH_SKILL) Error in Get Mentors test: ", error);
		console.log("(CLIENT.JS->GET_USERS_WITH_SKILL) Get Users With Skills Request failed with errors. ");
		throw error.body;  
	});
}



function get_mentorship_dash() {
	console.log("(CLIENT.JS->GET_MENTORSHIP_DASH) called. ");
	return fetch(prepend_path + "/api/mentorship/dash", {
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
		},

	})
	.then(checkStatus)
	.then(parseJSON)
	.then(result => {
		console.log("(CLIENT.JS->GET_MENTORSHIP_DASH) Response OK with new user data obj: ", result.data);
		console.log("(CLIENT.JS->GET_MENTORSHIP_DASH) responded with status OK"); 
		return result.data;
	})
	.catch(error => {  
		console.log("(CLIENT.JS->GET_MENTORSHIP_DASH) Request Error:", error);
		console.log("(CLIENT.JS->GET_MENTORSHIP_DASH) Request Failed with Errors.");
		throw error.body;  
	});
}

/*
* Precondition: user must be logged in
*/
function update_profile(past_str, present_str, future_str) {
	return fetch("/api/users/profile", {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			past: past_str,
			present: present_str,
			future: future_str,
		}),
	})
	.then(checkStatus)
	.then(parseJSON)
	.then(user_data => {
		console.log("(CLIENT.JS->UPDATE_PROFILE) Recieved user data obj: ", user_data.data);
		console.log("(CLIENT.JS->UPDATE_PROFILE) Response recieved without error.");
		return user_data.data;
	})
	.catch(error => {  
		console.log("(CLIENT.JS->UPDATE_PROFILE) Error: ", error);
		console.log("(CLIENT.JS->UPDATE_PROFILE) Request failed with errors. ");
		throw error.body;  
	});

}

/** this middleware function is a adapted from: 
https://github.com/fullstackreact/food-lookup-demo/blob/master/server.js
*/
function checkStatus(response)  {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		return parseJSON(response)
			.then((res) => {
				error.message = res.message;
				console.log("CheckStatus Error Code ", response.status,": ", error.status); //
				console.log(res); //
				throw error;
			})
			.catch(function(error) {
				console.log(error); // eslint-disable-line no-console
				throw error;
			});
	}
	
}


function parseJSON(response) {
	return response.json();
}


module.exports = {  add_new_user, get_user_by_uid, add_mentorship, 
	get_mentors, add_user_skill, get_user_skills, get_users_with_skill,
	add_skills_and_interests, get_mentorship_dash, update_profile, 
	login, logout, add_mentor_request
};

