import { Text, View } from "react-native";
import { styles } from "./styles";
import React from "react";

type Props = {
  step: number;
  description: string;
};

export function Step({ step, description }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>{step}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
