import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { addOutline, arrowBackOutline, chevronDown } from "ionicons/icons";
import { FC, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./AddInvoiceItem.module.scss";
import {
  InvoiceItem,
  Item,
  SalesInvoice,
  Tax,
} from "../../../assets/helpers/Interfaces";
import SelectItem from "../../../components/Select/SelectItem";
import useAxios from "../../../utils/axiosInstance";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reduxStore/Index";
import SelectTax from "../../../components/Select/SelectTax";
import { AllUnitOfMeasurement } from "../../../assets/helpers/AllUnitOfMeasurement";
import {
  Curruncy,
  parseFloatWithFixedValue,
} from "../../../assets/helpers/CommonUses";
import { AddInvoiceItemValidation } from "./AddInvoiceItemValidation";
import { addItemHandler } from "../../../reduxStore/InvoiceForm";
const initialFormData: InvoiceItem = {
  UOM: null,
  code: "",
  product: null,
  quantity: "1",
  discount: "", // Consider using number if discount is always numeric
  discountType: "1",
  discountValue: "",
  taxName: null,
  subTotal: "", // Consider using number if subtotal is always numeric
  preSubTotal: "", // Consider using number if preSubtotal is always numeric
  price: "",
  amount: "", // Consider using number if amount is always numeric
  itemTax: "",
  type: "",
};
const AddInvoiceItem: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyData } = useSelector((state: RootState) => state.Company);
  const [itemModal, setItemModal] = useState<boolean>(false);
  const [taxModal, setTaxModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<InvoiceItem>(initialFormData);
  const state = useSelector((state: RootState) => state.InvoiceForm);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [alertHeader, setAlertHeader] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string>("");

  const isClientCompanyStateSame =
    state?.checkout_details?.billing_state === companyData?.state;
  const onHandleItem = (selectedItem: Item): void => {
    setSelectedItem(selectedItem);
    const { UOM, hsn_code, sac_code, taxName, s_price, type } = selectedItem;
    const code: string = state.type === "product" ? hsn_code : sac_code;
    const findTax = taxes.find((tax) => tax.name === taxName);
    const findUOM = AllUnitOfMeasurement.includes(UOM)
      ? { value: UOM, label: UOM }
      : null;
    // Ensure you're updating all required fields in InvoiceItem
    setFormData((pre) => ({
      ...pre,
      code,
      product: selectedItem,
      price: s_price,
      ...(state?.invoiceType === "item_wise_discount_and_tax"
        ? { taxName: findTax }
        : {}),
      UOM: findUOM,
      quantity: "1",
      type,
    }));
    setSelectedTax(findTax ? findTax : null);
    setItemModal(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const onHandleDiscountTypeChange = (e: any) => {
    const { value } = e.target;
    setFormData((pre) => ({ ...pre, discountType: value }));
  };

  const onHandleTax = (selectedTax: Tax) => {
    setSelectedTax(selectedTax);
    setFormData((pre) => ({ ...pre, taxName: selectedTax }));
    setTaxModal(false);
  };

  // Function to calculate the invoice item details
  const calculateInvoiceItem = (formData: any) => {
    const { quantity, discountType, discountValue, price, taxName } = formData;

    let amount = parseFloatWithFixedValue(parseInt(quantity) * Number(price));
    let preSubTotal = amount;
    let subTotal = amount;
    let discount;
    let itemTax;

    if (Number(discountValue) > 0) {
      if (Number(discountType) === 1) {
        discount = parseFloatWithFixedValue(
          (Number(amount) * Number(discountValue)) / 100
        );
      } else if (Number(discountType) === 2) {
        discount = Number(discountValue);
      }
    }

    if (Number(discount) > 0) {
      subTotal = parseFloatWithFixedValue(Number(amount) - Number(discount));
    }

    if (taxName) {
      itemTax = parseFloatWithFixedValue(
        (Number(subTotal) * Number(taxName?.rate)) / 100
      );
    }

    if (Number(itemTax) > 0) {
      amount = parseFloatWithFixedValue(subTotal + Number(itemTax));
    }

    return {
      UOM: formData?.UOM,
      code: formData?.code,
      product: formData?.product,
      quantity,
      discount,
      discountType,
      discountValue,
      taxName,
      subTotal, // Consider using number if subtotal is always numeric
      preSubTotal, // Consider using number if preSubtotal is always numeric
      price,
      amount, // Consider using number if amount is always numeric
      itemTax,
      type: formData?.type,
    };
  };

  // Common function for saving invoice item
  const saveInvoiceItem = (formData: any, onSuccess: () => void) => {
    const validationResult = AddInvoiceItemValidation(formData);

    if (!validationResult.isValid) {
      setAlertHeader("Form Validation Failed");
      setErrorMessages(validationResult.message || "Validation failed");
      setShowAlert(true);
      return;
    }

    const product = calculateInvoiceItem(formData);
    dispatch(addItemHandler({ product, isClientCompanyStateSame }));
    onSuccess();

    setSuccessMessage("Item Added Successfully");
    setIsSuccess(true);
    setTimeout((): void => {
      setIsSuccess(false);
      setSuccessMessage("");
    }, 3000);
  };

  // Refactored handleSaveAndNew
  const handleSaveAndNew = (): void => {
    saveInvoiceItem(formData, () => {
      setFormData(initialFormData); // Uncomment if required
    });
  };

  // Refactored handleSave
  const handleSave = (): void => {
    saveInvoiceItem(formData, () => {
      // Handle post-save actions for Save
      history.goBack(); // Uncomment if required
      setFormData(initialFormData); // Uncomment if required
    });
  };

  const fetchData = async () => {
    try {
      const [productRes, taxRes] = await Promise.all([
        axios.get("/product/allproducts"),
        axios.get("/tax/alltaxes?active=true"),
      ]);
      setItems(
        productRes.data?.products?.filter(
          (product: any) => product.type === state.type
        ) || []
      );
      setTaxes(taxRes.data?.taxes || []);
    } catch (error) {
      // Handle error
    }
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  useIonViewWillLeave(() => {
    // setItems([]);
    // setTaxes([]);
  });

  return (
    <IonPage className={styles.add_invoice_item}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Invoice Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <div className="space_between">
                  <IonLabel>Item </IonLabel>
                  <IonIcon
                    icon={addOutline}
                    color="success"
                    onClick={() => history.push("/items/add")}
                  ></IonIcon>
                </div>
                <IonList>
                  <IonItem onClick={() => setItemModal(true)}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {formData?.product?.name || "--Select Item--"}
                      <IonIcon icon={chevronDown}></IonIcon>
                    </div>
                  </IonItem>
                </IonList>
              </IonRow>
              <IonRow>
                <IonLabel>Quantity</IonLabel>
                <IonInput
                  className="customInput"
                  name="quantity"
                  type="number"
                  value={formData?.quantity}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Price</IonLabel>
                <IonInput
                  className="customInput"
                  name="price"
                  type="number"
                  value={formData?.price}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              {state?.invoiceType === "item_wise_discount_and_tax" ? (
                <IonRow>
                  <IonLabel>Discount Type</IonLabel>
                  <IonRadioGroup
                    value={formData?.discountType}
                    onIonChange={onHandleDiscountTypeChange}
                  >
                    <div>
                      <IonRadio value="1"></IonRadio>
                      <IonText>%</IonText>
                    </div>
                    <div>
                      <IonRadio value="2"></IonRadio>
                      <IonText>{Curruncy}</IonText>
                    </div>
                  </IonRadioGroup>
                </IonRow>
              ) : (
                ""
              )}
              {state?.invoiceType === "item_wise_discount_and_tax" ? (
                <IonRow>
                  <IonLabel>Discount Value</IonLabel>
                  <IonInput
                    className="customInput"
                    name="discountValue"
                    type="number"
                    value={formData?.discountValue}
                    onIonInput={handleInputChange}
                  />
                </IonRow>
              ) : (
                ""
              )}
              {state?.invoiceType === "item_wise_discount_and_tax" ? (
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
                          width: "100%",
                        }}
                      >
                        {formData?.taxName?.name || "--Select Tax--"}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                </IonRow>
              ) : (
                ""
              )}
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "6px" }}
        >
          <IonButton
            fill="outline"
            style={{ width: "100%" }}
            onClick={handleSaveAndNew}
          >
            Save And New
          </IonButton>
          <IonButton style={{ width: "100%" }} onClick={handleSave}>
            Save
          </IonButton>
        </div>
      </IonContent>
      <IonModal isOpen={taxModal}>
        <SelectTax
          title="Select Tax"
          taxes={taxes}
          selectedItem={selectedTax}
          onSelectionCancel={() => setTaxModal(false)}
          onSelectionChange={onHandleTax}
        />
      </IonModal>
      <IonModal isOpen={itemModal}>
        <SelectItem
          title={"Select Item"}
          items={items}
          selectedItem={selectedItem}
          onSelectionCancel={() => setItemModal(false)}
          onSelectionChange={onHandleItem}
        />
      </IonModal>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
          setErrorMessages("");
          setAlertHeader("");
        }}
        header={alertHeader}
        message={errorMessages}
        buttons={["OK"]}
      />
      <IonToast
        isOpen={isSuccess}
        position="bottom"
        positionAnchor="footer"
        message={successMessage}
        duration={3000}
      ></IonToast>
    </IonPage>
  );
};
export default AddInvoiceItem;
