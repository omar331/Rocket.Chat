import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'underscore';
import s from 'underscore.string';
import { Gravatar } from 'meteor/jparker:gravatar';

import * as Mailer from '../../../mailer';
import { getRoles, hasPermission } from '../../../authorization';
import { settings } from '../../../settings';
import { passwordPolicy } from '../lib/passwordPolicy';
import { validateEmailDomain } from '../lib';
import { validateUserRoles } from '../../../../ee/app/authorization/server/validateUserRoles';
import { saveUserIdentity } from './saveUserIdentity';

import { checkEmailAvailability, checkUsernameAvailability, setUserAvatar, setEmail, setStatusText } from '.';

let html = '';
let passwordChangedHtml = '';
Meteor.startup(() => {

});


export const saveOrganization = function(organizationData) {

	organizationData.fuck = "yeah";

	return organizationData;
};
