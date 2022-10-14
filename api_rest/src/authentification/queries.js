const getUserInfo = `SELECT user_id, user_email, user_type, verified FROM user_table WHERE user_email = $1 AND user_pwd=$2;`;
const updateUserPass = 'UPDATE user_table SET user_pwd = $1 WHERE user_email = $2;'
const checkEmail = 'SELECT user_email, user_id FROM user_table WHERE user_email = $1;'
const addUID = "SELECT uuid_generate_v4(), user_id FROM user_table WHERE user_email = $1;"
const addInformation = "INSERT INTO information_table (reg_date, information_id, subject, user_id) VALUES ($1, $2, $3, $4)";
const verify = "UPDATE user_table SET verified = 'true' WHERE user_email = $1;"
const verifyPass = "SELECT user_pwd FROM user_table WHERE user_email = $1";
const checkUserType = "SELECT user_type FROM user_table WHERE user_id = $1"

module.exports = {
    getUserInfo,
    updateUserPass,
    checkEmail,
    addUID,
    addInformation,
    verify,
    verifyPass,
    checkUserType
};