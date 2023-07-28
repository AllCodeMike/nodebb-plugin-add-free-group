'use strict';

const plugin = {
	initialized: false
};

var groups = require.main.require('./src/groups')
const axios = require.main.require('axios');

plugin.init = async function (params, callback) {
	
	var router = params.router;
	var middleware = params.middleware;

	// Define the function that renders the custom route.
	function render(req, res, next) {
		// Get whatever data you want to send to the template here.
		var data = {url: req.query.redirect};

		// This is the path to your template without the .tpl, relative to the templates directory in plugin.json
		var template = 'redirect'

		// Send the page to the user.
		res.render(template, data);
		
		if(req.query.redirect){
			console.log("ENTERED HERERUHIUQIO");
			console.log("ENTERED NASA  ", $(window));
			return res.redirect(req.query.redirect);
		}
	}

	// This actually creates the routes, you need two routes for every page.
	// The first parameter is the actual path to your page.
	router.get('/redirect', middleware.buildHeader, render);
	router.get('/api/redirect', render);
};

plugin.addUserToFreeGroup = async (params) => {
  try {
	console.log("GOT HIERE", params);
    // Get the user ID from the response data
    const uid = params.uid;

    // Set the name of the group you want to add the user to
    const groupName = 'free-plan-membership';

	groups.join(groupName, params.user.uid, function(err) {
		console.log("ERROR ON PLUGIN", err);
	});
	
	if(params.data && params.data.registration_plan && params.data.registration_plan !== 'free-plan-membership'){
		console.log("ENTERED TO REDIRECT PAGE");
		console.log("Axios", axios);
		var config = {
			params:{
				uid: params.user.uid
			},
			validateStatus: function (status) {
				return status >= 200 && status <= 400
			}
		}
	
		//console.log("ENTERED TO REDIRECT PAGE AFTER CONFIG DEF wuatafa");
		const response = await axios.post('http://127.0.0.1:3000/register-checkout-session/' + params.data.registration_plan, {}, config)
			.then(response => {
			})
			.catch(error => {
				// An error occurred during the request.
				console.log("error", error);
		});
	}
	
  } catch (error) {
    console.log("ERROR ON PLUGIN", error);
  }
};

module.exports = plugin;
