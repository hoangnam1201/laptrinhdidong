import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import Row from "./row";

const BusList = () => {
  const { state, dispatch } = useContext(AppContext);
  const getAllBuses = useCallback(async () => {
    try {
      const fetch = {
        method: "get",
        url: "https://busapbe.herokuapp.com/api/buses/get-all",
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      const response = await axios(fetch);

      const buses = response.data;
      console.log(buses);
      dispatch({ type: "GET_ALL_BUS", payload: buses });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getAllBuses();
  }, [getAllBuses]);

  const showListBuses = () => {
    const buslist = state.bus;
    var result = null;
    if (buslist.length > 0) {
      result = buslist.map((bus) => {
        return <Row key={bus._id} bus={bus} />;
      });
    }
    return result;
  };

  return (
    <>
      <TableContainer className="light-grey-bg" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>OperatingTime</TableCell>
              <TableCell>TimeDistance</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Prices</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Action</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody className="bg-white">{showListBuses()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BusList;
