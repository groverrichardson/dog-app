function watchRandomSubmit() {
    $('button.random-button').click((event) => {
        event.preventDefault();
        let input = $('.how-many-dogs').val();
        $(`.image-container.random`).empty();
        $('.random-error-message').empty();
        try {
            if (input >= 1 && input <= 50) {
                fetchImages();
            } else {
                throw new Error('Value needs to be between 1 and 50');
            }
        } catch (error) {
            $('.random-error-message').text(error.message);
        }
    });
}

function watchBreedSubmit() {
    $('button.breed-button').click((event) => {
        event.preventDefault();
        let input = $('.type-of-dog').val();
        $('.breed-error-message').empty();
        $(`.image-container.breed`).empty();
        try {
            if (input !== '') {
                fetchBreedImages();
            } else {
                throw new Error('Please enter a breed.');
            }
        } catch (error) {
            $('.breed-error-message').text(error.message);
        }
    });
}

function fetchImages() {
    let input = $('.how-many-dogs').val();
    fetch(`https://dog.ceo/api/breeds/image/random/${input}`)
        .then((response) => response.json())
        .then((responseJson) => displayRandomImages(responseJson));
}

function fetchBreedImages() {
    let input = $('.type-of-dog').val();
    fetch(`https://dog.ceo/api/breed/${input}/images/random`)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status !== 'error') {
                displayBreedImages(responseJson);
            } else {
                throw new Error(responseJson.message);
            }
        })
        .catch((error) => $('.breed-error-message').text(error.message));
}

function displayRandomImages(responseJson) {
    for (i = 0; i < responseJson.message.length && i < 51; i++) {
        $(`.image-container.random`).append(
            `<img src="${responseJson.message[i]}" class="dog-image">`
        );
    }
}

function displayBreedImages(responseJson) {
    $(`.image-container.breed`).append(
        `<img src="${responseJson.message}" class="dog-image">`
    );
}

function runFunctions() {
    watchRandomSubmit();
    watchBreedSubmit();
}

runFunctions();
