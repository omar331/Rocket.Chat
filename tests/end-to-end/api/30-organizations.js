import { expect } from 'chai';

import {
	getCredentials,
	api,
	request,
	credentials,
} from '../../data/api-data.js';
import { createUser } from '../../data/users.helper.js';
import { createOrganization, createOrganizationUser } from '../../data/organizations.helper.js';

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
					expect(res.body.organizationUser.roles).to.have.members(roles);
				})
				.end(done);
		});
	});

	describe('[/organizations.addUser]', () => {
		let user;
		let organization;
		let organizationUser;

		const originalRoles = ['user', 'role1', 'role2'];
		const rolesAdd = ['role3', 'role4'];

		before(async () => {
			user = await createUser();
			organization = await createOrganization();
			organizationUser = await createOrganizationUser(organization, user, originalRoles);
		});

		it('should update user within organization (user already assigned to organization)', (done) => {
			const expectedRoles = originalRoles.concat(rolesAdd);

			request.post(api('organizations.addUser'))
				.set(credentials)
				.send({
					organizationId: organization._id,
					userId: user._id,
					roles: rolesAdd,
				})
				.expect('Content-Type', 'application/json')
				.expect(200)
				.expect((res) => {
					expect(res.body).to.have.property('success', true);
					expect(res.body).to.have.nested.property('organizationUser._id', organizationUser._id);
					expect(res.body).to.have.nested.property('organizationUser.organizationId', organization._id);
					expect(res.body).to.have.nested.property('organizationUser.userId', user._id);
					expect(res.body.organizationUser.roles).to.have.members(expectedRoles);
				})
				.end(done);
		});
	});

	describe('[/organizations.removeUserRole]', () => {
		let user;
		let organization;
		let organizationUser;

		const originalRoles = ['role1', 'role2', 'role3', 'role4'];

		before(async () => {
			user = await createUser();
			organization = await createOrganization();
			organizationUser = await createOrganizationUser(organization, user, originalRoles);
		});

		it('should remove a set of roles from a organization/user', (done) => {
			const rolesRemove = ['role2', 'role4'];
			const expectedRemainigRoles = ['role1', 'role3'];

			request.post(api('organizations.removeUserRole'))
				.set(credentials)
				.send({
					organizationId: organization._id,
					userId: user._id,
					roles: rolesRemove,
				})
				.expect('Content-Type', 'application/json')
				.expect(200)
				.expect((res) => {
					expect(res.body).to.have.property('success', true);
					expect(res.body).to.have.nested.property('organizationUser._id', organizationUser._id);
					expect(res.body).to.have.nested.property('organizationUser.organizationId', organization._id);
					expect(res.body).to.have.nested.property('organizationUser.userId', user._id);
					expect(res.body.organizationUser.roles).to.have.members(expectedRemainigRoles);
				})
				.end(done);
		});
	});
});
