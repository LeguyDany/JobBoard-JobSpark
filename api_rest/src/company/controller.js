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
}

const removeCompany = (req, res) => {
    const company_id = req.params.company_id;

    pool.query(queries.checkCompanyExist, [company_id], (error, results) => {
        // If no results
        if (!results) {
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
    const { company_name, company_desc, n_employees, hq_location, work_sector, company_vip, company_pic, company_phone, language, company_social, company_mail, company_banner } = req.body;

    console.log(n_employees);

    pool.query(queries.checkCompanyExist, [id], (error, results) => {
        if (!results) {
            res.send("Copmany doesn't exist in the database, could not update.");
        } else {
            pool.query(queries.updateCompany, [company_name, company_desc, n_employees, hq_location, work_sector, company_vip, company_pic, company_phone, language, company_social, company_mail, company_banner, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Company updated successfully.");
            })
        }
    })
}

module.exports = {
    getCompanies,
    getCompaniesByDynamic,
    addCompany,
    removeCompany,
    updateCompany,
}