
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
const supabaseUrl = 'https://oqjtlersgczldlzrnljt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xanRsZXJzZ2N6bGRsenJubGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyODQ5NDEsImV4cCI6MjAxNTg2MDk0MX0.00gHU49iZDnKdi8f0cJx9MDaKIbDe6NzPFDZ0mirzc8'
//supabase initialized
const supabase = createClient(supabaseUrl, supabaseKey)

//used to fetch all the categories
const category_uri = "https://www.themealdb.com/api/json/v1/1/categories.php"
const fetchMealCategoriesAndInsertInSupabase = async (url, tableName = 'categories') => {
    const data = await axios.get(url)
    const categories_array = data.data.categories
    categories_array.forEach(async (cat) => {
        const { idCategory, strCategory, strCategoryThumb, strCategoryDescription } = cat
        await supabase.from(tableName).insert({ idCategory, strCategory, strCategoryThumb, strCategoryDescription })
    })
}
// used to fetch all the meals based on fetched categories
const meal_by_category = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
const fetchMealByCategoriesAndInsertInSupabase = async (categoryUrl, mealByCategoryUrl, tableName) => {
    const data = await axios.get(categoryUrl)
    const categories_array = data.data.categories
    categories_array.forEach(async (cat) => {
        const { strCategory } = cat
        const response = await axios.get(mealByCategoryUrl + strCategory)
        const data = response.data.meals
        data.forEach(async (meal) => {
            const { strMeal, strMealThumb, idMeal } = meal
            await supabase.from(tableName).insert({ strMeal, strMealThumb, idMeal, strCategory })
        })

    })
}
// fetchMealByCategoriesAndInsertInSupabase(category_uri, meal_by_category, 'mealByCategory')
const detail_meal_uri = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
const getMealDetails = async (url) => {
    try {
        // Fetch all the meal ids from the table mealByCategory
        const { data } = await supabase.from('RecipesByCategory').select("idMeal");

        // Counter to keep track of the number of requests made
        let requestCounter = 0;

        // Function to make requests with rate limiting
        const makeRequestWithRateLimit = async (mealId) => {
            const { idMeal } = mealId;

            try {
                const response = await axios.get(url + idMeal);
                const meal = response.data.meals[0];


                const {
                    strMeal,
                    strDrinkAlternate,
                    strCategory,
                    strArea,
                    strInstructions,
                    strMealThumb,
                    strTags,
                    strYoutube,
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                    strIngredient6,
                    strIngredient7,
                    strIngredient8,
                    strIngredient9,
                    strIngredient10,
                    strIngredient11,
                    strIngredient12,
                    strIngredient13,
                    strIngredient14,
                    strIngredient15,
                    strIngredient16,
                    strIngredient17,
                    strIngredient18,
                    strIngredient19,
                    strIngredient20,
                    strMeasure1,
                    strMeasure2,
                    strMeasure3,
                    strMeasure4,
                    strMeasure5,
                    strMeasure6,
                    strMeasure7,
                    strMeasure8,
                    strMeasure9,
                    strMeasure10,
                    strMeasure11,
                    strMeasure12,
                    strMeasure13,
                    strMeasure14,
                    strMeasure15,
                    strMeasure16,
                    strMeasure17,
                    strMeasure18,
                    strMeasure19,
                    strMeasure20,
                    strSource,
                    strImageSource,
                    strCreativeCommonsConfirmed,
                    dateModified
                } = meal;

                await supabase.from('Recipes').insert({
                    idMeal,
                    strMeal,
                    strDrinkAlternate,
                    strCategory,
                    strArea,
                    strInstructions,
                    strMealThumb,
                    strTags,
                    strYoutube,
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                    strIngredient6,
                    strIngredient7,
                    strIngredient8,
                    strIngredient9,
                    strIngredient10,
                    strIngredient11,
                    strIngredient12,
                    strIngredient13,
                    strIngredient14,
                    strIngredient15,
                    strIngredient16,
                    strIngredient17,
                    strIngredient18,
                    strIngredient19,
                    strIngredient20,
                    strMeasure1,
                    strMeasure2,
                    strMeasure3,
                    strMeasure4,
                    strMeasure5,
                    strMeasure6,
                    strMeasure7,
                    strMeasure8,
                    strMeasure9,
                    strMeasure10,
                    strMeasure11,
                    strMeasure12,
                    strMeasure13,
                    strMeasure14,
                    strMeasure15,
                    strMeasure16,
                    strMeasure17,
                    strMeasure18,
                    strMeasure19,
                    strMeasure20,
                    strSource,
                    strImageSource,
                    strCreativeCommonsConfirmed,
                    dateModified
                });
                console.log('inserted ');

                // Increase the request counter
                requestCounter++;

                // Check if there are more meals to process
                if (requestCounter < data.length) {
                    // Schedule the next request after a delay (10 seconds / total requests)
                    const delay = (10 * 1000) / data.length;
                    setTimeout(() => makeRequestWithRateLimit(data[requestCounter]), delay);
                }
            } catch (error) {
                // Handle errors (e.g., log them)
                console.error(`Error processing request for mealId ${idMeal}:`, error);
            }
        };

        // Start making requests
        makeRequestWithRateLimit(data[requestCounter]);
    } catch (error) {
        console.error('Error fetching meal data:', error);
    }
};
getMealDetails(detail_meal_uri)

