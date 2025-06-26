import { useTimeOutScanner } from "@/hooks/timeOutScanner";
import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface Props {
  addSerial: (listSerials: string[]) => void;
}

export default function SerialScanner({ addSerial }: Props) {
  const [serial, setSerial] = useState<string>("");
  const inputRef = useRef<TextInput>(null);
  const { handleAddSerial } = useTimeOutScanner(addSerial);
  
  const handleClearSerial = () => {
    inputRef.current?.clear();
    focusInput();
  };
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  useEffect(() => focusInput());
  return (
    <View style={styles.row}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Serial/Ubicación"
        autoFocus={true}
        showSoftInputOnFocus={false}
        editable={true}
        value={serial}
        onChangeText={(text) => {
          setSerial(text);
          if (text.length === 7) {
            handleAddSerial(text);
            setSerial("");
          } else if (text.length >= 7) {
            setSerial("");
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Borrar" onPress={handleClearSerial} />
      </View>
    </View>
  );
}

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
  },
});
