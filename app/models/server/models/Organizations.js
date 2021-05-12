import _ from 'underscore';

import { Base } from './_Base';


export class Organizations extends Base {
	constructor() {
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
