const Router = require('express')
const router = new Router()
// TourController -> ComicController
const comicController = require('../controllers/ComicController')
const historyController = require('../controllers/HistoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/',async (req, res) => {
	try {
        const data = await comicController.getAll(req,res)
        data.title = "Travel"
        console.log(data)
        res.render('destinations', data )
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

// tour -> comic
router.get('/:id',checkRoleMiddleware('User'), async (req, res) => {
    try {
        const { id } = req.params;
        await historyController.createViewedHistory(req, res,id);
        const comic = await comicController.getOne(req, res);
        res.render('comic', { comic, title: 'Destinations' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: '500 Internal Server Error',
            type: '500 Server Error',
            text: 'Something went wrong.',
        });
    }
});

router.post('/:id',checkRoleMiddleware('User'), async (req, res) =>{
    const { id } = req.params;
    console.log(req.params);
    await historyController.updateAction(req, res,id,'added');
})


module.exports = router