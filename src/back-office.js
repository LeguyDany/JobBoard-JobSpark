import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './css/index.css';
import './css/back_office.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dburl from './index.js';
import { PassThrough } from 'nodemailer/lib/xoauth2';



function BoSearch() {
  return (
    <article>
      <h1>What are you looking for?</h1>
      <div className="yellow0"></div>
      <input name="query" id="query" className="" placeholder="User, DB, Ad, Company..." />
    </article>
  )
}

function Table() {

  const [dataTable, setDataTable] = useState("");

  const getTable = async () => {
    const url = dburl + "api/users/all";
    const res = await axios.get(url);
    setDataTable(res.data);
  }

  const create_table_cells_header = (container, type) => {
    let cells = [React.createElement("th", { key: "Action" }, "Action")];
    for (const item in container) {
      cells.push(React.createElement("th", { key: item }, item))
    }
    return cells
  }
  const create_table_cells_content = (container) => {
    const id = container[Object.keys(container)[0]]
    const actions = [
      React.createElement("a", { key: "See more", href: "See_more/" + id + "/users" }, "See more"),
      React.createElement('br'),
      React.createElement("a", { key: "Edit", href: "Edit/" + id }, "Edit"),
      React.createElement('br'),
      React.createElement("a", { key: "Remove", href: "Remove/" + id }, "Remove")
    ]
    let cells = [React.createElement("td", { key: "action" }, actions)];


    for (const item in container) {
      if (container[item] == null) { container[item] = "—" };
      if (container[item].length > 40) { container[item] = container[item].substring(0, 35) + "..." }

      cells.push(React.createElement("td", { key: item }, container[item].toString()))
    }
    return [cells, id]
  }

  const create_row = (container) => {
    let cells = [];

    for (const item in container) {
      cells.push(React.createElement("tr", { key: item, id: create_table_cells_content(container[item])[1] }, create_table_cells_content(container[item])[0]))
    }
    return cells;
  }

  useEffect(() => {
    const loadData = async () => {
      await getTable();
    }
    loadData()
  }, [])

  return (

    <section>

      <div className="sectionDB">
        <table>

          <thead className="tableDB">
            <tr>
              {create_table_cells_header(dataTable[0])}
            </tr>
          </thead>
          <tbody>
            {create_row(dataTable)}
          </tbody>

        </table>
      </div>

    </section>
  )
}

export function Bo_listing() {
  return (
    <section>
      <BoSearch />
      <Table />
    </section>
  )
}

export default Bo_listing;

export function See_more() {

  const [data, setData] = useState("");
  const params = useParams();

  const getData = async () => {
    const url = `${dburl}api/${params["table"]}/${params["id"]}`;
    const res = await axios.get(url);
    setData(res.data);
  }

  const single_row = (container) => {
    let elements = [];
    for (const item in container) {
      elements.push(React.createElement("tr", { key: item },
        [React.createElement("th", {}, item),
        React.createElement("td", {}, container[item])]));
    }
    return elements;
  }

  useEffect(() => {
    const loadData = async () => {
      await getData();
    }
    loadData()
  }, [])

  return (
    <section>
      <div id="Bo_layout">
        <table>
          <tbody>
            {single_row(data[0])}
          </tbody>
        </table>
      </div>



    </section>

  )
}

export function Edit() {

  return (
    <p>Edit</p>
  )
}

export function Remove() {

  return (
    <p>Remove</p>
  )
}