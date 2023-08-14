import { gql } from '@apollo/client';

export const QUERY_CHECKOUT = gql`
  query getCheckout($amount: Float) {
    checkout(amount: $amount) {
      session
    }
  }
`;