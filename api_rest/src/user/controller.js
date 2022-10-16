// Fille which contains all the logic for the users_table.

const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions')
const bcrypt = require('bcrypt');

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

const getUsersByDynamic = (req, res) => {
    const { firstname, lastname, location, newsletter, user_type, age_min, age_max, reg_date_min, reg_date_max } = req.query;

    pool.query(queries.getUsersByDynamic, [firstname, lastname, location, newsletter, user_type, age_min, age_max, reg_date_min, reg_date_max], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addUser = (req, res) => {
    const { firstname, lastname, user_email, user_pwd } = req.body;

    bcrypt.hash(user_pwd, 10, (error, result) => {
        const hashed_pass = result;

        // check if email exists
        pool.query(queries.checkEmailExists, [user_email], (error, results) => {
            if (results.rows.length) {
                res.send("Email already exists.");
            } else (
                // Creates a new uuid for the user
                pool.query(queries.addUID, (error, results) => {
                    if (error) throw error;
                    let uuid = results.rows[0]["uuid_generate_v4"];
                    let today = functions.getTimeNow();

                    // Add user to db
                    pool.query(queries.addUser, [uuid, firstname, lastname, user_email, hashed_pass, today], (error, results) => {
                        if (error) throw error;
                        res.status(201).send("User created successfully!");
                    })
                })
            )
        })
    });
}

const removeUser = (req, res) => {
    const user_id = req.params.user_id;

    pool.query(queries.checkUserExist, [user_id], (error, results) => {
        // If no results
        if (!results) {
            res.send("User doesn't exist in the database, could not remove.");
            // If results
        } else {
            pool.query(queries.removeUser, [user_id], (error, results) => {
                if (error) throw error;
                res.status(200).send("User removed successfully.");
            })
        }
    })
}

const updateUser = (req, res) => {
    try {
        const id = req.params.user_id;
        const { firstname, lastname, user_pwd, age, location, user_email, user_phone, user_website, user_linkedin, user_social, newsletter } = req.body;
        const { profile_pic, resume } = req.files;

        if (resume.size > 5000000) return res.status(413).send("File too large.");
        if (profile_pic.size > 1000000) return res.status(413).send("Image too large.");


        pool.query(queries.checkUserExist, [id], (error, results) => {
            // If no results
            if (!results) {
                res.send("User doesn't exist in the database, could not update.");
            } else {
                pool.query(queries.updateUser, [firstname, lastname, user_pwd, age, location, user_email, user_phone, user_website, user_linkedin, user_social, newsletter, resume.data, profile_pic.data, id], (error, results) => {
                    if (error) throw error;
                    res.status(200).send("User updated successfully.");
                })
            }
        })
    } catch (error) {
        res.status(400).send("Error: " + error);
    }

}

const getUserById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) return res.status(400).send("An error has occured:" + error);
        if (!results.rows.length) return res.send("No user with this id.")
        return res.status(200).send(results.rows);
    });
}

const bo_updateUser = (req, res) => {
    const id = req.params.id;
    // Convert strings without content or with a default "null" content to a null value.
    for (const item in req.body) {
        if (req.body[item] == "null" || req.body[item] == "") req.body[item] = null
    }
    const { user_id, firstname, lastname, age, user_type, wanted_work, location, reg_date, user_email, user_phone, user_website, user_linkedin, user_social, newsletter, verified } = req.body;

    pool.query(queries.checkUserExist, [id], (error, results) => {
        // If no results
        if (!results) {
            res.send("User doesn't exist in the database, could not update.");
        } else {
            pool.query(queries.bo_updateUser, [firstname, lastname, age, user_type, wanted_work, location, reg_date, user_email, user_phone, user_website, user_linkedin, user_social, newsletter, verified, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("User updated successfully.");
            })
        }
    })
}
const bo_addUser = (req, res) => {

    // Convert strings without content or with a default "null" content to a null value.
    for (const item in req.body) {
        if (req.body[item] == "null" || req.body[item] == "") req.body[item] = null
    }

    const { firstname, lastname, user_email, user_pwd, age, user_type, wanted_work, location, reg_date, user_phone, user_website, user_linkedin, user_social, newsletter, verified } = req.body;

    bcrypt.hash(user_pwd, 10, (error, result) => {
        const hashed_pass = result;

        // check if email exists
        pool.query(queries.checkEmailExists, [user_email], (error, results) => {
            if (results.rows.length) {
                res.send("Email already exists.");
            } else (
                // Creates a new uuid for the user
                pool.query(queries.addUID, (error, results) => {
                    if (error) throw error;
                    let uuid = results.rows[0]["uuid_generate_v4"];
                    let today = functions.getTimeNow();

                    // Add user to db
                    pool.query(queries.bo_addUser, [uuid, firstname, lastname, user_email, hashed_pass, age, user_type, wanted_work, location, today, user_phone, user_website, user_linkedin, user_social, newsletter, verified], (error, results) => {
                        if (error) throw error;
                        res.status(201).send("User created successfully!");
                    })
                })
            )
        })
    });
}

module.exports = {
    getUsers,
    getUsersByDynamic,
    addUser,
    removeUser,
    updateUser,
    getUserById,
    bo_updateUser,
    bo_addUser,
}