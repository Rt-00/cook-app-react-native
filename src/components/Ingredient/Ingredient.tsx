import { Image, Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";
import React from "react";

export interface IngredientProps extends PressableProps {
  name: string;
  image: string;
  selected?: boolean;
}

export function Ingredient({
  name,
  image,
  selected = false,
  ...rest
}: IngredientProps) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.title}>{name}</Text>
    </Pressable>
  );
}
