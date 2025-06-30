import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const storagesNames = [
  "#01",
  "#02",
  "#03",
  "#04",
  "#05",
  "#06",
  "#07",
  "#08",
  "#09",
  "#10",
  "#11",
  "#12",
  "#13",
  "#14",
  "#15",
  "#16",
  "#17",
  "#18",
  "#19",
  "#20",
  "#21",
  "#22",
  "#23",
  "#24",
  "#25",
  "#26",
  "#27",
  "#28",
  "#ALM1_P#1",
  "#ALM1_P#2",
  "#ALM1_P#3",
  "#ALM2_P#1",
  "#ALM2_P#2",
  "#PLAN2_P#1",
  "#PLAN2_P#2",
  "#PLAN2_P#3",
];

export default function locationPicker() {
  function back(stoName: string) {
    router.push({ pathname: "/", params: { sto: stoName } });
  }
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={style.scrollContent}>
      <View style={style.container}>
        {storagesNames.map((storageName) => {
          return (
            <TouchableOpacity
              key={storageName}
              style={style.button}
              onPress={() => back(storageName)}
            >
              <Text style={style.buttonText}>{storageName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  scrollContent: {
    width: "100%",
    paddingBottom: 50,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
