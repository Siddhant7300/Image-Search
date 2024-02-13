const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("showmore-btn");

let page = 1;
let inputData = "";

async function SearchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    let data = await response.json();

    const results = data.results;
    console.log(data);

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;

        const anc = document.createElement("a");
        anc.href = result.links.html;
        anc.target = "_blank";
        anc.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(anc);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    SearchImages();
});

showMore.addEventListener("click", (event) => {
    SearchImages();
});
