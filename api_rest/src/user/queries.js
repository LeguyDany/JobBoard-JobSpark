// Registers all the queries the user table is going to use here. It is used so that the controller won't get cramped up due to big queries or excessive amounts of queries.

const getUsers = "SELECT * FROM user_table";
const getUsersByName = "SELECT * FROM user_table WHERE firstname = $1";
const checkEmailExists = "SELECT s FROM user_table s WHERE s.user_email = $1"
const addUser = "INSERT INTO user_table (user_id, firstname, lastname, user_email, user_pwd, reg_date) VALUES ($1, $2, $3, $4, $5, $6)";
const addUID = "SELECT uuid_generate_v4();"
const checkUserExist = "SELECT s FROM user_table s WHERE s.user_id = $1"
const removeUser = "DELETE FROM user_table WHERE user_id = $1";
const updateUser = "UPDATE user_table SET firstname = $1, lastname = $2 WHERE user_id = $3";

module.exports = {
    getUsers,
    getUsersByName,
    checkEmailExists,
    addUser,
    addUID,
    removeUser,
    checkUserExist,
    updateUser,
}