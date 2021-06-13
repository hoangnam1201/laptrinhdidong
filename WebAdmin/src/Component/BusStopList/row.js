import {
  Button,
  Drawer,
  List,
  ListItem,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import axios from "axios";
import ConfirmDelete from "../common/ConfirmDeleteForm";
import DeleteIcon from "@material-ui/icons/Delete";

import EditIcon from "@material-ui/icons/Edit";
const Row = ({ busstop }) => {
  const { dispatch } = useContext(AppContext);
  const [openToEditForm, setOpenToEditForm] = useState(false);
  const [busStopToEdit, setBusStopToEdit] = useState(busstop);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setOpenToEditForm(open);
  };
  const updateBusStop = async () => {
    try {
      const fetch = {
        method: "put",
        url: `https://busapbe.herokuapp.com/api/busstops/update/${busstop._id}`,
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
        data: busStopToEdit,
      };
      await axios(fetch);
      dispatch({ type: "UPDATE_ONE_BUSSTOPS", payload: { ...busStopToEdit } });
      setOpenToEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = () => {
    setDeleteDialog(true);
  };
  const deleteBusStops = async () => {
    try {
      const fetch = {
        method: "delete",
        url: `https://busapbe.herokuapp.com/api/busstops/delete/${busstop._id}`,
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      await axios(fetch);
      dispatch({ type: "DELETE_ONE_BUSSTOPS", payload: { _id: busstop._id } });
      setDeleting(false);
      setDeleteDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    deleteBusStops();
  };

  return (
    <>
      <ConfirmDelete
        open={deleteDialog}
        label="Trạm xe"
        warning="Xóa trạm xe vĩnh viễn. Không thể khôi phục."
        name={busstop.name}
        onClose={() => setDeleteDialog(false)}
        loading={deleting}
        onSubmit={onDelete}
      />
      <Drawer
        anchor="right"
        open={openToEditForm}
        onClose={toggleDrawer(false)}
      >
        <div className="detail-form__wrapper">
          <header className="detail-form__header">
            <h5>Update trạm xe</h5>
          </header>
          <form
          // onKeyDown={handleEnterKey}
          >
            <TextField
              className="w-100 mt-3"
              label="Name"
              name="name"
              value={busStopToEdit.name}
              onChange={(e) => {
                setBusStopToEdit({ ...busStopToEdit, name: e.target.value });
              }}
            />
            <TextField
              className="w-100 mb-2"
              label="Location Name"
              name="locationName"
              value={busStopToEdit.locationName}
              onChange={(e) => {
                setBusStopToEdit({
                  ...busStopToEdit,
                  locationName: e.target.value,
                });
              }}
            />
            <TextField
              className="w-100 mb-2"
              label="Latitude"
              name="latitude"
              value={busStopToEdit.latitude}
              onChange={(e) => {
                setBusStopToEdit({
                  ...busStopToEdit,
                  latitude: e.target.value,
                });
              }}
            />
            <TextField
              className="w-100 mb-2"
              label="Longitude"
              name="longitude"
              value={busStopToEdit.longitude}
              onChange={(e) => {
                setBusStopToEdit({
                  ...busStopToEdit,
                  longitude: e.target.value,
                });
              }}
            />
            <TextField
              className="w-100 mb-2"
              label="Buses"
              name="buses"
              value={busStopToEdit.buses}
              onChange={(e) => {
                setBusStopToEdit({ ...busStopToEdit, buses: [e.target.value] });
              }}
            />

            <Button
              fullWidth
              className="mt-2"
              variant="contained"
              color="primary"
              onClick={updateBusStop}
            >
              Update
            </Button>
            <Button
              fullWidth
              className="mt-2"
              variant="contained"
              color="primary"
              onClick={() => setOpenToEditForm(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Drawer>
      <TableRow hover style={{ transform: "scale(1)" }}>
        <TableCell align="center" className="border-right">
          {busstop.name}
        </TableCell>
        <TableCell align="center" className="border-right">
          {busstop.locationName}
        </TableCell>
        <TableCell align="center" className="border-right">
          {busstop.latitude}
        </TableCell>
        <TableCell align="center" className="border-right">
          {busstop.longitude}
        </TableCell>
        <TableCell align="center" className="border-right">
          <Button
            // onClick={() => handleDelete(bus._id)}
            color="primary"
            variant="contained"
            onClick={toggleDrawer(true)}
          >
            <EditIcon />
          </Button>
        </TableCell>
        <TableCell align="center" className="border-right">
          <Button
            onClick={() => handleDelete(busstop._id)}
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
