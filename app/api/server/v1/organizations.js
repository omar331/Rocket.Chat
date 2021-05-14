import {
	saveOrganization,
	addUserToOrganization,
  removeOrganizationUserRole,
} from '../../../lib';
import { API } from '../api';
import { Organizations, OrganizationUsers } from '../../../models';


API.v1.addRoute('organizations.create', { authRequired: true }, {
	post() {
		const organizationId = saveOrganization(this.bodyParams);

		return API.v1.success({ organization: Organizations.findOneById(organizationId) });
	},
});


API.v1.addRoute('organizations.addUser', { authRequired: true }, {
	post() {
		const organizationUserId = addUserToOrganization(this.bodyParams.organizationId, this.bodyParams.userId, this.bodyParams.roles);

		return API.v1.success({ organizationUser: OrganizationUsers.findOneById(organizationUserId) });
	},
});

API.v1.addRoute('organizations.removeUserRole', { authRequired: true }, {
	post() {
		const organizationUserId = removeOrganizationUserRole(this.bodyParams.organizationId, this.bodyParams.userId, this.bodyParams.roles);

		return API.v1.success({ organizationUser: OrganizationUsers.findOneById(organizationUserId) });
	},
});
