import { DocumentNode, gql } from '@apollo/client';

const monitorFragment: DocumentNode = gql`
  fragment MonitorData on MonitorResponse {
    monitors {
      id
      name
      userId
      active
      status
      frequency
      url
      method
      type
      alertThreshold
      body
      headers
      httpAuthMethod
      basicAuthUser
      basicAuthPass
      bearerToken
      timeout
      lastChanged
      redirects
      responseTime
      statusCode
      contentType
      connection
      port
      uptime
      heartbeats {
        id
        monitorId
        status
        code
        message
        timestamp
        reqHeaders
        resHeaders
        reqBody
        resBody
        responseTime
        connection
      }
      notifications {
        id
        emails
        groupName
      }
    }
  }
`;

export const ENABLE_AUTO_REFRESH = gql`
  query AutoRefresh($userId: String!, $refresh: Boolean!) {
    autoRefresh(userId: $userId, refresh: $refresh) {
      refresh
    }
  }
`;

export const MONITORS_UPDATED = gql`
  subscription MonitorsUpdated {
    monitorsUpdated {
      userId
      ...MonitorData
    }
  }
  ${monitorFragment}
`;

export const GET_SINGLE_MONITOR = gql`
  query GetSingleMonitor($monitorId: String!) {
    getSingleMonitor(monitorId: $monitorId) {
      ...MonitorData
    }
  }
  ${monitorFragment}
`;

export const GET_USER_MONITORS = gql`
  query GetUserMonitors($userId: String!) {
    getUserMonitors(userId: $userId) {
      ...MonitorData
    }
  }
  ${monitorFragment}
`;

export const CREATE_MONITOR = gql`
  mutation CreateMonitor($monitor: Monitor!) {
    createMonitor(monitor: $monitor) {
      ...MonitorData
    }
  }
  ${monitorFragment}
`;

export const TOGGLE_MONITOR = gql`
  mutation ToggleMonitor($monitor: ToggleMonitor!) {
    toggleMonitor(monitor: $monitor) {
      ...MonitorData
    }
  }
  ${monitorFragment}
`;

export const UPDATE_MONITOR = gql`
  mutation UpdateMonitor($monitorId: ID!, $userId: ID!, $monitor: Monitor!) {
    updateMonitor(monitorId: $monitorId, userId: $userId, monitor: $monitor) {
      ...MonitorData
    }
  }
  ${monitorFragment}
`;

export const DELETE_MONITOR = gql`
  mutation DeleteMonitor($monitorId: ID!, $userId: ID!, $type: String!) {
    deleteMonitor(monitorId: $monitorId, userId: $userId, type: $type) {
      id
    }
  }
`;
