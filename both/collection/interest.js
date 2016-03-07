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
    },


    approved: {
        type: Boolean,
        label: "មានសិទ្ធិ",
        optional: true
    },
    username: {
        optional: true,
        type: String,
        label: 'ឈ្មោះអ្នកប្រើប្រាស់',
        unique: true,
        min: 3
    },
    email: {
        type: String,
        label: 'អ៊ីម៉ែល',
        unique: true,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    password: {
        type: String,
        label: "លេខសំងាត់",
        min: 6
    },
    confirmPassword: {
        type: String,
        label: "បញ្ជាក់លេខសំងាត់",
        min: 6,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        }
    },
    roles: {
        type: [String],
        label: "តួនាទី",
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: function () {
                return Restaurant.List.roles();
            }
        }
    }

});