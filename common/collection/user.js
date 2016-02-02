
interestSchema = new SimpleSchema({

});

userSubProfileSchema = new SimpleSchema({

    interest: {
        type: Object,
        optional: true,
        label: 'Interested In'
    },
    "interest.category": {
        type: [String],
        optional: true,
        autoform: {
            label: false,
            type: 'select-checkbox-inline',
            multiple: true,
            options(){
                return List.categories();
            }
        }
    },
    tags: {
        type: [String],
        optional: true,
        autoform: {
            type: 'tagsTypeahead'
        }
    }
});

UserSchema = new SimpleSchema({
    profile: {
        type: userSubProfileSchema,
        optional: true
    }
});