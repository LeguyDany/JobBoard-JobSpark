const getUserInfo = `SELECT user_id, user_email, user_type FROM user_table WHERE user_email = $1 AND user_pwd=$2;`;

module.exports = {
    getUserInfo,
};