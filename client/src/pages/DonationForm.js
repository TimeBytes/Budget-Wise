import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react"; // Update the import
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
const stripePromise = loadStripe(
"pk_test_51NdeCcJJYT86npXC9P0eXGwM0LEojk6P7yMabT5rpFsACJ01ZiYQXY2OfqhYDEmP93DJyYkDbkHOuXTcnEHDklX400aBYioMbW"
  );
  const DonationForm = () => {

    const [getCheckout, { data, error }] = useLazyQuery(QUERY_CHECKOUT);
    const [amount, setAmount] = useState("");


    function handleChange(event) {
      setAmount(event.target.value);
    };

    useEffect(() => {
      if (data) {
        stripePromise.then((res) => {
          console.log(data);
          res.redirectToCheckout( { sessionId: data.checkout.session  });
        });
      }
    }, [data]);

    const submitCheckout = async (event) => {
      event.preventDefault();
      // const amount = document.querySelector("input").value;


      if (!amount) {
        alert("Please enter an amount");
      } else {
        getCheckout({
          variables: { amount:parseFloat (amount) },
        });
      }
    };


    
    if (error) {
      console.error(error);
    }

  return (
    <div>
      <Center
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Heading mt={10} 
        bg={useColorModeValue("gray.50", "gray.800")}
        >Help us, help you!</Heading>
      </Center>

      <Flex
        minH={"65vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}

      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Donate
          </Heading>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              placeholder="0.00"
              _placeholder={{ color: "gray.500" }}
              type="number"
              value={amount} // Bind the input value to the state
              onChange={handleChange} // Update the state on input change
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              onClick={submitCheckout}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
};




export default DonationForm;
