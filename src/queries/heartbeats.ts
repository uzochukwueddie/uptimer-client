import { gql } from '@apollo/client';

export const GET_HEART_BEATS = gql`
  query GetHeartBeats($type: String!, $monitorId: String!, $duration: String!) {
    getHeartbeats(type: $type, monitorId: $monitorId, duration: $duration) {
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
    }
  }
`;