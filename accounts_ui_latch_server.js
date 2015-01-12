
Meteor.methods({
  '_latchConfigureService': function (configuration) {
    check(configuration, {appId: String, secretKey: String});

    if (ServiceConfiguration.configurations.findOne({service: "latch"}))
      throw new Meteor.Error(403, "Service latch already configured");

    ServiceConfiguration.configurations.insert({
      service: "latch",
      secret: configuration
    });
  }
});
