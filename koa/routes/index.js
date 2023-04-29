const router = require('koa-router')()
const user = require('../controllers/user');


router.get('/hello',user.hello);
router.get('/user', user.user);

module.exports = router;
