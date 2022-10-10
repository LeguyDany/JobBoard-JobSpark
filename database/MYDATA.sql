--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-10-06 15:55:43 CEST

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
-- TOC entry 2 (class 3079 OID 16456)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3613 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16414)
-- Name: advertisement_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.advertisement_table (
    ad_id uuid NOT NULL,
    offer_name character(120),
    offer_desc text,
    offer_profile_desc text,
    offer_language character(20),
    company_id uuid,
    contract_type character(20),
    offer_work_type character(100),
    offer_location character(120),
    remote_work boolean,
    starting_date timestamp with time zone,
    salary_min real,
    reg_date timestamp with time zone,
    work_duration smallint,
    experience_years smallint
);


ALTER TABLE public.advertisement_table OWNER TO postgres;

--
-- TOC entry 3614 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE advertisement_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.advertisement_table IS 'Table Annonces';


--
-- TOC entry 211 (class 1259 OID 16421)
-- Name: company_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company_table (
    company_id uuid NOT NULL,
    company_name character(120) NOT NULL,
    reg_date timestamp with time zone,
    siret character(14) NOT NULL,
    company_desc text,
    n_employees smallint,
    hq_location character(600),
    work_sector character(240),
    company_mail text,
    company_phone character(12),
    n_followers smallint,
    company_vip text,
    company_pic bytea,
    company_social text,
    company_banner bytea,
    language character varying(40)
);


ALTER TABLE public.company_table OWNER TO postgres;

--
-- TOC entry 3615 (class 0 OID 0)
-- Dependencies: 211
-- Name: TABLE company_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.company_table IS 'Table info compagnie';


--
-- TOC entry 213 (class 1259 OID 16509)
-- Name: information_table; Type: TABLE; Schema: public; Owner: danyleguy
--

CREATE TABLE public.information_table (
    ad_id uuid,
    user_id uuid,
    reg_date timestamp with time zone,
    information_id uuid NOT NULL,
    subject character varying(50)
);


ALTER TABLE public.information_table OWNER TO danyleguy;

--
-- TOC entry 212 (class 1259 OID 16428)
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
    wanted_work text,
    location character(240),
    reg_date timestamp with time zone,
    user_email text,
    user_phone character(12),
    user_website character(120),
    user_linkedin text,
    user_social text,
    newsletter boolean DEFAULT false
);


ALTER TABLE public.user_table OWNER TO postgres;

--
-- TOC entry 3616 (class 0 OID 0)
-- Dependencies: 212
-- Name: TABLE user_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.user_table IS 'Tableau Users (rechercheur d''emplois, recruteurs, admins)';


--
-- TOC entry 3604 (class 0 OID 16414)
-- Dependencies: 210
-- Data for Name: advertisement_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.advertisement_table (ad_id, offer_name, offer_desc, offer_profile_desc, offer_language, company_id, contract_type, offer_work_type, offer_location, remote_work, starting_date, salary_min, reg_date, work_duration, experience_years) FROM stdin;
615fd6e0-1ad3-417a-a093-cb2beb42dd97	Expert in Datamining                                                                                                    	Support teams, clean data, analyse data	Student majoring in data management this year.	\N	146968fb-fa1a-453c-b992-a3346bd65766	Full-time           	\N	Paris                                                                                                                   	\N	2022-12-21 00:00:00+01	2600	2022-10-04 11:05:51+02	12	5
c1c654f8-72bc-4fd4-89dc-325afabc1004	Executive in Datamanagement                                                                                             	Support teams, clean data, analyse data	Student majoring in data management this year.	English             	146968fb-fa1a-453c-b992-a3346bd65766	Full-time           	\N	Paris                                                                                                                   	t	2022-12-21 00:00:00+01	2600	2022-10-04 11:03:29+02	24	3
c4e54341-0a51-42f8-9cee-1f39719b4a6b	Translator                                                                                                              	Support teams, clean data, analyse data	Student majoring in data management this year.	English             	f248763a-5a45-4681-9a44-637ea4487aea	Full-time           	\N	Paris                                                                                                                   	\N	2022-12-21 00:00:00+01	2600	2022-10-04 11:06:45+02	8	1
0b55b4e3-bbd3-453a-8304-e72513d426c1	\N	\N	\N	\N	146968fb-fa1a-453c-b992-a3346bd65766	\N	\N	\N	\N	\N	\N	2022-10-05 11:05:51+02	\N	\N
\.


--
-- TOC entry 3605 (class 0 OID 16421)
-- Dependencies: 211
-- Data for Name: company_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company_table (company_id, company_name, reg_date, siret, company_desc, n_employees, hq_location, work_sector, company_mail, company_phone, n_followers, company_vip, company_pic, company_social, company_banner, language) FROM stdin;
9859a4cb-a756-4be9-a832-48ebdaa3563c	Miam                                                                                                                    	2022-10-04 10:20:31+02	50493821910005	\N	9999	Cergy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   	Marketing / Agency                                                                                                                                                                                                                              	test3@gmail.com	\N	56	\N	\N	\N	\N	French
146968fb-fa1a-453c-b992-a3346bd65766	Roxor                                                                                                                   	2022-10-04 10:07:36+02	50493821910004	\N	13500	Paris                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   	Health / Food                                                                                                                                                                                                                                   	test@gmail.com	\N	32	\N	\N	\N	\N	English
f248763a-5a45-4681-9a44-637ea4487aea	D.company                                                                                                               	2022-10-04 10:13:18+02	50493821910004	\N	5000	Paris                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   	Banking / Finances                                                                                                                                                                                                                              	test2@gmail.com	\N	104	\N	\N	\N	\N	English / French
b888b8f0-f79d-4dfb-8e1f-64eb006097d6	Exis                                                                                                                    	\N	50493286059483	Change the world.	12	1900                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    	Hotel                                                                                                                                                                                                                                           	Exis@gmaiL.com	0193201843  	\N	Brontis Lemoivre	\\x	youtube.com	\\x	English
\.


