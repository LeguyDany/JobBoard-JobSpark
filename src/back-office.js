import "./css/back-office.css";

function Filter() {
  return (
    <aside>
      BONJOUR
    </aside>
  )
}

function Head_query() {
  return (
    <article>
      <h1>What are you looking for?</h1>
      <div className="yellow0"></div>
      <input name="query" id="query" className="" placeholder="Enter keywords, the sector, the company’s name..." />
    </article>
  )
}

function Bo_listing() {
  return (
    <section>
      <Head_query />
      <Filter />
    </section>
  )
}

export default Bo_listing;