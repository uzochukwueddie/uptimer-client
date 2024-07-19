import { Dispatch, SetStateAction } from "react";

export interface INotification {
  __typename?: string;
  id?: number | string;
  userId: number;
  groupName: string;
  emails: string;
}

export interface INotificationGroup {
  userId?: number;
  groupName: string;
  emails: string | string[];
}

export interface ContactFormProps {
  label: string;
  notificationGroup: INotificationGroup;
  emails: string[];
  itemInput: string;
  setNotificationGroup: Dispatch<SetStateAction<INotificationGroup>>;
  setEmails: Dispatch<SetStateAction<string[]>>;
  setItemInput: Dispatch<SetStateAction<string>>;
  onFormHandler: () => void;
}

export interface IUseViewContact {
  notifications: INotification[];
  deleteGroup: (notificationId: number) => Promise<void>
}

export interface IUseContact {
  isPending: boolean;
  notificationGroup: INotificationGroup;
  emails: string[];
  itemInput: string;
  setNotificationGroup: Dispatch<SetStateAction<INotificationGroup>>;
  setEmails: Dispatch<SetStateAction<string[]>>;
  setItemInput: Dispatch<SetStateAction<string>>;
  onHandleSubmit: () => void;
}
