import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'underscore';
import s from 'underscore.string';

import { Base } from './_Base';
import Subscriptions from './Subscriptions';
import { settings } from '../../../settings/server/functions/settings';
import { escapeRegExp } from '../../../../lib/escapeRegExp';


export class OrganizationUsers extends Base {
	constructor(...args) {
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

	addUserToOrganization( orgId, userId, roles ) {
		if ( ! this.findOne({orgId, userId}) ) {
			this.insert({
				orgId, userId, roles
			})
		}
	}

}

export default new OrganizationUsers();
