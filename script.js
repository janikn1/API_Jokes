'use strict';

const languages = {
    "cs": "CZECH",
    "de": "GERMAN",
    "en": "ENGLISH",
    "es": "SPANISH",
    "eu": "BASQUE",
    "fr": "FRENCH",
    "gl": "GALICIAN",
    "hu": "HUNGARIAN",
    "it": "ITALIAN",
    "lt": "LITHUANIAN",
    "pl": "POLISH",
    "sv": "SWEDISH"
};

const categories = ["all", "neutral", "chuck"];

function populateLanguageDropdown() {
    const languageSelect = document.getElementById('selLang');
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select a Language';
    defaultOption.value = '';
    languageSelect.appendChild(defaultOption);

    for (let code in languages) {
        const option = document.createElement('option');
        option.value = code;
        
        option.text = languages[code].charAt(0) + languages[code].slice(1).toLowerCase();
        languageSelect.appendChild(option);
    }
}

function populateCategoryDropdown() {
    const categorySelect = document.getElementById('selCat');
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select a Category';
    defaultOption.value = '';
    categorySelect.appendChild(defaultOption);

    for (let code in categories) {
        const option = document.createElement('option');
        option.value = categories[code];
        option.text = categories[code];
        categorySelect.appendChild(option);
    }
}

function populateNumberDropdown() {
    const numberSelect = document.getElementById('selNum');

    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select Number of Jokes';
    numberSelect.appendChild(defaultOption);

    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        numberSelect.appendChild(option);
    }
    const option = document.createElement('option');
    option.value = "All";
    option.text = "All";
    numberSelect.appendChild(option);
}

async function clickedon() {
    let language = document.querySelector('#selLang').value;
    let category = document.querySelector('#selCat').value;
    let number = parseInt(document.querySelector('#selNum').value);
    let jokeid = document.querySelector('#jokeId').value;
    let jokesTable = document.querySelector('#jokes');
    let url = "";

    if (jokeid == ""){
        if (!language || !category || !number) {
        jokesTable.innerHTML = '<p class="error">Please select language, category, and number of jokes.</p>';
        return;
        }
    }
    jokeid = parseInt(jokeid)

    if (jokeid){
        url = `https://cs330-work.onrender.com/?jokeid=${jokeid}`;
    }else{
        url = `https://cs330-work.onrender.com/?language=${language}&category=${category}&number=${number}`;
    }

    jokesTable.innerHTML = '';

    try {
        console.log(url)
        let result = await getData(url);
        console.log(result)
        if (result.jokes) {
            result.jokes.forEach((joke) => {
                let jokeArticle = document.createElement("article");
                jokeArticle.classList.add("message", "is-info");
    
                let jokeDiv = document.createElement("div");
                jokeDiv.classList.add("message-body");
                jokeDiv.innerHTML = joke;
    
                jokeArticle.appendChild(jokeDiv);
                jokesTable.appendChild(jokeArticle);
            });
        } else {
            jokesTable.innerHTML = '<p class="error">No jokes found for the selected options.</p>';
        }
    } catch (error) {
        console.error("Error fetching jokes:", error);
        jokesTable.innerHTML = '<p class="error">Error fetching jokes. Please try again later.</p>';
    }
    document.querySelector('#jokeform').reset();
}

async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getData:', error);
        return error
    }
}


window.onload = function() {
    populateLanguageDropdown();
    populateCategoryDropdown();
    populateNumberDropdown();
};

