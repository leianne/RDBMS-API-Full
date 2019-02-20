const express = require('express');
const router = express();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

// MIDDLEWARE
const checkNewStudent = (req, res, next) => {
    if(req.body.name && req.body.cohort_id){
        next()
    } else {
        res.status(404).json({message: 'Please enter a valid name and cohort id'})
    }
}

// CREATE in CRUD
router.post('/', checkNewStudent, async (req, res) => {
    const cohort_id = req.body.cohort_id;
    const student = req.body;
    try {
        const cohort = await db('cohorts').where({ id: cohort_id }).first();
        if(cohort) {
            const newStudent = await db('students').insert(student)
            if(newStudent){
                res.status(202).json({message: 'student created'})
            } else {
                res.status(404).json({message: "There is an issue with the info you entered... Please try again"})
            }
        }else{
            res.status(404).json({message: "We cannot find that cohort! Please enter a valid cohort id"})
        }
    }
    catch(error) {
        res.status(500).json({message: 'We are working on fixing this issue!'})
    }
})

// READ in CRUD
router.get('/', async (req, res) => {
    try{
        const students = await db('students')
        if(students.length > 0){
            res.status(200).json(students)
        } else {
            res.status(404).json({message: "there are no students in the database"})
        }
    }
    catch(error) {
        res.status(500).json({message: 'We are working on fixing this issue!'})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const student = await db('students').where({ id }).first();
        if(student) {
            res.status(200).json(student)
        } else {
            res.status(404).json({ message: 'We can\'t find that student'})
        }
    }
    catch(error){
        res.status(500).json({message: 'We are working on fixing this issue!'})
    }
})


module.exports = router;