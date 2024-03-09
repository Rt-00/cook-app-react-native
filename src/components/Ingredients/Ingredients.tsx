import { ScrollView } from "react-native";
import { services } from "@/services";
import {
  Ingredient,
  IngredientProps,
} from "@/components/Ingredient/Ingredient";
import { styles } from "./styles";
import React from "react";

type Props = {
  ingredients: IngredientProps[];
};

export function Ingredients({ ingredients }: Props) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.ingredientsContent}
      showsHorizontalScrollIndicator={false}
    >
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          name={ingredient.name}
          image={`${services.storage.imagePath}/${ingredient.image}`}
        />
      ))}
    </ScrollView>
  );
}
