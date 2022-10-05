// Registers all the queries the user table is going to use here. It is used so that the controller won't get cramped up due to big queries or excessive amounts of queries.

const getCompanies = "SELECT * FROM company_table";
const getCompaniesByDynamic = "SELECT * FROM company_table WHERE (company_name LIKE '%' || $1 || '%' OR siret = $2) AND $3 < n_employees AND  n_employees <= $4 AND hq_location LIKE '%' || $5 || '%' AND n_followers > $6 AND n_followers <= $7 AND work_sector LIKE '%' || $8 || '%' AND language LIKE '%' || $9 || '%' AND reg_date > $10 AND reg_date <= $11 ;";
const checkEmailExists = "SELECT s FROM company_table s WHERE s.company_mail = $1";
const checkSiretExists = "SELECT s FROM company_table s WHERE s.siret = $1";
const addCompany = "INSERT INTO company_table (company_id, company_name, siret, company_mail, hq_location, reg_date, n_employees) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const addUID = "SELECT uuid_generate_v4();"
const checkCompanyExist = "SELECT s FROM company_table s WHERE s.company_id = $1";
const removeCompany = "DELETE FROM company_table WHERE company_id = $1";
const updateCompany = `UPDATE company_table 
SET company_name = $1, company_desc = $2 , n_employees=$3 , hq_location=$4 , work_sector=$5, company_vip=$6, company_pic=$7, company_phone=$8, language=$9, company_social=$10, company_mail=$11, company_banner=$12
WHERE company_id = $13`;

module.exports = {
    getCompanies,
    getCompaniesByDynamic,
    checkEmailExists,
    checkSiretExists,
    addCompany,
    addUID,
    removeCompany,
    checkCompanyExist,
    updateCompany,
}