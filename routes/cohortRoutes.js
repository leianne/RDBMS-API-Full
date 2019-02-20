const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');
const router = express();
const db = knex(knexConfig.development)

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

module.exports = router;