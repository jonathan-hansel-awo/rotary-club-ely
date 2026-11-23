"use client";

import { useState } from "react";
import { routeDate, routes, streetIndex } from "@/lib/christmas/routes";
import styles from "./christmas.module.css";

// Ignore punctuation so, for example, St Martin's and St Martins both work.
const normalise = (value: string) => value.toLocaleLowerCase("en-GB").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

export default function RouteFinder() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [view, setView] = useState<"dates" | "streets">("dates");
  const term = normalise(query);
  const matchingStreets = streetIndex.filter(entry => normalise(entry.street).includes(term) && (!date || entry.days.includes(Number(date))));
  const matchingDays = new Set(matchingStreets.flatMap(entry => entry.days));
  const matchingRoutes = routes.filter(route => (!date || route.day === Number(date)) && (!term || matchingDays.has(route.day)));

  function showRoute(day: number) {
    setQuery("");
    setDate("");
    setView("dates");
    // The result view is replaced with the evening list before focusing it.
    requestAnimationFrame(() => {
      const route = document.getElementById(`route-${day}`);
      if (route instanceof HTMLDetailsElement) {
        route.open = true;
        route.scrollIntoView({ block: "start" });
        route.querySelector("summary")?.focus({ preventScroll: true });
      }
    });
  }

  return (
    <div className={styles.finder}>
      <div className={styles.filters}>
        <div className={styles.searchField}>
          <label htmlFor="christmas-street">Your street name</label>
          <div className={styles.searchInput}>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
            <input type="search" id="christmas-street" placeholder="Try Cromwell Road or High Barns…" value={query} onChange={event => setQuery(event.target.value)} aria-describedby="route-search-help" />
          </div>
        </div>
        <div className={styles.dateField}>
          <label htmlFor="christmas-date">Collection date</label>
          <select id="christmas-date" value={date} onChange={event => setDate(event.target.value)}>
            <option value="">All December dates</option>
            {routes.map(route => <option key={route.day} value={route.day}>{routeDate(route.day)}</option>)}
          </select>
        </div>
      </div>
      <p id="route-search-help" className={styles.help}>Some roads are split between evenings. Check the road section shown. Visits are between 6pm and around 8pm; individual street times are approximate.</p>
      <div className={styles.finderToolbar}>
        <div className={styles.viewSwitch} role="group" aria-label="Route view">
          <button type="button" aria-pressed={view === "dates"} onClick={() => setView("dates")}>By evening</button>
          <button type="button" aria-pressed={view === "streets"} onClick={() => setView("streets")}>A–Z streets</button>
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className={styles.resultCount}>
          {matchingStreets.length === 0 ? "No matching streets" : term || date || view === "streets" ? `${matchingStreets.length} matching street ${matchingStreets.length === 1 ? "entry" : "entries"}` : "12 evenings of Christmas cheer"}
        </p>
        {query || date ? <button type="button" className={styles.reset} onClick={() => { setQuery(""); setDate(""); }}>Clear filters</button> : null}
      </div>
      {matchingStreets.length === 0 ? (
        <div className={styles.empty}>
          <h3>We couldn’t find that street.</h3>
          <p>Try a shorter name or clear the date filter. You can also meet us on Ely High Street on 12 or 19 December, or support the collection online.</p>
        </div>
      ) : view === "streets" || term ? (
        <div className={styles.streetResults}>
          {matchingStreets.map(entry => (
            <div className={styles.streetResult} key={entry.street}>
              <h3>{entry.street}</h3>
              <div>{entry.days.filter(day => !date || day === Number(date)).map(day => <a key={day} href={`#route-${day}`} onClick={event => { event.preventDefault(); showRoute(day); }}>{routeDate(day)}</a>)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.routes}>
          {matchingRoutes.map(route => (
            <details className={styles.route} key={route.day} id={`route-${route.day}`}>
              <summary>
                <span className={styles.dateTile}><strong>{route.day}</strong><span>DEC</span></span>
                <span className={styles.routeTitle}><strong>{route.weekday} {route.day} December</strong><span>{route.streets[0]} · {route.streets[1]} · {route.streets[2]}{route.streets.length > 3 ? "…" : ""}</span></span>
                <span className={styles.routeTime}>6pm–8pm approx.</span>
                <span className={styles.expand} aria-hidden="true">+</span>
              </summary>
              <div className={styles.routeBody}>
                <p>Streets visited in approximately this order.</p>
                {route.note ? <p><strong>{route.note}</strong></p> : null}
                <ol>{route.streets.map(street => <li key={street}>{street}</li>)}</ol>
                {route.day === 9 ? <p className={styles.routeNote}>The alphabetical list also includes Gilbert Scott Drive and Kings Avenue (from Lynn Road to Bentham Way) on this evening. Their position in the route is not specified.</p> : null}
              </div>
            </details>
          ))}
        </div>
      )}
      <noscript><p>For a complete street index, download the alphabetical list below. The evening routes are also listed on this page.</p></noscript>
    </div>
  );
}
