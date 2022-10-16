--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-10-16 21:45:43 CEST

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
-- TOC entry 3625 (class 0 OID 0)
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
    offer_name character varying(120),
    offer_desc text,
    offer_profile_desc text,
    offer_language character(20),
    company_id uuid,
    contract_type character(20),
    offer_work_type character varying(100),
    offer_location character varying(100),
    remote_work boolean,
    starting_date timestamp with time zone,
    salary_min real,
    reg_date timestamp with time zone,
    work_duration smallint,
    experience_years smallint
);


ALTER TABLE public.advertisement_table OWNER TO postgres;

--
-- TOC entry 3626 (class 0 OID 0)
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
    company_name character varying(120) NOT NULL,
    reg_date timestamp with time zone,
    siret character(14) NOT NULL,
    company_desc text,
    n_employees smallint,
    hq_location character varying(500),
    work_sector character varying(240),
    company_mail text,
    company_phone character(12),
    n_followers smallint,
    company_vip uuid,
    company_pic bytea,
    company_social text,
    company_banner bytea,
    language character varying(40)
);


ALTER TABLE public.company_table OWNER TO postgres;

--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 211
-- Name: TABLE company_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.company_table IS 'Table info compagnie';


--
-- TOC entry 214 (class 1259 OID 16633)
-- Name: information_table; Type: TABLE; Schema: public; Owner: danyleguy
--

CREATE TABLE public.information_table (
    information_id uuid NOT NULL,
    ad_id uuid,
    user_id uuid,
    reg_date timestamp with time zone,
    subject character varying(100),
    firstname character varying(30),
    lastname character varying(30),
    apply_email text,
    apply_location character varying(240),
    apply_phone character varying(12),
    apply_motivation character varying(1000),
    apply_website character varying(120),
    resume bytea
);


ALTER TABLE public.information_table OWNER TO danyleguy;

--
-- TOC entry 213 (class 1259 OID 16509)
-- Name: information_table_old; Type: TABLE; Schema: public; Owner: danyleguy
--

CREATE TABLE public.information_table_old (
    ad_id uuid,
    user_id uuid,
    reg_date timestamp with time zone,
    information_id uuid NOT NULL,
    subject character varying(100),
    firstname character varying(30),
    lastname character varying(30),
    apply_email text,
    apply_location character varying(240),
    apply_phone character varying(12),
    apply_motivation character varying(1000),
    apply_website character varying(120),
    resume bytea
);


ALTER TABLE public.information_table_old OWNER TO danyleguy;

--
-- TOC entry 212 (class 1259 OID 16428)
-- Name: user_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_table (
    user_id uuid NOT NULL,
    firstname character varying(30),
    lastname character varying(30),
    user_pwd text,
    age smallint,
    resume bytea,
    user_type character(3) DEFAULT 'USR'::bpchar,
    wanted_work text,
    location character varying(240),
    reg_date timestamp with time zone,
    user_email text,
    user_phone character(12),
    user_website character varying(240),
    user_linkedin text,
    user_social text,
    newsletter boolean DEFAULT false,
    profile_pic bytea,
    verified boolean DEFAULT false
);


ALTER TABLE public.user_table OWNER TO postgres;

--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 212
-- Name: TABLE user_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.user_table IS 'Tableau Users (rechercheur d''emplois, recruteurs, admins)';


