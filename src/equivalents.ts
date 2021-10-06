import {
    useQuery,
    gql
  } from "@apollo/client";

const GET_EQUIVALENTS = gql`
  query GetEquivalents {
    equivalents(usage: 100) [
      name,
      desc,
      value,
    ]
  }
`;


const getEquivalents = () => {
  return useQuery(GET_EQUIVALENTS);
}