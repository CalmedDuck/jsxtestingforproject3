import React, { useState } from 'react';
import './SearchRecipesPage.css';

function SearchRecipesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]); // State to hold search results
    const [isLoading, setIsLoading] = useState(false); // State to track loading status

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Replace with the URL of your backend endpoint
            const response = await fetch(`http://localhost:5000/api/searchRecipes?query=${encodeURIComponent(searchQuery)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setRecipes(data.results);
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
            // Handle errors here, such as displaying a message to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-recipes-page">
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading}>Search</button>
                </form>
            </div>
            <div className="filter-options">
                {/* Filter options here */}
            </div>
            <div className="search-results">
                {isLoading ? <p>Loading...</p> : 
                    recipes.map(recipe => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} />
                            {/* Additional recipe details */}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SearchRecipesPage;
