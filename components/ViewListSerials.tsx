import type { ListScannerProcess, RefreshListSerial } from "@/types/types";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProcessData from "./ProcessData";

interface Props {
  listSerials: ListScannerProcess;
  refreshListSerial: RefreshListSerial;
}

export default function ViewListSerials({
  listSerials,
  refreshListSerial,
}: Props) {
  return (
    <ScrollView style={style.container}>
      {Object.entries(listSerials).map(
        ([serial, { storage, process }], index) => {
          return (
            <ProcessData
              key={index}
              serial={serial}
              storage={storage}
              process={process}
              refreshListSerial={refreshListSerial}
            />
          );
        }
      )}
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
