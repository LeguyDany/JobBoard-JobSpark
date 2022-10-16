import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { useState } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import iconCalendar from './assets/icons/calendar-2-line.svg';
import iconMap from './assets/icons/map-pin-2-line.svg';
import iconProfile from './assets/icons/profile-line.svg';
import iconTeam from './assets/icons/team-line.svg';

import imgHome1 from './assets/img/home_img1.png';
import imgHome2 from './assets/img/home_img2.png';



import dburl from './index.js';

function GetCompanies() {
    const [dbData, setDbData] = useState(null);

    React.useEffect(() => {
        axios.get(`${dburl}api/companies/all`).then((response) => {
            setDbData(response.data);
        });
    }, []);
    if (!dbData) return null;
    return dbData;
}

function SiteSearch() {
    return (
        <div className="sitesearch-row">
            <MediaQuery minWidth={1250}>
                <div className="sitesearch-desc-col">
                    <h1>Spark a new Job!</h1><br />
                    <h3>Easily find your next indentured servitude!</h3><br />
                    <p>Discover job offers from more than 600 companies, with only half of them being shell ones!
                        Become another cog in the machine of endless pointless jobs and stray away from a hopeful future of post-scarcity.</p>
                </div>
            </MediaQuery>
            <div className="sitesearch-search-col">
                <h1>Which job are you looking for?</h1><br />
                <div className="yellow0"></div>
                <input name="query" id="query" className="" placeholder="A Company, a Place, a Sector, a Job..." />
                <button type="button">Search</button>
            </div>
        </div>
    )
}

function HomeListing() {

    const [company_name, setCompany_name] = useState("");
    const [company_desc, setCompany_desc] = useState("");
    const [n_employees, setN_employees] = useState("");
    const [work_sector, setWork_sector] = useState("");
    const [company_vip, setCompany_vip] = useState("");
    const [company_pic, setCompany_pic] = useState("");
    const [company_phone, setCompany_phone] = useState("");
    const [company_mail, setCompany_mail] = useState("");
    const [hq_location, setHq_location] = useState("");
    const [company_banner, setCompany_banner] = useState("");


    const companySet = GetCompanies({
        company_name: company_name,
        company_desc: company_desc,
        n_employees: n_employees,
        work_sector: work_sector,
        company_vip: company_vip,
        company_pic: company_pic,
        company_phone: company_phone,
        company_mail: company_mail,
        hq_location: hq_location,
        company_banner: company_banner,
    });

    if (!companySet) {
        return (
            <div className="home-listing-container">
                <h1>Sorry! we couldn't retrieve today's top 3 companies. Either the corporate world has been razed, or we've accidentally press the "DROPTABLE *;" button.</h1>
            </div>
        )

    } else {
        return (
            <div className="home-listing-container">
                <h1>Recruiting Companies</h1>
                <hr />

                <div className="home-listing-row">

                    {companySet.filter((item, comp) => comp < 3).map((comp) =>
                        <div className="home-listing-item">
                            <h3 className="home-listing-header">{comp.company_name}</h3><br />
                            <p className="listing-text"> {comp.company_desc}</p>
                            <div>
                                <p className="listing-icon-text">
                                    <img className="listing-icon" src={iconProfile} />{comp.work_sector}
                                    <img className="listing-icon" src={iconMap} />{comp.hq_location}
                                    <img className="listing-icon" src={iconTeam} />{comp.n_employees}
                                </p>
                            </div>
                            <div>
                            </div>
                        </div>
                    )
                    }

                </div>
            </div>
        )
    }
}

function ExtraFluff() {
    return (
        <div className="home-fluff-container">
            <div className="home-fluff-row">
                <img className="img-responsive home-fluff-img" src={imgHome1} />
                <div className="home-fluff-item">
                    <h2>Directly share your resume with companies</h2>
                    <hr />
                    <p>Our state-of-the-art AI, which is absolutely real and not some poor slovak we chained inside a cubicle, will read your resume, analyze it with our new Aspect Manager Over Greater Unilateral Situation, and send you Job Offers!</p>
                    <a href="/Offers"><button className="button-resume-share">Share your resume</button></a>
                </div>
            </div>
            <MediaQuery maxWidth={1019}>
                <hr className="home-fluff-hr" />
            </MediaQuery>
            <div className="home-fluff-row">
                <div className="home-fluff-item">
                    <h2>Discover the Companies</h2>
                    <hr />
                    <p>Over 4,000 Companies are looking for new slave labour within their unfilfulling positions. Discover your next place of depression, where you'll be wishing for the sweet release of death!</p>
                    <a href="/Companies"><button className="button-resume-share">Discover Companies</button></a>
                </div>
                <MediaQuery minWidth={1020}>
                    <img className="img-responsive home-fluff-img" src={imgHome2} />
                </MediaQuery>
            </div>
        </div>
    )
}

function BottomPage() {
    return (
        <div className="bottom-page-container">
            <div className="bottom-page-row">
                <div className="bottom-page-item">
                    <h4>Register now, and get access to JobSpark Gold for one free month of trial, boosting your profile to the front!</h4>
                    <a href="/Register"><button className="button-bottom">Register now</button></a>
                </div>
                <div className="bottom-page-item">
                    <h4>More than 50 000 Job Seekers. Apply now, for there can be only one!</h4>
                    <a href="/Offers"><button className="button-bottom">Look for a new Job</button></a>
                </div>
                <div className="bottom-page-item">
                    <h4>Our listed Companies are real, and are always looking for more flesh for the meat grinder!</h4>
                    <a href="/Companies"><button className="button-bottom">Discover Companies</button></a>

                </div>
            </div>
        </div>
    )
}

function HomePage() {
    document.title = "Home";
    return (
        <div>
            <SiteSearch />
            <HomeListing />
            <ExtraFluff />
            <BottomPage />
        </div>
    )
}

export default HomePage;