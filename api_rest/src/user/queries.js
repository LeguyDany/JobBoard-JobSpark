// Registers all the queries the user table is going to use here. It is used so that the controller won't get cramped up due to big queries or excessive amounts of queries.

const getUsers = "SELECT * FROM user_table";
const getUsersByDynamic = "SELECT * FROM user_table WHERE (firstname LIKE '%' || $1 || '%' OR lastname LIKE '%' || $2 || '%') AND location LIKE '%' || $3 || '%' AND newsletter = $4 AND user_type = $5 AND age > $6 AND age <= $7 AND reg_date > $8 AND reg_date <= $9";
const checkEmailExists = "SELECT s FROM user_table s WHERE s.user_email = $1";
const addUser = "INSERT INTO user_table (user_id, firstname, lastname, user_email, user_pwd, reg_date) VALUES ($1, $2, $3, $4, $5, $6)";
const addUID = "SELECT uuid_generate_v4();";
const checkUserExist = "SELECT s FROM user_table s WHERE s.user_id = $1";
const removeUser = "DELETE FROM user_table WHERE user_id = $1";
const getUserById = "SELECT * FROM user_table WHERE user_id = $1";
const updateUser = `UPDATE user_table 
SET firstname = $1, lastname = $2, user_pwd=$3, age=$4,location=$5, user_email=$6, user_phone=$7, user_website=$8, user_linkedin=$9, user_social=$10, newsletter=$11, resume=$12, profile_pic=$13
WHERE user_id = $14`;
const bo_updateUser = `UPDATE user_table 
SET firstname = $1, lastname = $2, age=$3, user_type=$4, wanted_work=$5, location=$6, reg_date=$7, user_email=$8, user_phone=$9, user_website=$10, user_linkedin=$11, user_social=$12, newsletter=$13, verified=$14
WHERE user_id = $15`;
const bo_addUser = `INSERT INTO user_table (user_id, firstname, lastname, user_email, user_pwd, age, user_type, wanted_work, location, reg_date, user_phone, user_website, user_linkedin, user_social, newsletter, verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`;

module.exports = {
    getUsers,
    getUsersByDynamic,
    checkEmailExists,
    addUser,
    addUID,
    removeUser,
    checkUserExist,
    updateUser,
    getUserById,
    bo_updateUser,
    bo_addUser,
}