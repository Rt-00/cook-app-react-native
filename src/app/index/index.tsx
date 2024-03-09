import { View, Text, ScrollView, Alert } from "react-native";
import "./styles";
import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import { services } from "@/services";
import { Ingredient } from "@/components/Ingredient/Ingredient";
import { router } from "expo-router";
import { SelectedsCounter } from "@/components/SelectedsCounter/SelectedsCounter";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

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

  const handleToggleSelected = (value: string) => {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }

    setSelected((state) => [...state, value]);
  };

  useEffect(() => {
    services.ingredientes.findAll().then(setIngredients);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu
      </Text>


      <ScrollView
        contentContainerStyle={styles.ingredients}
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

    </View>
  );
}
