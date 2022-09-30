// Registers all the queries the user table is going to use here. It is used so that the controller won't get cramped up due to big queries or excessive amounts of queries.

const getCompanies = "SELECT * FROM company_table";
const getCompaniesByName = "SELECT * FROM company_table WHERE company_name = $1";
const checkEmailExists = "SELECT s FROM company_table s WHERE s.company_mail = $1"
const checkSiretExists = "SELECT s FROM company_table s WHERE s.siret = $1"
const addCompany = "INSERT INTO company_table (company_id, company_name, siret, company_mail, hq_location, reg_date) VALUES ($1, $2, $3, $4, $5, $6)";
const addUID = "SELECT uuid_generate_v4();"
const checkCompanyExist = "SELECT s FROM company_table s WHERE s.company_id = $1"
const removeCompany = "DELETE FROM company_table WHERE company_id = $1";
const updateCompany = "UPDATE company_table SET company_name = $1, siret = $2 WHERE company_id = $3";

module.exports = {
    getCompanies,
    getCompaniesByName,
    checkEmailExists,
    checkSiretExists,
    addCompany,
    addUID,
    removeCompany,
    checkCompanyExist,
    updateCompany,
}