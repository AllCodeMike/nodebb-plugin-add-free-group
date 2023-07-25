'use strict';

const plugin = {};
var groups = require.main.require('./src/groups')

plugin.addUserToFreeGroup = async (params) => {
  try {
	console.log("GOT HIERE", params);
    // Get the user ID from the response data
    const uid = params.uid;

    // Set the name of the group you want to add the user to
    const groupName = 'free-plan-membership';

	groups.join(groupName, params.user.uid, function(err) {
			errorHandler.handle(err, res);
	});
  } catch (error) {
    console.log("ERROR ON PLUGIN", error);
  }
};

module.exports = plugin;
