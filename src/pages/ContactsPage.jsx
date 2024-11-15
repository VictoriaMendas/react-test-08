import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectError } from "../redux/contacts/selectors";
import { SearchBox } from "../components/SearchBox/SearchBox";
import { ContactForm } from "../components/ContactForm/ContactForm";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";

import { BiLoader } from "react-icons/bi";
import ContactList from "../components/ContactList/ContactList";

export default function ContactsPage() {
  const errorMessage = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <h1>PhoneBook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <BiLoader />}
      {errorMessage && <div>{errorMessage}</div>}
      <ContactList />
    </div>
  );
}
