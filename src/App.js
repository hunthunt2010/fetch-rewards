import React, { useEffect, useReducer } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import DataList from "./components/DataList";
import formatData from "./utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchDataSuccess":
      return { ...state, data: action.data };
    default:
      return { ...state, message: "Error fetching data" };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { data: [] });
  useEffect(() => {
    async function fetchData() {
      try {
        const results = await fetch(
          "https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json"
        );
        const parsedResults = await results.json();
        dispatch({ type: "fetchDataSuccess", data: parsedResults });
      } catch (e) {
        console.log("error fetching data", e);
        dispatch({ type: "fetchDataError" });
      }
    }
    if (!state.data.length && !state.message) {
      fetchData();
    }
  }, [state]);

  const formattedData = formatData(state.data);
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        {state.data.length ? (
          <DataList data={formattedData} />
        ) : (
          state.message || "Loading"
        )}
      </Container>
    </div>
  );
};

export default App;
