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
import NewContact from "./contacts/newContact/NewContact";
import Categories from "./items/categories/Categories";
import Brands from "./items/brands/Brands";
import Taxes from "./taxes/taxes/Taxes";
import Hsn from "./taxes/hsn/Hsn";
import Sac from "./taxes/sac/Sac";
import Leads from "./leads/Leads";
import Quotations from "./invoices/quotations/Quotations";
import Expenses from "./invoices/expenses/Expenses";
import DeliveryChallan from "./invoices/deliveryChallan/DeliveryChallan";
import Payments from "./invoices/payments/Payments";
import Users from "./users/Users";
import Support from "./Support";
import Settings from "../components/Settings/Settings";
import Stock from "./Reports/Stock";
import Gst from "./Reports/Gst";
import Invoice from "./Reports/Invoice";
import Supplier from "./Reports/Supplier";
import Inventory from "./Reports/Inventory";
import AddCategory from "./items/categories/addCategory/AddCategory";
import AddBrand from "./items/brands/addBrand/AddBrand";
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
        <Route exact path="/contacts/new" component={NewContact} />
        <Route exact path="/leads" component={Leads} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/categories/add" component={AddCategory} />
        <Route exact path="/brands" component={Brands} />
        <Route exact path="/brands/add" component={AddBrand} />
        <Route exact path="/taxes" component={Taxes} />
        <Route exact path="/hsn" component={Hsn} />
        <Route exact path="/sac" component={Sac} />
        <Route exact path="/expenses" component={Expenses} />
        <Route exact path="/quotations" component={Quotations} />
        <Route exact path="/delivery_challan" component={DeliveryChallan} />
        <Route exact path="/payments" component={Payments} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/supports" component={Support} />
        <Route exact path="/stock_reports" component={Stock} />
        <Route exact path="/gst_reports" component={Gst} />
        <Route exact path="/invoice_reports" component={Invoice} />
        <Route exact path="/supplier_reports" component={Supplier} />
        <Route exact path="/inventory_reports" component={Inventory} />
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
