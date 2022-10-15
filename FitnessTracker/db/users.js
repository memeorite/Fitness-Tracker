
const client = require("./client");


// database functions

// user functions
async function createUser({ username, password }) {
  // const SALT_COUNT = 10;
  // const hashedPassword = await bcrypt.hash(password, SALT_COUNT)


  try {
    const { rows: [user] } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password]);

    return user;
  } catch (error) { 
    console.log("Error creating user");
    }
  }


async function getUser(username, password) {
  // const user = await getUserByUsername(username);
  // const hashedPassword = user.password;
  // const isValid = await bcrypt.compare(password, hashedPassword)
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username, password
      FROM users
      WHERE username=${username} && password=${password};
      `);

      if (!user) {
        return null
      }
    
    return user;
  } catch (error) {
    console.log("Error getting user");
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT id, username, password
    FROM users
    WHERE id=${userId};
    `);

    if (!user) {
      return null
    }

    return {user};
  } catch (error) {
    console.log("Error getting user by id");
  }

}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
    `, [username]);

    return {user};
  } catch (error) {
  console.log("Error getting user by username");
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
