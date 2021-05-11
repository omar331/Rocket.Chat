import '../../broker';

import { api } from '../../../../server/sdk/api';
import { Authorization } from '../../../../server/services/authorization/service';
import { getConnection } from '../mongo';

getConnection().then((db) => {
	console.log(' aaaa--x-x-x-')
	api.registerService(new Authorization(db));
});
