Package.describe({
  name: 'skehoe1989:autoform-relations',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'An easy input form for aldeed-autoform used to search for and connect references to records from another collection.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('blaze-html-templates');
  api.use('underscore@1.0.4');
  api.use('aldeed:autoform@5.7.1');
  api.use('meteorhacks:search-source@1.4.2');
  api.addFiles('client/autoform-relations.html', 'client');
  api.addFiles('client/autoform-relations.css', 'client');
  api.addFiles('client/autoform-relations.js', 'client');
  api.addFiles('server/autoform-relations.js', 'server');
});
