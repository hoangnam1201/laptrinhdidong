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
import UpIcon from "@material-ui/icons/ArrowUpward";
import TimeLineIcon from "@material-ui/icons/Timeline";

const Row = ({ bus }) => {
  const { dispatch } = useContext(AppContext);
  const [openToEditForm, setOpenToEditForm] = useState(false);
  const [busToEdit, setBusToEdit] = useState(bus);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [busStopName, setBusSTopName] = useState("");
  const [busStops, setBusStops] = useState([]);
  const [point, setPoint] = useState({ id: "", latitude: "", longitude: "" });
  const [errAddPoint, setErrAddPoint] = useState("");

  const toggleDrawer = (open) => (event) => {
    setOpenToEditForm(open);
    loadBusStop();
  };
  const loadBusStop = async () => {
    setPoint({ id: "", latitude: "", longitude: "" });
    try {
      const fetch = {
        method: "get",
        url: `https://busapbe.herokuapp.com/api/buses/get-by-id/${bus._id}`,
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      const response = await axios(fetch);
      setBusStops(response.data.busstops)
          setBusToEdit({
            ...busToEdit,
            busstops: response.data.busstops.map(b=>b._id),
          });
    } catch (err) {
      setErrorMessage(err.resopone);
    }
  }
  const onDeleteBusStop = (e) => {
    const busStopId = e.target.parentElement.getAttribute("busstopid");
    if (!busStopId) return;
    console.log(e.target.parentElement);
    setBusStops(
      busStops.filter((b) => {
        return b._id != busStopId;
      })
    );
    setBusToEdit({ ...busToEdit, busstops: busToEdit.busstops.filter(b => b != busStopId) })
  };
  const onMoveUp = async (e) => {
    const busStopId = e.target.parentElement.getAttribute("busstopid");
    if (!busStopId) return;
    console.log(busStopId);
    const index = busStops.findIndex((x) => x._id == busStopId);
    const temp = busStops;
    const busStop = temp.splice(index, 1)[0];
    temp.splice(index - 1, 0, busStop);
    console.log(temp);
    setBusStops(temp);
    setBusToEdit({ ...busToEdit, busstops: temp.map((b) => b._id) });
  };
  const updateBus = async () => {
    try {
      const fetch = {
        method: "put",
        url: `https://busapbe.herokuapp.com/api/buses/update/${bus._id}`,
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
        data: busToEdit,
      };
      const resopone = await axios(fetch);
      console.log(resopone);
      dispatch({ type: "UPDATE_ONE_BUS", payload: { ...busToEdit } });
      setOpenToEditForm(false);
    } catch (err) {
      setErrorMessage(err.resopone);
    }
  };
  const handleDelete = () => {
    setDeleteDialog(true);
  };
  const deleteBuses = async () => {
    try {
      const fetch = {
        method: "delete",
        url: `https://busapbe.herokuapp.com/api/buses/delete/${bus._id}`,
        headers: {
          Authorization: "Token " + localStorage.getItem("accessToken"),
        },
      };
      await axios(fetch);
      dispatch({ type: "DELETE_ONE_BUS", payload: { _id: bus._id } });
      setDeleting(false);
      setDeleteDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    deleteBuses();
  };

  const onAddBusStop = async () => {
    const fetch = {
      method: "get",
      url: "https://busapbe.herokuapp.com/api/busstops/search-name",
      headers: {
        Authorization: "Token " + localStorage.getItem("accessToken"),
      },
      params: {
        name: busStopName,
      },
    };
    await axios(fetch)
      .then((response) => {
        if (response.status == 200 && response.data) {
          if (busStops.find((b) => b.id === response.data._id)) {
            console.log("this already exist");
            return;
          }
          setBusStops([
            ...busStops,
            { _id: response.data._id, name: response.data.name },
          ]);

          setBusToEdit({
            ...busToEdit,
            busstops: [...busToEdit.busstops, response.data._id],
          });
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addPoint = async () => {
    const fetch = {
      method: "put",
      url: `https://busapbe.herokuapp.com/api/buses/update/${bus._id}`,
      headers: {
        Authorization: "Token " + localStorage.getItem("accessToken"),
      },
      data: busToEdit,
    };
    await axios(fetch)
      .then((response) => {
        if (response.status == 200 && response.data) {
          console.log(response)
          dispatch({ type: "UPDATE_ONE_BUS", payload: { ...busToEdit } });
          const fetch2 = {
            method: "put",
            url: `https://busapbe.herokuapp.com/api/buses/add-point-after-id/${bus._id}`,
            headers: {
              Authorization: "Token " + localStorage.getItem("accessToken"),
            },
            data: point,
          }
          axios(fetch2).then(response => {
            if (response.status == 200) {
              console.log(response)
              loadBusStop()
              console.log("ok")
              setErrAddPoint("")
            }
          }).catch(err =>
            console.log(err.response.data)
          )
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const onSetBeforeId = (e) => {
    const busStopId = e.target.parentElement.getAttribute("busstopid");
    if (busStopId == null) return;
    setPoint({ ...point, id: busStopId })
  }
  return (
    <>
      <ConfirmDelete
        open={deleteDialog}
        label="Chuyến xe"
        warning="Xóa chuyến vĩnh viễn. Không thể khôi phục."
        name={bus.name}
        onClose={() => setDeleteDialog(false)}
        loading={deleting}
        onSubmit={onDelete}
      />
      <Drawer
        anchor="right"
        open={openToEditForm}
        onClose={toggleDrawer(false)}
      >
        <div className="detail-form__wrapper w-100">
          <header className="detail-form__header">
            <h5>Update chuyến xe</h5>
          </header>
          {errorMessage &&
            (Array.isArray(errorMessage) ? (
              errorMessage.map((err) => (
                <div className="error-message">Error: {err}</div>
              ))
            ) : (
              <div className="error-message">Error: {errorMessage}</div>
            ))}
          <form className="m-3 d-md-flex flex-wrap">
            <div className="w-50">
              <div className="m-3">
                <TextField
                  className="w-100 mt-3"
                  label="ID"
                  name="id"
                  value={busToEdit.id}
                  onChange={(e) => {
                    setBusToEdit({ ...busToEdit, id: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="Operating Time"
                  name="operatingTime"
                  value={busToEdit.operatingTime}
                  onChange={(e) => {
                    setBusToEdit({ ...busToEdit, operatingTime: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="Time Distance"
                  name="timeDistance"
                  value={busToEdit.timeDistance}
                  onChange={(e) => {
                    setBusToEdit({ ...busToEdit, timeDistance: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="Name"
                  name="name"
                  value={busToEdit.name}
                  onChange={(e) => {
                    setBusToEdit({ ...busToEdit, name: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="Price"
                  name="price"
                  value={busToEdit.price}
                  onChange={(e) => {
                    setBusToEdit({ ...busToEdit, price: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="Seats"
                  name="seats"
                  value={busToEdit.seats}
                  onChange={(e) => {
                    setBusToEdit({ ...busToEdit, seats: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="Bus stop"
                  name="busstops"
                  value={busStopName}
                  onChange={(e) => {
                    setBusSTopName(e.target.value);
                  }}
                />
                <Button variant="contained" onClick={onAddBusStop}>
                  Add Bus Stop
                </Button>
                <TextField
                  className="w-100 mb-2"
                  label="before bus stop"
                  name="latitude"
                  value={point.id}
                  onChange={(e) => {
                    setPoint({ ...point, id: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="latitude"
                  name="latitude"
                  value={point.latitude}
                  onChange={(e) => {
                    setPoint({ ...point, latitude: e.target.value });
                  }}
                />
                <TextField
                  className="w-100 mb-2"
                  label="longitude"
                  name="longitude"
                  value={point.longitude}
                  onChange={(e) => {
                    setPoint({ ...point, longitude: e.target.value });
                  }}
                />
                <Button variant="contained" onClick={addPoint}>
                  add point
                </Button>
                <p className="text-danger">{errAddPoint}</p>
              </div>
            </div>
            <div className="w-50" >
              <p>Bus Stops</p>
              <div style={{ "height": "500px", "overflow": "auto" }}>
                {busStops.map((b, index) => {
                  return (
                    <div
                      className="d-flex py-3 border-bottom align-items-center"
                      key={b._id}
                      busstopid={b._id}
                    >
                      <p className="w-75 m-0">
                        {index}. {b.name}
                      </p>
                      {index !== 0 ? (
                        <Button variant="contained"
                          onClick={onMoveUp}>
                          <UpIcon />
                        </Button>
                      ) : (
                        <div></div>
                      )}
                      <Button
                        variant="contained"
                        role="button"
                        onClick={onDeleteBusStop}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button variant="contained" onClick={onSetBeforeId}>
                        <TimeLineIcon />
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div style={{ "transform": "translateX(-50%)", "marginLeft": "50%" }}>
                <Button
                  fullWidth
                  className="mt-2"
                  variant="contained"
                  color="primary"
                  onClick={updateBus}
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
              </div>
            </div>
          </form>
        </div>
      </Drawer>
      <TableRow hover style={{ transform: "scale(1)" }}>
        <TableCell align="center" className="border-right">
          {bus.id}
        </TableCell>
        <TableCell align="center" className="border-right">
          {bus.operatingTime}
        </TableCell>
        <TableCell align="center" className="border-right">
          {bus.timeDistance}
        </TableCell>
        <TableCell align="center" className="border-right">
          {bus.name}
        </TableCell>
        <TableCell align="center" className="border-right">
          {bus.price}
        </TableCell>
        <TableCell align="center" className="border-right">
          {bus.seats}
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
            onClick={() => handleDelete(bus._id)}
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
