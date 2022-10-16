// Fille which contains all the logic for the company_table.

const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions');

// Reads all companies from the db
const getCompanies = (req, res) => {
    pool.query(queries.getCompanies, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getCompaniesByDynamic = (req, res) => {
    const { company_name, siret, n_employees_min, n_employees_max, hq_location, n_followers_min, n_followers_max, work_sector, language, reg_date_min, reg_date_max } = req.query;
    pool.query(queries.getCompaniesByDynamic, [company_name, siret, n_employees_min, n_employees_max, hq_location, n_followers_min, n_followers_max, work_sector, language, reg_date_min, reg_date_max], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addCompany = (req, res) => {
    try {

        const { company_name, siret, company_mail, hq_location, n_employees } = req.body;

        pool.query(queries.checkEmailExists, [company_mail], (error, results) => {
            if (results.rows.length) {
                res.send("Email already exists.");
            } else (
                pool.query(queries.addUID, (error, results2) => {
                    if (error) throw error;
                    let uuid = results2.rows[0]["uuid_generate_v4"];
                    let today = functions.getTimeNow();

                    pool.query(queries.addCompany, [uuid, company_name, siret, company_mail, hq_location, today, n_employees], (error, results) => {
                        if (error) throw error;
                        res.status(201).send("Company created successfully!");
                    })
                })
            )
        })
    } catch (error) {
        return res.send("An error has occured.");
    }

}

const removeCompany = (req, res) => {

    const company_id = req.params.company_id;

    pool.query(queries.checkCompanyExist, [company_id], (error, results) => {
        // If no results
        if (!results.rows.length) {
            res.send("Company doesn't exist in the database, could not remove.");
            // If results
        } else {
            pool.query(queries.removeCompany, [company_id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Company removed successfully.");
            })
        }
    })
}

const updateCompany = (req, res) => {
    const id = req.params.company_id;
    const { company_name, company_desc, n_employees, hq_location, work_sector, company_vip, company_phone, language, company_social, company_mail } = req.body;
    const { company_pic, company_banner } = req.files;

    if (company_pic.size > 1000000 || company_banner.size > 1000000) return res.status(412).send("Image too big.");

    pool.query(queries.checkCompanyExist, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("The company doesn't exist in the database, could not update.");
        } else {
            pool.query(queries.updateCompany, [company_name, company_desc, n_employees, hq_location, work_sector, company_vip, company_pic.data, company_phone, language, company_social, company_mail, company_banner.data, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Company updated successfully.");
            })
        }
    })
}

const getCompanyById = async (req, res) => {
    const id = req.params.id;
    pool.query(queries.getCompanyById, [id], (error, results) => {
        if (error) return res.status(400).send("An error has occured:" + error);
        if (!results.rows.length) return res.send("No information with this id.")
        return res.status(200).send(results.rows);
    });
}

const bo_updateCompany = (req, res) => {
    const id = req.params.id;
    // Convert strings without content or with a default "null" content to a null value.
    for (const item in req.body) {
        if (req.body[item] == "null" || req.body[item] == "") req.body[item] = null
    }
    const { company_id, company_name, reg_date, siret, company_desc, n_employees, hq_location, work_sector, company_mail, company_phone, n_followers, company_vip, company_social, language } = req.body;

    pool.query(queries.bo_updateCompany, [company_id, company_name, reg_date, siret, company_desc, n_employees, hq_location, work_sector, company_mail, company_phone, n_followers, company_vip, company_social, language, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Company updated successfully.");
    })
}

const bo_addCompany = (req, res) => {
    // Adds a row to the companies table through the back-office.

    // Convert strings without content or with a default "null" content to a null value.
    for (const item in req.body) {
        if (req.body[item] == "null" || req.body[item] == "") req.body[item] = null
    }

    const { company_name, siret, company_desc, n_employees, hq_location, work_sector, company_mail, company_phone, n_followers, company_vip, company_social, language } = req.body;

    // Creates a new uuid for the new information
    pool.query(queries.addUID, (error, results) => {
        if (error) throw error;
        const uuid = results.rows[0]["uuid_generate_v4"];
        const today = functions.getTimeNow();

        // Adds the row to db
        pool.query(queries.bo_addCompany, [uuid, company_name, siret, company_desc, n_employees, hq_location, work_sector, company_mail, company_phone, n_followers, company_vip, company_social, language, today], (error, results) => {
            if (error) throw error;
            res.status(201).send("Row added to the table successfully!");
        })
    })
}

module.exports = {
    getCompanies,
    getCompaniesByDynamic,
    addCompany,
    removeCompany,
    updateCompany,
    getCompanyById,
    bo_updateCompany,
    bo_addCompany
}