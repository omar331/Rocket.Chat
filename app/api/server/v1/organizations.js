import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { TAPi18n } from 'meteor/rocketchat:tap-i18n';
import _ from 'underscore';
import Busboy from 'busboy';

import { Users, Subscriptions } from '../../../models/server';
import { Users as UsersRaw } from '../../../models/server/raw';
import { hasPermission } from '../../../authorization';
import { settings } from '../../../settings';
import { getURL } from '../../../utils';
import {
	saveOrganization,
} from '../../../lib';
import { getFullUserDataByIdOrUsername } from '../../../lib/server/functions/getFullUserData';
import { API } from '../api';
import { setStatusText } from '../../../lib/server';
import { findUsersToAutocomplete, getInclusiveFields, getNonEmptyFields, getNonEmptyQuery } from '../lib/users';
import { getUserForCheck, emailCheck } from '../../../2fa/server/code';
import { resetUserE2EEncriptionKey } from '../../../../server/lib/resetUserE2EKey';
import { setUserStatus } from '../../../../imports/users-presence/server/activeUsers';
import { resetTOTP } from '../../../2fa/server/functions/resetTOTP';
import { Team } from '../../../../server/sdk';

API.v1.addRoute('organizations.create', { authRequired: true }, {
	post() {

		const { fields } = this.parseJsonQuery();

		const organization = saveOrganization(this. bodyParams )

		return API.v1.success({ organization });
	},
});
