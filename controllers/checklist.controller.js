const Checklist = require('../models/index').Checklist

exports.createNewChecklist = async (req, res) => {
    const { name } = req.body
    const user_id = req.id
    console.log(req.id);

    await Checklist.create({ 
        name: name,
        user_id: user_id
    })
    .then(result => {
        res.status(201).send({
            checklist_data: {
                name: name,
            },
        })
    })
    .catch(e => {
        res.status(403).send({ message: "FAILED TO ADD CHECKLIST", error: e.message })
    })
}

exports.getAllChecklist = async (req, res) => {
    await Checklist.findAll({ attributes: ['id','name', 'user_id'] }) 
    .then(results => {
        res.status(200).json({ results })
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}

exports.deleteChecklistById = async (req, res) => {
    const checklistId = req.params.checklistId

    await Checklist.findOne({  where: {id: checklistId} })
    .then(check => {
        if (check == null) {
            return res.status(400).send({ message: "checklist id not found!" })
        }

        Checklist.destroy({ where: { id: checklistId } })
        .then(() => {
            res.status(200).send({
                message: "Berhasil menghapus checklist.",
            });
        }).catch()
    })
    .catch(e => {
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            e: e.message
        })
    })
}