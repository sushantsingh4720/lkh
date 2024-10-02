import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline, arrowBackOutline, chevronDown } from "ionicons/icons";
import { FC, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoadDataSpinner from "../../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
import {
  Brand,
  Category,
  CombineCode,
  Item,
  RouteParams,
  Tax,
} from "../../../../assets/helpers/Interfaces";
import useAxios from "../../../../utils/axiosInstance";
import SelectCategory from "../../../../components/Select/SelectCategory";
import SelectBrand from "../../../../components/Select/SelectBrand";
import SelectTax from "../../../../components/Select/SelectTax";
import SelectCombineCode from "../../../../components/Select/SelectCombineCode";
import SelectUOM from "../../../../components/Select/SelectUnitOfMeasurement";
import {
  AllUnitOfMeasurement,
  UOM,
} from "../../../../assets/helpers/AllUnitOfMeasurement";
import styles from "./EditItem.module.scss";
import { productValidation } from "../FormValidation";
const EditItem: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [busy, setBusy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Item>({});
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [brandModal, setBrandModal] = useState<boolean>(false);
  const [taxModal, setTaxModal] = useState<boolean>(false);
  const [combineCodeModal, setCombineCodesModal] = useState<boolean>(false);
  const [uomModal, setUomModal] = useState<boolean>(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [hsns, setHsns] = useState([]);
  const [sacs, setSacs] = useState([]);
  const [combineCodes, setCombineCodes] = useState<CombineCode[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  const [selectedCombineCode, setSelectedCombineCode] =
    useState<CombineCode | null>(null);

  const [alertHeader, setAlertHeader] = useState<string>("");
  const [errorMessage, setErrorMessages] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const isProduct: boolean = formData?.type === "product";
  const onHandleItemTypeChange = (e: any) => {
    const { name, value } = e.target;
    if (value === "service") {
      setSelectedCombineCode(null);
    }
    setFormData((pre) => ({
      ...pre,
      type: value,
      ...(value === "product"
        ? { sac_code: "" }
        : { sac_code: "", hsn_code: "" }),
    }));
  };

  const onHandleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const onHandleCategory = (selectedCategory: Category) => {
    setSelectedCategory(selectedCategory);
    setFormData((pre) => ({ ...pre, categoryName: selectedCategory.name }));
    setCategoryModal(false);
  };

  const onHandleBrand = (selectedBrand: Brand) => {
    setSelectedBrand(selectedBrand);
    setFormData((pre) => ({ ...pre, brandName: selectedBrand.name }));
    setBrandModal(false);
  };

  const onHandleTax = (selectedTax: Tax) => {
    setSelectedTax(selectedTax);
    setFormData((pre) => ({ ...pre, taxName: selectedTax.name }));
    setTaxModal(false);
  };

  const onHandleCombineCode = (selectedCombineCode: CombineCode) => {
    setSelectedCombineCode(selectedCombineCode);
    setFormData((pre) => ({
      ...pre,
      ...(isProduct
        ? { hsn_code: selectedCombineCode.code }
        : {
            sac_code: selectedCombineCode.code,
            hsn_code: selectedCombineCode.code,
          }),
    }));
    setCombineCodesModal(false);
  };

  const onHandleUom = (selectedUom: UOM) => {
    setFormData((pre) => ({ ...pre, UOM: selectedUom }));
    setUomModal(false);
  };

  const handleSave = async () => {
    const { name, varient, description } = formData;
    let updatedFormData = {
      ...formData,
      name: name?.trim(),
      ...(varient && { varient: varient.trim() }),
      ...(description && { description: description.trim() }),
    };
    setFormData(updatedFormData);
    const result = productValidation(updatedFormData);
    if (!result.success) {
      setAlertHeader("Form validation Failed");
      setErrorMessages(result.message);
      setShowAlert(true);
      return;
    }
    setBusy(true);
    try {
      const response = await axios.put(`/product/${id}`, updatedFormData, {
        headers: { "Content-Type": "application/json" },
      });
      const result = response.data;
      const message = result?.message || "Item Successfully Saved";
      setSuccessMessage(message);
      setIsSuccess(true);
      setFormData({});
      history.goBack();
    } catch (error: any) {
      const err = error.response?.data;
      setAlertHeader("Form Submission Failed");
      setErrorMessages(err?.message || "Please Retry");
      setShowAlert(true);
    } finally {
      setBusy(false);
    }
  };

  const fetchItemData = async () => {
    setLoading(true);
    try {
      const [itemRes] = await Promise.all([axios.get(`/product/${id}`)]);
      const {
        fy_id,
        createdAt,
        updatedAt,
        id: number,
        companyId,
        ...rest
      } = itemRes.data?.data;
      setFormData(rest);
      const { brandName, categoryName, hsn_code, sac_code, taxName } = rest;
      if (taxName) setSelectedTax({ name: taxName });
      if (brandName) setSelectedBrand({ name: brandName });
      if (categoryName) setSelectedCategory({ name: categoryName });
      if (sac_code || hsn_code)
        setSelectedCombineCode({ code: sac_code || hsn_code });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchItemData();
  });

  const combineCodesMemo = useMemo(() => {
    if (isProduct) {
      return [
        ...hsns.map(
          ({
            id,
            name_of_commodity,
            gst_rate,
            active,
            hsn_code,
            hsn_code_no,
          }) => ({
            id,
            name_of_commodity,
            gst_rate,
            active,
            code: hsn_code,
            code_no: hsn_code_no,
          })
        ),
        ...sacs.map(
          ({
            id,
            name_of_commodity,
            gst_rate,
            active,
            sac_code,
            sac_code_no,
          }) => ({
            id,
            name_of_commodity,
            gst_rate,
            active,
            code: sac_code,
            code_no: sac_code_no,
          })
        ),
      ];
    }
    return sacs.map(
      ({ name_of_commodity, gst_rate, active, sac_code, sac_code_no, id }) => ({
        id,
        name_of_commodity,
        gst_rate,
        active,
        code: sac_code,
        code_no: sac_code_no,
      })
    );
  }, [isProduct, sacs, hsns]);

  useEffect(() => {
    setCombineCodes(combineCodesMemo);
    return () => {
      setCombineCodes([]);
    };
  }, [combineCodesMemo]);

  const fetchData = async () => {
    try {
      const [categoriesRes, brandsRes, taxesRes, hsnsRes, sacsRes] =
        await Promise.all([
          axios.get("/category/allcategories?active=true"),
          axios.get("/brand/allbrands?active=true"),
          axios.get("/tax/alltaxes?active=true"),
          axios.get("/gsthsn/allhsns"),
          axios.get("/gstsac/allsacs"),
        ]);

      setCategories(categoriesRes.data?.categories || []);
      setBrands(brandsRes.data?.brands || []);
      setTaxes(taxesRes.data?.taxes || []);
      setHsns(hsnsRes.data?.gsthsns || []);
      setSacs(sacsRes.data?.gstsacs || []);
    } catch (error) {
      // Handle error
    }
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  return (
    <IonPage className={styles.edit_items_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Item</IonTitle>
          {loading ? (
            ""
          ) : (
            <IonButtons slot="end">
              <IonButton color="primary" onClick={handleSave}>Save</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      {loading ? (
        <LoadDataSpinner />
      ) : (
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Item Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <IonLabel>Item Type</IonLabel>
                  <IonRadioGroup
                    value={formData?.type}
                    onIonChange={onHandleItemTypeChange}
                  >
                    <div>
                      <IonRadio value="product"></IonRadio>
                      <IonLabel>Product</IonLabel>
                    </div>
                    <div>
                      <IonRadio value="service"></IonRadio>
                      <IonLabel>Service</IonLabel>
                    </div>
                  </IonRadioGroup>
                </IonRow>
                <IonRow>
                  <IonLabel>Item Name</IonLabel>
                  <IonInput
                    className="customInput"
                    name="name"
                    value={formData?.name}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <IonLabel>Product variant</IonLabel>
                  <IonInput
                    className="customInput"
                    name="varient"
                    value={formData?.varient}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <IonLabel>Opening Qty</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="opening_qty_per"
                    value={formData?.opening_qty_per}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Price Details</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <IonLabel>MRP Price</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="mrp_price"
                    value={formData?.mrp_price}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <IonLabel>Pruchase Price</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="p_price"
                    value={formData?.p_price}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <IonLabel>Sales Price</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="s_price"
                    value={formData?.s_price}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Tax Details</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <div className="space_between">
                    <IonLabel>Tax </IonLabel>
                    <IonIcon
                      icon={addOutline}
                      color="success"
                      onClick={() => history.push("/taxes/add")}
                    ></IonIcon>
                  </div>
                  <IonList>
                    <IonItem onClick={() => setTaxModal(true)}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          inlineSize: "100%",
                        }}
                      >
                        {formData?.taxName || "--Select Tax--"}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                </IonRow>
                <IonRow>
                  <div className="space_between">
                    <IonLabel>Hsn/Sac code</IonLabel>
                    <IonIcon
                      icon={addOutline}
                      color="success"
                      onClick={() =>
                        history.push(isProduct ? "/hsn/add" : "/sac/add")
                      }
                    ></IonIcon>
                  </div>
                  <IonList>
                    <IonItem onClick={() => setCombineCodesModal(true)}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          inlineSize: "100%",
                        }}
                      >
                        {(isProduct
                          ? formData?.hsn_code
                          : formData?.sac_code) ||
                          (isProduct
                            ? "--Select Hsn Code--"
                            : "--Select Sac Code")}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Other Details</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <div className="space_between">
                    <IonLabel>Brand</IonLabel>
                    <IonIcon
                      icon={addOutline}
                      color="success"
                      onClick={() => history.push("/brands/add")}
                    ></IonIcon>
                  </div>
                  <IonList>
                    <IonItem onClick={() => setBrandModal(true)}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          inlineSize: "100%",
                        }}
                      >
                        {formData?.brandName || "--Select Brand--"}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                </IonRow>
                <IonRow>
                  <div className="space_between">
                    <IonLabel>Category</IonLabel>
                    <IonIcon
                      icon={addOutline}
                      color="success"
                      onClick={() => history.push("/categories/add")}
                    ></IonIcon>
                  </div>
                  <IonList>
                    <IonItem onClick={() => setCategoryModal(true)}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          inlineSize: "100%",
                        }}
                      >
                        {formData?.categoryName || "--Select Category--"}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                </IonRow>
                <IonRow>
                  <IonLabel>UOM (Unit Of Measurement)</IonLabel>
                  <IonList>
                    <IonItem onClick={() => setUomModal(true)}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          inlineSize: "100%",
                        }}
                      >
                        {formData?.UOM || "--Select Unit--"}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                </IonRow>
                <IonRow>
                  <IonLabel>Description</IonLabel>
                  <IonTextarea
                    className="customInput"
                    name="description"
                    value={formData?.description}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setShowAlert(false);
              setErrorMessages("");
              setAlertHeader("");
            }}
            header={alertHeader}
            message={errorMessage}
            buttons={["OK"]}
          />
          <IonLoading
            className="custom-loading"
            isOpen={busy}
            message="please wait..."
          />
          {/* <IonToast
            isOpen={isSuccess}
            position="bottom"
            positionAnchor="footer"
            message={successMessage}
            duration={3000}
          ></IonToast> */}
        </IonContent>
      )}
      <IonModal isOpen={categoryModal}>
        <SelectCategory
          title="Select Category"
          categories={categories}
          selectedItem={selectedCategory}
          onSelectionCancel={() => setCategoryModal(false)}
          onSelectionChange={onHandleCategory}
        />
      </IonModal>
      <IonModal isOpen={brandModal}>
        <SelectBrand
          title="Select Brand"
          brands={brands}
          selectedItem={selectedBrand}
          onSelectionCancel={() => setBrandModal(false)}
          onSelectionChange={onHandleBrand}
        />
      </IonModal>
      <IonModal isOpen={taxModal}>
        <SelectTax
          title="Select Tax"
          taxes={taxes}
          selectedItem={selectedTax}
          onSelectionCancel={() => setTaxModal(false)}
          onSelectionChange={onHandleTax}
        />
      </IonModal>
      <IonModal isOpen={combineCodeModal}>
        <SelectCombineCode
          title={isProduct ? "Select Hsn Code" : "Select Sac Code"}
          combineCodes={combineCodes}
          selectedItem={selectedCombineCode}
          onSelectionCancel={() => setCombineCodesModal(false)}
          onSelectionChange={onHandleCombineCode}
        />
      </IonModal>
      <IonModal isOpen={uomModal}>
        <SelectUOM
          title={"Select Unit"}
          uoms={AllUnitOfMeasurement}
          selectedItem={formData?.UOM || null}
          onSelectionCancel={() => setUomModal(false)}
          onSelectionChange={onHandleUom}
        />
      </IonModal>
    </IonPage>
  );
};

export default EditItem;
