import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { TAPi18n } from 'meteor/rocketchat:tap-i18n';
import toastr from 'toastr';

import { Messages } from '../../../models/client';
import { settings } from '../../../settings/client';
import { MessageAction, call } from '../../../ui-utils/client';
import { messageArgs } from '../../../ui-utils/client/lib/messageArgs';
import { roomTypes } from '../../../utils/client';

Meteor.startup(function() {
	Tracker.autorun(() => {
		if (!settings.get('Threads_enabled')) {
			return MessageAction.removeButton('follow-message');
		}
		MessageAction.addButton({
			id: 'follow-message',
			icon: 'bell',
			label: 'Follow_message',
			context: ['message', 'message-mobile', 'threads'],
			async action() {
				const { msg } = messageArgs(this);
				call('followMessage', { mid: msg._id }).then(() =>
					toastr.success(TAPi18n.__('You_followed_this_message')),
				);
			},
			condition({ msg: { _id, tmid, replies = [] }, u, room }, context) {
				if (tmid || context) {
					const parentMessage = Messages.findOne({ _id: tmid || _id }, { fields: { replies: 1 } });
					if (parentMessage) {
						replies = parentMessage.replies || [];
					}
				}
				const showLivechatMenuActions = roomTypes.showLivechatMenuActions(room.t);
				if (showLivechatMenuActions) {
					return false;
				}
				return !replies.includes(u._id);
			},
			order: 2,
			group: 'menu',
		});
	});
});