--
-- TOC entry 3607 (class 0 OID 16509)
-- Dependencies: 213
-- Data for Name: information_table; Type: TABLE DATA; Schema: public; Owner: danyleguy
--

COPY public.information_table (ad_id, user_id, reg_date, information_id, subject) FROM stdin;
615fd6e0-1ad3-417a-a093-cb2beb42dd97	5f450ef3-f68b-406a-91b9-ee3a632d8a54	2022-10-04 20:36:38+02	2525d1f2-643a-4726-a897-7eaeba88425e	\N
c4e54341-0a51-42f8-9cee-1f39719b4a6b	6da6242d-d001-4662-a59c-19225047d23a	2022-10-04 21:21:22+02	e7affc42-f341-450f-8330-ac9ac98dd7a0	\N
\.


--
-- TOC entry 3606 (class 0 OID 16428)
-- Dependencies: 212
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_table (user_id, firstname, lastname, user_pwd, age, resume, user_type, wanted_work, location, reg_date, user_email, user_phone, user_website, user_linkedin, user_social, newsletter) FROM stdin;
a0b22e78-9f9f-4db1-afd9-09df3c371792	Sebastien                     	\N	123456789	21	\N	ADM	\N	Paris                                                                                                                                                                                                                                           	\N	nurdi.bakaev@epitech.eu	\N	\N	\N	\N	\N
4a30e965-12ba-4964-82d7-32b0397f7f36	Jeff                          	Jeffy                         	azertyuiop	\N	\N	\N	\N	\N	\N	jeff.jeffy@gmail.com	\N	\N	\N	\N	\N
8a650d8a-8b6c-4e53-a302-5bc132cee141	Staveee                       	Jar                           	qsdfghjkl	\N	\N	\N	\N	\N	\N	rgeaaezgert.gersegnfhsobgr@gmail.com	\N	\N	\N	\N	\N
87c409f6-6665-41b8-8cce-8a146a6bdd40	\N	\N	\N	\N	\N	\N	\N	\N	2022-09-29 08:16:54+02	\N	\N	\N	\N	\N	\N
d2721d5d-8da3-4f3d-aeb1-e779a881b747	TEST                          	TEST                          	TEST	\N	\N	\N	\N	\N	2022-09-29 22:30:24+02	TEST@TEST.test	\N	\N	\N	\N	\N
bc8dbf2d-a0aa-43c5-a397-58edb52ac245	test2                         	test2                         	testerte2	\N	\N	\N	\N	\N	2022-09-29 22:32:28+02	test2@gmail.com	\N	\N	\N	\N	\N
5f450ef3-f68b-406a-91b9-ee3a632d8a54	TEST3                         	htresst                       	jytrsdy	\N	\N	\N	\N	\N	2022-09-29 23:00:45+02	TEST3.jeffy@gmail.com	\N	\N	\N	\N	\N
d82a237d-7894-48f5-812f-bbc3851ac5c3	TEST                          	TESTER UN TRUC SANS MAIL      	\N	\N	\N	\N	\N	\N	2022-09-30 12:31:49+02	\N	\N	\N	\N	\N	\N
6da6242d-d001-4662-a59c-19225047d23a	Frank                         	Sammyr                        	0987654321	21	\N	USR	\N	Paris                                                                                                                                                                                                                                           	2022-09-28 11:21:53+02	Frank.Sammyr@gmail.com	\N	\N	\N	\N	t
9d1edcb9-0b66-433e-9a2f-3d5fc6b82f12	Dany                          	Leguy                         	123654789	24	\N	ADM	\N	Cergy                                                                                                                                                                                                                                           	\N	dany.leguy@epitech.eu	\N	\N	\N	\N	t
8cb6c026-7e63-4f36-9a02-f75bfe84e4a4	Francis                       	Lemont                        	azertyuiop	32	\\x	USR	Biologist	Paris                                                                                                                                                                                                                                           	2022-09-28 13:55:39+02	Francis.Lemont@gmail.com	0629102331  	Francis-Lemont.org                                                                                                      	https://linkedin.com/Francis-Lemont		f
\.


--
-- TOC entry 3455 (class 2606 OID 16420)
-- Name: advertisement_table advertisement_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advertisement_table
    ADD CONSTRAINT advertisement_table_pkey PRIMARY KEY (ad_id);


--
-- TOC entry 3457 (class 2606 OID 16427)
-- Name: company_table company_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_table
    ADD CONSTRAINT company_table_pkey PRIMARY KEY (company_id);


--
-- TOC entry 3461 (class 2606 OID 16513)
-- Name: information_table information_table_pkey; Type: CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT information_table_pkey PRIMARY KEY (information_id);


--
-- TOC entry 3459 (class 2606 OID 16434)
-- Name: user_table user_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3463 (class 2606 OID 16514)
-- Name: information_table ad_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT ad_id FOREIGN KEY (ad_id) REFERENCES public.advertisement_table(ad_id) ON DELETE CASCADE;


--
-- TOC entry 3462 (class 2606 OID 16486)
-- Name: advertisement_table company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advertisement_table
    ADD CONSTRAINT company_id FOREIGN KEY (company_id) REFERENCES public.company_table(company_id) ON DELETE CASCADE;


--
-- TOC entry 3464 (class 2606 OID 16519)
-- Name: information_table user_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.user_table(user_id) ON DELETE CASCADE;


--
-- TOC entry 2047 (class 826 OID 16455)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO danyleguy;


-- Completed on 2022-10-06 15:55:43 CEST

--
-- PostgreSQL database dump complete
--

