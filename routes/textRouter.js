const router = require('express').Router()
const TextController = require('../controllers/textController')
const { authentication, authorization } = require('../middlewares/auth')

router.post('/', authentication, TextController.create)
router.get('/', authentication, TextController.showAll)
router.get('/:id', authentication, TextController.showOne)
router.delete('/:id', authentication, authorization, TextController.delete)

module.exports = router
