/**
 * Created by stevenkehoe on 3/16/16.
 */

Meteor.methods({
   setupAfSearchSource: function(sourceSettings){
       function buildRegExp(searchText) {
           // this is a dumb implementation
           var parts = searchText.trim().split(/[ \-\:]+/);
           return new RegExp("(" + parts.join('|') + ")", "ig");
       }

       SearchSource.defineSource(sourceSettings.sourceName, function(searchText, options) {

           if(searchText) {
               var regExp = buildRegExp(searchText);
               var fieldArray = [];
               _.each(sourceSettings.fields, function(field){
                   var newSearchField = {};
                   newSearchField[field] = regExp;
                   fieldArray.push(newSearchField);
               });

               var selector = {$or: fieldArray};

               return global[sourceSettings.collectionName].find(selector, options).fetch();
           } else {
               return [];
           }
       });
   }
});