--
-- TOC entry 3615 (class 0 OID 16414)
-- Dependencies: 210
-- Data for Name: advertisement_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.advertisement_table (ad_id, offer_name, offer_desc, offer_profile_desc, offer_language, company_id, contract_type, offer_work_type, offer_location, remote_work, starting_date, salary_min, reg_date, work_duration, experience_years) FROM stdin;
c1c654f8-72bc-4fd4-89dc-325afabc1004	Executive in Datamanagement	Support teams, clean data, analyse data	Student majoring in data management this year.	English             	146968fb-fa1a-453c-b992-a3346bd65766	Full-time           	\N	Paris	t	2022-12-21 00:00:00+01	2600	2022-10-04 11:03:29+02	24	3
c4e54341-0a51-42f8-9cee-1f39719b4a6b	Translator	Support teams, clean data, analyse data	Student majoring in data management this year.	English             	f248763a-5a45-4681-9a44-637ea4487aea	Full-time           	\N	Paris	\N	2022-12-21 00:00:00+01	2600	2022-10-04 11:06:45+02	8	1
b089230e-7f01-4792-a5d2-bef45029e31c	Security system	Make sure to securise all the routes in our system.	Student majoring in security system management this year.	\N	91e7bb21-7e5a-433f-b577-bb45e6488ddd	Full-time           	\N	Beijing	\N	2022-12-21 00:00:00+01	2100	2022-10-07 15:00:06+02	12	\N
f0f88fe3-4ee3-40c6-8d7e-679fe648397f	Magician	Magic tricks. EXPERTS ONLY, NO JOKE.	Knows how to teleport, cast fire balls and fly.	English             	91e7bb21-7e5a-433f-b577-bb45e6488ddd	Part-time           	\N	Paris	f	2023-01-01 00:00:00+01	9999	2022-10-07 15:12:40+02	1	50
4d0e06c9-f741-4ed9-92f9-79c961a8566f	Insulteur	Insult passengers from a train during the whole travel.	Knows how to fight in case a fight breaks out.	English / French    	146968fb-fa1a-453c-b992-a3346bd65766	Full-time           	\N	Los Angeles	f	2023-05-01 00:00:00+02	1600	2022-10-04 11:05:51+02	12	12
615fd6e0-1ad3-417a-a093-cb2beb42dd97	Expert in Datamining	Support teams, clean data, analyse data	Student majoring in data management this year.	null                	146968fb-fa1a-453c-b992-a3346bd65766	Full-time           	null	Paris	f	2022-12-21 00:00:00+01	2600	2022-10-04 11:05:51+02	12	100
000e88f7-ea48-43e9-b333-06e9382a2ab6	Clown	On an amusement park, blows ballons, takes pictures and plays with children.	Student majoring in back-end development this year. Knowledgable in quantum physics, thermodynamics, hydrodynamics. Also knows how to build a rocket.	English / Chinese   	9859a4cb-a756-4be9-a832-48ebdaa3563c	Full-time           	\N	Los Angeles	f	2023-01-21 00:00:00+01	7100	2022-10-16 12:39:37+02	24	12
e086e6d8-21ba-4fa9-ab1a-4461031e42d9	Teacher	Teaches in a school for children.	Student majoring in back-end development this year. Knowledgable in quantum physics, thermodynamics, hydrodynamics. Also knows how to build a rocket.	French              	f248763a-5a45-4681-9a44-637ea4487aea	Part-time           	\N	Lyon	\N	2024-01-21 00:00:00+01	100	2022-10-16 19:36:50+02	1	50
\.


--
-- TOC entry 3616 (class 0 OID 16421)
-- Dependencies: 211
-- Data for Name: company_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company_table (company_id, company_name, reg_date, siret, company_desc, n_employees, hq_location, work_sector, company_mail, company_phone, n_followers, company_vip, company_pic, company_social, company_banner, language) FROM stdin;
146968fb-fa1a-453c-b992-a3346bd65766	Roxor	2022-10-04 10:07:36+02	50493821910004	\N	13500	Paris	Health / Food	friend_gato95@yopmail.com	\N	32	\N	\N	\N	\N	English
9859a4cb-a756-4be9-a832-48ebdaa3563c	Miam	2022-10-04 10:20:31+02	50493821910005	\N	9999	Cergy	Marketing / Agency	ball-teaser@yopmail.com	\N	56	\N	\N	\N	\N	French
f248763a-5a45-4681-9a44-637ea4487aea	Job'in	2022-10-04 10:13:18+02	50493821910004	\N	1	Paris	Banking / Finances	jobin_official@yopmail.com	\N	5904	\N	\N	\N	\N	English / French
91e7bb21-7e5a-433f-b577-bb45e6488ddd	API_UPDATE	2022-10-07 10:39:13+02	50493821910019	Change the world.	1	Paris	Hotel	API@gmaiL.com	0193201843  	0	1d0fd283-c5d7-4ee4-8e37-91f5fadaba6c	\\x	test.com	\\x	English
7be0b477-f63d-4384-992c-34446cc525e9	Tech Plus	2022-10-16 12:28:38+02	50493821910004	\N	13500	Lille	Tech	friend_gato95@yopmail.com	\N	32	\N	\N	\N	\N	English
\.


--
-- TOC entry 3619 (class 0 OID 16633)
-- Dependencies: 214
-- Data for Name: information_table; Type: TABLE DATA; Schema: public; Owner: danyleguy
--

