// 今は用意したJSファイルのみ読み込み
const jsonUrls = [
  "list.json",
  "list2.json"
];

function renderAuthor(data) {
  const results = document.getElementById("results");

  const article = document.createElement("article");
  article.classList.add("author");

  if (data.author.pubkey) {
    article.dataset.pubkey = data.author.pubkey;
  }

  const h2 = document.createElement("h2");
  h2.textContent = data.author.name + " ";

  if (data.author.pubkey) {
    const small = document.createElement("small");
    small.classList.add("pubkey");
    small.textContent = data.author.pubkey;
    h2.appendChild(small);
  }

  const about = document.createElement("p");
  about.textContent = data.about;

  const ul = document.createElement("ul");

  data.sites.forEach(site => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = site.url;
    a.textContent = site.title;
    a.target = "_blank";

    li.appendChild(a);
    ul.appendChild(li);
  });

  article.appendChild(h2);
  article.appendChild(about);
  article.appendChild(ul);

  results.appendChild(article);
}

jsonUrls.forEach(url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderAuthor(data);
    });
});

// 検索処理
const searchInput = document.querySelector("input[type='text']");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  filterAuthors(keyword);
});

function filterAuthors(keyword) {
  // クラスauthorの全てを変数authorsへ
  const authors = document.querySelectorAll(".author");

  // その中からli要素のチェック
  authors.forEach(author => {
    const sites = author.querySelectorAll("li");
    console.log({
      author: author.textContent,
      keyword,
    });
    let hitCount = 0;

    sites.forEach(site => {
      const text = site.textContent.toLowerCase();

      // キーワードが含まれていたら、そのliだけ表示
      if (text.includes(keyword)) {
        site.style.display = "";
        hitCount++;
          console.log({
            author: author.textContent,
            text,
            keyword,
          });
      } else {
        site.style.display = "none";
      }
    });

    author.style.display = hitCount > 0 ? "" : "none";
  });
  
  console.log("Finished");

}
