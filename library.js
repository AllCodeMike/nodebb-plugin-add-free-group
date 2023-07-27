'use strict';

const plugin = {};

var groups = require.main.require('./src/groups')
const plugins = require.main.require('./src/plugins');
const axios = require.main.require('axios');
const controllerHelpers = require.main.require('./src/controllers/helpers');
				controllerHelpers.redirect(res, `${nconf.get('relative_path')}/${mount}${req.path}`);

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
	
		const response = axios.post('http://127.0.0.1:3000/register-checkout-session/' + params.data.registration_plan, {}, config)
			.then(response => {
				// The request was successful, and the response data is available here.
				window.open(response.data);
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
