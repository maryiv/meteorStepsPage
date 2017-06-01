import { Meteor } from 'meteor/meteor';
import { Steps } from '../imports/api/steps.js';

Meteor.startup(() => {
    if (Steps.find().fetch().length === 0) {

        let steps = [
            {
                text: 'Family Information',
                status: 'checked'
            },
            {
                text: 'General Information',
                status: 'checked'
            },
            {
                text: 'Online Accounts',
                status: 'checked'
            },
            {
                text: 'Assets and Liabilities',
                status: 'current'
            },
            {
                text: 'Estate Plan Preparedness',
                status: 'unchecked'
            },
            {
                text: 'Summary',
                status: 'unchecked'
            }
        ];

        _.each(steps, function (step) {
            let id = Steps.insert({
                text: step.text,
                status: step.status,
                createdAt: Date.now()
            });
            console.log('Created step #' + id);
        });
    }
});
