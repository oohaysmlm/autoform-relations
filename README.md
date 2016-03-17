#autoform-relations#

###Description###
Adds a custom input type called "relation" to the [Aldeed's meteor-autoform](https://github.com/aldeed/meteor-autoform) package for when we need to add a reference to a record (or records) in another collection. Includes an integration with [meteorhacks:searchsource](https://github.com/meteorhacks/search-source) to provide full text search capabilities.

###Usage###
```
meteor add skehoe1989:autoform-relations
```

Add the 'relation' input type to the autoform property in your collection's SimpleSchema:


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

Maintained by [BitTiger](http://bittiger.io)


![BitTiger Logo](https://raw.githubusercontent.com/oohaysmlm/autoform-tinymce/master/readme/small_logo.png)
