// const activities = require('./activities');
const client = require('./client');
// const routines = require('./routines');

async function getRoutineActivityById(id) {
  try {
    const { rows: [routine_activity] } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE routines.id=$1;
    `, [id]);

    return routine_activity;
  } catch (error) {
    console.log("Error getting routine activity by id")
    throw error;
  }
}


//removed the brackets around rows: routine_activity.  It did not call for an array
async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: routine_activity } = await client.query(`
    INSERT INTO routine_activities ("routineId", "activityId", count, duration)
    VALUES($1, $2, $3, $4)
    RETURNING *; 
    `, [routineId, activityId, count, duration]);
console.log("logging",routine_activity);
    return routine_activity;
  } catch (error) {
    console.log("Error adding activity to routine")
  }
}

//removed brackets from rows: routine_activity
async function updateRoutineActivity({ id, ...fields }) {
  // let { routine_activities } = fields;
  //  delete fields.routine_activities;

  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }
  try {
    const { rows: routine_activity } = await client.query(`
      UPDATE routine_activities
      SET &{setString}
      WHERE id=${id}
      RETURNING *;
      `, Object.values(fields));


    // if (routine_activities === undefined) {
    //   return await getRoutineById(id);
    // }

    // const routine_activityList = await getAllRoutine_activities(routine_activities);
    //   routineList.map(
    //   routine => `${routine.id}`
    // ).join(', ');
    return routine_activity;
  } catch (error) {
    console.log("Error updating routine")
    throw error
  }
}

//removed brackets from rows: routine_activities
async function destroyRoutineActivity(id) {
  try {
    const { rows: routine_activities } = await client.query(`
    DELETE FROM routine_activities
    WHERE id = $1;
    RETURNING *
    `, [id]);

    return routine_activities;
  } catch (error) {
    console.log("Error destroying routine activity")
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  const { rows: [routine_activities] } = await client.query(`
    SELECT *
    FROM routine_activities
    JOIN routines ON routine_activities.routineId = routines.id AND routine_activities.id = $1
    `, [routineActivityId]);

  return routine_activities.creatorId === userId;
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};