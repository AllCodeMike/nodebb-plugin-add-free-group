'use strict';

const plugin = {};

plugin.addUserToGroup = async (params) => {
  try {
	console.log("GOT HIERE", params);
    // Get the user ID from the response data
    const uid = params.uid;

    // Set the name of the group you want to add the user to
    const groupName = 'free-plan-membership';

    // Get the group data based on the group name
    const groupData = await plugin.getGroupByName(groupName);

    // Add the user to the group
    if (groupData) {
      await plugin.addUserToGroupWithId(uid, groupData._id);
    }
  } catch (error) {
    console.log("ERROR ON PLUGIN", error);
  }
};

plugin.getGroupByName = (groupName) => {
  return new Promise((resolve, reject) => {
    plugin.Groups.getGroups([groupName], 1, (err, groups) => {
      if (err) {
        return reject(err);
      }

      if (groups.length > 0) {
        resolve(groups[0]);
      } else {
        resolve(null);
      }
    });
  });
};

plugin.addUserToGroupWithId = (uid, groupId) => {
  return new Promise((resolve, reject) => {
    plugin.Groups.join(groupId, uid, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

module.exports = plugin;
