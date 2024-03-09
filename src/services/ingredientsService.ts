import { supabase } from "./supabase";

async function findByIds(ids: string[]) {
  const { data } = await supabase
    .from("ingredients")
    .select()
    .in("id", ids)
    .order("name")
    .returns<IngredientResponse[]>();

  return data ?? [];
}

async function findByRecipeId(id: string) {
  const response_data = await supabase
    .from("recipes_ingredients")
    .select()
    .eq("recipe_id", id)
    .returns<RecipesIngredientsResponse[]>();

  const ingredientsIds = response_data.data?.map((item) => {
    return item.ingredient_id;
  });

  const { data } = await supabase
    .from("ingredients")
    .select()
    .in("id", ingredientsIds!)
    .returns<IngredientResponse[]>();

  return data ? data.map((item) => item) : [];
}

async function findAll() {
  const { data } = await supabase
    .from("ingredients")
    .select()
    .order("name")
    .returns<IngredientResponse[]>();

  return data ?? [];
}

export { findAll, findByIds, findByRecipeId };
