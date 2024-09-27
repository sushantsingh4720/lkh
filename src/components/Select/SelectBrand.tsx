import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import type { RadioGroupCustomEvent } from "@ionic/react";
import { Brand } from "../../assets/helpers/Interfaces";
interface TypeaheadProps {
  brands: Brand[];
  selectedItem: Brand | null;
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (item: Brand) => void;
}

function SelectBrand(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Brand[]>(props.brands);
  const [workingSelectedValue, setWorkingSelectedValue] =
    useState<Brand | null>(props.selectedItem);

  const cancelChanges = () => {
    if (props.onSelectionCancel) {
      props.onSelectionCancel();
    }
  };

  const confirmChanges = () => {
    if (props.onSelectionChange && workingSelectedValue) {
      props.onSelectionChange(workingSelectedValue);
    }
  };

  const searchbarInput = (ev: any) => {
    filterList(ev.target.value);
  };

  const filterList = (searchQuery: string | null | undefined) => {
    if (!searchQuery) {
      setFilteredItems([...props.brands]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.brands.filter((item) =>
          item.name.toLowerCase().includes(normalizedQuery)
        )
      );
    }
  };

  const radioChange = (ev: RadioGroupCustomEvent) => {
    const selectedBrand = props.brands.find(
      (brand) => brand.name === ev.detail.value
    );
    setWorkingSelectedValue(selectedBrand || null);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges} color="primary">Cancel</IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={confirmChanges} color="primary">Done</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={searchbarInput}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        <IonList id="modal-list" inset={true}>
          <IonRadioGroup
            value={workingSelectedValue?.name}
            onIonChange={radioChange}
          >
            {filteredItems.map((item) => (
              <IonItem key={item.name}>
                <IonRadio value={item.name} slot="start" />
                {item.name}
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </>
  );
}

export default SelectBrand;
