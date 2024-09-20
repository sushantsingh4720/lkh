import {
  IonApp,
  IonSpinner,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import { useEffect, useState } from "react";
import useAxios from "./utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "./reduxStore/Auth";
import Router from "./pages/Router";
import { RootState } from "./reduxStore/Index";
import FullPageSpinner from "./components/Spinner/fullPageSpinner/FullPageSpinner";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();
  const axios = useAxios();
  const [loading,setLoading]=useState(true)
  const getUser = async () => {
    try {
      const response = await axios.get("/user/profile");
      const data = response?.data;
      const user = data?.data;
      dispatch(loadUser({ user }));
    } catch (error: any) {
      if (error.response.status === 403) {
        dispatch(logout());
      }
    } finally {
      setLoading(false)
    }
  };
  console.log("hi");
  useEffect(() => {
    getUser();
  }, []);
  return <IonApp>{loading ? <FullPageSpinner /> : <Router />}</IonApp>;
};

export default App;
