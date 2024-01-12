import Image from "next/image";
import Link from "next/link";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

const fetchDrinks = async () => {
  const response = await fetch(url);
  // * throw error
  if (!response.ok) {
    throw new Error(`${response?.status} ${response?.statusText}`);
  }
  const data = await response.json();
  return data;
};

const DrinksPage = async () => {
  const data = await fetchDrinks();
  return (
    <div>
      <div className="divider">Drinks</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.drinks.map((drink, index) => (
          <Link
            href={`/drinks/${drink.idDrink}`}
            key={`drink-card-link-${index}`}
          >
            <div className="card bg-base-100 shadow-xl h-[36rem]">
              <figure>
                <div className="relative w-full h-60 mb-4">
                  <Image
                    src={drink?.strDrinkThumb}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    alt={drink?.strDrink}
                    className="rounded-md object-cover"
                  />
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{drink?.strDrink}</h2>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                  }}
                >
                  {drink?.strInstructions}
                </p>
                <div className="card-actions justify-end">
                  {[...Array(15)].map((_, ingredientNo) => {
                    const ingredientKey = `strIngredient${ingredientNo + 1}`;
                    const ingredient = drink[ingredientKey];
                    return ingredient ? (
                      <div key={ingredientKey} className="badge badge-outline">
                        {ingredient}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default DrinksPage;
