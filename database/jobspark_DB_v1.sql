--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: advertisement_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.advertisement_table (
    ad_id uuid NOT NULL,
    post_name character(120),
    post_desc text,
    post_look_desc text,
    post_language character(20),
    company_name character(60),
    company_type character(100),
    contract_type character(20),
    post_work_type character(100),
    post_location character(120),
    remote_work boolean,
    starting_date timestamp with time zone,
    work_duration interval,
    salary_min real,
    salary_max real,
    company_pic bytea,
    work_pic bytea,
    posting_date timestamp with time zone
);


ALTER TABLE public.advertisement_table OWNER TO postgres;

--
-- Name: TABLE advertisement_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.advertisement_table IS 'Table Annonces';


--
-- Name: company_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company_table (
    company_id uuid NOT NULL,
    company_name character(120) NOT NULL,
    reg_date timestamp with time zone,
    siret integer NOT NULL,
    company_desc text,
    workers_amount smallint,
    hq_location character(600),
    work_sector character(240),
    company_mail text,
    company_phone character(12),
    followers_amount smallint,
    comapny_vip text,
    comapny_pic bytea,
    comapny_social text,
    comapny_type character(100),
    company_banner bytea
);


ALTER TABLE public.company_table OWNER TO postgres;

--
-- Name: TABLE company_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.company_table IS 'Table info compagnie';


--
-- Name: information_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.information_table (
    ad_id uuid,
    company_id uuid,
    user_id uuid,
    post_name character(120),
    applicant character(60),
    company character(120),
    application_date timestamp with time zone,
    expertiselevel character(20)
);


ALTER TABLE public.information_table OWNER TO postgres;

--
-- Name: user_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_table (
    user_id uuid NOT NULL,
    firstname character(30),
    lastname character(30),
    user_pwd text,
    age smallint,
    resume bytea,
    user_type character(3),
    wanter_work text,
    location character(240),
    reg_date timestamp with time zone,
    user_email text,
    user_phone character(12),
    user_website character(120),
    user_linkedin text,
    user_social text,
    newsletter boolean
);


ALTER TABLE public.user_table OWNER TO postgres;

--
-- Name: TABLE user_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.user_table IS 'Tableau Users (rechercheur d''emplois, recruteurs, admins)';


--
-- Data for Name: advertisement_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.advertisement_table (ad_id, post_name, post_desc, post_look_desc, post_language, company_name, company_type, contract_type, post_work_type, post_location, remote_work, starting_date, work_duration, salary_min, salary_max, company_pic, work_pic, posting_date) FROM stdin;
\.


--
-- Data for Name: company_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company_table (company_id, company_name, reg_date, siret, company_desc, workers_amount, hq_location, work_sector, company_mail, company_phone, followers_amount, comapny_vip, comapny_pic, comapny_social, comapny_type, company_banner) FROM stdin;
\.


--
-- Data for Name: information_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.information_table (ad_id, company_id, user_id, post_name, applicant, company, application_date, expertiselevel) FROM stdin;
\.


--
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_table (user_id, firstname, lastname, user_pwd, age, resume, user_type, wanter_work, location, reg_date, user_email, user_phone, user_website, user_linkedin, user_social, newsletter) FROM stdin;
9d1edcb9-0b66-433e-9a2f-3d5fc6b82f12	Dany                          	Leguy                         	123654789	24	\N	ADM	\N	Cergy                                                                                                                                                                                                                                           	\N	dany.leguy@epitech.eu	\N	\N	\N	\N	\N
a0b22e78-9f9f-4db1-afd9-09df3c371792	Sebastien                     	\N	123456789	21	\N	ADM	\N	Paris                                                                                                                                                                                                                                           	\N	nurdi.bakaev@epitech.eu	\N	\N	\N	\N	\N
4a30e965-12ba-4964-82d7-32b0397f7f36	Jeff                          	Jeffy                         	azertyuiop	\N	\N	\N	\N	\N	\N	jeff.jeffy@gmail.com	\N	\N	\N	\N	\N
8a650d8a-8b6c-4e53-a302-5bc132cee141	rgfetzygughoy                 	Jefftqerguhbuçhqirgy          	qsdfghjkl	\N	\N	\N	\N	\N	\N	rgeaaezgert.gersegnfhsobgr@gmail.com	\N	\N	\N	\N	\N
\.


--
-- Name: advertisement_table advertisement_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advertisement_table
    ADD CONSTRAINT advertisement_table_pkey PRIMARY KEY (ad_id);


--
-- Name: company_table company_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_table
    ADD CONSTRAINT company_table_pkey PRIMARY KEY (company_id);


--
-- Name: user_table user_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_pkey PRIMARY KEY (user_id);


--
-- Name: information_table information_table_AdID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT "information_table_AdID_fkey" FOREIGN KEY (ad_id) REFERENCES public.advertisement_table(ad_id) NOT VALID;


--
-- Name: information_table information_table_CompanyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT "information_table_CompanyID_fkey" FOREIGN KEY (company_id) REFERENCES public.company_table(company_id) NOT VALID;


--
-- Name: information_table information_table_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT "information_table_UserID_fkey" FOREIGN KEY (user_id) REFERENCES public.user_table(user_id) NOT VALID;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO danyleguy;


--
-- PostgreSQL database dump complete
--

