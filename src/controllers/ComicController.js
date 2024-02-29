const Comic = require("../models/Comic");

class  ComicController{
    async create(req,res){
        try {   
            const newComic ={
                name: req.body.city || '',
                desc: req.body.hotel || '',
                price: req.body.price || 20,
                img1: req.body.img1 || '',
                img2: req.body.img2 || '',
                img3: req.body.img3 || '',

            };
            console.log(newComic)
            const savedComic = await Comic.create(newComic);
            res.redirect('/admin')
        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: 'Internal Server Error',
                text: 'Error adding comic:',
            });
        }
    }
    async getAll(req,res){
        const page = req.query.p || 1
        const limit = req.query.l || 3
	    let offset = (page - 1) * limit
		let query = {}
        const comics = await Comic.find(query).skip(offset).limit(limit)
        const totalCount = await Comic.countDocuments(query)
        const totalPages = Math.ceil(totalCount / limit)
		return {
            totalCount,
            totalPages,
            comics,
            currentPage: parseInt(page),
            limit: limit,
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).render('error', {
                    title: '400 Bad Request',
                    type: '400 Bad Request',
                    text: 'Comic ID is required.',
                });
            }

            const comic = await Comic.findOne({_id: id});

            if (!comic) {
                return res.status(404).render('error', {
                    title: '404 Not Found',
                    type: '404 Not Found',
                    text: 'Comic not found.',
                });
            }

            return comic;

        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }

    async Update(req,res){
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).render('error', {
                    title: '400 Comic ID is required',
                    type: 'Comic ID is required',
                    text: '',
                });
            }
            let updateData = req.body;

            // Check if `children` is an array and handle accordingly
            if (Array.isArray(updateData.children)) {
                updateData.children = updateData.children.map(Number).find(n => !isNaN(n));
            }

            const updatedComic = await Comic.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedComic) {
                return res.status(404).render('error', {
                    title: '404 Page not found',
                    type: 'Comic not found.',
                    text: '',
                });
            }
            res.redirect('/admin');

        } catch (error) {
            console.error(error);
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }
    async Delete(req,res){
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).render('error', {
                    title: '404 Bad request',
                    type: 'Comic ID is required',
                    text: '',
                });
            }

            const deletedComic = await Comic.findByIdAndDelete(id);

            if (!deletedComic) {
                return res.status(404).render('error', {
                    title: '404 Page not found',
                    type: 'Comic not found.',
                    text: '',
                });
            }

            res.redirect('/admin');

        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }

}

module.exports = new ComicController()