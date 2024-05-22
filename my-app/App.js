// App.js
import React from "react";
import { View } from "react-native";
import ProductList from "./ProductList";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProductList />
    </View>
  );
};

export default App;
