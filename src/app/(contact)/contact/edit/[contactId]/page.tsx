'use client';

import { FC, ReactElement } from 'react';
import PageLoader from '@/components/PageLoader';
import { useContactGroupEdit } from '@/app/(contact)/hooks/useContactGroup';
import ContactForm from '@/app/(contact)/components/ContactForm';

interface EditContactGroupProps {
  params: {
    contactId: string;
  }
}

const EditContactGroup: FC<EditContactGroupProps> = ({ params }): ReactElement => {
  const {
    isPending,
    notificationGroup,
    emails,
    itemInput,
    setNotificationGroup,
    setEmails,
    setItemInput,
    onHandleSubmit
  } = useContactGroupEdit(params.contactId);

  return (
    <>
      {isPending ? (
        <PageLoader />
      ) : (
        <ContactForm
          label="Update Group"
          notificationGroup={notificationGroup}
          emails={emails}
          itemInput={itemInput}
          setNotificationGroup={setNotificationGroup}
          setEmails={setEmails}
          setItemInput={setItemInput}
          onFormHandler={onHandleSubmit}
        />
      )}
    </>
  )
}

export default EditContactGroup;