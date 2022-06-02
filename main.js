// litni chaqirib olish
elResultList = $(".js_result_list");

// templateni chaqirib olish
elTemplate = $(".js_template_item").content;
elSelect = $(".select_value");



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
    .then(function (data) {

      // fragment yaratish 
      let elResultFragment = document.createDocumentFragment();
      elResultList.innerHTML = ""
      data.articles.forEach(function (news) {
        let elNewsTemplate = elTemplate.cloneNode(true);
        $(".news_img", elNewsTemplate).src = news.urlToImage;
        $(".news_img", elNewsTemplate).alt = news.urlToImage;
        $(".news_author", elNewsTemplate).textContent = news.author;
        $(".news_name", elNewsTemplate).textContent = news.source.name;
        $(".news_title", elNewsTemplate).textContent = news.title;
        $(".news_link", elNewsTemplate).href = news.url;
        $(".news_description", elNewsTemplate).textContent = news.description;


        elResultFragment.appendChild(elNewsTemplate);
      });
      elResultList.appendChild(elResultFragment);
    })
}
callNews()

elResultList.addEventListener("click", (e) => {
  if (e.target.matches(".news_modal")) {
    let newsId = e.target.closest(".news_item").e.url;
    console.log(newsId);

  }
})