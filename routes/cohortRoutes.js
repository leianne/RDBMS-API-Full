const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');
const router = express();
const db = knex(knexConfig.development)

// MIDDLEWARE
const checkNewCohort = (req, res, next) => {
    if(req.body.name) {
        next();
    } else {
        res.status(404).json('Please add a name for the cohort!')
    }
}

// CREATE in CRUD
router.post('/', checkNewCohort, async (req, res) => {
    const cohort = req.body;
    try{
        const newCohort = await db('cohorts').insert(cohort);
        res.status(201).json({message: "cohort created!"})
    }
    catch(error){
        res.status(500).json({message: 'We are working on fixing this issue!'})
    }
})

// READ in CRUD 
router.get('/', async (req, res) => {
    try{
        const cohorts = await db('cohorts');
        if(cohorts){
            res.status(200).json(cohorts)
        } else {
            res.status(400).json({message: "There is an issue with your request... Please try again"})
        }
    }
    catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try{
        const cohort = await db('cohorts').where({id}).first()
        console.log(cohort)
        if(cohort){
            res.status(200).json(cohort)
        } else {
            res.status(404).json({message: "we cant find that cohort"})
        }
    }
    catch(error){
        res.status(500).json({message: 'We are working on fixing this issue!'})
    }
})

router.get('/:id/students', async (req, res) => {
    const id = req.params.id;
    try{
        const students = await db('students').where({ cohort_id: id})
        if(students.length > 0) {
            res.status(200).json(students)
        } else {
            res.status(400).json({message: "There are no students in this cohort"})
        }
    }
    catch(error){
        res.status(500).json({message: 'We are working on fixing this issue!'})

    }
})

// UPDATE in CRUD
router.put('/:id', async (req, res) => {
    const updates = req.body;
    const id = req.params.id;
    try{
        const updated = await db('cohorts').update(updates).where({ id })
        if(updated){
            res.status(202).json({message: 'Cohort updated!'})
        } else {
            res.status(404).json({message: 'We cant find that cohort. PLease try again'})
        }
    }
    catch(error){
        res.status(500).json({message: 'We are working on fixing this issue!'})

    }
})

// DELETE in CRUD 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const deleted = await db('cohorts').where({ id }).del()
        if(deleted){
            res.status(204).json(deleted)
        } else {
            res.status(404).json({message: 'We cant find that cohort. PLease try again'})
        }
    }
    catch(error){
        res.status(500).json({message: 'We are working on fixing this issue!'})
    }
})

module.exports = router;