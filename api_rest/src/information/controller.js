
const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions');

const getInformation = (req, res) => {
    pool.query(queries.getInformation, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const applyOffer = (req, res) => {
    const { ad_id, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website } = req.body;
    const { resume } = req.files;

    if (!apply_email || !firstname || !lastname) return res.send("Some fields must be filled.");
    if (resume.size > 5000000) return res.status(413).send("File too big.");

    pool.query(queries.addUID, (error, results) => {
        if (error) throw error;
        let uuid = results.rows[0]["uuid_generate_v4"];
        let today = functions.getTimeNow();

        pool.query(queries.addInformation, [ad_id, today, uuid, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website, "Job apply", resume.data], (error, results) => {
            if (error) throw error;

            pool.query(queries.getCompanyEmail, [uuid], (error, results) => {
                if (error) throw (error);
                const message = `
                <p>Hello, <br><br>

                An user named <b>${firstname}</b> with the email address <b>${apply_email}</b> has sent an application to your job offer called <b>${results.rows[0].offer_name}</b>. Don't hesitate to review this offer! <br><br>

                Best regards, <br><br>

                JobSpark's staff
                `;
                functions.sendMail(results.rows[0].company_mail, "JobSpark: User apply - " + results.rows[0].offer_name, message)
                res.status(201).send("Application to the offer sent!");
            });

        })
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

const getInformationById = async (req, res) => {
    const id = req.params.id;
    pool.query(queries.checkApplicationExist, [id], (error, results) => {
        if (error) return res.status(400).send("An error has occured:" + error);
        if (!results.rows.length) return res.send("No information with this id.")
        return res.status(200).send(results.rows);
    });
}
const bo_updateInformation = (req, res) => {
    const id = req.params.id;
    // Convert strings without content or with a default "null" content to a null value.
    for (const item in req.body) {
        if (req.body[item] == "null" || req.body[item] == "") req.body[item] = null
    }
    const { information_id, reg_date, subject, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website } = req.body;

    pool.query(queries.bo_updateInformation, [information_id, reg_date, subject, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Information updated successfully.");
    })
}

const bo_addInformation = (req, res) => {
    // Adds a row to the information table through the back-office.

    // Convert strings without content or with a default "null" content to a null value.
    for (const item in req.body) {
        if (req.body[item] == "null" || req.body[item] == "") req.body[item] = null
    }

    const { ad_id, user_id, subject, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website } = req.body;

    // Creates a new uuid for the new information
    pool.query(queries.addUID, (error, results) => {
        if (error) throw error;
        const uuid = results.rows[0]["uuid_generate_v4"];
        const today = functions.getTimeNow();

        // Adds the row to db
        pool.query(queries.bo_addInformation, [uuid, ad_id, user_id, subject, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website, today], (error, results) => {
            if (error) throw error;
            res.status(201).send("Row added to the table successfully!");
        })
    })
}

module.exports = {
    getInformation,
    getInformationByDynamic,
    removeInformation,
    updateInformation,
    applyOffer,
    getInformationById,
    bo_updateInformation,
    bo_addInformation,
}
