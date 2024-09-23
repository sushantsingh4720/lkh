import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { FC } from "react";
import { Redirect, Route } from "react-router";
import Tab from "../components/tab/Tab";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Forgot from "./forgot/Forgot";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/Index";
const Router: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.Auth);
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          {isAuthenticated ? (
            <Redirect to="/app" />
          ) : (
            <Redirect to="/auth/login" />
          )}
        </Route>
        <Route path="/app">
          {isAuthenticated ? <Tab></Tab> : <Redirect to="/auth/login" />}
        </Route>
        <Route exact path="/auth/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/auth/signup">
          {isAuthenticated ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route exact path="/auth/forgot">
          {isAuthenticated ? <Redirect to="/" /> : <Forgot />}
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
