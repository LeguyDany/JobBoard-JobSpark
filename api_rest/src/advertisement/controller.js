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
    const { offer_name, offer_desc, offer_profile_desc, offer_location, contract_type, salary_min, work_duration, starting_date, company_mail } = req.body;

    let company_id;
    pool.query(queries.getCompanyName, [company_mail], (error, results) => {
        if (!results.rows.length) return res.send("There is no company affiliated to this email address: create one first on our website.");
        company_id = results.rows[0].company_id;
    });

    pool.query(queries.addUID, (error, results2) => {
        if (error) throw error;
        let uuid = results2.rows[0]["uuid_generate_v4"];
        let today = functions.getTimeNow();

        pool.query(queries.addOffer, [uuid, offer_name, offer_desc, offer_profile_desc, offer_location, contract_type, salary_min, work_duration, starting_date, today, company_id], (error, results) => {
            if (error) throw error;
            res.status(201).send("Offer created successfully!");
        })
    })


}

const removeOffer = (req, res) => {
    const offer_id = req.params.offer_id;

    pool.query(queries.checkOfferExist, [offer_id], (error, results) => {
        if (error) throw error;

        // If no results
        if (!results.rows.length) return res.send("The offer doesn't exist in the database, could not remove.");

        // If results
        pool.query(queries.removeOffer, [offer_id], (error, results) => {
            if (error) return res.status(404).send("You must enter an uuid format to remove an offer.");
            res.status(200).send("Offer removed successfully.");
        })
    })
}

const updateOffer = (req, res) => {
    const offer_id = req.params.offer_id;
    const { offer_name, offer_location, contract_type, salary_min, work_duration, experience_years, offer_language, offer_desc, offer_profile_desc, remote_work, starting_date, company_id } = req.body;

    pool.query(queries.checkOfferExist, [offer_id], (error, results) => {
        // If no results
        if (!results) {
            res.send("Offer doesn't exist in the database, could not update.");
            // If results
        } else {
            pool.query(queries.updateOffer, [offer_name, offer_location, contract_type, salary_min, work_duration, experience_years, offer_language, offer_desc, offer_profile_desc, remote_work, starting_date, offer_id, company_id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Offer updated successfully.");
            });
        }
    });
}

const getOfferById = async (req, res) => {
    const id = req.params.id;
    pool.query(queries.getOfferById, [id], (error, results) => {
        if (error) return res.status(400).send("An error has occured:" + error);
        if (!results.rows.length) return res.send("No offer with this id.")
        return res.status(200).send(results.rows);
    });
}
const bo_updateOffer = (req, res) => {
    const id = req.params.id;
    const { ad_id, offer_name, offer_desc, offer_profile_desc, offer_language, contract_type, offer_work_type, offer_location, company_id, remote_work, starting_date, salary_min, reg_date, work_duration, experience_years } = req.body;

    pool.query(queries.bo_updateOffer, [ad_id, offer_name, offer_desc, offer_profile_desc, offer_language, contract_type, offer_work_type, offer_location, company_id, remote_work, starting_date, salary_min, reg_date, work_duration, experience_years, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Offer updated successfully.");
    })
}
const bo_addOffer = (req, res) => {
    // Adds a row to the companies table through the back-office.

    // Convert strings without content or with a default "null" content to a null value.
    for (const item in req.body) {
        if (req.body[item] == "null" || req.body[item] == "" ) req.body[item] = null
    }

    const { offer_name, offer_desc, offer_profile_desc, offer_language, company_id, contract_type, offer_work_type, offer_location, remote_work, starting_date, salary_min, work_duration, experience_years } = req.body;

    // Creates a new uuid for the new information
    pool.query(queries.addUID, (error, results) => {
        if (error) throw error;
        const uuid = results.rows[0]["uuid_generate_v4"];
        const today = functions.getTimeNow();

        // Adds the row to db
        pool.query(queries.bo_addOffer, [uuid, offer_name, offer_desc, offer_profile_desc, offer_language, company_id, contract_type, offer_work_type, offer_location, remote_work, starting_date, salary_min, work_duration, experience_years, today], (error, results) => {
            if (error) throw error;
            res.status(201).send("Row added to the table successfully!");
        })
    })
}

bo_addOffer


// Letting the functions out of their cages
module.exports = {
    getOffers,
    getOffersByDynamic,
    addOffer,
    removeOffer,
    updateOffer,
    getOfferById,
    bo_updateOffer,
    bo_addOffer,
}