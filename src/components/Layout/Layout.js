import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'



// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Locals from "../../pages/locals";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import UserUpdate from "../../pages/userUpdate/UserUpdate";
import UserAdd from "../../pages/userAdd/UserAdd";
import LocalAdd from "../../pages/localAdd/LocalAdd";
import LocalUpdate from "../../pages/localUpdate/LocalUpdate";
import Types from "../../pages/types/Types";
import Capacites from "../../pages/capacites/Capacites";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/Users" component={Tables} />
              <Route path="/app/locals" component={Locals} />
              <Route path="/app/types" component={Types} />
              <Route path="/app/capacites" component={Capacites} />
              <Route path="/app/addLocal" component={LocalAdd} />
              <Route path="/app/updateUser" component={UserUpdate} />
              <Route path="/app/addUser" component={UserAdd} />
              <Route path="/app/updateLocal" component={LocalUpdate} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
             
              <div>
               
               
               
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
