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

	addUserToOrganization(organizationId, userId, roles) {
		const organizationUser = this.findOne({ organizationId, userId });

		if (!organizationUser) {
			return this.insert({
				createdAt: new Date(), organizationId, userId, roles,
			});
		}

		return this.upsert({ _id: organizationUser._id }, { $set: { roles } });
	}
}

export default new OrganizationUsers();
