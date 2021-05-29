import LoginPage from "./Component/LoginPage";
import "./Component/style.scss";
import Sidebar from "./Component/Appbar/Sidebar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "./Component/HomePage";
import Appbar from "./Component/Appbar";
import BusList from "./Component/BusList";
import BusForm from "./Component/BusList/BusForm";
import UserList from "./Component/UserList";
import BusStopList from "./Component/BusStopList";
import BusStopForm from "./Component/BusStopList/BusStopForm";
import Reducer from "./reducers/Reducer";
import AppContext from "./Component/AppContext";
import React, { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
const MainPage = () => {
  return (
    <div className="wrapper">
      <Sidebar class="persist" />
      <Appbar />
      <div className="content">
        <main>
          <div className="container flex-fill">
            <Switch>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route path="/home/bus">
                <BusList />
              </Route>
              <Route path="/home/bus:/create">
                <BusForm />
              </Route>
              <Route path="/home/user">
                <UserList />
              </Route>
              <Route path="/home/busstop">
                <BusStopList />
              </Route>
              <Route path="/home/busstop:/create">
                <BusStopForm />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
};
function App() {
  const initialState = { user: null, posts: [] };
  const [state, dispatch] = useReducer(Reducer, initialState);

  // xac minh co dang dang nhap ko
  //khuc nay chang co chay
  const checkUserCurrent = useCallback(async () => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      console.log("aaa");
      const fetch = {
        method: "post",
        // url: "http://localhost:3002/api/users/get-infor",
        url: "https://busapbe.herokuapp.com/api/users/get-infor",
        headers: {
          Authorization: `token ${accessToken}`,
        },
      };

      const res = await axios(fetch);
      console.log(res);
      if (res.data) {
        console.log("aaaa");
        const { username } = res.data;
        dispatch({ type: "CURRENT_USER", payload: { username } });
      }
    } catch (err) {
      try {
        console.log("token het han refresh cai moi");
        let refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken);
        const fetch = {
          method: "post",
          url: "https://busapbe.herokuapp.com/api/auth/refresh",
          // url: "http://localhost:3002/api/auth/refresh",
          data: {
            refreshToken: refreshToken,
          },
        };

        const res = await axios(fetch);
        console.log(res);
        if (res.data) {
          localStorage.setItem("accessToken", res.data.accessToken);
          dispatch({ type: "CURRENT_USER", payload: { username: "loading" } });
        }
      } catch (err) {
        //refresh het hang logout
      }
    }
  }, [dispatch]);
  useEffect(() => {
    checkUserCurrent();
  });
  console.log(state.user);
  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        {state.user ? <Redirect to="/home" /> : <Redirect to="/login" />}
        <Route path="/home">
          <MainPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </AppContext.Provider>
    </Router>
  );
}
export default App;
