Meteor.methods({
    getImage({_id}){
        let img = Images.findOne(_id);
        return img;
    }
});