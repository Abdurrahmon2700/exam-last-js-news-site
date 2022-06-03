const API_KEY = "6f57c79666114bdd96fc03b95436abbf";


// listni chaqirib olish
elResultList = $(".js_result_list");

// templateni chaqirib olish
elTemplate = $(".js_template_item").content;

// selectni chaqirib olish
elSelect = $(".select_value");

// elmodal template
elModalTemolate = $(".modal_template").content;

// modal body list
elModalBodyResultList = $(".modal-body");

//bookmark list
elBookmarkList = $(".offcanvas-body");

// bookmark template
elBookmarkTemplate = $(".bookmark_template").content;

// fetch bo'lgan ma'lumotni shu arrayga yig'ib olish
let fetchArray = [];

let bookMark = JSON.parse(localStorage.getItem("news")) || [];

// inputdan qiymatini olish
elInputValue = $(".js_news_title_input");

// done buttoni olib kelish
elDone = $(".done");

// qidiruv tizimi ishga tushurish
elDone.addEventListener("click", (e) => {
  e.preventDefault();
  if (elInputValue.value == "") {
    return;
  }
  callNews(elInputValue.value, elSelect.value);
});

// ma'lumotlarni API dan olib kelib fetch qiladigan function
let FETCH_NES_API = "https://newsapi.org/v2/everything";


let callNews = function (item = "tesla", publish = "publish") {
  fetch(
      FETCH_NES_API +
      `?q=${item}&from=2022-06-03&sortBy=${publish}&apiKey=${API_KEY}`
    )
    .then(function (resepons) {
      return resepons.json();
    })
    .then((data) => {
      fetchArray = data.articles;
      renderNews(data.articles);
    });
};

// asosiy result listga ma'lumotlarni joylash 
let renderNews = (data) => {

  let elResultFragment = document.createDocumentFragment();
  elResultList.innerHTML = "";
  data.forEach(function (news) {
    let elNewsTemplate = elTemplate.cloneNode(true);
    $(".news_img", elNewsTemplate).src = news.urlToImage;
    $(".news_img", elNewsTemplate).alt = news.urlToImage;
    $(".news_author", elNewsTemplate).textContent = news.author;
    $(".news_name", elNewsTemplate).textContent = news.source.name;
    $(".news_title", elNewsTemplate).textContent = news.title;
    $(".news_link", elNewsTemplate).href = news.url;
    $(".news_description", elNewsTemplate).textContent = news.description;
    $(".news_modal", elNewsTemplate).dataset.id = news.title;
    $(".news_bookmark", elNewsTemplate).dataset.title = news.title;

    elResultFragment.appendChild(elNewsTemplate);
  });
  elResultList.appendChild(elResultFragment);
};

// item ichidagi qaysi button bosilganini aniqlab olish
elResultList.addEventListener("click", (e) => {

  // birinchi if modal uchun ishlaydi 
  if (e.target.matches(".news_modal")) {
    const foundNews = fetchArray.filter((i) => i.title == e.target.dataset.id);
    renderNewsModal(foundNews);
  }

  // ikkinchi if bookmark uchun ishlaydi
  if (e.target.matches(".news_bookmark")) {
    const foundNews = fetchArray.filter((i) => i.title == e.target.dataset.title);
    let count = foundNews.map((e) => e.title);

    if (!fetchArray.includes(count)) {
      bookMark.push(foundNews);
      window.localStorage.setItem("news", JSON.stringify(bookMark));
    }
    bookMarkRender(bookMark);
  }
});

// Modalga render qilish
let renderNewsModal = (data) => {
  let modalFragment = document.createDocumentFragment();
  elModalBodyResultList.innerHTML = "";
  data.forEach((e) => {
    let modalTemplate = elModalTemolate.cloneNode(true);
    $(".news_modal_img", modalTemplate).src = e.urlToImage;
    $(".news_modal_title", modalTemplate).textContent = e.title;
    $(".news_modal_description", modalTemplate).textContent = e.description;
    modalFragment.appendChild(modalTemplate);
  });
  elModalBodyResultList.appendChild(modalFragment);
};
callNews();

// Bookmaekni ishlatolmadim lekin bundan oldingi vazifada qilgan edim 
// Bookmarkga render qilish 
// let bookMarkRender = (array) => {
//   console.log(array);
//   elBookmarkList.innerHTML = "";
//   let bookMarkFragment = document.createDocumentFragment();
//   bookMark.forEach(function (news) {
//     let elBookmarkTemplateNews = elBookmarkTemplate.cloneNode(true);
//     $(".bookmar_title_news", elBookmarkTemplateNews).textContent = news.title;
//   });
//   elBookmarkList.appendChild(bookMarkFragment);
// };