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
import { Bank } from "../../assets/helpers/Interfaces";
interface TypeaheadProps {
  banks: Bank[];
  selectedItem: Bank | null;
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (item: Bank) => void;
}

function SelectBank(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Bank[]>(props.banks);
  const [workingSelectedValue, setWorkingSelectedValue] = useState<Bank | null>(
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
      setFilteredItems([...props.banks]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.banks.filter((item) =>
          item.name.toLowerCase().includes(normalizedQuery)
        )
      );
    }
  };

  const radioChange = (ev: RadioGroupCustomEvent) => {
    const selectedBank = props.banks.find(
      (bank) => bank.name === ev.detail.value
    );
    setWorkingSelectedValue(selectedBank || null);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges} color="primary">
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={confirmChanges} color="primary">
              Done
            </IonButton>
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
              <IonItem key={item.id}>
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

export default SelectBank;
