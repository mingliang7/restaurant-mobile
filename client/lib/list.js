Meteor.subscribe('tags');
Meteor.subscribe('categories');
List = {
    categories(){
        let list = [];
        Categories.find().forEach((category)=> {
            list.push({label: category.name, value: category._id});
        });
        return list;
    },
    tags(){
        let list = [];
        let tags = Reading.Collection.Tags.find();
        tags.forEach((tag)=> {
            list.push({label: tag.name, value: tag._id});
        });
        return list;
    },
    tagsByCategory(){
        let categories = Session.get('interestCategories')
        let list = [];
        if (!_.isEmpty(categories)) {
            for (let k in categories) {
                let category = Categories.findOne(categories[k]);
                for (var i = 0; i < category.tag.length; i++) {
                    let tag = Reading.Collection.Tags.findOne(category.tag[i]);
                    list.push({label: tag.name, value: tag._id});
                }
            }
        }
        return list;
    }
};
