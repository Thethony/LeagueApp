const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    rank: {
        type: String,
        required: [true, 'rank is required']
    },
    wins: {
        type: Number,
        required: [true, 'wins is required']
    },
    champion: {
        type: String,
        required: [true, 'champion is required']
    }

});
let Profile = mongoose.model('profileSchema', profileSchema);

module.exports = Profile;
