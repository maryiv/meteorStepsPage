import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Steps } from '../../api/steps.js';

import './step.html';

Template.step.events({
    'click .plan-steps__item'(event) {
        const ID = event.target.getAttribute('data-id'),
            selected = Steps.findOne(ID, { fields: { createdAt: 1 } });
        if (selected) {
            Meteor.call('selectOtherStep', selected._id, selected.createdAt, (error, result) => {
                if (error) {
                    console.log(error);
                } else if (result === true) {
                    Meteor.call('getFillPercentage', (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            Session.set('fillPercentage', result);
                        }
                    });
                }
            });
        }
    }
});