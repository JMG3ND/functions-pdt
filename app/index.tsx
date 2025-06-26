import SerialScanner from "@/components/SerialScanner";
import ViewListSerials from "@/components/ViewListSerials";
import useAddSerial from "@/hooks/addSerial";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function Index() {
  const { addSerial, listSerials } = useAddSerial()

  return (
    <View style={styles.container}>
      <SerialScanner addSerial={addSerial} />
      <ViewListSerials listSerials={listSerials} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flex: 1,
    alignItems: "center",
    borderColor: "black",
    height: Dimensions.get("window").height,
    overflow: "hidden",
  },
});
