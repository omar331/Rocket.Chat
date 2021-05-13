import { api, credentials, request } from './api-data';

export const createOrganization = () => new Promise((resolve) => {
	const name = `organization.test.${ Date.now() }`;
	const alias = name;
	request.post(api('organizations.create'))
		.set(credentials)
		.send({ name, alias })
		.end((err, res) => resolve(res.body.organization));
});
