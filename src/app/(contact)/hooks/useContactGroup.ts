import { MonitorContext } from '@/context/MonitorContext';
import { FetchResult, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useTransition } from 'react';
import { showErrorToast, showSuccessToast } from '@/utils/utils';
import { INotification, INotificationGroup, IUseContact } from '@/interfaces/notification.interface';
import { CREATE_NOTIFICATION_GROUP, UPDATE_NOTIFICATION_GROUP } from '@/queries/contactGroup';
import { CHECK_CURRENT_USER } from '@/queries/auth';
import { apolloClient } from '@/queries/apolloClient';
import { find } from 'lodash';

export const useContactGroupCreate = (): IUseContact => {
  const {
    state: { user },
    dispatch
  } = useContext(MonitorContext);
  const [notificationGroup, setNotificationGroup] = useState<INotificationGroup>({
    groupName: '',
    emails: []
  });
  const [itemInput, setItemInput] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [createNotificationGroup] = useMutation(CREATE_NOTIFICATION_GROUP, {
    update(cache, { data: { createNotificationGroup } }) {
      const { checkCurrentUser } = cache.readQuery({
        query: CHECK_CURRENT_USER,
      }) as any;
      const newNotificationGroup = createNotificationGroup.notifications[0];
      const notifications = [newNotificationGroup, ...checkCurrentUser.notifications];
      dispatch({
        type: 'dataUpdate',
        payload: {
          user: checkCurrentUser.user,
          notifications,
        },
      });
      cache.writeQuery({
        query: CHECK_CURRENT_USER,
        data: {
          checkCurrentUser: {
            __typename: 'CurrentUserResponse',
            user: checkCurrentUser.user,
            notifications
          },
        },
      });
    },
  });

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        if (emails.length > 0 && notificationGroup.groupName) {
          const group = { ...notificationGroup, userId: user?.id, emails: JSON.stringify(emails) };
          const result: FetchResult = await createNotificationGroup({
            variables: { group },
          });
          if (result) {
            showSuccessToast('Created notification group successfully.');
            router.push('/contact');
          }
        }
      } catch (error) {
        showErrorToast('Error creating notification group.');
      }
    });
  };

  return {
    isPending,
    notificationGroup,
    emails,
    itemInput,
    setNotificationGroup,
    setEmails,
    setItemInput,
    onHandleSubmit
  };
};

export const useContactGroupEdit = (contactId: string): IUseContact => {
  const {
    state: { user }
  } = useContext(MonitorContext);
  const [notificationGroup, setNotificationGroup] = useState<INotificationGroup>({
    groupName: '',
    emails: []
  });
  const [itemInput, setItemInput] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [updateNotificationGroup] = useMutation(UPDATE_NOTIFICATION_GROUP);
  const userData = apolloClient.readQuery({
    query: CHECK_CURRENT_USER
  });

  const onHandleSubmit = (): void => {
    startTransition(async () => {
      try {
        if (emails.length > 0 && notificationGroup.groupName) {
          const group = { ...notificationGroup, emails: JSON.stringify(emails) };
          const result = await updateNotificationGroup({
            variables: {
              notificationId: parseInt(contactId),
              group
            }
          });
          if (result) {
            router.push('/contact');
            showSuccessToast('Updated notification group successfully.');
          }
        }
      } catch (error) {
        showErrorToast('Error updating notification group.');
      }
    });
  };

  useEffect(() => {
    if (userData) {
      const { notifications } = userData.checkCurrentUser;
      const notification = find(notifications, (notification: INotification) => notification.id === contactId);
      setNotificationGroup({
        userId: user?.id,
        groupName: notification?.groupName,
        emails: notification?.emails! ? JSON.parse(notification?.emails!) : ''
      });
      setEmails(notification?.emails! ? JSON.parse(notification?.emails!) : []);
    }
  }, [userData, user?.id, contactId]);

  return {
    isPending,
    notificationGroup,
    emails,
    itemInput,
    setNotificationGroup,
    setEmails,
    setItemInput,
    onHandleSubmit,
  };
};
