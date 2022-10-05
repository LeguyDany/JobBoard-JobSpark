// Calling in required functions, files, and connection to the DB

const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions')

// Reads all advertisement from the db, via the queries file
const getOffers = (req, res) => {
    pool.query(queries.getOffer, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// Get ads by their title name (postname)
const getOffersByDynamic = (req, res) => {
    const { offer_name, offer_location, contract_type, salary_min, salary_max, work_duration_min, work_duration_max, experience_years_min, experience_years_max, offer_language, n_employees_min, n_employees_max, companies_name } = req.query;

    pool.query(queries.getOfferByDynamic, [offer_name, offer_location, contract_type, salary_min, salary_max, work_duration_min, work_duration_max, experience_years_min, experience_years_max, offer_language, n_employees_min, n_employees_max, companies_name], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// Send the ad's data to the DB (Title, Desc, Look_Desc, Location, Contract, SalaryMin & SalaryMax, Work duration, Starting Date)
const addOffer = (req, res) => {
    const { offer_name, offer_desc, offer_profile_desc, offer_location, contract_type, salary_min, work_duration, starting_date } = req.body;

    pool.query(queries.checkTitleExists, [offer_name], (error, results) => {
        if (results.rows.length) {
            res.send("Offer name already exists.");
        } else (
            pool.query(queries.addUID, (error, results2) => {
                if (error) throw error;
                let uuid = results2.rows[0]["uuid_generate_v4"];
                let today = functions.getTimeNow();

                pool.query(queries.addOffer, [uuid, offer_name, offer_desc, offer_profile_desc, offer_location, contract_type, salary_min, work_duration, starting_date, today], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Offer created successfully!");
                })
            })
        )
    })
}

const removeOffer = (req, res) => {
    const offer_id = req.params.offer_id;

    pool.query(queries.checkOfferExist, [offer_id], (error, results) => {
        // If no results
        if (!results) {
            res.send("The offer doesn't exist in the database, could not remove.");
            // If results
        } else {
            pool.query(queries.removeOffer, [offer_id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Offer removed successfully.");
            })
        }
    })
}

const updateOffer = (req, res) => {
    const offer_id = req.params.offer_id;
    const { offer_name, offer_location, contract_type, salary_min, work_duration, experience_years, offer_language, offer_desc, offer_profile_desc, remote_work, starting_date } = req.body;

    pool.query(queries.checkOfferExist, [offer_id], (error, results) => {
        // If no results
        if (!results) {
            res.send("Offer doesn't exist in the database, could not update.");
            // If results
        } else {
            pool.query(queries.updateOffer, [offer_name, offer_location, contract_type, salary_min, work_duration, experience_years, offer_language, offer_desc, offer_profile_desc, remote_work, starting_date, offer_id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Offer updated successfully.");
            });
        }
    });
}

// Letting the functions out of their cages
module.exports = {
    getOffers,
    getOffersByDynamic,
    addOffer,
    removeOffer,
    updateOffer
}