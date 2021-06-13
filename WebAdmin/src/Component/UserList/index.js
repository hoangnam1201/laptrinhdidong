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
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import Row from "./row";

const UserList = () => {
  const { state, dispatch } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getAllUser = useCallback(async () => {
    try {
      const fetch = {
        method: "get",
        url: "https://busapbe.herokuapp.com/api/users/get-all",
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      const response = await axios(fetch);

      const posts = response.data;
      console.log(posts);
      dispatch({ type: "GET_ALL_POSTS", payload: posts });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const showListUser = () => {
    const userlist = state.posts;
    var result = null;
    if (userlist.length !== 0) {
      if (rowsPerPage > 0) {
        result = userlist
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user) => {
            return <Row key={user._id} user={user} />;
          });
      }
    }
    return result;
  };

  return (
    <>
      <TableContainer className="light-grey-bg" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FullName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white">{showListUser()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Tất cả", value: -1 }]}
                count={state.posts.length}
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
export default UserList;
