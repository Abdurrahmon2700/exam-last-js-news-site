// litni chaqirib olish
elResultList = $(".js_result_list");

// templateni chaqirib olish
elTemplate = $(".js_template_item").content;
elSelect = $(".select_value");

// elmodal template
elModalTemolate = $(".modal_template").content;

// modal body list
elModalBodyResultList = $(".modal-body");

//bookmark list
elBookmarkList = $(".offcanvas-body");

// bookmark template 
elBookmarkTemplate = $(".bookmark_template").content;

let bookmark = [];

let arr = []
// inputdan qiymatini olish
elInputValue = $(".js_news_title_input");
elDone = $(".done");
elDone.addEventListener("click", (e) => {
  e.preventDefault()
  if (elInputValue.value == "") {
    return
  }
  callNews(elInputValue.value, elSelect.value);

})
let FETCH_NES_API = "https://newsapi.org/v2/everything";

let callNews = function (item = "tesla", publish = "publish") {
  fetch(FETCH_NES_API + `?q=${item}&from=2022-05-02&sortBy=${publish}&apiKey=dfd3e1339f6c438197bfa42b0acf5450`)
    .then(function (resepons) {
      return resepons.json();
    })
    .then(data => {
      arr = data.articles;
      renderNews(data.articles)
    })
}


let renderNews = (data) => {
  // fragment yaratish 
  let elResultFragment = document.createDocumentFragment();
  elResultList.innerHTML = ""
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
}

elResultList.addEventListener("click", (e) => {
  if (e.target.matches(".news_modal")) {
    const foundNews = arr.filter(i => i.title == e.target.dataset.id)
    renderNewsModal(foundNews)
  }

  if (e.target.matches(".news_bookmark")) {
    const foundNews = arr.filter(i => i.title == e.target.dataset.title)
    if (!bookmark.includes(foundNews)) {
      bookmark.push(foundNews);
    }
  }
})








// Modalga render qilish
let renderNewsModal = (data) => {

  let modalFragment = document.createDocumentFragment();
  elModalBodyResultList.innerHTML = ""
  data.forEach(e => {
    let modalTemplate = elModalTemolate.cloneNode(true);
    $(".news_modal_img", modalTemplate).src = e.urlToImage;
    $(".news_modal_title", modalTemplate).textContent = e.title;
    $(".news_modal_description", modalTemplate).textContent = e.description;
    modalFragment.appendChild(modalTemplate)
  })
  elModalBodyResultList.appendChild(modalFragment)
}

// Bookmarkga render qilish
let renderBookmark = (data) => {

  let bookMarkFragment = document.createDocumentFragment();
  data.forEach(e => {
    let elBookmarkTemplateNews = elBookmarkTemplate.cloneNode(true);
    $(".bookmar_title_news", elBookmarkTemplateNews).textContent = e.title;
  })
  elBookmarkList.appendChild(bookMarkFragment)
}
callNews()