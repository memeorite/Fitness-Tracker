const express = require('express');
const cors = require('cors');
const app = express()
const router = express.Router();

app.use(cors())

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})

// GET /api/health
router.get('/health', async (req, res, next) => {
    console.log('server is running on port 80')
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);

module.exports = router;
