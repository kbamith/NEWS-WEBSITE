const API_KEY = "3edc5838090942a4993d1c459a6e2318";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("USA"));


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);

}
function bindData(articles){
 const cardscontainer=document.getElementById("cards-container");
const cardtemlet=document.getElementById("templet-card");


cardscontainer.innerHTML='';
articles.forEach(artile => {
    if(!artile.urlToImage) return;
    const cardclone=cardtemlet.content.cloneNode(true);
    fillDataInCard(cardclone,artile)
    cardscontainer.appendChild(cardclone);
});

}
function reload(){
    window.location.reload();
}
function fillDataInCard(cardclone,article){
    const newsimage=cardclone.querySelector('#newsimg');
    const newstitle=cardclone.querySelector('#newstitle');
    const newssource=cardclone.querySelector('#news-source');
    const newsdesc=cardclone.querySelector('#news-desc');
    newsimage.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:'Asia/Jakarta'},);
    newssource.innerHTML=`${article.source.name}▫️${date}`
 cardclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank")
 })

}
let currentSelectedNav=null;
function OnNavItemClick(id){
fetchNews(id);
const navitem=document.getElementById(id);
currentSelectedNav?.classList.remove("active");
currentSelectedNav=navitem;
currentSelectedNav.classList.add('active');

}
const searchbutton=document.getElementById("search");
const input=document.getElementById("input");
searchbutton.addEventListener('click',()=>{
const query=input.value;
if(!query) return;
fetchNews(query);
currentSelectedNav?.classList.remove("active");
currentSelectedNav=null;
});