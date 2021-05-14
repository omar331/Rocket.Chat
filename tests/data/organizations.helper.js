import { api, credentials, request } from './api-data';

export const createOrganization = () => new Promise((resolve) => {
	const name = `organization.test.${ Date.now() }`;
	const alias = name;
	request.post(api('organizations.create'))
		.set(credentials)
		.send({ name, alias })
		.end((err, res) => resolve(res.body.organization));
});


export const createOrganizationUser = (organization, user, roles) => new Promise((resolve) => {
	request.post(api('organizations.addUser'))
		.set(credentials)
		.send({ organizationId: organization._id, userId: user._id, roles })
		.end((err, res) => resolve(res.body.organizationUser));
});
