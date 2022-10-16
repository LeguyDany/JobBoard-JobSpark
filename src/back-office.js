import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './css/index.css';
import './css/back_office.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dburl from './index.js';

function Table() {

  const [num_page, setNum_page] = useState([]);
  const [Table, setTable] = useState("");
  const [page, setPage] = useState("");
  const [table_header, setTable_header] = useState();
  const [table_body, setTable_body] = useState();
  const navigate = useNavigate();

  // ==================================== DATA TABLE ====================================

  const getTable = async (e) => {
    try {
      e.preventDefault()
      const url = dburl + `api/${Table}/all`;
      const res = await axios.get(url);

      // Filling up the table according to the page number.
      let total_content = [];
      let page_content = [];
      for (const item of res.data) {
        page_content.push(item)
        if (page_content.length % 10 == 0) {
          total_content.push(page_content);
          page_content = [];
        }
        if (page_content.length + total_content.length * 10 == res.data.length) {
          total_content.push(page_content);
        }
      }
      setNum_page(res.data.length);
      setTable_header(create_table_cells_header(total_content[0][0]));
      setTable_body(create_row(total_content[0]));

      // Page numbering
      let num = [];
      for (let i = 0; i < total_content.length; i++) {
        num.push(React.createElement("button", {
          onClick: (e) => {
            setTable_body(create_row(total_content[i]));
          }, key: i + 1
        }, i + 1));
      }
      setPage(num);

    } catch (error) {
      console.log("Could not load data.");
    }

  }
  const create_table_cells_header = (container) => {
    let cells = [React.createElement("th", { key: "Action" }, "Action")];
    for (const item in container) {
      cells.push(React.createElement("th", { key: item + "create_table_cells_header" }, item))
    }
    return cells
  }
  const create_table_cells_content = (container) => {
    const id = container[Object.keys(container)[0]]
    const actions = [
      React.createElement("a", { key: "SeeMore", href: "See_all/" + id + `/${Table}` }, "See all"),
      React.createElement('br', { key: "br_SeeMore" }),
      React.createElement("a", { key: "Edit", href: "Edit/" + id + `/${Table}` }, "Edit"),
      React.createElement('br', { key: "br_Edit" }),
      React.createElement("a", { key: "Remove", href: "Remove/" + id + `/${Table}` }, "Remove")
    ]
    let cells = [React.createElement("td", { key: "action" }, actions)];


    for (const item in container) {
      if (container[item] == null) { container[item] = "—" };
      if (container[item].length > 40) { container[item] = container[item].substring(0, 35) + "..." }

      cells.push(React.createElement("td", { key: item + "create_table_cells_content" }, container[item].toString()))
    }
    return [cells, id]
  }
  const create_row = (container) => {
    let cells = [];

    for (const item in container) {
      cells.push(React.createElement("tr", { key: item + "create_row", id: create_table_cells_content(container[item])[1] }, create_table_cells_content(container[item])[0]))
    }
    return cells;
  }
  const checkUserType = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem("token");
    const url = dburl + "auth/user_type";
    const res = await axios.get(url);
    return res.data;
  }

  useEffect(() => {
    const loadData = async () => {
      await getTable();
      const user = await checkUserType();

      if (user != "ADM") {
        navigate("/");
        navigate(0);
      }
    }
    loadData()
  }, [])

  return (
    <section>
      <article>
        <h1>What are you looking for?</h1>
        <div className="yellow0"></div>
        <input name="query" id="query" className="" placeholder="User, DB, Ad, Company..." />
      </article>

      <div id="Bo_filters">
        <form onSubmit={async e => { await getTable(e); }}>
          <button type="button" onClick={() => navigate(`/Add_new/${Table}`)}>Add new</button>
          <select name="table_select" id="table_select" onChange={e => { setTable(e.target.value); }}>
            <option value="">--Please choose a table--</option>
            <option value="users">Users</option>
            <option value="companies">Companies</option>
            <option value="advertisement">Offers</option>
            <option value="information">Information</option>
          </select>
          <button>Search</button>
        </form>
        <p>Found <b>{num_page}</b> result(s).</p>
      </div>

      <div className="sectionDB">
        <table>
          <thead className="tableDB">
            <tr>
              {table_header}
            </tr>
          </thead>
          <tbody>
            {table_body}
          </tbody>
        </table>
      </div>

      <div className="page_numbering">
        {page}
      </div>

    </section>
  )
}

