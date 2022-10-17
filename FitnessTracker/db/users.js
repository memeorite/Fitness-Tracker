
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


async function getUser(username, password) {
  // if (!username || !password) return
  try {
    const { rows: [user] } = await client.query(`
    SELECT username, password
    FROM users
    `);
    // const user = await getUserByUsername(username);
    // if (!user) return
    const hashedPassword = user.password;
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

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT id, username, password
    FROM users
    WHERE id = ${userId};
    `);

    if(!user) {
      return null
    }
    // const user = await getUserById(userId);
    // if (!user) return
    // const hashedPassword = user.password;
    // const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    // if (passwordsMatch) {
    //   delete user.password;
    //   return user;
    // } else {
    //   return;
    // }
    return user;
  } catch (error) {
    console.log("Error getting user by id");
  }
}
  // try {
  //   const { rows: [user] } = await client.query(`
  //   SELECT id, username, password
  //   FROM users
  //   WHERE id=${userId};
  //   `);

  //   if (!user) {
  //     return null
  //   }

  //   return (user, password);
  // } catch (error) {
  //   console.log("Error getting user by id");
  // }

// }

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
    `, [username]);

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
