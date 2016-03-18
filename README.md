#autoform-relations#

###Description###
Adds a custom input type called "relation" to the [Aldeed's meteor-autoform](https://github.com/aldeed/meteor-autoform) package for when we need to add a reference to a document (or documents) in another collection. Includes an integration with [meteorhacks:searchsource](https://github.com/meteorhacks/search-source) to provide full text search capabilities.

###Usage###
```
meteor add skehoe1989:autoform-relations
```

Add the 'relation' input type to the autoform property in your collection's SimpleSchema:

![autoform-relations](https://raw.githubusercontent.com/oohaysmlm/autoform-relations/master/readme/autoform-relations.png)

```javascript
CoursesSchema = new SimpleSchema({
    'title': {
        type: String
    },
    'category' : {
      type: String
    },
    'classes' : {
      type: [String],
        autoform: {
            type: 'relation',
            settings: {
                collection: 'Classes',
                fields: ['title', 'description'],
                options: {
                    keepHistory: 1000 * 60 * 5,
                    localSearch: true
                }
            }
        }
    },
    'instructor': {
        type: String,
        optional: true
    },
    'description': {
        type: String,
        optional:true,
        autoform: {
            rows: 20,
            type: 'markdown'
        }
    }

});
```

### Settings Explained ###
#####collection##### - The name of the collection you want to search/add document references from.
#####fields##### - An array of field names from the collection specified that you want to search over.  Passes through to [meteorhacks:searchsource](https://github.com/meteorhacks/search-source)
#####options##### - Options to be passed to [meteorhacks:searchsource](https://github.com/meteorhacks/search-source) that can enable search caching, local search, and paged results.

Maintained by [BitTiger](http://bittiger.io)


![BitTiger Logo](https://raw.githubusercontent.com/oohaysmlm/autoform-relations/master/readme/small_logo.png)
