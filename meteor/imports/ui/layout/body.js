import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Steps } from '../../api/steps.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.state.set( 'showAnyAssets', false );
    this.state.set( 'showOtherAssets', false );
    this.state.set( 'showAnyLiabilities', false );
    Meteor.call('getFillPercentage', (error, result) => {
        if (error) {
            console.log(error);
        } else {
            Session.set('fillPercentage', result);
        }
    });
});

Template.body.helpers({
    steps() {
        return Steps.find({});
    },
    fillPercentage() {
        return Session.get('fillPercentage') ? Session.get('fillPercentage') : 0;
    },
    arcLength() {
        const fillPercentage = Session.get('fillPercentage') ? Session.get('fillPercentage') : 0,
            fullArcLength = Math.PI * 2 * 47;
        return fullArcLength * (1 - fillPercentage / 100);
    },
    showAnyAssets() {
        return Template.instance().state.get( 'showAnyAssets' );
    },
    showOtherAssets() {
        return Template.instance().state.get( 'showOtherAssets' );
    },
    showAnyLiabilities() {
        return Template.instance().state.get( 'showAnyLiabilities' );
    },
    not(value) {
        return !value;
    }
});

Template.body.events({
    'change .plan-container__form__row--any_assets input'(event, instance) {
        instance.state.set('showAnyAssets', parseInt(event.currentTarget.value) === 1);
    },
    'change .plan-container__form__row--other_assets input'(event, instance) {
        instance.state.set('showOtherAssets', parseInt(event.currentTarget.value) === 1);
    },
    'change .plan-container__form__row--any_liabilities input'(event, instance) {
        instance.state.set('showAnyLiabilities', parseInt(event.currentTarget.value) === 1);
    },
});