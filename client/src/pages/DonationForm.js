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

import logo from "../assets/images/budgetwise-logo.png";
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
  }

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const submitCheckout = async (event) => {
    if (!amount) {
      alert("Please enter an amount");
    } else {
      getCheckout({
        variables: { amount: parseFloat(amount) },
      });
    }
  };

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <Center bg={useColorModeValue()}>
        <Heading
          mt={10}
          bg={useColorModeValue()}
          style={{ fontFamily: "titan one", color: "#037390" }}
          fontSize={50}
        >
          Help us, help you!
        </Heading>
      </Center>
      <section className="text-center ">
        <img
          src={logo}
          alt="Budget Wise Logo"
          className="logo"
          style={{ maxWidth: 300 }}
        />
      </section>

      <Flex
        minH={"60vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue()}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"xl"}
          bg={useColorModeValue("gray.100")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          mb={12}
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
              bg={"blue.600"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.700",
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
