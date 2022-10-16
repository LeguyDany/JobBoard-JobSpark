--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-10-14 12:39:44 CEST

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
-- TOC entry 3620 (class 0 OID 0)
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
-- TOC entry 3621 (class 0 OID 0)
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
-- TOC entry 3622 (class 0 OID 0)
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
-- TOC entry 214 (class 1259 OID 16633)
-- Name: information_table_new; Type: TABLE; Schema: public; Owner: danyleguy
--

CREATE TABLE public.information_table_new (
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


ALTER TABLE public.information_table_new OWNER TO danyleguy;

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
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 212
-- Name: TABLE user_table; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.user_table IS 'Tableau Users (rechercheur d''emplois, recruteurs, admins)';


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
-- Name: information_table_new information_table_new_pkey; Type: CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table_new
    ADD CONSTRAINT information_table_new_pkey PRIMARY KEY (information_id);


--
-- TOC entry 3467 (class 2606 OID 16513)
-- Name: information_table information_table_pkey; Type: CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT information_table_pkey PRIMARY KEY (information_id);


--
-- TOC entry 3465 (class 2606 OID 16434)
-- Name: user_table user_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_table
    ADD CONSTRAINT user_table_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3472 (class 2606 OID 16514)
-- Name: information_table ad_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT ad_id FOREIGN KEY (ad_id) REFERENCES public.advertisement_table(ad_id) ON DELETE CASCADE;


--
-- TOC entry 3474 (class 2606 OID 16640)
-- Name: information_table_new ad_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table_new
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
-- Name: information_table user_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.user_table(user_id) ON DELETE CASCADE;


--
-- TOC entry 3475 (class 2606 OID 16645)
-- Name: information_table_new user_id; Type: FK CONSTRAINT; Schema: public; Owner: danyleguy
--

ALTER TABLE ONLY public.information_table_new
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.user_table(user_id) ON DELETE CASCADE;


--
-- TOC entry 2051 (class 826 OID 16455)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO danyleguy;


-- Completed on 2022-10-14 12:39:44 CEST

--
-- PostgreSQL database dump complete
--

