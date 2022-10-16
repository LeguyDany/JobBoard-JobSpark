import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { useState } from 'react';
import axios from 'axios';
import iconCalendar from './assets/icons/calendar-2-line.svg';
import iconMap from './assets/icons/map-pin-2-line.svg';
import iconProfile from './assets/icons/profile-line.svg';
import iconTeam from './assets/icons/team-line.svg';
import Burger from './assets/icons/burger.svg';
import { Buffer } from 'buffer';
import { slide as Menu } from 'react-burger-menu';
import MediaQuery from 'react-responsive';

import dburl from './index.js';


function JobSearch() {
    return (
        <article>
            <h1>Which job are you looking for?</h1>
            <div className="yellow0"></div>
            <input name="query" id="query" className="" placeholder="A Company, a Place, a Sector, a Job..." />
        </article>
    )
}



// Fonction pour recuperer les données de l'API
function GetJobAds() {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${dburl}api/advertisement/all`).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;
    return post;
}

function JobFilter(event) {

        const [offer_location, setOffer_location] = useState("");
        const [offer_language, setOffer_language] = useState("");
        const [contract_type, setContract_type] = useState("");
        const [salary_min, setSalary_min] = useState("");
        const [work_duration_min, setWork_duration_min] = useState("");
        const [experience_years_min, setExperience_years_min] = useState("");
        const [experience_years_max, setExperience_years_max] = useState("");
        const [n_employees_min, setN_employees_min] = useState("");

        const filterSet = GetJobAds({
            offer_location: offer_location,
            offer_language: offer_language,
            contract_type: contract_type,
            salary_min: salary_min,
            work_duration_min: work_duration_min,
            n_employees_min: n_employees_min,
        });
     if (!filterSet) return null;

    const filterResults = Object.keys(filterSet).length;

    var filterstyle = {
        bmMenuWrap: {
            top: '0px',
            left: '0px'
        },

        bmOverlay: {
            top: '0px',
            left: '0px'
        },



        bmBurgerButton: {
            position: 'sticky',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
        },
        
        bmCrossButton: {
            height: '50px',
            width: '50px'
        },

        bmCross: {
            background: '#bdc3c7'
          },

        bmMenu: {
            background: '#ffffff',
            marginRight: '0px'
        }


    }

    const BurgerWithFilter = () => {
        return (
            <Menu styles={filterstyle} left noOverlay customBurgerIcon={<img src={Burger} />}>
                <form>
                    { }
                    <h6>{filterResults} results found</h6><br></br>

                    <h2>Contract</h2>
                    <hr className="filterhr" />
                    <div>
                        <input type="checkbox" className="jobmark" id="contract_type" value="Full-time" />
                        <label>Permanent Contract</label><br></br>
                        <input type="checkbox" id="contract_type" value="Fixed-term" />
                        <label>Fixed-Term Contract</label><br></br>
                        <input type="checkbox" id="contract_type" value="Apprenticeship" />
                        <label>Apprenticeship</label><br></br>
                        <input type="checkbox" id="contract_type" value="Internship" />
                        <label>Internship</label><br></br>
                        <input type="checkbox" id="contract_type" value="Freelance" />
                        <label>Freelance</label>
                    </div>
                    <h2>Experience</h2>
                    <hr className="filterhr" />
                    <div className="slidecontainer">
                        <input type="range" min="0" max="15" value="1" className="experienceSlider" id="ExperienceRange" />
                    </div>
                    <h2>Company Size</h2>
                    <hr className="filterhr" />
                    <div>
                        <input type="checkbox" id="employeeAmount" value="2" />
                        <label>2+</label><br></br>
                        <input type="checkbox" id="employeeAmount" value="10" />
                        <label>10+</label><br></br>
                        <input type="checkbox" id="employeeAmount" value="250" />
                        <label>250+</label><br></br>
                        <input type="checkbox" id="employeeAmount" value="2500" />
                        <label>2500+</label><br></br>
                    </div>
                    <h2>Language</h2>
                    <hr className="filterhr" />
                    <div>
                        <input type="checkbox" id="language" value="french" />
                        <label>French</label><br></br>
                        <input type="checkbox" id="language" value="english" />
                        <label>English</label><br></br>
                    </div>
                    <h2>Work Duration</h2>
                    <hr className="filterhr" />
                    <div>
                        <input type="checkbox" id="duration" value="1to3" />
                        <label>1-3 months</label><br></br>
                        <input type="checkbox" id="duration" value="4to6" />
                        <label>4-6 months</label><br></br>
                        <input type="checkbox" id="duration" value="10to12" />
                        <label>10-12 months</label><br></br>
                        <input type="checkbox" id="duration" value="13to24" />
                        <label>13-24 months</label><br></br>
                        <input type="checkbox" id="duration" value="25to32" />
                        <label>25-32 months</label><br></br>
                    </div>
                    <h2>Monthly Wage</h2>
                    <hr className="filterhr" />
                    <div>
                        <input type="checkbox" id="salary" value="0" />
                        <label>No</label><br></br>
                        <input type="checkbox" id="salary" value="700" />
                        <label>700€+</label><br></br>
                        <input type="checkbox" id="salary" value="1200" />
                        <label>1200€+</label><br></br>
                        <input type="checkbox" id="salary" value="1600" />
                        <label>1600€+</label><br></br>
                        <input type="checkbox" id="salary" value="3000" />
                        <label>3000€+</label><br></br>
                    </div>
                </form>
            </Menu>
        )
    }

    return (

        <aside>
            <MediaQuery minWidth={1250}>
                <div className="filter">
                    <form>
                        { }
                        <h6>{filterResults} results found</h6><br></br>

                        <h2>Contract</h2>
                        <hr className="filterhr" />
                        <div>
                            <input type="checkbox" className="jobmark" id="contract_type" value="Full-time" />
                            <label>Permanent Contract</label><br></br>
                            <input type="checkbox" id="contract_type" value="Fixed-term" />
                            <label>Fixed-Term Contract</label><br></br>
                            <input type="checkbox" id="contract_type" value="Apprenticeship" />
                            <label>Apprenticeship</label><br></br>
                            <input type="checkbox" id="contract_type" value="Internship" />
                            <label>Internship</label><br></br>
                            <input type="checkbox" id="contract_type" value="Freelance" />
                            <label>Freelance</label>
                        </div>
                        <h2>Experience</h2>
                        <hr className="filterhr" />
                        <div className="slidecontainer">
                            <input type="range" min="0" max="15" value="1" className="experienceSlider" id="ExperienceRange" />
                        </div>
                        <h2>Company Size</h2>
                        <hr className="filterhr" />
                        <div>
                            <input type="checkbox" id="employeeAmount" value="2" />
                            <label>2+</label><br></br>
                            <input type="checkbox" id="employeeAmount" value="10" />
                            <label>10+</label><br></br>
                            <input type="checkbox" id="employeeAmount" value="250" />
                            <label>250+</label><br></br>
                            <input type="checkbox" id="employeeAmount" value="2500" />
                            <label>2500+</label><br></br>
                        </div>
                        <h2>Language</h2>
                        <hr className="filterhr" />
                        <div>
                            <input type="checkbox" id="language" value="french" />
                            <label>French</label><br></br>
                            <input type="checkbox" id="language" value="english" />
                            <label>English</label><br></br>
                        </div>
                        <h2>Work Duration</h2>
                        <hr className="filterhr" />
                        <div>
                            <input type="checkbox" id="duration" value="1to3" />
                            <label>1-3 months</label><br></br>
                            <input type="checkbox" id="duration" value="4to6" />
                            <label>4-6 months</label><br></br>
                            <input type="checkbox" id="duration" value="10to12" />
                            <label>10-12 months</label><br></br>
                            <input type="checkbox" id="duration" value="13to24" />
                            <label>13-24 months</label><br></br>
                            <input type="checkbox" id="duration" value="25to32" />
                            <label>25-32 months</label><br></br>
                        </div>
                        <h2>Monthly Wage</h2>
                        <hr className="filterhr" />
                        <div>
                            <input type="checkbox" id="salary" value="0" />
                            <label>No</label><br></br>
                            <input type="checkbox" id="salary" value="700" />
                            <label>700€+</label><br></br>
                            <input type="checkbox" id="salary" value="1200" />
                            <label>1200€+</label><br></br>
                            <input type="checkbox" id="salary" value="1600" />
                            <label>1600€+</label><br></br>
                            <input type="checkbox" id="salary" value="3000" />
                            <label>3000€+</label><br></br>
                        </div>
                    </form>
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={1249}>
                <div className="filter">
                    <BurgerWithFilter />
                </div>
            </MediaQuery>
        </aside>


    )
}

function JobListing() {

    // Preparer les var en useState pour pouvoir les afficher dans le return
    const [ad_id, setAd_id] = useState("");
    const [offer_name, setOffer_name] = useState("");
    const [offer_location, setOffer_location] = useState("");
    const [offer_desc, setOffer_desc] = useState("");
    const [company_name, setCompany_name] = useState("");
    const [offer_language, setOffer_language] = useState("");
    const [contract_type, setContract_type] = useState("");
    const [salary_min, setSalary_min] = useState("");
    const [offer_date, setOffer_date] = useState("");
    const [work_duration, setWork_duration] = useState("");
    const [starting_date, setStarting_date] = useState("");
    const [n_employees, setN_employees_min] = useState("");

    // Var en useState pour le form
    const [offer_ad_id, setOffer_ad_id] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [apply_email, setApply_email] = useState("");
    const [apply_phone, setApply_phone] = useState("");
    const [apply_motivation, setApply_motivation] = useState("");
    const [apply_website, setApply_website] = useState("");
    const [resume, setResume] = useState("");

    const [show, setShow] = useState(null); // pour cacher/Afficher les resultats
    const [applyShow, setApplyShow] = useState(null); // pour cacher/Afficher la fonction d'appliquer à une offre




    const jobData = GetJobAds({
        ad_id: ad_id,
        offer_name: offer_name,
        offer_location: offer_location,
        offer_date: offer_date,
        offer_desc: offer_desc,
        company_name: company_name,
        offer_language: offer_language,
        contract_type: contract_type,
        salary_min: salary_min,
        work_duration: work_duration,
        n_employees: n_employees,
        starting_date: starting_date,
    });



    const applyForm = async (e, godhelpme_ad_id) => {
        e.preventDefault();
        var formData = new FormData();
        var imagefile = document.querySelector('#resume');
        formData.append("resume", imagefile.files[0]);
        const data = {
            ad_id: godhelpme_ad_id,
            firstname: firstname,
            lastname: lastname,
            apply_email: apply_email,
            apply_phone: apply_phone,
            apply_motivation: apply_motivation,
            apply_website: apply_website,
        }


        for (const item in data) {
            formData.append(item, data[item]);
        }

        try {
            const response = await axios.post(`${dburl}api/information`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const clickHandlerShow = (job) => {
        setShow((prev) => {
            return prev === job ? null : job;
        });
    };

    const clickHandlerApply = (job) => {
        setApplyShow((prev) => {
            return prev === job ? null : job;
        });
    };

    const uploadFile = async (e) => {
        e.preventDefault();

        setResume(React.createElement("embed", { src: URL.createObjectURL(e.target.files[0]) }));
    }

    if (!jobData) {
        return (
            <div className="col-listing">
                <h1>Sorry, we couldn't find any offers for your sorry ass.</h1>
            </div>
        )
    } else {
        return (
            <div className="col-listing">
                {jobData.map((job) => (
                    <div className="listing-flex">
                        <h3 className="listing-header">{job.company_name}</h3>
                        <p className="listing-text"> {job.offer_name}</p>
                        <div className="listing-icon-area">
                            <p className="listing-icon-text">
                                <img className="listing-icon" src={iconProfile} />{job.contract_type}
                                <img className="listing-icon" src={iconMap} />{job.offer_location}
                                <img className="listing-icon" src={iconTeam} />{job.n_employees}
                                <img className="listing-icon" src={iconCalendar} />{job.work_duration + " months"}
                            </p>
                        </div>
                        <div className={show === job ? 'listing-flex-extra' : 'hide'}
                            style={{ display: show === job ? 'block' : 'none' }}>
                            <p>Salary: {job.salary_min} € / Language: {job.offer_language} / Starting Date: {new Date(job.starting_date).toDateString()}</p>
                            <p>{job.offer_desc}</p>
                            <div className={applyShow === job ? '' : 'hide'} style={{ display: applyShow === job ? 'block' : 'none' }}>
                                <hr />
                                <div className="apply-form">
                                    <div className="apply-form-field">
                                        <form className="listing-flex-form" onSubmit={e => applyForm(e, job.ad_id)}>
                                            <label>First Name</label><br />
                                            <input type="text" name="firstname" required placeholder="Jean" value={firstname} onChange={e => setFirstname(e.target.value)} /><br />
                                            <label>Last Name</label><br />
                                            <input type="text" name="lastname" required placeholder="Dupont" value={lastname} onChange={e => setLastname(e.target.value)} /><br />
                                            <label>Email</label><br />
                                            <input type="email" name="apply_email" required placeholder="jean.dupont@mail.com" value={apply_email} onChange={e => setApply_email(e.target.value)} /><br />
                                            <label>Phone</label><br />
                                            <input type="tel" name="apply_phone" placeholder="06 12 34 56 78" value={apply_phone} onChange={e => setApply_phone(e.target.value)} /><br />
                                            <label>Website</label><br />
                                            <input type="url" name="apply_website" placeholder="https://www.jeandupont.com" value={apply_website} onChange={e => setApply_website(e.target.value)} /><br />
                                            <label>Motivation</label><br />
                                            <textarea name="apply_motivation" placeholder="I want to work for you because..." value={apply_motivation} onChange={e => setApply_motivation(e.target.value)} /><br />
                                            <button type="submit">Send</button>
                                        </form>
                                    </div>
                                    <div className="apply-form-resume">
                                        <h3>Upload your Resume</h3>
                                        <input type="file" name="resume" id="resume" onChange={e => uploadFile(e)} />

                                        {resume}

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="listing-button-area">
                            <button onClick={() => clickHandlerShow(job)}>{show === job ? 'Show Less' : 'Show More'}</button>
                            <button className={show === job ? 'listing-flex-extra' : 'hide'}
                                style={{ display: show === job ? 'block' : 'none' }} onClick={() => clickHandlerApply(job)}>{applyShow === job ? 'Close' : 'Apply'}</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function JobOffers() {
    document.title = "Job Browsing";
    return (
        <div>
            <JobSearch />
            <div className="listing-container">
                <JobFilter />
                <JobListing />
            </div>
        </div>
    )
}

export default JobOffers;