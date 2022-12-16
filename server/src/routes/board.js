const router = require('express').Router()
const tokenHandler = require('../handlers/tokenHandler')
const boardController = require('../controllers/board')

router.post(
    '/',
    tokenHandler.verifyToken,
    boardController.create
)

router.get(
    '/',
    tokenHandler.verifyToken,
    boardController.getAll
)

module.exports = router