const Member = require('../models/member');

const saveAllMembers = async (members) => {
    return await Member.insertMany(members);
}

module.exports = { saveAllMembers };