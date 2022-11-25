const form = document.querySelector("form");
const list = document.getElementById("list");

let my_color = document.querySelector(".body");
let prev_color = null; 
function changeBackground(color)
{
    my_color.classList.add(color);
    my_color.classList.remove(prev_color);
    prev_color = color;
}

function getMovies(searchText) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  const url = `https://api.tvmaze.com/search/shows?q=${searchText}`;
  axios
    .get(url)
    .then((res) => {
      for (let item of res.data) {
        if (item.show.image) {
          const image = document.createElement("img");
          image.src = item.show.image.medium;

          image.style.margin = "10px";

          list.append(image);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inpText = form.elements[0].value;
  getMovies(inpText);   
  form.elements[0].value = "";
});
