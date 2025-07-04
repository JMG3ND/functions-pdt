import validateInput from "@/composables/SerialScanner/validateInput";
import { useTimeOutScanner } from "@/hooks/timeOutScanner";
import type { ColectScannerProcess, Serial, Storage } from "@/types/types";
import { Link, useLocalSearchParams } from "expo-router";
import React, { memo, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  addSerial: (listSerials: ColectScannerProcess) => void;
}

const SerialScanner = memo(function SerialScanner({ addSerial }: Props) {
  const { sto } = useLocalSearchParams();
  const [serial, setSerial] = useState<Serial>("");
  const [storage, setStorage] = useState<Storage>(
    typeof sto === "string" ? sto : "#01"
  );
  const inputRef = useRef<TextInput>(null);
  const { handleAddSerial } = useTimeOutScanner(addSerial);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const onChangeText = (text: string) => {
    setSerial(text);
    switch (validateInput(text)) {
      case "serial":
        if (storage) handleAddSerial(text, storage);
        setSerial("");
        break;
      case "storage":
        setStorage(text);
        setSerial("");
        break;
      default:
        if (text.length >= 7) setSerial("");
    }
  };

  useEffect(() => focusInput(), []);
  return (
    <View>
      <View style={styles.row}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Serial/Ubicación"
          autoFocus={true}
          showSoftInputOnFocus={false}
          editable={true}
          value={serial}
          onChangeText={onChangeText}
        />
        <View style={styles.buttonContainer}>
          <Link href={"/locationPicker"}> UBICACIÓN </Link>
        </View>
      </View>
      <Text style={styles.storage}>Ubicación actual: {storage}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 8,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    width: 200,
  },
  buttonContainer: {
    marginLeft: 16,
    borderWidth: 1,
    padding: 8
  },
  storage: {
    alignSelf: "stretch",
    fontSize: 25,
    textAlign: "center",
    padding: 8,
  },
});

export default SerialScanner;
