import { Alert, ScrollView } from "react-native";
import { Ingredient } from "../Ingredient/Ingredient";
import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import { SelectedsCounter } from "../SelectedsCounter/SelectedsCounter";
import { router } from "expo-router";
import { services } from "@/services";

export function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  const handleToggleSelected = (value: string) => {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }

    setSelected((state) => [...state, value]);
  };

  const handleClearSelecteds = () => {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => setSelected([]),
      },
    ]);
  };

  const handleSearchSelecteds = () => {
    router.navigate("/recipes/" + selected);
  };

  useEffect(() => {
    services.ingredientes.findAll().then(setIngredients);
  });

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {ingredients.map((item) => (
          <Ingredient
            key={item.id}
            name={item.name}
            image={`${services.storage.imagePath}/${item.image}`}
            selected={selected.includes(item.id)}
            onPress={() => handleToggleSelected(item.id)}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <SelectedsCounter
          quantity={selected.length}
          onClear={handleClearSelecteds}
          onSearch={handleSearchSelecteds}
        />
      )}
    </>
  );
}
