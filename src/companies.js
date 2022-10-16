import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { useState } from 'react';
import axios from 'axios';
import iconCalendar from './assets/icons/calendar-2-line.svg';
import iconMap from './assets/icons/map-pin-2-line.svg';
import iconProfile from './assets/icons/profile-line.svg';
import iconTeam from './assets/icons/team-line.svg';
import iconMail from './assets/icons/mail.svg';
import iconPhone from './assets/icons/phone-fill.svg';
import iconUser from './assets/icons/user-fill.svg';
import { Buffer } from 'buffer';
import MediaQuery from 'react-responsive';
import Burger from './assets/icons/burger.svg';
import { slide as Menu } from 'react-burger-menu';

import dburl from './index.js';

function CompanySearch() {
    return (
        <article>
            <h1>Which company are you looking for?</h1>
            <div className="yellow0"></div>
            <input name="query" id="query" className="" placeholder="The Military Industrial Complex, Paris, IT..." />
        </article>
    )
}

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

function CompanyFilters() {

    const [language, setLanguage] = useState("");
    const [work_sector, setWork_sector] = useState("");
    const [n_employees_min, setN_employees_min] = useState("");

    const filterSet = GetCompanies({
        language: language,
        work_sector: work_sector,
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

    const CorporateBurgerFilter = () => {
        return (
            <Menu styles={filterstyle} left noOverlay customBurgerIcon={<img src={Burger} />}>
                <form>
                    { }
                    <h6>{filterResults} results found</h6><br></br>

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
                    <h2>Sector</h2>
                    <hr className="filterhr" />
                    <div>
                        <input type="checkbox" id="worktype" value="aviation" />
                        <label>Aerospatial</label><br></br>
                        <input type="checkbox" id="worktype" value="mic" />
                        <label>Military Industrial Complex</label><br></br>
                        <input type="checkbox" id="worktype" value="banking" />
                        <label>Banking / Finance</label><br></br>
                        <input type="checkbox" id="worktype" value="health" />
                        <label>Health Industry</label><br></br>
                        <input type="checkbox" id="worktype" value="government" />
                        <label>Government Agency</label><br></br>
                        <input type="checkbox" id="worktype" value="tax" />
                        <label>Tax Evasion</label><br></br>
                        <input type="checkbox" id="worktype" value="legal" />
                        <label>Legal</label><br></br>
                        <input type="checkbox" id="worktype" value="food" />
                        <label>Food / Entertainment</label><br></br>
                        <input type="checkbox" id="worktype" value="car" />
                        <label>Automobile / Transport</label><br></br>
                        <input type="checkbox" id="worktype" value="it" />
                        <label>Information Technology</label><br></br>
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
                        <h2>Sector</h2>
                        <hr className="filterhr" />
                        <div>
                            <input type="checkbox" id="worktype" value="aviation" />
                            <label>Aerospatial</label><br></br>
                            <input type="checkbox" id="worktype" value="mic" />
                            <label>Military Industrial Complex</label><br></br>
                            <input type="checkbox" id="worktype" value="banking" />
                            <label>Banking / Finance</label><br></br>
                            <input type="checkbox" id="worktype" value="health" />
                            <label>Health Industry</label><br></br>
                            <input type="checkbox" id="worktype" value="government" />
                            <label>Government Agency</label><br></br>
                            <input type="checkbox" id="worktype" value="tax" />
                            <label>Tax Evasion</label><br></br>
                            <input type="checkbox" id="worktype" value="legal" />
                            <label>Legal</label><br></br>
                            <input type="checkbox" id="worktype" value="food" />
                            <label>Food / Entertainment</label><br></br>
                            <input type="checkbox" id="worktype" value="car" />
                            <label>Automobile / Transport</label><br></br>
                            <input type="checkbox" id="worktype" value="it" />
                            <label>Information Technology</label><br></br>
                        </div>
                    </form>
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={1249}>
                <div className="filter">
                    <CorporateBurgerFilter />
                </div>
            </MediaQuery>
        </aside>
    )
}

function CompanyListing() {
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

    const [show, setShow] = useState(null);

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

    console.log(companySet);

    const clickHandlerShow = (company) => {
        setShow((prev) => {
            return prev === company ? null : company;
        });
    };

    if (!companySet) {
        return (
            <div className="col-listing">
                <h1>We either couldn't fetch our listed companies, or a catastrophic event has wiped every companies off the face of the earth.</h1>
            </div>
        )
    } else {
        return (
            <div className="col-listing">
                {companySet.map((company) => (
                    <div className="listing-flex">
                        <h3 className="listing-header">{company.company_name}</h3>
                        <div className="listing-icon-area">
                            <p className="listing-icon">
                                <img className="listing-icon" src={iconProfile} />{company.work_sector}
                                <a href={`https://www.google.com/maps/search/?api=1&query=${company.hq_location}`} className="list-link"><img className="listing-icon" src={iconMap} />{company.hq_location}</a>
                                <img className="listing-icon" src={iconTeam} />{company.n_employees}
                            </p>
                            <div className={show === company ? 'listing-flex-extra' : 'hide'}
                                style={{ display: show === company ? 'block' : 'none' }}>
                                <a href={`tel:+${company.company_phone}`} className="list-link"><img className="listing-icon" src={iconPhone} />{company.company_phone}</a>
                                <a href={`mailto:${company.company_mail}`} className="list-link"><img className="listing-icon" src={iconMail} />{company.company_mail}</a>
                                <img className="listing-icon" src={iconUser} />{company.company_vip}
                                <p>{company.company_desc}</p>
                            </div>

                            <div className="listing-button-area">
                                <button onClick={() => clickHandlerShow(company)}>{show === company ? 'Show Less' : 'Show More'}</button>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function Companies() {
    document.title = "Companies Browsing";
    return (
        <div>
            <CompanySearch />
            <div className="listing-container">
                <CompanyFilters />
                <CompanyListing />
            </div>
        </div>
    )
}

export default Companies;