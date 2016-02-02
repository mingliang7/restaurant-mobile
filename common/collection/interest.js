
InterestSchema = new SimpleSchema({
    profile: {
        type: Object,
        optional: true
    },
    "profile.interest": {
        type: Object,
        optional: true,
        label: 'Interested In'
    },
    "profile.interest.category": {
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
    "profile.tags": {
        type: [String],
        optional: true,
        autoform: {
            type: 'select-checkbox',
            options(){
                return List.tagsByCategory();
            }
        }
    }
});