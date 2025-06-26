import type { ListScannerProcess } from "@/types/types";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProcessData from "./ProcessData";

interface Props {
  listSerials: ListScannerProcess;
}

export default function ViewListSerials({ listSerials }: Props) {
  return (
    <ScrollView style={style.container}>
      {Array.from(listSerials).map(({ serial, storage }, index) => {
        return <ProcessData key={index} serial={serial} storage={storage} />;
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
});
