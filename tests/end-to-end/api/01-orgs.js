import crypto from 'crypto';

import { expect } from 'chai';

import {
	getCredentials,
	api,
	request,
	credentials,
	apiEmail,
	apiUsername,
	targetUser,
	log,
	wait,
	reservedWords,
} from '../../data/api-data.js';
import { adminEmail, preferences, password, adminUsername } from '../../data/user.js';
import { imgURL } from '../../data/interactions.js';
import { customFieldText, clearCustomFields, setCustomFields } from '../../data/custom-fields.js';
import { updatePermission, updateSetting } from '../../data/permissions.helper';
import { createUser, login, deleteUser, getUserStatus } from '../../data/users.helper.js';
import { createRoom } from '../../data/rooms.helper';

describe('[Organizations]', function() {
	this.retries(0);

	before((done) => getCredentials(done));

	describe('[/organizations.create]', () => {
		console.log('   ------ ', credentials)

		it('should create a new organization', (done) => {
			request.post(api('organizations.create'))
			.set(credentials)
			.send({
				alias: 'myorganization',
				name: 'My Organization',
			})
			.expect('Content-Type', 'application/json')
			.expect(200)
			.expect((res) => {
				expect(res.body).to.have.property('success', true);

				console.log( res.body );

			})
			.end(done);
		});
	});

});
