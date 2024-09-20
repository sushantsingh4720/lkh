import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { FC } from "react";
import { Route } from "react-router";
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
        <Route path="/" component={Tab} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/auth/forgot" component={Forgot} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
