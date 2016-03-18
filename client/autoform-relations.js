/**
 * Created by stevenkehoe on 3/16/16.
 */

AutoForm.addInputType('relation', {
    template: "afRelations",
    valueOut: function(){
        var currentRecords = Session.get("currentRecords");
        var ids = _.map(currentRecords, function(record) {
            return record._id;
        });
        if(ids.length == 1){
            return ids[0]
        }
        else {
            return ids;
        }
    }
});

var AfSearchSources = {};

Template.afRelations.onCreated(function() {
    var self = this;
    var schemaKey = self.data.atts['data-schema-key'];
    var options = {};
    var fields = [];

    Session.set("afRelationsReady", false);
    Session.set(schemaKey + "_currentRecords", []);

    if (Template.instance().data.value) {
        var currentRecords = window[this.data.atts.settings.collection].find({_id: {$in: Template.instance().data.value}}).fetch();
        Session.set("currentRecords", currentRecords);
    }

    if (self.data.atts.settings.fields) {
        fields = self.data.atts.settings.fields;
    }
    if (self.data.atts.settings.options) {
        options = self.data.atts.settings.options;
    }

    var sourceSettings = {};
    sourceSettings.collectionName = this.data.atts.settings.collection;
    sourceSettings.sourceName = "af" + this.data.atts.settings.collection;
    sourceSettings.fields = fields;

    Meteor.call('setupAfSearchSource', sourceSettings, function(error, result) {
        if (error) {
            console.log("Error setting up search source for afRelations:\n " + error);
        } else {

            AfSearchSources[schemaKey] = new SearchSource("af" + self.data.atts.settings.collection, fields, options);
            Session.set(schemaKey + "_afRelationsReady", true);
        }
    });
});

Template.afRelations.helpers({
    getResults: function() {
        var self = this;
        var schemaKey = self.atts['data-schema-key'];
        if(Session.get(schemaKey + '_afRelationsReady')) {
            return AfSearchSources[schemaKey].getData({
                transform: function (matchText, regExp) {
                    return matchText.replace(regExp, "<b>$&</b>")
                }
            });
        }
    },
    isLoading: function() {
        return AfSearchSources[this.atts['data-schema-key']].getStatus().loading;
    },
    schemaKey: function() {
        return this.atts['data-schema-key'];
    },
    getFields: function() {
        return Template.instance().data.atts.settings.fields;
    },
    getProp: function(poco, prop){
        var x = poco[prop];
        return x;
    },
    getCurrentRecords: function() {
        return Session.get(this.atts['data-schema-key'] + "_currentRecords");
    }
});


// Have to use regular JQuery keyup function as you cannot compose a dynamic key in JSON using this.atts.name to handle
// the situation where one for has multiple relationship search boxes
Template.afRelations.onRendered(function() {
    var schemaKey = Template.instance().data.atts['data-schema-key'];
    $("#searchBox_" + schemaKey).keyup(_.throttle(function(e){
        var text = $(e.target).val().trim();
        AfSearchSources[schemaKey].search(text, {});
    }, 200));
});

Template.afRelations.events({
    "click a.afRelations-add": function () {
        var self = this;
        var schemaKey = Template.instance().data.atts['data-schema-key'];
        var currentRecords = Session.get(schemaKey + "_currentRecords");
        var exists  = _.some(currentRecords, function(record){
            return (self._id == record._id);
        });
        if(!exists){
            currentRecords.push(this);
        }

        Session.set(schemaKey + "_currentRecords", currentRecords);
    },
    "click a.afRelations-rem": function () {
        var self = this;
        var schemaKey = Template.instance().data.atts['data-schema-key'];
        var currentRecords = Session.get(schemaKey + "_currentRecords");
        var newRecords = _.reject(currentRecords, function(record) {
            return (self._id == record._id);
        });
        Session.set(schemaKey + "_currentRecords", newRecords);
    }
});

