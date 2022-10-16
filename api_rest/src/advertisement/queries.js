// Same as always, give the controller.js room to be readable and not cramped up with queries.

const getOffer = `SELECT advertisement_table.*, company_table.company_name, company_table.n_employees
FROM advertisement_table
INNER JOIN company_table ON advertisement_table.company_id = company_table.company_id
ORDER BY reg_date DESC;
`;

const getOfferByDynamic = `
SELECT advertisement_table.*, company_table.n_employees, company_table.company_name 
FROM advertisement_table 
INNER JOIN company_table ON advertisement_table.company_id = company_table.company_id 
WHERE (offer_name LIKE '%' || $1 || '%' OR company_name LIKE '%' || $13 || '%' ) 
AND offer_location LIKE '%' || $2 || '%'
AND contract_type = $3 
AND salary_min > $4 AND salary_min <= $5 
AND work_duration > $6 AND work_duration <= $7 
AND experience_years > $8 AND experience_years <= $9 
AND offer_language LIKE '%' || $10 || '%' 
AND n_employees > $11 AND n_employees <= $12 ;
`;
const checkTitleExists = "SELECT s FROM advertisement_table s WHERE s.offer_name = $1"
const addOffer = `
INSERT INTO advertisement_table (ad_id, offer_name, offer_desc, offer_profile_desc, offer_location, contract_type, salary_min, work_duration, starting_date, reg_date, company_id) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
const addUID = "SELECT uuid_generate_v4();"
const checkOfferExist = "SELECT ad_id FROM advertisement_table WHERE ad_id = $1"
const removeOffer = "DELETE FROM advertisement_table WHERE ad_id = $1;"

const updateOffer = `UPDATE advertisement_table
SET offer_name = $1, offer_location = $2, contract_type = $3, salary_min = $4, work_duration = $5, experience_years = $6, offer_language = $7, offer_desc=$8, offer_profile_desc=$9, remote_work=$10, starting_date=$11, company_id=$13
WHERE ad_id = $12`;

const getCompanyInfo = `SELECT DISTINCT company_table.n_employees, company_table.company_name
FROM advertisement_table
INNER JOIN company_table ON advertisement_table.company_id = company_table.company_id
WHERE advertisement_table.company_id = $1;
`

const getCompanyName = `SELECT company_id FROM company_table WHERE company_mail = $1`;

const getOfferById = `SELECT advertisement_table.*, company_table.company_name, company_table.n_employees
FROM advertisement_table 
INNER JOIN company_table ON advertisement_table.company_id = company_table.company_id 
WHERE ad_id = $1`;
const bo_updateOffer = `UPDATE advertisement_table
SET ad_id=$1, offer_name=$2, offer_desc=$3, offer_profile_desc=$4, offer_language=$5, contract_type=$6, offer_work_type=$7, offer_location=$8, company_id=$9, remote_work=$10, starting_date=$11, salary_min=$12, reg_date=$13, work_duration=$14, experience_years=$15
WHERE ad_id = $16
`;
const bo_addOffer = `INSERT INTO advertisement_table (ad_id, offer_name, offer_desc, offer_profile_desc, offer_language, company_id, contract_type, offer_work_type, offer_location, remote_work, starting_date, salary_min, work_duration, experience_years, reg_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

module.exports = {
    getOffer,
    getOfferByDynamic,
    checkTitleExists,
    addOffer,
    addUID,
    removeOffer,
    checkOfferExist,
    updateOffer,
    getCompanyInfo,
    getCompanyName,
    getOfferById,
    bo_updateOffer,
    bo_addOffer,
}