COPY public.information_table (information_id, ad_id, user_id, reg_date, subject, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website, resume) FROM stdin;
6c209c3c-c3f7-4e2a-be30-0460cddd5fd6	\N	8a650d8a-8b6c-4e53-a302-5bc132cee141	2022-10-14 23:34:26+02	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
4b86a551-6c1f-446a-94cb-5a1df5d6ab45	\N	8a650d8a-8b6c-4e53-a302-5bc132cee141	2022-10-15 13:31:20+02	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
421ae955-8f7f-4171-acc2-f54a9afad86c	\N	afaa4df8-1892-431a-94c5-6d50edc9f62b	2022-10-15 13:40:30+02	Email: verify	\N	\N	\N	\N	\N	\N	\N	\N
d8f83a5d-291a-43e1-8e4a-da004946f2eb	\N	9556035f-90dd-4503-a9b8-92066f6e30fd	2022-10-15 13:42:06+02	Email: verify	\N	\N	\N	\N	\N	\N	\N	\N
319bad14-e811-4ac4-b261-7e29cbde1165	\N	\N	2022-10-16 12:10:27+02	Email: ResetPass	Jeanbert	Montis	Jeanbert-montis@yopmail.com	Montreuil	0101010101	Je suis doué en cuisine.		\N
8062acfa-5b2d-418d-9780-7ec9c3e4eab9	\N	\N	2022-10-16 12:13:34+02	Security check	null	null	null	null	null	null	null	\N
5c112663-20c9-496f-b126-38413bc2b519	\N	\N	2022-10-16 12:17:44+02	Security check with null items	\N	\N	\N	\N	\N	\N	\N	\N
3fc43d90-7817-44af-9f3e-dc399afedfd6	\N	\N	2022-10-16 12:18:48+02	2nd Security check with null items	\N	\N	\N	\N	\N	\N	\N	\N
87bce8d3-f996-49bf-9557-59d217031863	\N	385be482-5502-4953-82b7-15dabfa54b75	2022-10-16 20:40:41+02	Email: verify	\N	\N	\N	\N	\N	\N	\N	\N
7290dd76-9e00-4139-8b53-aa021748a611	\N	385be482-5502-4953-82b7-15dabfa54b75	2022-10-16 20:42:26+02	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- TOC entry 3618 (class 0 OID 16509)
-- Dependencies: 213
-- Data for Name: information_table_old; Type: TABLE DATA; Schema: public; Owner: danyleguy
--

