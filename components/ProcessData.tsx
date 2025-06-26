import { Process, RefreshListSerial, Serial, Storage } from "@/types/types";
import React, { memo, useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
const check = require("@/assets/images/check.png");

interface Props {
  serial: Serial;
  storage: Storage;
  process: Process;
  refreshListSerial: RefreshListSerial;
}

const ProcessData = memo(function ProcessData({
  serial,
  storage,
  process,
  refreshListSerial,
}: Props) {
  useEffect(() => {
    if (!process)
      new Promise<boolean>((resolve) => {
        setTimeout(() => {
          const proc = Math.random() * 10 >= 2;
          resolve(proc);
        }, Math.random() * 5000);
      }).then((res) => {
        refreshListSerial(serial, true);
      });
  }, [serial, refreshListSerial, process]);
  return (
    <View style={style.row}>
      <View style={style.cell}>
        <Text>{serial}</Text>
        <Text>{storage}</Text>
      </View>
      {!process ? <ActivityIndicator /> : <Image style={style.image}  source={check} />}
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
    height: 20
  }
});

export default ProcessData;
