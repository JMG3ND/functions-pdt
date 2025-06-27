import { Process, Serial, Storage } from "@/types/types";
import React, { memo } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
const check = require("@/assets/images/check.png");
const error = require("@/assets/images/error.png");

interface Props {
  serial: Serial;
  storage: Storage;
  process?: Process;
}

const ProcessData = memo(function ProcessData({
  serial,
  storage,
  process,
}: Props) {
  /*
  useEffect(() => {
    if (!process) fetchSerial(serial, storage, refreshListSerial);
  }, [serial, refreshListSerial, process, storage]);*/
  return (
    <View style={style.row}>
      <View style={style.cell}>
        <Text>{serial}</Text>
        <Text>{storage}</Text>
      </View>
      {process === undefined ? (
        <ActivityIndicator />
      ) : process ? (
        <Image style={style.image} source={check} />
      ) : (
        <Image style={style.image} source={error} />
      )}
    </View>
  );
});

const style = StyleSheet.create({
  row: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "black",
    width: "100%",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default ProcessData;
