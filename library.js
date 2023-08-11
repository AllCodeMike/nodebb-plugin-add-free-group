'use strict';

const plugin = {
	initialized: false
};

var groups = require.main.require('./src/groups')
var helpers = require.main.require('./src/controllers/helpers');
const axios = require.main.require('axios');

let app;
plugin.init = async function (params) {
	// Define the function that renders the custom route.
	
	var router = params.router;
	var middleware = params.middleware;
	
	router.get('/homepage', middleware.buildHeader, render);
	router.get('/api/homepage', render);
	
	if (params) {
		app = params;
	}
};

plugin.addUserToFreeGroup = async (params) => {
  try {
    // Get the user ID from the response data
    const uid = params.uid;

    // Set the name of the group you want to add the user to
    const groupName = 'free-plan-membership';

	groups.join(groupName, params.user.uid);
	
  } catch (error) {
    console.log("ERROR ON PLUGIN THIS RIGHT HERE", error);
  }
};

//filter:register.complete registerComplete
plugin.registerComplete = async (params) => {
	const uid = params.uid;

	if(params.registration_plan !== 'free-plan-membership' ){
		var config = {
			params:{
				uid: uid
			},
			validateStatus: function (status) {
				return status >= 200 && status <= 400
			}
		}

		const response = await axios.post(params.INTEGRATION_URL + '/register-checkout-session/' + params.registration_plan, {}, config)
			.then(response => {
				params.next = response.data;
			})
			.catch(error => {
				// An error occurred during the request.
				console.log("error", error);
		});
	}
	return params;
};

function render(req, res, next) {

		// Get whatever data you want to send to the template here.
		var data = {whatever: 33};

		// This is the path to your template without the .tpl, relative to the templates directory in plugin.json
		var template = 'homepage'

		// Send the page to the user.
		res.render(template, data);
}

module.exports = plugin;
