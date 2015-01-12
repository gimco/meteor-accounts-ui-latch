/*
 * Latch integration for Meteor framework
 * Copyright (C) 2015 Bruno Orcha García <gimcoo@gmail.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

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
