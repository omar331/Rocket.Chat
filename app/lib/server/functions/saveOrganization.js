import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {

});


export const saveOrganization = function(organizationData) {
	organizationData.fuck = 'yeah';

	return organizationData;
};
