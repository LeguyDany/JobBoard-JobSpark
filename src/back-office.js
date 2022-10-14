import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/back_office.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dburl from './index.js';
import Select from 'react-select'
import { render } from '@testing-library/react';

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
    const url = dburl + "api/advertisement/all";
    const res = await axios.get(url);
    // Object.keys(res.data[0]).forEach((key, index) => {
    //   console.log(key)
    // })
    setDataTable(res.data);
  }

  const test = (container) => {
    let cells = [];
    for (const item in container) {
      cells.push(React.createElement("td", {}, item))
    }
    return cells
  }

  useEffect(() => {
    const loadData = async () => {
      await getTable();
    }
    loadData()
  }, [])

  return (

    <section>
      <table>

        <thead>
          <tr>
            {test(dataTable[0]).map()}
          </tr>
        </thead>

      </table>

    </section>
  )
}

function Bo_listing() {
  return (
    <section>
      <BoSearch />
      <Table />
      <div className="backoffice-container">
      </div>
    </section>
  )
}

export default Bo_listing;