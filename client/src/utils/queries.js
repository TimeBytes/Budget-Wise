import { gql } from '@apollo/client';

export const QUERY_CHECKOUT = gql`
  query donation($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;