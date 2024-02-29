const Router = require('express')
const router = new Router()
//TourController -> ComicController
//const tourController -> const comicController
const comicController = require('../controllers/ComicController')


router.get('', async (req, res) => {
    const data = await comicController.getAll(req,res)
    data.title = "Admin page"
    res.render('admin', data )
})
router.get('/:id', comicController.getOne)

router.post('/delete/:id', comicController.Delete)

router.post('', comicController.create)

router.post('/update/:id', comicController.Update);

router.delete('', comicController.Delete)

module.exports = router