import { Alert, ScrollView } from "react-native";
import { Ingredient } from "../Ingredient/Ingredient";
import { styles } from "./styles";
import React, { useState } from "react";
import { SelectedsCounter } from "../SelectedsCounter/SelectedsCounter";
import { router } from "expo-router";

export function Ingredients() {
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggleSelected = (value: number) => {
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
    router.navigate("/recipies");
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: 20 }).map((item, index) => (
          <Ingredient
            key={index}
            name="Tomate"
            image=""
            selected={selected.includes(index)}
            onPress={() => handleToggleSelected(index)}
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
