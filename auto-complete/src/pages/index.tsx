import { useEffect, useState } from "react";

type Recipe = {
  id: string;
  name: string;
};
type Cache = Record<string, Recipe[]>;

export default function Home() {
  const [recipesData, setRecipiesData] = useState<Recipe[]>([]);
  const [inputData, setInputData] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState<Cache>({});
  const [keydown, setKeydown] = useState<number>(-1);

  useEffect(() => {
    if (cache[inputData]) {
      setRecipiesData(cache[inputData]);
      return;
    }
    async function fetchRecipies() {
      if (inputData === "") {
        setRecipiesData([]);
        return;
      }
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${inputData}`
      );
      const data = await response.json();
      setRecipiesData(data?.recipes.slice(0, 10));
      setCache((prev) => ({ ...prev, [inputData]: data?.recipes }));
    }
    const timer = setTimeout(() => fetchRecipies(), 400);

    return () => clearTimeout(timer);
  }, [inputData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!recipesData.length) return;

      if (event.key === "ArrowDown") {
        setKeydown((prev) => (prev + 1) % recipesData.length);
      } else if (event.key === "ArrowUp") {
        setKeydown((prev) => (prev <= 0 ? recipesData.length - 1 : prev - 1));
      } else if (
        event.key === "Enter" &&
        keydown >= 0 &&
        keydown < recipesData.length
      ) {
        setInputData(recipesData[keydown].name);
        setShowResults(false);
        setKeydown(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [recipesData, keydown]);

  return (
    <div className="bg-amber-100 h-screen py-10 px-80">
      <input
        className="input-field w-full bg-white"
        value={inputData}
        type="text"
        onChange={(e) => setInputData(e.target.value)}
        onFocus={() => setShowResults(true)}
      />

      {recipesData.length && showResults ? (
        <div className="select-box">
          {recipesData.map((recipe, index) => (
            <h1
              className="option"
              onClick={() => {
                setInputData(recipe.name);
                setShowResults(false);
              }}
              style={{ backgroundColor: index === keydown ? "lightgrey" : "" }}
              key={recipe.id}
            >
              {recipe.name}
            </h1>
          ))}
        </div>
      ) : null}
    </div>
  );
}
