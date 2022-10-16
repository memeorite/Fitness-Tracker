const { application } = require('express');
const express = require('express');
const router = express.Router();

const { getRoutines, getRoutinesById, getAllPublicRoutines } = require('../db')

// GET /api/routines
router.get('./routines',(req, res)=> {
    res.send(getAllPublicRoutines)
})
// POST /api/routines
router.post('./routines', async (req,res,next)=> {


})
// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
