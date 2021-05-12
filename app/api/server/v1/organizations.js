import {
	saveOrganization,
} from '../../../lib';
import { API } from '../api';

API.v1.addRoute('organizations.create', { authRequired: true }, {
	post() {
		const organization = saveOrganization(this.bodyParams);

		return API.v1.success({ organization });
	},
});
