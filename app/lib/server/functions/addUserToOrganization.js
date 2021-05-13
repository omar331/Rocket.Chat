import { Meteor } from 'meteor/meteor';


import { OrganizationUsers } from '../../../models';


Meteor.startup(() => {

});


export const addUserToOrganization = function(organizationId, userId, roles) {
	return OrganizationUsers.addUserToOrganization(organizationId, userId, roles);
};
