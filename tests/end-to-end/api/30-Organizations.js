import { expect } from 'chai';

import {
	getCredentials,
	api,
	request,
	credentials,
} from '../../data/api-data.js';
import { createUser } from '../../data/users.helper.js';
import { createOrganization } from '../../data/organizations.helper.js';

describe('[Organizations]', function() {
	this.retries(0);

	before((done) => getCredentials(done));

	describe('[/organizations.create]', () => {
		it('should create a new organization', (done) => {
			const orgAlias = 'my-organization';
			const orgName = 'My organization';


			request.post(api('organizations.create'))
				.set(credentials)
				.send({
					alias: orgAlias,
					name: orgName,
				})
				.expect('Content-Type', 'application/json')
				.expect(200)
				.expect((res) => {
					expect(res.body).to.have.property('success', true);
					expect(res.body).to.have.nested.property('organization.name', orgName);
					expect(res.body).to.have.nested.property('organization.alias', orgAlias);
				})
				.end(done);
		});
	});


	describe('[/organizations.addUser]', () => {
		let user;
		let organization;
		const roles = ['user', 'newRole'];


		before(async () => {
			user = await createUser();
			organization = await createOrganization();
		});

		it('should add or update user to a organization with certain roles', (done) => {
			request.post(api('organizations.addUser'))
				.set(credentials)
				.send({
					organizationId: organization._id,
					userId: user._id,
					roles,
				})
				.expect('Content-Type', 'application/json')
				.expect(200)
				.expect((res) => {
					expect(res.body).to.have.property('success', true);
					expect(res.body).to.have.nested.property('organizationUser.organizationId', organization._id);
					expect(res.body).to.have.nested.property('organizationUser.userId', user._id);
					// TODO: must check roles
				})
				.end(done);
		});
	});
});
