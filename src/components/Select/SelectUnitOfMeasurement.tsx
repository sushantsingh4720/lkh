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
import { UOM } from "../../assets/helpers/AllUnitOfMeasurement";
interface TypeaheadProps {
  uoms: UOM[];
  selectedItem: UOM | null;
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (item: UOM) => void;
}

function SelectUOM(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<UOM[]>(props.uoms);
  const [workingSelectedValue, setWorkingSelectedValue] = useState<UOM | null>(
    props.selectedItem
  );

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
      setFilteredItems([...props.uoms]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.uoms.filter((item) =>
          item.toLowerCase().includes(normalizedQuery)
        )
      );
    }
  };

  const radioChange = (ev: RadioGroupCustomEvent) => {
    const selectedUom = props.uoms.find((uom) => uom === ev.detail.value);
    setWorkingSelectedValue(selectedUom || null);
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
          <IonRadioGroup value={workingSelectedValue} onIonChange={radioChange}>
            {filteredItems.map((item) => (
              <IonItem key={item}>
                <IonRadio value={item} slot="start" />
                {item}
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </>
  );
}

export default SelectUOM;
