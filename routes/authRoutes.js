const { Router } = require('express');
const authController = require('../controllers/authController')
const {requireAuth} = require('../middleware/authMiddleware')


const router = Router();

router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);

//course:
router.get('/pycourse',authController.pycourse_get);
router.get('/fecourse',authController.fecourse_get);
router.get('/jcourse',authController.jcourse_get);


//profile:
router.get('/profile',authController.profile_get);
router.put('/profile',authController.profile_put);

router.get('/addtask',requireAuth, authController.addtask_get);
router.post('/addtask',requireAuth, authController.addtask_post);

router.delete('/usertasks/:id',authController.delete_task);
router.put('/usertasks/:id',authController.update_task);

module.exports = router;