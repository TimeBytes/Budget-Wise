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

import React, { useState } from "react"; // Update the import
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";

const stripePromise = loadStripe(
"pk_test_51NdeCcJJYT86npXC9P0eXGwM0LEojk6P7yMabT5rpFsACJ01ZiYQXY2OfqhYDEmP93DJyYkDbkHOuXTcnEHDklX400aBYioMbW"
  );

const DonationForm = () => {
  const [amount, setAmount] = useState(""); // State to hold donation amount

  // handle click function for donation
  const handleClick = async (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Please enter a donation amount.");
      return;
    }

    const stripe = await stripePromise;

    try {
      // Create a new Checkout Session here and pass the amount
      const url = ""
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.STRIPE_SK}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const session = await response.json();

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        // Handle Stripe error
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle other errors
    }
  };

  return (
    <div>
      <Center>
        <Heading>Help us, help you!</Heading>
      </Center>

      <Flex
        minH={"100vh"}
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
              onChange={(e) => setAmount(e.target.value)} // Update the state on input change
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleClick}
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
