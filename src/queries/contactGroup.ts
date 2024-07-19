import { gql } from '@apollo/client';

export const CREATE_NOTIFICATION_GROUP = gql`
  mutation CreateNotificationGroup($group: Notification!) {
    createNotificationGroup(group: $group) {
      notifications {
        id
        groupName
        emails
      }
    }
  }
`;

export const UPDATE_NOTIFICATION_GROUP = gql`
  mutation UpdateNotificationGroup($notificationId: ID!, $group: Notification!) {
    updateNotificationGroup(notificationId: $notificationId, group: $group) {
      notifications {
        id
        groupName
        emails
      }
    }
  }
`;

export const DELETE_NOTIFICATION_GROUP = gql`
  mutation DeleteNotificationGroup($notificationId: ID!) {
    deleteNotificationGroup(notificationId: $notificationId) {
      id
    }
  }
`;