COPY public.information_table_old (ad_id, user_id, reg_date, information_id, subject, firstname, lastname, apply_email, apply_location, apply_phone, apply_motivation, apply_website, resume) FROM stdin;
c4e54341-0a51-42f8-9cee-1f39719b4a6b	6da6242d-d001-4662-a59c-19225047d23a	2022-10-04 21:21:22+02	e7affc42-f341-450f-8330-ac9ac98dd7a0	\N	\N	\N	\N	\N	\N	\N	\N	\N
\N	4a30e965-12ba-4964-82d7-32b0397f7f36	2022-10-12 23:38:26+02	67055562-3469-4e8f-9835-423762b6b9a6	Email: verify	\N	\N	\N	\N	\N	\N	\N	\N
\N	4a30e965-12ba-4964-82d7-32b0397f7f36	2022-10-12 23:38:49+02	967ac495-d345-497e-a8de-3a9b4720c8de	Email: verify	\N	\N	\N	\N	\N	\N	\N	\N
\N	4a30e965-12ba-4964-82d7-32b0397f7f36	2022-10-13 09:00:14+02	6030b087-e23e-4a46-922d-7f4a4eaefbf6	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
\N	4a30e965-12ba-4964-82d7-32b0397f7f36	2022-10-13 09:01:01+02	1f1ecf93-e346-4f62-ac1d-ac63b8371539	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
\N	4a30e965-12ba-4964-82d7-32b0397f7f36	2022-10-13 09:14:24+02	c57356e0-2d8e-4a53-aa73-8d149381fae6	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
\N	4a30e965-12ba-4964-82d7-32b0397f7f36	2022-10-13 09:52:03+02	1dbb2e45-26d2-43dc-b3e7-0834e4ae48e6	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
\N	\N	2022-10-13 11:44:30+02	8ba0c2de-39be-408f-806e-f601b389a6fe	Job apply	check	\N	\N	\N	\N	\N	\N	\N
\N	\N	2022-10-13 11:47:17+02	c07b99dd-196a-4a09-afa0-82861441bb04	Job apply	post	\N	\N	\N	\N	\N	\N	\N
\N	9d1edcb9-0b66-433e-9a2f-3d5fc6b82f12	2022-10-13 12:02:13+02	a2e8123a-b34e-4aaf-ade9-2313f10a9736	Email: ResetPass	\N	\N	\N	\N	\N	\N	\N	\N
\N	\N	2022-10-13 15:08:25+02	8345c52f-3787-457b-b8aa-4a89213eb6af	Job apply	Jean	Dupont	jean.dupont@gmail.com	\N	0612346542	re<sgegsegsegswrshsr		\N
c4e54341-0a51-42f8-9cee-1f39719b4a6b	\N	2022-10-13 19:52:17+02	ebc77c05-bac4-4b2c-be36-ba0b152134e0	Job apply	mail_test	mail_testing	Terriblement_sorry@yopmail.com	\N	\N	\N	\N	\\x
c4e54341-0a51-42f8-9cee-1f39719b4a6b	\N	2022-10-13 19:54:16+02	328c43a2-43a9-4997-a83d-222b7b302a49	Job apply	mail_test	mail_testing	Terriblement_sorry@yopmail.com	\N	\N	\N	\N	\\x
\N	b1fbe97e-6c4c-42ff-b8b1-74c34bf8ad81	2022-10-13 20:29:27+02	45062dcc-7af6-413c-8ae7-c4592fb4bc02	Email: verify	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- TOC entry 3617 (class 0 OID 16428)
-- Dependencies: 212
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_table (user_id, firstname, lastname, user_pwd, age, resume, user_type, wanted_work, location, reg_date, user_email, user_phone, user_website, user_linkedin, user_social, newsletter, profile_pic, verified) FROM stdin;
b1fbe97e-6c4c-42ff-b8b1-74c34bf8ad81	Yupipo	Yopyop	$2b$10$sU7mMbBMdk1OjEtHWMO62uyJUhkivafJRjGataZSFP2ESnsoJjCX2	\N	\N	USR	\N	\N	2022-10-13 20:26:33+02	yupipo.yopyop@yopmail.com	\N	\N	\N	\N	f	\N	t
9d1edcb9-0b66-433e-9a2f-3d5fc6b82f12	Dany	Leguy	$2b$10$3Qf.VfCYSLF/3CHwmqfLvuH7tokvH3cNmDPwWCQthqxePnAyLsMvG	24	\N	ADM	\N	Cergy	2022-12-01 00:00:00+01	dany.leguy@epitech.eu	\N	\N	\N	\N	t	\N	t
4a30e965-12ba-4964-82d7-32b0397f7f36	Jeff	Jeffy	$2b$10$2Pb1oEBDoWzPBgeL.vTbGu19G2X8c1.WX1cQNC.AEcLE7/ClBrLTa	23	\N	USR	\N	\N	\N	mimigato95@yopmail.com	\N	\N	\N	\N	f	\N	t
8a650d8a-8b6c-4e53-a302-5bc132cee141	Staveee	Jar	$2b$10$R7pnI3qUHopOHySvoygP.emt6CsRh69mXzQyqEd6hWrymzVho37E6	\N	\N	USR	\N	\N	\N	rgeaaezgert.gersegnf@yopmail.com	\N	\N	\N	\N	\N	\N	\N
afaa4df8-1892-431a-94c5-6d50edc9f62b	New_user	I_Try_Reg	$2b$10$OnJhbD2v9LU.h0yU6w8XuuVsBdTzAXi6er.r8aBu.vM/kf4bx.r32	\N	\N	USR	\N	\N	2022-10-15 13:40:18+02	I_Try_Reg@yopmail.com	\N	\N	\N	\N	f	\N	t
9556035f-90dd-4503-a9b8-92066f6e30fd	George	Duville	$2b$10$GPFcWqqRGGQVMe8VdD62Yev8/8dMjQNdvIu7v/.Ud6MbGQg.O3ZZ.	\N	\N	USR	\N	\N	2022-10-15 13:41:51+02	George.duville@yopmail.com	\N	\N	\N	\N	f	\N	t
385be482-5502-4953-82b7-15dabfa54b75	Pierre	Léris	$2b$10$bV7pLgX.zxRHeXGpG64yA.Ed0x2PbYXf79ieJ5mxGMEUPvepV2u/e	\N	\N	USR	\N	\N	2022-10-16 20:39:32+02	Pierre.lerise@yopmail.com	\N	\N	\N	\N	f	\N	t
b8917c0e-ddb5-4ec8-910c-f4f8ca1a576f	Jean	Dupont	$2b$10$2o3Z.z62rpLxsL/.l/0AfuXCoX/4j1pXYniB2H97T8j.LUfi8B1sO	\N	\N	USR	\N	\N	2022-10-15 13:48:10+02	Jean.Dupont@yopmail.com	\N	\N	\N	\N	f	\N	f
8cb6c026-7e63-4f36-9a02-f75bfe84e4a4	Tadjresh	Montis	azertyuiop	51	\\x	USR	Mecanics	India	2022-12-12 00:00:00+01	meca.proTadj@yopmail.com	0612121212  	meca.proTadj.com			f	\N	t
1d0fd283-c5d7-4ee4-8e37-91f5fadaba6c	Martin	Monfils	$2b$10$qb42z8VPa30PN60EJaJo0OBsIKynRb9ybntsP3h/kQ4X1fUzP3o6q	\N	\N	RCT	\N	\N	2022-10-15 13:42:47+02	Martin.monfils@yopmail.com	\N	\N	\N	\N	f	\N	f
c715b731-0592-4ca1-a2fb-973fa61024bf	Monster_man	Figaro	$2b$10$VPWKjysKvL68zkGDxIOnMuhcDkOSU0QLd66T/4LGkT8VtI7KlhbQO	12	\N	RCT	None	Paris	2022-10-15 21:10:07+02	MonsterMan.Figaro@yopmail.com	null        	null	null	null	t	\N	t
6da6242d-d001-4662-a59c-19225047d23a	Frank	Sammyr	0987654321	21	\N	USR	null	Paris	2022-09-28 11:21:53+02	Frank.Sammyr@gmail.com	null        	null	null	Bonjour	t	\N	f
\.


