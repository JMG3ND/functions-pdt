import React, { memo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Props {
  serial: string;
  storage: string;
}

const ProcessData = memo(function ProcessData({ serial, storage }: Props) {
  /* const [process, useProcess] = useState(false);
  useEffect(() => {

  }) */
  return (
    <View style={style.row}>
      <Text style={style.cell}>{serial}</Text>
      <Text style={style.cell}>{storage}</Text>
      <Text>
        <ActivityIndicator />
      </Text>
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
  cell: {},
});

export default ProcessData;
