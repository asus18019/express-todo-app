const Router = require('express');
const router = Router();
const Item = require('../models/item');

router.get('/', async (req, res) => {
    try {
        res.json(await Item.find())
    } catch (e) {
        return res.status(400).json(e);
    }
})

router.post('/add', async (req, res) => {
    try {
        const { nickname, text, comment } = req.body;
        const itemObj = await new Item({
            nickname, date: getDate(), text, comment
        })
        await itemObj.save();
        res.json(itemObj);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.delete('/remove', async (req,res) => {
    try {
        const { id } = req.body;
        if(id.trim() === '') throw new Error();
        await Item.findByIdAndDelete(id);

        res.json({'message': 'success'});
    } catch (e) {
        return res.status(400).json(e);
    }
})

const getDate = () => {
    return new Date().toString().substring(0, 24);
}

module.exports = router;
