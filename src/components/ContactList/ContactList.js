import { ContactCard } from "components/ContactCard/ContactCard";

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
         <ContactCard contactInfo={contact} onDelete={onDelete}/>
        </li>
      ))}
    </ul>
  );
};
