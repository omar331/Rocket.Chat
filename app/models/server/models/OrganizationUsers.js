import _ from 'underscore';

import { Base } from './_Base';


export class OrganizationUsers extends Base {
	constructor() {
		super('organization_users');
	}


	addUserToOrganization(organizationId, userId, newRoles) {
		const organizationUser = this.findOne({ organizationId, userId });

		if (!organizationUser) {
			return this.insert({
				createdAt: new Date(), organizationId, userId, roles: newRoles,
			});
		}


		this.upsert({ _id: organizationUser._id }, { $addToSet: { roles: { $each: newRoles } } });

		return organizationUser._id;
	}


	removeOrganizationUserRole(organizationId, userId, removeRoles) {
		const organizationUser = this.findOne({ organizationId, userId });

		if (!organizationUser) {
			return null;
		}

		this.upsert(
			{ _id: organizationUser._id },
			{ $pullAll: { roles: removeRoles } },
		);

		// TODO: remove OrganizationUsers item when there's no roles remaining

		return organizationUser._id;
	}
}

export default new OrganizationUsers();
