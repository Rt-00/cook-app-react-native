import { Ingredients } from "@/components/Ingredients/Ingredients";
import { Loading } from "@/components/Loading";
import { Step } from "@/components/Step/Step";
import { services } from "@/services";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./styles";

export default function Recipe() {
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [preparations, setPreparations] = useState<PreparationsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    services.recipes
      .show(id)
      .then((response) => setRecipe(response))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    services.ingredientes
      .findByRecipeId(id)
      .then((response) => setIngredients(response));
  }, []);

  useEffect(() => {
    services.preparations
      .findByRecipeId(id)
      .then((response) => setPreparations(response));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!id || !recipe) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.header}>
          <MaterialIcons
            size={32}
            name="arrow-back"
            onPress={() => router.back()}
          />

          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.time}>{recipe.minutes} minutos de preparo</Text>
        </View>

        <Ingredients ingredients={ingredients} />

        <View style={styles.content}>
          <Text style={styles.preparation}>Modo de preparo</Text>

          <FlatList
            data={preparations}
            renderItem={({ item }) => (
              <Step step={item.step} description={item.description} />
            )}
            contentContainerStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}
