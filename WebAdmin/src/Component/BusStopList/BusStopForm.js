import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import AppContext from "../AppContext";
import addbusstop from "../assets/busstop.png";
import axios from "axios";

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
`;

const BusStopForm = () => {
  const { dispatch } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [busStopInput, setBusStopInput] = useState({
    name: "",
    locationName: "",
    latitude: "",
    longitude: "",
    buses: [],
  });
  const onchangeHandle = (e) => {
    setBusStopInput({ ...busStopInput, [e.target.name]: e.target.value });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const fetch = {
        method: "post",
        url: "https://busapbe.herokuapp.com/api/busstops/add",
        headers: {
          Authorization: "token " + localStorage.getItem("accessToken"),
        },
        data: busStopInput,
      };
      const busstop = await axios(fetch);
      dispatch({ type: "CREATE_ONE_BUSSTOPS", payload: { busstop } });
      console.log(busstop);
      alert("add success!!");
    } catch (err) {
      setErrorMessage(err.response.data.err);
    }
  };

  return (
    <div className="d-flex">
      <form
      // onKeyDown={handleEnterKey}
      >
        {errorMessage &&
          (Array.isArray(errorMessage) ? (
            errorMessage.map((err) => (
              <div className="error-message">Error: {err}</div>
            ))
          ) : (
            <div className="error-message">Error: {errorMessage}</div>
          ))}

        <TextField
          className="w-100 mt-3"
          label="Name"
          name="name"
          value={busStopInput.name}
          onChange={onchangeHandle}
        />
        <TextField
          className="w-100 mt-3 mb-2"
          label="Location Name"
          name="locationName"
          value={busStopInput.locationName}
          onChange={onchangeHandle}
        />
        <TextField
          className="w-100 mt-3 mb-2"
          label="Latitude"
          name="latitude"
          value={busStopInput.latitude}
          onChange={onchangeHandle}
        />
        <TextField
          className="w-100 mt-3 mb-2"
          label="Longitude"
          name="longitude"
          value={busStopInput.longitude}
          onChange={onchangeHandle}
        />
        <Button
          fullWidth
          className="mt-2"
          variant="contained"
          color="primary"
          // onClick={handleLogin}
          // onKeyDown={handleEnterKey}
          // disabled={loading}
          onClick={submitHandle}
        >
          Submit
        </Button>
      </form>
      <img className="w-50 h-50" src={addbusstop} alt="addbus" />
    </div>
  );
};
export default BusStopForm;
