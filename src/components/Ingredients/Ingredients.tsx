import { ScrollView } from "react-native";
import { Ingredient } from "../Ingredient/Ingredient";
import { styles } from "./styles"
import { useState } from "react";

export function Ingredients() {
  const [selected, setSelected] = useState<number[]>([])

  const handleToggleSelected = (value: number) => {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value))
    }

    setSelected((state) => [...state, value])
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: 100 }).map((item, index) => (
        <Ingredient
          key={index}
          name="Tomate"
          image=""
          selected={selected.includes(index)}
          onPress={() => handleToggleSelected(index)} />
      ))}
    </ScrollView>
  )
}
