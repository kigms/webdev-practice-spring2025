/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        let game = games[i];

        // create a new div element, which will become the game card
        const div = document.createElement("div");

        // add the class game-card to the list
        div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        div.innerHTML = `
                        <h3>${game.name}</h3>
                        <img class="game-img" src=${game.img} alt="Heroes of Mythic Americas image">
                        <p>${game.description}</p>
                        `;

        // append the game to the games-container
        gamesContainer.appendChild(div);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of game


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `$${totalContributions.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames = GAMES_JSON.length;
gamesCard.innerHTML = `${numGames}`

// Change the value of the contributions-card to display the result


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let totalUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;
let totalFundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayForTotalUnfundedGames = `
    A total of $${totalRaised.toLocaleString()} has been raised for 
    ${totalFundedGames === 1 ? "1 game." : `${numGames} games.`} 
    Currently, ${totalUnfundedGames === 1 
    ? "1 game remains unfunded. We need your help to fund this amazing game!" 
    : `${totalUnfundedGames} games are unfunded. We need your help to fund these amazing games!`}`;

// create a new DOM element containing the template string and append it to the description container
const para = document.createElement("paragraph");
para.innerHTML = displayForTotalUnfundedGames;
descriptionContainer.appendChild(para);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("p");
topGameElement.innerText = `${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerText = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

const searchInput = document.getElementById('game-search');

function displayGames(games) {
    gamesContainer.innerHTML = '';

    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-card');

        gameDiv.innerHTML = `
            <h3>${game.name}</h3>
            <img class="game-img" src="${game.img}" alt="${game.name} image">
            <p>${game.description}</p>
        `;
        
        gamesContainer.appendChild(gameDiv);
    });
}

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredGames = GAMES_JSON.filter(game => {
        return game.name.toLowerCase().includes(searchTerm);
    });

    displayGames(filteredGames);
});

displayGames(GAMES_JSON);
