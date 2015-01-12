# accounts-ui-latch

A package that integrates the Latch service with Meteor framework, allowing users to easily protect theirs own accounts. This package extends different templates of the `accounts-ui` package to add Latch options in the login dropdown. The first time this package is added, will appear a new configuration button on the dropdown login menu to setup  the Latch service. Once configured, the users will can protect his accounts simply clicking in the *pair with Latch* link. To add this package simply run the following command on the Meteor project:

~~~~
meteor add gimco:accounts-ui-latch
~~~~

For more infomration take a look to the [`gimco:latch`](https://github.com/gimco/meteor-latch) package.