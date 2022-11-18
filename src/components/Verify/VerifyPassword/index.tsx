import React from "react";
import {
  Box,
  Text,
} from "@chakra-ui/react";

interface VerifyPasswordProps {
  verify: any
}

export const VerifyPassword = ({ verify }: VerifyPasswordProps) => {
  return (
    <>
      <Box py="10px">
        <Text
          fontSize="14px"
          color="gray.300"
        >Sua senha deve ter
        </Text>
        <Text color=
          {verify != undefined ? (verify?.length) > 7 ?
            '#27AE60' : "#F03D3E" : "gray.300"}
          fontSize="14px"
        >
          8 ou mais caracteres
        </Text>
        <Text color=
          {verify != undefined ? (/(?=.*[A-Z])/.test(verify)) ?
            '#27AE60' : "#F03D3E" : "gray.300"}
          fontSize="14px"
        >
          Letra maiúscula
        </Text>
        <Text color=
          {verify != undefined ? (/(?=.*[a-z])/.test(verify)) ?
            '#27AE60' : "#F03D3E" : "gray.300"}
          fontSize="14px"
        >
          Letra minúscula
        </Text>
        <Text color=
          {verify != undefined ? (/(?=.*[0-9])/.test(verify)) ?
            '#27AE60' : "#F03D3E" : "gray.300"}
          fontSize="14px"
        >
          Pelo menos 1 número
        </Text>
      </Box>
    </>);
};