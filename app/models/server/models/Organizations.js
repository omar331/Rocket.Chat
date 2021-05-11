import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'underscore';
import s from 'underscore.string';

import { Base } from './_Base';
import Subscriptions from './Subscriptions';
import { settings } from '../../../settings/server/functions/settings';
import { escapeRegExp } from '../../../../lib/escapeRegExp';


export class Organizations extends Base {
	constructor(...args) {
		super('organizations');
	}

	// INSERT
	create(data) {
		const organization = {
			createdAt: new Date(),
		};

		_.extend(organization, data);

		return this.insert(organization);
	}
}

export default new Organizations();
