const ChecklistItem = require('../models/index').ChecklistItem
const Checklist = require('../models/index').Checklist
const User = require('../models/index').User

exports.createNewChecklistItem = async (req, res) => {
    const itemName = req.body.itemName
    const checklistId = req.params.checklistId    

    await ChecklistItem.create({ 
        itemName: itemName,
        checklist_id: checklistId
    })
    .then(result => {
        res.status(201).send({
            checklist_item_data: {
                itemName: itemName,
            },
        })
    })
    .catch(e => {
        console.log(e);
        
        res.status(403).send({ message: "FAILED TO ADD CHECKLIST", error: e.message })
    })
}

exports.getAllChecklistitem = async (req, res) => {
    const checklistId = req.params.checklistId    

    await Checklist.findOne({ where: {id: checklistId} }) 
    .then(results => {
        return ChecklistItem.findAll()
        .then(results => {
            res.status(200).json({ results })
        })
        .catch(error => {
            res.status(500).json({
                message: "INTERNAL SERVER ERROR",
                error: error.message
            })
        })
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}

exports.getChecklistItemInChecklist = async (req, res) => {
    const checklistId = req.params.checklistId    
    const checklistItemId = req.params.checklistItemId    

    await Checklist.findOne({ where: {id: checklistId} }) 
    .then(results => {
        return ChecklistItem.findOne({ where: {id: checklistItemId} })
        .then(results => {
            res.status(200).json({ results })
        })
        .catch(error => {
            res.status(500).json({
                message: "INTERNAL SERVER ERROR",
                error: error.message
            })
        })
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}

exports.deleteChecklistItem = async (req, res) => {
    const checklistId = req.params.checklistId    
    const checklistItemId = req.params.checklistItemId    

    await Checklist.findOne({ where: {id: checklistId} }) 
    .then(results => {
        return ChecklistItem.destroy({ where: { id: checklistItemId } })
        .then(() => {
            res.status(200).send({
                message: "Berhasil menghapus checklist item.",
            });
        }).catch()
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}

exports.updateStatusChecklistItem = async (req, res) => {
    const checklistId = req.params.checklistId    
    const checklistItemId = req.params.checklistItemId  
    const status = req.body.status  

    await Checklist.findOne({ where: {id: checklistId} }) 
    .then(results => {
        return ChecklistItem.update({ status: status }, {
            where: { id: checklistItemId },
            returning: true
        }).then().catch()
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}

exports.renameChecklistItem = async (req, res) => {
    const checklistId = req.params.checklistId    
    const checklistItemId = req.params.checklistItemId  
    const itemName = req.body.itemName
 

    await Checklist.findOne({ where: {id: checklistId} }) 
    .then(results => {
        return ChecklistItem.update({ itemName: itemName }, {
            where: { id: checklistItemId },
            returning: true
        }).then().catch()
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}
