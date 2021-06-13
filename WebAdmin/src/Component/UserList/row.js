import { Button, TableCell, TableRow } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import axios from "axios";
import ConfirmDelete from "../common/ConfirmDeleteForm";
import DeleteIcon from "@material-ui/icons/Delete";

const Row = ({ user }) => {
  const { dispatch } = useContext(AppContext);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleDelete = () => {
    setDeleteDialog(true);
  };

  const deleteUser = async () => {
    try {
      const fetch = {
        method: "delete",
        url: `https://busapbe.herokuapp.com/api/users/delete/${user._id}`,
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      await axios(fetch);
      dispatch({ type: "DELETE_ONE_POSTS", payload: { _id: user._id } });
      setDeleting(false);
      setDeleteDialog(false);
      console.log(user._id);
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    deleteUser();
  };
  return (
    <>
      <ConfirmDelete
        open={deleteDialog}
        label="User"
        warning="Xóa user vĩnh viễn. Không thể khôi phục."
        name={user.username}
        onClose={() => setDeleteDialog(false)}
        loading={deleting}
        onSubmit={onDelete}
      />
      <TableRow hover style={{ transform: "scale(1)" }}>
        <TableCell align="center" className="border-right">
          {user.username}
        </TableCell>
        <TableCell align="center" className="border-right">
          {user.email}
        </TableCell>
        <TableCell
          style={{
            height: "71px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "300px",
            display: "block",
            overflow: "hidden",
          }}
          align="center"
          className="border-right"
        >
          {user.password}
        </TableCell>
        <TableCell align="center" className="border-right">
          {user.role}
        </TableCell>
        <TableCell align="center" className="border-right">
          <Button
            onClick={() => handleDelete(user._id)}
            color="secondary"
            variant="contained"
          >
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
export default Row;
