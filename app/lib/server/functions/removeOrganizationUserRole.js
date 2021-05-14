import { Meteor } from 'meteor/meteor';


import { OrganizationUsers } from '../../../models';


Meteor.startup(() => {

});


export const removeOrganizationUserRole = function(organizationId, userId, roles) {
	return OrganizationUsers.removeOrganizationUserRole(organizationId, userId, roles);
};
