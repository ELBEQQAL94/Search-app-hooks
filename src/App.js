import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("Query");
  const [url, setUrl] = useState(
    `http://hn.algolia.com/api/v1/search?query=redux`
  );

  // loading indicator..
  const [isLoading, setIsLoading] = useState(false);

  // handling error
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data.hits);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    };
    fetchdata();
  }, [url]);

  return (
    <div className="App">
      <form
        onSubmit={e => {
          e.preventDefault();
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <div className="form-group mb-3">
          <input
            className="form-control"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
      {isError && (
        <div className="alert alert-warning" role="alert">
          A simple warning alert—check it out!
        </div>
      )}
      <ul className="list-group">
        {data ? (
          isLoading ? (
            <li className="list-group-item">
            <div className="spinner-border text-center" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            </li>
          ) : (
            data.map(item => (
              <li className="list-group-item" key={item.ObjectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))
          )
        ) : (
          <h1>No News!</h1>
        )}
      </ul>
    </div>
  );
}

export default App;
