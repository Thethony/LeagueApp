const Profile = require('../Models/Profile.js');
async function SaveProfile(name, rank, wins, champion) {
    let obj = new Profile({
        name: name,
        rank: rank,
        wins: wins,
        champion: champion
    });
    await obj.save();
}
async function EditProfile(id, name, rank, wins, champion) {
    const filter = { _id: id };
    const update = {
        name: name,
        rank: rank,
        wins: wins,
        champion: champion
    };
    await Profile.findOneAndUpdate(filter, update);
}
async function GetProfile(id) {
    let profile = await Profile.findOne({ _id: id }).exec();
    return profile;
}

async function GetAllProfiles() {
    let profiles = await Profile.find({}).exec();
    return profiles;
}
async function DeleteProfile(id) {
    await Profile.findOneAndRemove({ _id: id }).exec();
}

module.exports = {
    SaveProfile,
    GetProfile,
    GetAllProfiles,
    EditProfile,
    DeleteProfile
};