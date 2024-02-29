const Router = require('express')
const router = new Router()
const historyController = require('../controllers/HistoryController')

router.get('/mycomics',async (req, res) => {
    try {
        //comic tours -> comics
        const comics = await historyController.getMyComic(req, res);
        res.render('history', { comics, title: 'Added Comics', });
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            })
    }
})

router.get('/deleted',async (req, res) => {
    try {
        const comics = await historyController.getDeletedComics(req, res);
        res.render('history', { comics, title: 'Deleted comics' });
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            })
    }
})

router.get('/viewed',async (req, res) => {
    try {
        const comics = await historyController.getViewedComics(req, res);
        res.render('history', { comics, title: 'Viewed comics' });
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            })
    }
})

router.post('/viewed/:id',async (req, res) => {
    const { id } = req.params;
    await historyController.updateAction(req, res,id,'added');
    res.redirect('/history/mycomics')
})

router.post('/mycomics/:id',async (req, res) => {
    const { id } = req.params;
    await historyController.updateAction(req, res,id,'deleted');
    res.redirect('/history/mycomics')
})

module.exports = router