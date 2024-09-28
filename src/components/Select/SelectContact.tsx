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
import { Contact } from "../../assets/helpers/Interfaces";
interface TypeaheadProps {
  contacts: Contact[];
  selectedItem: Contact | null;
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (item: Contact) => void;
}

function SelectContact(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Contact[]>(props.contacts);
  const [workingSelectedValue, setWorkingSelectedValue] =
    useState<Contact | null>(props.selectedItem);

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
      setFilteredItems([...props.contacts]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.contacts.filter((item) =>
          item.name.toLowerCase().includes(normalizedQuery)
        )
      );
    }
  };

  const radioChange = (ev: RadioGroupCustomEvent) => {
    const selectedContact = props.contacts.find(
      (contact) => contact.name === ev.detail.value
    );
    setWorkingSelectedValue(selectedContact || null);
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
                {item.name} ({item.phone})
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </>
  );
}

export default SelectContact;
