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
import { Country } from "../../assets/helpers/AllCountries";

interface TypeaheadProps {
  countries: Country[];
  selectedItem: Country | null;
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (item: Country) => void;
}

function SelectCountry(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Country[]>(
    props.countries
  );
  const [workingSelectedValue, setWorkingSelectedValue] =
    useState<Country | null>(props.selectedItem);

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
      setFilteredItems([...props.countries]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.countries.filter((item) =>
          item.name.toLowerCase().includes(normalizedQuery)
        )
      );
    }
  };

  const radioChange = (ev: RadioGroupCustomEvent) => {
    const selectedCountry = props.countries.find(
      (country) => country.iso2 === ev.detail.value
    );
    setWorkingSelectedValue(selectedCountry || null);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={confirmChanges}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={searchbarInput}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        <IonList id="modal-list" inset={true}>
          <IonRadioGroup
            value={workingSelectedValue?.iso2}
            onIonChange={radioChange}
          >
            {filteredItems.map((item) => (
              <IonItem key={item.iso2}>
                <IonRadio value={item.iso2} slot="start" />
                {item.name}
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </>
  );
}

export default SelectCountry;
