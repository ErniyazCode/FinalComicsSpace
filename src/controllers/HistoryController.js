const RequestHistory = require('../models/RequestHistory');
const User = require('../models/User')
const Comic = require('../models/Comic')
const mongoose = require('mongoose');

class HistoryController {
    async getComicsByAction(req, res, action) {
        try {
            const userId = req.session.userId
            const query = { user: userId, action };
            const history = await RequestHistory.find(query).populate('comic');
            const comicIds = history.map(item => item.comic);
            const comics = await Comic.find({ _id: { $in: comicIds } })
            return comics
        } catch (error) {
            res.status(500)
            .render('error', {
                title: '500 Internal server error',
                type: 'Internal server error',
                text: '',
            });
        }
    }

    async getMyComic(req, res) {
        return await this.getComicsByAction(req, res, 'added');
    }

    async getDeletedComics(req, res) {
        return await this.getComicsByAction(req, res, 'deleted');
    }

    async getViewedComics(req, res) {
        return await this.getComicsByAction(req, res, 'viewed');
    }

    async createViewedHistory(req, res,comicId) {
        const userId = req.session.userId;
        const historyDocument = await RequestHistory.create({
            action: "viewed",
            comic: new mongoose.Types.ObjectId(comicId),
            user: new mongoose.Types.ObjectId(userId)
        });
        if (userId) {
            const user = await User.findById(userId);
            if (user) {
                user.history.push(historyDocument._id);
                await user.save();
            } else {
                
                console.log("User not found.");
            }
        }
    }

    async updateAction(req, res,comicId,newAction) {
        try {
            const userId = req.session.userId;

            const historyEntry = await RequestHistory.findOne({
                user: userId,
                comic: new mongoose.Types.ObjectId(comicId),
            });

            if (!historyEntry) {
                return res.status(404).render('error', {
                    title: '404 History not found',
                    type: 'History entry not found',
                    text: '',
                });
            }

            historyEntry.action = newAction;
            await historyEntry.save();
        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }

}

module.exports = new HistoryController();
