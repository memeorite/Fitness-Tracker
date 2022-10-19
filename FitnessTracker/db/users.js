const client = require("./client");
const bcrypt = require('bcrypt');


// database functions

// user functions

async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const { rows: [user] } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username;
    `, [username, hashedPassword]);

    return user;
  } catch (error) {
    console.log("Error creating user");
  }
}


async function getUser( username, password ) {
  // const SALT_COUNT = 10;
  
  if (!username || !password) return
  try {
    const user = await getUserByUsername(username, password);
    // if (!user) return
    // const user = await createUser(password, username);
    // if (!password) return
    // if (!username || !password) return
    
    const hashedPassword = user.password
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    }  else {
      return null;
    }

  } catch (error) {
    console.log(error)
    throw error;
  }
}

async function getUserById(id) {
  // const user = await getUserById(id);

  try {
    const { rows:user } = await client.query(`
    SELECT id, password
    FROM users
    WHERE id = ${id}
    `);

    if(!user) {
      return null
    } else {
      delete user.password;
      return user;
    }

  } catch (error) {
    console.log("Error getting user by id");
  }
}
  

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT username
    FROM users
    WHERE username=$1;
    `[username]);

    return user;
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
