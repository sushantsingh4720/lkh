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
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router";
import styles from "./AddItems.module.scss";
import useAxios from "../../../../utils/axiosInstance";
import {
  Category,
  Brand,
  Tax,
  CombineCode,
} from "../../../../assets/helpers/Interfaces";
import {
  AllUnitOfMeasurement,
  UOM,
} from "../../../../assets/helpers/AllUnitOfMeasurement";
import SelectCategory from "../../../../components/Select/SelectCategory";
import SelectBrand from "../../../../components/Select/SelectBrand";
import SelectTax from "../../../../components/Select/SelectTax";
import SelectCombineCode from "../../../../components/Select/SelectCombineCode";
import SelectUOM from "../../../../components/Select/SelectUnitOfMeasurement";
import { productValidation } from "../FormValidation";

interface FormData {
  brandName: string;
  UOM: string;
  categoryName: string;
  description: string;
  hsn_code: string;
  mrp_price: string;
  name: string;
  opening_qty_per: string;
  p_price: string;
  s_price: string;
  sac_code: string;
  taxName: string;
  type: string;
  varient: string;
}

const initialFormData: FormData = {
  brandName: "",
  UOM: "",
  categoryName: "",
  description: "",
  hsn_code: "",
  mrp_price: "",
  name: "",
  opening_qty_per: "1",
  p_price: "",
  s_price: "",
  sac_code: "",
  taxName: "",
  type: "product",
  varient: "",
};

const AddItems: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const categoryModal = useRef<HTMLIonModalElement>(null);
  const brandModal = useRef<HTMLIonModalElement>(null);
  const taxModal = useRef<HTMLIonModalElement>(null);
  const combineCodeModal = useRef<HTMLIonModalElement>(null);
  const uomModal = useRef<HTMLIonModalElement>(null);

  const [formData, setFormData] = useState<FormData>(initialFormData);

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
  const [busy, setBusy] = useState<boolean>(false);
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
    categoryModal.current?.dismiss();
  };

  const onHandleBrand = (selectedBrand: Brand) => {
    setSelectedBrand(selectedBrand);
    setFormData((pre) => ({ ...pre, brandName: selectedBrand.name }));
    brandModal.current?.dismiss();
  };

  const onHandleTax = (selectedTax: Tax) => {
    setSelectedTax(selectedTax);
    setFormData((pre) => ({ ...pre, taxName: selectedTax.name }));
    taxModal.current?.dismiss();
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
    combineCodeModal.current?.dismiss();
  };

  const onHandleUom = (selectedUom: UOM) => {
    setFormData((pre) => ({ ...pre, UOM: selectedUom }));
    uomModal.current?.dismiss();
  };

  const handleSave = async () => {
    const { name, varient, description } = formData;
    let updatedFormData = {
      ...formData,
      name: name.trim(),
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
      const response = await axios.post("/product", updatedFormData, {
        headers: { "Content-Type": "application/json" },
      });
      const result = response.data;
      const message = result?.message || "Item Successfully Saved";
      setSuccessMessage(message);
      setIsSuccess(true);
      setFormData(initialFormData);
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
    <IonPage className={styles.add_items_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Item</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
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
                  value={formData.type}
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
                <IonList inset={true}>
                  <IonItem button={true} detail={false} id="select-tax">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
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
                <IonList inset={true}>
                  <IonItem
                    button={true}
                    detail={false}
                    id="select-combine_code"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {(isProduct ? formData?.hsn_code : formData?.sac_code) ||
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
                <IonList inset={true}>
                  <IonItem button={true} detail={false} id="select-brand">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
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
                <IonList inset={true}>
                  <IonItem button={true} detail={false} id="select-category">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
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
                <IonList inset={true}>
                  <IonItem button={true} detail={false} id="select-uom">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
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
      <IonModal trigger="select-category" ref={categoryModal}>
        <SelectCategory
          title="Select Category"
          categories={categories}
          selectedItem={selectedCategory}
          onSelectionCancel={() => categoryModal.current?.dismiss()}
          onSelectionChange={onHandleCategory}
        />
      </IonModal>
      <IonModal trigger="select-brand" ref={brandModal}>
        <SelectBrand
          title="Select Brand"
          brands={brands}
          selectedItem={selectedBrand}
          onSelectionCancel={() => brandModal.current?.dismiss()}
          onSelectionChange={onHandleBrand}
        />
      </IonModal>
      <IonModal trigger="select-tax" ref={taxModal}>
        <SelectTax
          title="Select Tax"
          taxes={taxes}
          selectedItem={selectedTax}
          onSelectionCancel={() => taxModal.current?.dismiss()}
          onSelectionChange={onHandleTax}
        />
      </IonModal>
      <IonModal trigger="select-combine_code" ref={combineCodeModal}>
        <SelectCombineCode
          title={isProduct ? "Select Hsn Code" : "Select Sac Code"}
          combineCodes={combineCodes}
          selectedItem={selectedCombineCode}
          onSelectionCancel={() => combineCodeModal.current?.dismiss()}
          onSelectionChange={onHandleCombineCode}
        />
      </IonModal>
      <IonModal trigger="select-uom" ref={uomModal}>
        <SelectUOM
          title={"Select Unit"}
          uoms={AllUnitOfMeasurement}
          selectedItem={formData?.UOM}
          onSelectionCancel={() => uomModal.current?.dismiss()}
          onSelectionChange={onHandleUom}
        />
      </IonModal>
    </IonPage>
  );
};

export default AddItems;
