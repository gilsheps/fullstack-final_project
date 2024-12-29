const Member = require('../models/membersModel');

const saveAllMembers = async (members) => {
    return await Member.insertMany(members);
}

module.exports = { saveAllMembers };