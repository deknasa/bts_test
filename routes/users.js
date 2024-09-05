const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth').verify   
const userController = require('../controllers/users.controller')
const checklistController = require('../controllers/checklist.controller')
const checklistItemController = require('../controllers/checklistItem.controller')


router.post('/register', userController.register)
router.post('/login', userController.login)

router.post('/checklist', auth, checklistController.createNewChecklist)
router.get('/checklist', auth, checklistController.getAllChecklist)
router.delete('/checklist/:checklistId', auth, checklistController.deleteChecklistById)

router.post('/checklist/:checklistId/item', auth, checklistItemController.createNewChecklistItem)
router.get('/checklist/:checklistId/item', auth, checklistItemController.getAllChecklistitem)
router.get('/checklist/:checklistId/item/:checklistItemId', auth, checklistItemController.getChecklistItemInChecklist)
router.delete('/checklist/:checklistId/item/:checklistItemId', auth, checklistItemController.deleteChecklistItem)
router.put('/checklist/:checklistId/item/:checklistItemId', auth, checklistItemController.updateStatusChecklistItem)
router.put('/checklist/:checklistId/item/:checklistItemId', auth, checklistItemController.renameChecklistItem)



module.exports = router