--
-- TOC entry 3461 (class 2606 OID 16420)
-- Name: advertisement_table advertisement_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advertisement_table
    ADD CONSTRAINT advertisement_table_pkey PRIMARY KEY (ad_id);


--
-- TOC entry 3463 (class 2606 OID 16427)
-- Name: company_table company_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_table
    ADD CONSTRAINT company_table_pkey PRIMARY KEY (company_id);


--
-- TOC entry 3469 (class 2606 OID 16639)
-- Name: information_table information_table_new_pkey; Type: CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT information_table_new_pkey PRIMARY KEY (information_id);


--
-- TOC entry 3467 (class 2606 OID 16513)
-- Name: information_table_old information_table_pkey; Type: CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table_old
    ADD CONSTRAINT information_table_pkey PRIMARY KEY (information_id);


--
-- TOC entry 3465 (class 2606 OID 16434)
-- Name: user_table user_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3472 (class 2606 OID 16514)
-- Name: information_table_old ad_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table_old
    ADD CONSTRAINT ad_id FOREIGN KEY (ad_id) REFERENCES public.advertisement_table(ad_id) ON DELETE CASCADE;


--
-- TOC entry 3474 (class 2606 OID 16640)
-- Name: information_table ad_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT ad_id FOREIGN KEY (ad_id) REFERENCES public.advertisement_table(ad_id) ON DELETE CASCADE;


--
-- TOC entry 3470 (class 2606 OID 16486)
-- Name: advertisement_table company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advertisement_table
    ADD CONSTRAINT company_id FOREIGN KEY (company_id) REFERENCES public.company_table(company_id) ON DELETE CASCADE;


--
-- TOC entry 3471 (class 2606 OID 16536)
-- Name: company_table company_vip; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_table
    ADD CONSTRAINT company_vip FOREIGN KEY (company_vip) REFERENCES public.user_table(user_id);


--
-- TOC entry 3473 (class 2606 OID 16519)
-- Name: information_table_old user_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table_old
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.user_table(user_id) ON DELETE CASCADE;


--
-- TOC entry 3475 (class 2606 OID 16645)
-- Name: information_table user_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.user_table(user_id) ON DELETE CASCADE;


--
-- TOC entry 2051 (class 826 OID 16455)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO danyleguy;


-- Completed on 2022-10-16 21:45:44 CEST

--
-- PostgreSQL database dump complete
--
