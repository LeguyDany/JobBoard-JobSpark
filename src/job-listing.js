import React from 'react';
import './css/index.css';
import { useState } from 'react';
import axios from 'axios';
import iconCalendar from './assets/icons/calendar-2-line.svg';
import iconMap from './assets/icons/map-pin-2-line.svg';
import iconProfile from './assets/icons/profile-line.svg';
import iconTeam from './assets/icons/team-line.svg';

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
    //  const adLists = await axios.get(`${dburl}api/advertisement/all`)
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${dburl}api/advertisement/all`).then((response) => {
            setPost(response.data);
        });
    }, []);


    console.log(post);
    if (!post) return null;
   return post;
}

function JobFilter(event) {

    /* /?offer_name=&offer_location=Paris&contract_type=Full-time&salary_min=0&
    salary_max=9999&work_duration_min=2&work_duration_max=13&experience_years_min=0&
    experience_years_max=10&offer_language=English&n_employees_min=2500&n_employees_max=7500&
    company_name=TEST2
    */
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
    if(!filterSet) return null;

    const filterResults = Object.keys(filterSet).length;

    return (
        <aside>
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
                    <h2>Size</h2>
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
                    <h2>Duration</h2>
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
        </aside>
    )
}

function JobListing() {

    const [ad_id, setAd_id] = useState("");
    const [offer_name, setOffer_name] = useState("");
    const [offer_location, setOffer_location] = useState("");
    const [offer_desc, setOffer_desc] = useState("");
    const [company_name, setCompany_name] = useState("");
    const [offer_language, setOffer_language] = useState("");
    const [contract_type, setContract_type] = useState("");
    const [salary_min, setSalary_min] = useState("");
    const [offer_date, setOffer_date] = useState("");
    const [work_duration_min, setWork_duration_min] = useState("");
    const [n_employees_min, setN_employees_min] = useState("");


    const [show, setShow] = useState(false); // pour cacher/Afficher les resultats


    const jobData = GetJobAds({
        ad_id: ad_id,
        offer_name: offer_name,
        offer_location: offer_location,
        company_name: company_name,
        offer_language: offer_language,
        contract_type: contract_type,
        salary_min: salary_min,
        work_duration_min: work_duration_min,
        n_employees_min: n_employees_min,
    });

    if (!jobData) return null;
    
    return (
        <div className="col-listing">
            {jobData.map((job) => (
                <div className="listing-flex">
                    <h3 className="listing-header">{job.company_name}</h3>
                    <p className="listing-text"> {job.offer_name}</p>
                    {show ? <div className="listing-flex-extra">
                        <p>Salary: {job.salary_min} € / Language: {job.offer_language} / Starting Date: {job.work_duration_min}</p>
                        <p>{job.offer_desc}</p>
                    </div> : null}
                    <div>
                        <p className="listing-icon-text">
                            <img className="listing-icon" src={iconProfile} />{job.contract_type}
                            <img className="listing-icon" src={iconMap} />{job.offer_location}
                            <img className="listing-icon" src={iconTeam} />{job.n_employees_min}
                            <img className="listing-icon" src={iconCalendar} />{job.offer_date}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => setShow(currentShow => !currentShow)}>See More</button>
                    </div>
                </div>
            ))}
        </div>
    )

}

function JobOffers() {
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