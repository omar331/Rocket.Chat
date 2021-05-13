import { Meteor } from 'meteor/meteor';


import { Organizations } from '../../../models';


Meteor.startup(() => {

});


export const saveOrganization = function(organizationData) {
	const organizationId = Organizations.create(organizationData);

	return organizationId;
};
