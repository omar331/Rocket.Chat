import _ from 'underscore';

import { Base } from './_Base';


export class OrganizationUsers extends Base {
	constructor() {
		super('organization_users');
	}

	// INSERT
	create(data) {
		const orgUser = {
			createdAt: new Date(),
		};

		_.extend(orgUser, data);

		return this.insert(orgUser);
	}

	addUserToOrganization(orgId, userId, roles) {
		if (! this.findOne({ orgId, userId })) {
			this.insert({
				orgId, userId, roles,
			});
		}
	}
}

export default new OrganizationUsers();
