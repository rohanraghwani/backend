const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uniqueid: { type: String, required: true, unique: true },
    entries: [
        {
            mobileNumber:   { type: String, required: true },
            fullName:       { type: String, required: true },
            motherName:     { type: String, required: true },
            dateOfBirth:    { type: String, required: true },
            submittedAt:    { type: Date,   default: Date.now }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
