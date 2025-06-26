import type { ListSerials } from "@/types/types";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

interface Props {
  listSerials: ListSerials;
}

export default function ViewListSerials({ listSerials }: Props) {
  return (
    <ScrollView style={style.container}>
      <Text style={style.row}>Serial</Text>
      {Array.from(listSerials).map((serial, index) => {
        return (
          <Text style={style.row} key={index}>
            {serial}
          </Text>
        );
      })}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: "60%",
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "black",
    width: "100%",
    padding: 8,
  },
});
