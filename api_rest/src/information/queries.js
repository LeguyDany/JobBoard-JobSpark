// Registers all the queries the user table is going to use here. It is used so that the controller won't get cramped up due to big queries or excessive amounts of queries.

const getInformation = "SELECT * FROM information_table";
const getInformationByDynamic = `
SELECT advertisement_table.offer_name, information_table.application_date, 
user_table.firstname, user_table.lastname, company_name, work_sector
FROM information_table 
INNER JOIN user_table ON information_table.user_id = user_table.user_id 
INNER JOIN advertisement_table ON information_table.ad_id = advertisement_table.ad_id
INNER JOIN company_table ON advertisement_table.company_id = company_table.company_id
WHERE offer_name LIKE '%' || $1 || '%' 
AND company_name LIKE '%' || $2 || '%' 
AND firstname LIKE '%' || $3 || '%' 
AND lastname LIKE '%' || $4 || '%'
AND work_sector LIKE '%' || $5 || '%'
AND application_date > $6 AND application_date <= $7;
`;
const checkInformationExists = "SELECT * FROM information_table WHERE user_id = $2 AND ad_id = $1";
const addInformation = "INSERT INTO information_table (ad_id, user_id, reg_date, information_id) VALUES ($1, $2, $3, $4)";
const addUID = "SELECT uuid_generate_v4();"
const removeInformation = "DELETE FROM information_table WHERE information_id = $1";
const checkApplicationExist = "SELECT * FROM information_table WHERE information_id = $1"
const updateInformation = "UPDATE information_table SET information_name = $1, siret = $2 WHERE information_id = $3";

module.exports = {
    getInformation,
    getInformationByDynamic,
    checkInformationExists,
    addInformation,
    removeInformation,
    updateInformation,
    addUID,
    checkApplicationExist,
}