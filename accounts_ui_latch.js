Session.setDefault('Meteor._latch.pairing', false);

Template._latchAccountLinks.helpers({
  isPairing: function() {
    return Session.get('Meteor._latch.pairing');
  },
  isPaired: Latch.isPaired
});

Template._latchAccountLinks.events({
  "click #latch-pair-link" : function (evt, tmpl) {
    Accounts._loginButtonsSession.resetMessages();
    Tracker.flush();
    var token = prompt("Open your Latch app and select 'Add a new service'.\nWrite down the token code shown.");
    if (!token) return;
    Session.set('Meteor._latch.pairing', true);
    Latch.pair(token, function(err, res) {
        Session.set('Meteor._latch.pairing', false);
        if (err) {
            Accounts._loginButtonsSession.errorMessage(err.reason);
        } else {
            Accounts._loginButtonsSession.infoMessage("Account protected with Latch!");
        }
    });
  },
  "click #latch-unpair-link" : function (evt, tmpl) {
    Accounts._loginButtonsSession.resetMessages();
    Tracker.flush();
    if (!confirm("You're going to disable Latch protection for your account. Are your sure?")) return;

    Latch.unpair(function(err, res) {
        if (err) {
            Accounts._loginButtonsSession.errorMessage(err.reason);
        } else {
            Accounts._loginButtonsSession.infoMessage("Account protection disabled.");
        }
    });
  }
});

injectTemplate("_latchAccountLinks", "_loginButtonsLoggedInDropdownActions")
