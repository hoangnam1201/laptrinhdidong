import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import Row from "./row";
import axios from "axios";

const BusStopList = () => {
  const { state, dispatch } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getAllBusStops = useCallback(async () => {
    try {
      const fetch = {
        method: "get",
        url: "https://busapbe.herokuapp.com/api/busstops/get-all",
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      const response = await axios(fetch);

      const busstop = response.data;
      console.log(busstop);
      dispatch({ type: "GET_ALL_BUSSTOPS", payload: busstop });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getAllBusStops();
  }, [getAllBusStops]);
  const showListBusStops = () => {
    const busStopList = state.busstop;
    var result = null;
    if (busStopList.length > 0) {
      console.log(page)
      console.log(rowsPerPage)
      result = busStopList
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((busstop) => {
          return <Row key={busstop._id} busstop={busstop} />;
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
              <TableCell>Name</TableCell>
              <TableCell>Location Name</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longtidude</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white">{showListBusStops()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Tất cả", value: -1 }]}
                count={state.busstop.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { style: { lineHeight: "16px" } },
                }}
                onChangePage={(e, page) => setPage(page)}
                onChangeRowsPerPage={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
export default BusStopList;