export function Bo_listing() {
  return (
    <section>
      <Table />
    </section>
  )
}

export default Bo_listing;

export function See_all() {

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
      if (typeof (container[item]) == "object" && JSON.stringify(container[item]).length > 500) {
        container[item] = "Image / PDF"
      } else if (typeof (container[item]) == "object") { container[item] = JSON.stringify(container[item]) }
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

  const [data, setData] = useState("");
  const [back_response, setBack_response] = useState("")
  const params = useParams();

  const getData = async () => {
    const url = `${dburl}api/${params["table"]}/${params["id"]}`;
    const res = await axios.get(url);
    setData(res.data);
  }

  const updateData = (u_data, key, new_value) => {
    u_data[key] = new_value;
    setData([u_data]);
  }

  const single_row = (container) => {
    let elements = [];
    for (const item in container) {
      if (typeof (container[item]) == "object" && JSON.stringify(container[item]).length > 500) {
        container[item] = "Image / PDF"
      } else if (typeof (container[item]) == "object") { container[item] = JSON.stringify(container[item]) }

      elements.push(React.createElement("tr", { key: item },
        [React.createElement("th", { key: item + "th" }, item),
        React.createElement("td", { key: item + "td" },
          React.createElement("input", {
            type: "text", id: item, name: item, value: data[0][item], key: item + "input",
            onChange: e => updateData(container, item, e.target.value)
          })
        ),]));
    }
    return elements;
  }

  const submitChanges = async () => {
    const url = `${dburl}api/${params["table"]}/back_office/${params["id"]}`;
    const res = await axios.put(url, data[0])
    setBack_response(React.createElement("p", {}, res.data));
  }

  useEffect(() => {
    const loadData = async () => {
      await getData();
    }

    loadData()
  }, [])

  return (
    <section>
      <h1 className="Bo_title">Edit: {params["table"]}</h1>
      <div id="Bo_layout">
        <table>
          <tbody>
            {single_row(data[0])}
          </tbody>
        </table>
        <button onClick={e => submitChanges()}>Save changes</button>
        {back_response}
      </div>

    </section>
  )
}

export function Remove() {

  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    const url = `${dburl}api/${params["table"]}/${params["id"]}`;
    const res = await axios.delete(url);
    return (res.data);
  }

  useEffect(() => {
    const loadData = async () => {
      await getData();
      navigate("/Back-office");
    }
    loadData()
  }, [])

}

export function Add_new() {
  const [data, setData] = useState("");
  const [back_response, setBack_response] = useState("")
  const [formData, setFormData] = useState("");
  const params = useParams();

  const getData = async () => {
    const url = `${dburl}api/${params["table"]}/all`;
    const res = await axios.get(url);
    setData(res.data);
  }

  const updateData = (u_data, key, new_value) => {
    u_data[key] = new_value;
    setFormData([u_data]);
  }

  const single_row = (container) => {
    let elements = [];
    for (const item in container) {
      if (typeof (container[item]) == "object" && JSON.stringify(container[item]).length > 500) {
        container[item] = "Image / PDF"
      } else if (typeof (container[item]) == "object") { container[item] = JSON.stringify(container[item]) }

      elements.push(React.createElement("tr", { key: item },
        [React.createElement("th", { key: item + "th" }, item),
        React.createElement("td", { key: item + "td" },
          React.createElement("input", {
            type: "text", id: item, name: item, value: container[item], key: item + "input",
            onChange: e => updateData(container, item, e.target.value)
          })
        ),]));
    }
    return elements;
  }

  const submitChanges = async () => {
    const url = `${dburl}api/${params["table"]}/back_office/`;
    const res = await axios.post(url, formData[0])
    setBack_response(React.createElement("p", {}, res.data));
  }

  useEffect(() => {
    const loadData = async () => {
      await getData();
    }

    loadData()
  }, [])

  return (
    <section>
      <h1 className="Bo_title">Add new: {params["table"]}</h1>
      <p className="Bo_title">Notes: Main IDs and registration dates will be automatically filled.</p>
      <div id="Bo_layout">
        <table>
          <tbody>
            {single_row(data[0])}
          </tbody>
        </table>
        <button onClick={e => submitChanges()}>Add</button>
        {back_response}
      </div>
    </section>
  )
}