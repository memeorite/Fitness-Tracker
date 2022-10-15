const client = require("./client")

// database functions

//added  const allActivitiesArray because it is supposed to reutn an array of all activities
async function getAllActivities() {
  // const allActivitiesArray = [...activities];
  try {
    const { rows:allActivitiesArray } = await client.query(`
    SELECT *
    FROM activities
`);
    return allActivitiesArray;
  } catch (error) {
    console.log("Error getting activities")
    throw error;
  }
}

async function getActivityById(activityId) {
  try {
    const { rows: [activity] } = await client.query(`
    SELECT *
    FROM activities
    WHERE id=$1
    `, [activityId]);

    return activity;
  } catch (error) {
    console.log("Error getting activity by Id")
    throw error;
  }
}
async function getActivityByName(name) {
  try {
    const { rows: [activity] } = await client.query(`
    SELECT *
    FROM activities
    WHERE name=$1
    `, [name]);

    return activity;
  } catch (error) {
    console.log("Error getting activity by name")
    throw error;
  }
}
// select and return an array of all activities
async function attachActivitiesToRoutines(routines) {
  const routineArray = [...routines];
  const attach = routines.map((routine) => routine.id);
  if (routines.length === 0) {
    return;
  }

  try {
    const { rows: [activities] } = await client.query(`
    SELECT activities.*, routine_activities.duration, routine_activities.count,
    routine_activities.id AS routineActivityId, routine_activities.routineId
    FROM activities
    JOIN routine_activities ON routine_activities.activityId = activities.id
    WHERE routine_activities.routineId IN (${attach});
    `, routines);
    for (const routine of routineArray) {
      const addActivities = activities.filter((activity) => routine.id === activity.routineId);
      routine.activities = addActivities;
    }

    return routineArray;
  } catch (error) {
    console.log("Error attaching activities to routines")
    throw error;
  }
}

// return the new activity
// added const newActivity so I could return newActivity
async function createActivity({ name, description }) {
  // const newActivity = [...createActivity];
  try {
    const { rows: [newActivity] } = await client.query(`
    INSERT INTO activities(name, description)
    VALUES($1, $2)
    ON CONFLICT(name) DO NOTHING
    RETURNING *
    `, [name, description]);

    return newActivity;
  } catch (error) {
    console.log("Error creating activity")
    throw error;
  }
}

// don’t try to update the id
// do update the name and description
// return the updated activity
//The instructions had id listed, just not updated, so I put it in
// I also added the const updatedActivity so I could return it
async function updateActivity({ id, name, description }) {
  // const updatedActivity = [...updateActivity];
  try {
    const { rows: [updatedActivity] } = await client.query(`
    UPDATE activities
    SET name = $2, description = $3
    WHERE id = $1
    RETURNING *
      `, [id, name, description]);
    return updatedActivity;
  } catch (error) {
    console.log("Error updating activity");
    throw error;
  }
}
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}