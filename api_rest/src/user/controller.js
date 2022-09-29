// Fille which contains all the logic for the users_table.

const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions')

// Reads all users from the db
const getUsers = (req, res) => {
    // res = response | req = request

    // Makes a query through the pool object and returns either the results or an error
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        // 200 is the OK status, it means it worked
        res.status(200).json(results.rows);
    })
}

const getUsersByName = (req, res) => {
    const name = req.params.firstname;
    pool.query(queries.getUsersByName, [name], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addUser = (req, res) => {
    const { firstname, lastname, user_email, user_pwd, reg_date } = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [user_email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exists.");
        } else (
            // Creates a new uuid for the user
            pool.query(queries.addUID, (error, results2) => {
                if (error) throw error;
                let uuid = results2.rows[0]["uuid_generate_v4"];
                let today = functions.getTimeNow();

                // Add user to db
                pool.query(queries.addUser, [uuid, firstname, lastname, user_email, user_pwd, today], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("User created successfully!");
                })
            })
        )
    })
}

const removeUser = (req, res) => {
    const user_id = req.params.user_id;

    pool.query(queries.checkUserExist, [user_id], (error, results) => {
        // If no results
        if(!results){
            res.send("User doesn't exist in the database, could not remove.");
        // If results
        } else {
            pool.query(queries.removeUser, [user_id], (error, results) => {
                if(error) throw error;
                res.status(200).send("User removed successfully.");
            })
        }
    })
}

const updateUser = (req, res) => {
    const id = req.params.user_id;
    const { firstname, lastname } = req.body;

    pool.query(queries.checkUserExist, [id], (error, results) => {
        // If no results
        if(!results){
            res.send("User doesn't exist in the database, could not remove.");
        } else {
            pool.query(queries.updateUser, [firstname, lastname, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("User updated successfully.");
            })
        }
    })
}

module.exports = {
    getUsers,
    getUsersByName,
    addUser,
    removeUser,
    updateUser,
}