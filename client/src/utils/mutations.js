import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const Donation = gql`
  mutation donation($amount: Float!) {
    donation(amount: $amount) {
      session
    }
  }
`;