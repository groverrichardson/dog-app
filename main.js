function watchRandomSubmit() {
    $('button.random-button').click((event) => {
        event.preventDefault();
        console.log(event);
        $(`.image-container.random`).empty();
        if (event.currentTarget.value < 50) {
            console.log('hi there');
        } else {
            throw new Error('Value needs to be between 1 and 50');
        }
    });
}

function watchBreedSubmit() {
    $('button.breed-button').click((event) => {
        event.preventDefault();
        $(`.image-container.breed`).empty();
        fetchBreedImages();
    });
}

function fetchImages() {
    let input = $('.how-many-dogs').val();
    console.log(input);
    fetch(`https://dog.ceo/api/breeds/image/random/${input}`)
        .then((response) => response.json())
        .then((responseJson) => displayRandomImages(responseJson));
}

function fetchBreedImages() {
    let input = $('.type-of-dog').val();
    fetch(`https://dog.ceo/api/breed/${input}/images/random`)
        .then((response) => response.json())
        .then((responseJson) => displayBreedImages(responseJson))
        .catch((error) => alert(`Something went wrong. Try again later.`));
}

function displayRandomImages(responseJson) {
    console.log(responseJson);
    for (i = 0; i < responseJson.message.length && i < 51; i++) {
        $(`.image-container.random`).append(
            `<img src="${responseJson.message[i]}" class="dog-image">`
        );
    }
}

function displayBreedImages(responseJson) {
    console.log(responseJson);
    $(`.image-container.breed`).append(
        `<img src="${responseJson.message}" class="dog-image">`
    );
}

function runFunctions() {
    watchRandomSubmit();
    watchBreedSubmit();
}

runFunctions();
