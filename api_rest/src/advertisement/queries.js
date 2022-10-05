// Same as always, give the controller.js room to be readable and not cramped up with queries.

const getOffer = "SELECT * FROM advertisement_table";
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
const addOffer = "INSERT INTO advertisement_table (ad_id, offer_name, offer_desc, offer_profile_desc, offer_location, contract_type, salary_min, work_duration, starting_date, reg_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
const addUID = "SELECT uuid_generate_v4();"
const checkOfferExist = "SELECT s FROM advertisement_table s WHERE s.ad_id = $1"
const removeOffer = "DELETE FROM advertisement_table WHERE ad_id = $1";

const updateOffer = `UPDATE advertisement_table
SET offer_name = $1, offer_location = $2, contract_type = $3, salary_min = $4, work_duration = $5, experience_years = $6, offer_language = $7, offer_desc=$8, offer_profile_desc=$9, remote_work=$10, starting_date=$11
WHERE ad_id = $12`;

const getCompanyInfo = `SELECT DISTINCT company_table.n_employees, company_table.company_name
FROM advertisement_table
INNER JOIN company_table ON advertisement_table.company_id = company_table.company_id
WHERE advertisement_table.company_id = $1;
`

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
}