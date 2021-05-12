import { expect } from 'chai';

import {
	getCredentials,
	api,
	request,
	credentials,
} from '../../data/api-data.js';

describe('[Organizations]', function() {
	this.retries(0);

	before((done) => getCredentials(done));

	describe('[/organizations.create]', () => {
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

					console.log(res.body);
				})
				.end(done);
		});
	});
});
