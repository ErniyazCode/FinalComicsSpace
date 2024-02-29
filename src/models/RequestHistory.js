const mongoose = require('mongoose')
const Schema = mongoose.Schema
const requestHistorySchema = new Schema({
    action: {
        type: String,
        enum: ['viewed', 'added', 'deleted'],
        required: true,
    },
    comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comic', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added user reference
    requestDate: { type: Date, default: Date.now },
});

requestHistorySchema.pre('save', async function(next) {
    next();
});

const RequestHistory = mongoose.model('RequestHistory', requestHistorySchema);
module.exports = RequestHistory;
