var CONFIGURATION_KEYS = ['appId', 'secretKey'];

Session.setDefault('Meteor._latch.configureDialogVisible', false);
Session.setDefault('Meteor._latch.configureDialogSaveDisabled', true);

Template._latchConfigureDialog.helpers({
  visible: function () {
    return Session.get('Meteor._latch.configureDialogVisible');
  },
  saveDisabled: function () {
    return Session.get('Meteor._latch.configureDialogSaveDisabled');
  }
});

Template._latchConfigureDialog.events({
  'click .configure-login-service-dismiss-button': function () {
    Session.set('Meteor._latch.configureDialogVisible', false);
  },
  'click #configure-login-service-dialog-save-configuration': function () {
    if (Session.get('Meteor._latch.configureDialogVisible') &&
      !Session.get('Meteor._latch.configureDialogSaveDisabled')) {
      var configuration = {};
      _.each(CONFIGURATION_KEYS, function(field) {
        configuration[field] = document.getElementById(
          'configure-login-service-dialog-' + field).value
          .replace(/^\s*|\s*$/g, ""); // trim() doesnt work on IE8;
      });

      Meteor.call(
        "_latchConfigureService", configuration, function (err, result) {
          if (err)
            Meteor._debug("Error configuring Latch service", error);
          else
            Session.set('Meteor._latch.configureDialogVisible', false);
        });
    }
  },

  'input, keyup input': function (event) {
    if (event.target.id.indexOf('configure-login-service-dialog') === 0) {
      var anyFieldEmpty = _.any(CONFIGURATION_KEYS, function(field) {
        return document.getElementById(
          'configure-login-service-dialog-' + field).value === '';
      });
      Session.set('Meteor._latch.configureDialogSaveDisabled', anyFieldEmpty);
    }
  }
});

Template._latchConfigureButton.helpers({
  visible: function() {
    return Accounts.loginServicesConfigured()
      && !ServiceConfiguration.configurations.findOne({service:'latch'});
  }
});

Template._latchConfigureButton.events({
  'click #login-buttons-latch': function(evt, tmpl) {
    Accounts._loginButtonsSession.set('configureLoginServiceDialogVisible', false);
    Session.set('Meteor._latch.configureDialogVisible', true);
    Session.set('Meteor._latch.configureDialogSaveDisabled', true);
  }
});

Tracker.autorun(function () {
  if (Accounts._loginButtonsSession.get('configureLoginServiceDialogVisible')) {
    Session.set('Meteor._latch.configureDialogVisible', false);
  }
});

injectTemplate("_latchConfigureButton", "_loginButtonsLoggedOutAllServices")
