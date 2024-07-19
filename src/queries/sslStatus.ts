import { DocumentNode, gql } from '@apollo/client';

const sslMonitorFragment: DocumentNode = gql`
  fragment SSLMonitorData on SSLMonitorResponse {
    sslMonitors {
      id
      name
      userId
      active
      url
      status
      frequency
      info
      reason
      alertThreshold
      notifications {
        id
        emails
        groupName
      }
    }
  }
`;

export const GET_SINGLE_SSL_MONITOR = gql`
  query GetSingleSSLMonitor($monitorId: String!) {
    getSingleSSLMonitor(monitorId: $monitorId) {
      ...SSLMonitorData
    }
  }
  ${sslMonitorFragment}
`;

export const GET_USER_SSL_MONITORS = gql`
  query GetUserSSLMonitors($userId: String!) {
    getUserSSLMonitors(userId: $userId) {
      ...SSLMonitorData
    }
  }
  ${sslMonitorFragment}
`;

export const CREATE_SSL_MONITOR = gql`
  mutation CreateSSLMonitor($monitor: SSLMonitor!) {
    createSSLMonitor(monitor: $monitor) {
      ...SSLMonitorData
    }
  }
  ${sslMonitorFragment}
`;

export const TOGGLE_SSL_MONITOR = gql`
  mutation ToggleSSLMonitor($monitor: ToggleSSLMonitor!) {
    toggleSSLMonitor(monitor: $monitor) {
      ...SSLMonitorData
    }
  }
  ${sslMonitorFragment}
`;

export const UPDATE_SSL_MONITOR = gql`
  mutation UpdateSSLMonitor($monitorId: Int!, $userId: Int!, $monitor: SSLMonitor!) {
    updateSSLMonitor(monitorId: $monitorId, userId: $userId, monitor: $monitor) {
      ...SSLMonitorData
    }
  }
  ${sslMonitorFragment}
`;

export const DELETE_SSL_MONITOR = gql`
  mutation DeleteSSLMonitor($monitorId: Int!, $userId: Int!) {
    deleteSSLMonitor(monitorId: $monitorId, userId: $userId) {
      id
    }
  }
`;
