let xhr = new XMLHttpRequest();

xhr.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=ph&tag=animals', true);
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let gifUrl = JSON.parse(xhr.responseText).data.image_original_url;
        let body = document.querySelector('body');
        body.style.backgroundImage = 'url(' + gifUrl + ')';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundSize = 'cover';
    }
};
xhr.send();
