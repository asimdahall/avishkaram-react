import React from "react";
import Posts from "./pages/Posts";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex align="center" justify="center" className="App" padding="2rem 1.4rem">
      <Posts />
    </Flex>
  );
}

export default App;
