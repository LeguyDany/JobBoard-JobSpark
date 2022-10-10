
const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions')

const getInformation = (req, res) => {
    pool.query(queries.getInformation, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addInformation = (req, res) => {
    const { ad_id, user_id } = req.body;

    pool.query(queries.checkInformationExists, [ad_id, user_id], (error, results) => {
        if (results.rows.length) {
            res.send("An user already registered to this offer.");
        } else (
            pool.query(queries.addUID, (error, results2) => {
                if (error) throw error;
                let uuid = results2.rows[0]["uuid_generate_v4"];
                let today = functions.getTimeNow();

                pool.query(queries.addInformation, [ad_id, user_id, today, uuid], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Application to the offer sent!");
                })
            })
        )
    })
}

const getInformationByDynamic = (req, res) => {
    // Filters for the back-office. These are the possible filterning parameters:
    // firstname, lastname, company_name, offer_name, application_date, work_sector
    const { firstname, lastname, offer_name, work_sector, company_name, reg_date_min, reg_date_max } = req.query;

    pool.query(queries.getInformationByDynamic, [offer_name, company_name, firstname, lastname, work_sector, reg_date_min, reg_date_max], (error, results) => {
        if (error) throw error;
        // 200 is the OK status, it means it worked
        res.status(200).json(results.rows);
    })
}

const removeInformation = (req, res) => {
    const applicant = req.params.information_id;

    pool.query(queries.checkApplicationExist, [applicant], (error, results) => {
        // If no results
        if (!results) {
            res.send("Application doesn't exist in the database, could not remove.");
            // If results
        } else {
            pool.query(queries.removeInformation, [applicant], (error, results) => {
                if (error) throw error;
                res.status(200).send("Application removed successfully.");
            })
        }
    })
}

const updateInformation = (req, res) => {
    const applicant = req.body.applicant;

    pool.query(queries.updateApplicant, [applicant], (error, results) => {
        if (error) throw error;
        res.status(200).send("Applicant updated successfully.");
    })
}

module.exports = {
    getInformation,
    getInformationByDynamic,
    removeInformation,
    updateInformation,
    addInformation,
}
