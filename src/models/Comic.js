// city -name hotel-desc

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const comicSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RequestHistory',
        },
    ],
});

comicSchema.pre('save', async function(next) {
    next();
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;
