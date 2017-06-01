import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Steps = new Mongo.Collection('steps');

Meteor.methods({
    selectOtherStep(ID, createdTime) {
        Steps.update({ createdAt: { $lt: createdTime } }, {
            $set: { status: 'checked' },
        }, { multi: true });
        Steps.update(ID, {
            $set: { status: 'current' },
        });
        Steps.update({ createdAt: { $gt: createdTime } }, {
            $set: { status: 'unchecked' },
        }, { multi: true });
        console.log(Steps.find());
        return true;
    },
    getFillPercentage() {
        //TODO:: Change recalculation by completeness of form
        const total = Steps.find({}).count(),
            checked = Steps.find({ status: 'checked' }).count();
        if (total !== 0 && checked !== 0) {
            return Math.round(checked * 100 / total);
        }
        return 0;
    }
});

if ( Meteor.isServer ) {
    Meteor.publish('steps', () => {
        return Steps.find();
    });
}