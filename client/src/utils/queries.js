import { gql } from '@apollo/client';

export const QUERY_CHECKOUT = gql`
  query Donation($amount: Float!) {
    checkout(amount: $amount) {
      session
    }
  }
`;