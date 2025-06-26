import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  products: Record<string, any>[];
}

/**Componente para visualizar los productos que se van cargando
 * @param serials Objeto que contiene toda la información del producto
 */
export default function ViewProducts({ products }: Props) {
  return (
    <View style={styles.container}>
      {products.map((product, index) => {
        return (
          <View key={index}>
            <Text>{product.Description}</Text>
            <Text>{product.UPC}</Text>
            <Text>{product.OriginWeight}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    display: "flex",
    flexWrap: "nowrap",
  },
});
