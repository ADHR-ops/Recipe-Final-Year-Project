const axios = require('axios')
const getRecipe = async (url) => {
    const { data } = await axios.post("http://localhost:5000/recommend", {
        ingredients: "eggs, bread, cheese, ketchup, mayo, onions"
    })
    console.log(data);
}
getRecipe()
