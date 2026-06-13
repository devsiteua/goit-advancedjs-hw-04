import{a as B,S as P,i}from"./assets/vendor-CIF6YjI2.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const M="56208412-7d6dcb228c67b365f0b5ce0be",E="https://pixabay.com/api/",y=15;async function p(a,e){return(await B.get(E,{params:{key:M,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:y}})).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),_=document.querySelector(".load-more-btn"),$=new P(".gallery a",{captionsData:"alt",captionDelay:250,preloading:!1,alertError:!1});function C({webformatURL:a,largeImageURL:e,tags:s,likes:c,views:t,comments:r,downloads:n}){return`
    <li class="gallery__item">
      <a class="gallery__link" href="${e}">
        <img class="gallery__image" src="${a}" alt="${s}" />
        <ul class="gallery__info">
          <li class="gallery__info-item">
            <span class="gallery__info-title">Likes</span>
            <span class="gallery__info-value">${c}</span>
          </li>
          <li class="gallery__info-item">
            <span class="gallery__info-title">Views</span>
            <span class="gallery__info-value">${t}</span>
          </li>
          <li class="gallery__info-item">
            <span class="gallery__info-title">Comments</span>
            <span class="gallery__info-value">${r}</span>
          </li>
          <li class="gallery__info-item">
            <span class="gallery__info-title">Downloads</span>
            <span class="gallery__info-value">${n}</span>
          </li>
        </ul>
      </a>
    </li>
  `}function b(a){const e=a.map(C).join("");m.insertAdjacentHTML("beforeend",e),$.refresh()}function R(){m.innerHTML=""}function L(){h.classList.add("is-visible")}function w(){h.classList.remove("is-visible")}function I(){_.classList.remove("is-hidden")}function g(){_.classList.add("is-hidden")}const S=document.querySelector(".form"),d=S.querySelector('button[type="submit"]'),l=document.querySelector(".load-more-btn"),v=document.querySelector(".gallery");let u="",o=1,f=0;S.addEventListener("submit",N);l.addEventListener("click",x);async function N(a){a.preventDefault();const e=a.currentTarget.elements["search-text"].value.trim();if(!e){i.warning({message:"Please enter a search query!",position:"topRight"});return}u=e,o=1,f=0,R(),g(),L(),d.disabled=!0,l.disabled=!0;try{const s=await p(u,o);if(s.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f=s.totalHits,b(s.hits),q()}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{w(),d.disabled=!1,l.disabled=!1}}async function x(){o+=1,g(),L(),d.disabled=!0,l.disabled=!0;try{const a=await p(u,o),e=v.children.length;b(a.hits),q(),A(e)}catch{o-=1,i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{w(),d.disabled=!1,l.disabled=!1}}function q(){if(o*y>=f){g(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}I()}function A(a){const e=v.children[a];if(!e)return;const s=e.getBoundingClientRect().top;window.scrollBy({top:s,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
