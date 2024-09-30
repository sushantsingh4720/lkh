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
import { CombineCode } from "../../assets/helpers/Interfaces";

interface TypeaheadProps {
  combineCodes: CombineCode[];
  selectedItem: CombineCode | null;
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (item: CombineCode) => void;
}

function SelectCombineCode(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<CombineCode[]>(
    props.combineCodes
  );
  const [workingSelectedValue, setWorkingSelectedValue] =
    useState<CombineCode | null>(props.selectedItem);

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
      setFilteredItems([...props.combineCodes]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.combineCodes.filter((item) =>
          item.code.toLowerCase().includes(normalizedQuery)
        )
      );
    }
  };

  const radioChange = (ev: RadioGroupCustomEvent) => {
    const selectedCombineCode = props.combineCodes.find(
      (combineCode) => combineCode.code === ev.detail.value
    );
    setWorkingSelectedValue(selectedCombineCode || null);
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
            value={workingSelectedValue?.code}
            onIonChange={radioChange}
          >
            {filteredItems.map((item) => (
              <IonItem key={item.id}>
                <IonRadio value={item.code} slot="start" />
                {item.code}
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </>
  );
}

export default SelectCombineCode;
