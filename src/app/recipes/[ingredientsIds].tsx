import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { services } from "@/services";

import { Ingredients } from "@/components/Ingredients/Ingredients";
import { Loading } from "@/components/Loading";
import { Recipe } from "@/components/Recipe";
import { styles } from "./styles";

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const ingredientsIds = params.ingredientsIds.split(",");

  useEffect(() => {
    services.recipes
      .findByIngredientsIds(ingredientsIds)
      .then((response) => setRecipes(response))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    services.ingredientes
      .findByIds(ingredientsIds)
      .then((response) => setIngredients(response))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          size={32}
          name="arrow-back"
          onPress={() => router.back()}
        />

        <Text style={styles.title}>Ingredientes</Text>
      </View>

      {<Ingredients ingredients={ingredients} />}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Recipe
            recipe={item}
            onPress={() => router.navigate("/recipe/" + item.id)}
          />
        )}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>
            Nenhuma receita encontrada. Escolha outros ingredientes.
          </Text>
        )}
      />
    </View>
  );
}
