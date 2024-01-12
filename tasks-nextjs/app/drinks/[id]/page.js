import Link from "next/link";
import drinkImg from "./drink.jpg";
import Image from "next/image";

const fetchDrink = async (id) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  // * throw error
  if (!response.ok) {
    throw new Error(`${response?.status} ${response?.statusText}`);
  }
  const data = await response.json();
  return data;
};

const SingleDrinkPage = async ({ params }) => {
  const data = await fetchDrink(params?.id);

  const drink = data?.drinks[0];
  const title = drink?.strDrink;
  const imgSrc = drink?.strDrinkThumb;

  return (
    <>
      <Link href="/drinks" className="btn btn-accent my-8">
        Back To Drinks
      </Link>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          {/* <img src={drink?.strDrinkThumb} alt="Drink" /> */}
          <div className="relative w-full h-[40rem] mb-4">
            <Image
              src={imgSrc}
              fill
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%"
              alt={title}
              className="object-contain"
            />
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{drink?.strDrink}</h2>
          <p>{drink?.strInstructions}</p>
          <div className="card-actions justify-end">
            {[...Array(15)].map((_, ingredientNo) => {
              const ingredientKey = `strIngredient${ingredientNo + 1}`;
              const ingredient = drink[ingredientKey];
              const measure = drink[`strMeasure${ingredientNo + 1}`];
              return ingredient ? (
                <div key={ingredientKey} className="badge badge-outline">
                  {ingredient} {measure}
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleDrinkPage;
