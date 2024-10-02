import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { FC, useEffect } from "react";
import { Redirect, Route } from "react-router";
import Tab from "../components/tab/Tab";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Forgot from "./forgot/Forgot";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore/Index";
import AddContact from "./contacts/addContact/AddContact";
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
import AddTax from "./taxes/taxes/AddTax/AddTax";
import AddHsn from "./taxes/hsn/addhsn/AddHsn";
import AddSac from "./taxes/sac/addSac/AddSac";
import AddItems from "./items/items/addItem/AddItems";
import AddSales from "./invoices/sales/add/AddSales";
import AddInvoiceItem from "./invoices/AddInvoiceItem/AddInvoiceItem";
import useAxios from "../utils/axiosInstance";
import { setCompanyData } from "../reduxStore/Company";
import { setFinancialYearArray } from "../reduxStore/FinancialYear";
import ViewContact from "./contacts/viewContact/ViewContact";
import EditContact from "./contacts/editContact/EditCotact";
import ViewItem from "./items/items/viewItem/ViewItem";
import EditItem from "./items/items/editItem/EditItem";
import ViewCategory from "./items/categories/ViewCategory/ViewCategory";
import EditCategory from "./items/categories/EditCategory/EditCategory";
import ViewBrand from "./items/brands/viewBrand/ViewBrand";
import EditBrand from "./items/brands/editBrand/EditBrand";
import ViewTax from "./taxes/taxes/viewTax/ViewTax";
import EditTax from "./taxes/taxes/editTax/EditTax";
const Router: FC = () => {
  const dispatch = useDispatch();
  const axios = useAxios();
  const { isAuthenticated } = useSelector((state: RootState) => state.Auth);

  const getCompany = async () => {
    try {
      const result = await axios.get("/company");
      const response = result.data;
      dispatch(setCompanyData(response.company));
      dispatch(
        setFinancialYearArray(response?.financialYearData?.financial_year)
      );
    } catch (error) {
      dispatch(setCompanyData({}));
    }
  };

  useEffect(() => {
    if (isAuthenticated) getCompany();
    return () => {
      dispatch(setCompanyData({}));
    };
  }, [isAuthenticated]);

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
        <Route exact path="/contacts/add" component={AddContact} />
        <Route exact path="/contacts/view/:id" component={ViewContact} />
        <Route exact path="/contacts/edit/:id" component={EditContact} />
        <Route exact path="/leads" component={Leads} />
        <Route exact path="/items/add" component={AddItems} />
        <Route exact path="/items/view/:id" component={ViewItem} />
        <Route exact path="/items/edit/:id" component={EditItem} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/categories/add" component={AddCategory} />
        <Route exact path="/categories/view/:id" component={ViewCategory} />
        <Route exact path="/categories/edit/:id" component={EditCategory} />
        <Route exact path="/brands" component={Brands} />
        <Route exact path="/brands/add" component={AddBrand} />
        <Route exact path="/brands/view/:id" component={ViewBrand} />
        <Route exact path="/brands/edit/:id" component={EditBrand} />
        <Route exact path="/taxes" component={Taxes} />
        <Route exact path="/taxes/view/:id" component={ViewTax} />
        <Route exact path="/taxes/edit/:id" component={EditTax} />
        <Route exact path="/taxes/add" component={AddTax} />
        <Route exact path="/hsn" component={Hsn} />
        <Route exact path="/hsn/add" component={AddHsn} />
        <Route exact path="/sac" component={Sac} />
        <Route exact path="/sac/add" component={AddSac} />
        <Route exact path="/invoices/item/add" component={AddInvoiceItem} />
        <Route exact path="/sales/add" component={AddSales} />
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
