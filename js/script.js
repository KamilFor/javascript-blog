'use strict';
document.getElementById('test-button').addEventListener('click', function() {
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});

const titleClickHandler = function(event) {
  event.preventDefault();
  console.log('event:', event);
  const clickedElement = this;
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  console.log('Link was clicked!');
  /* DONE remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* DONE remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  console.log('targetArticle:', targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
optArticleAuthorSelector = '.post-author .list';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList:', titleList);
  titleList.innerHTML = '';
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('customSelector:', customSelector);

  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('id:', articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle:', articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('link:', linkHTML);
    /* insert link into titleList */

    html = html + linkHTML;
    console.log('html:', linkHTML);
  }

  titleList.innerHTML = html;
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
  console.log('link:', link);
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    console.log('titleList:', titleList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articletags:', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* for each tag */
    for (let tag of articleTagsArray) {
      console.log('tag:', tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('linkhtml:', linkHTML);
      /* add generated code to HTML variable */
      html = html + '     ' + linkHTML;
      console.log('html:', linkHTML);
    }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  console.log('event:', event);
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('href2:', href);
  console.log('tagL:', tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a[class="active"]');
  console.log('activeTags:', activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks:', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    console.log('tagLink:', tagLink);
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const Links = document.querySelectorAll('a[href^="#tag-"]');
  console.log('Links:', Links);
  /* START LOOP: for each link */
  for (let linkactive of Links) {
    console.log('link:', linkactive);
    /* add tagClickHandler as event listener for that link */
    linkactive.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

const optAuthorSelector = '.post-author';

function generateAuthor() {
  /* find all articles */
  const authors = document.querySelectorAll(optArticleSelector);
  console.log('authors:', authors);
  /* START LOOP: for every article: */
  for (let author of authors) {
    /* find tags wrapper */
    const authorList = author.querySelector(optAuthorSelector);
    console.log('authorList:', authorList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const authorTags = author.getAttribute('data-author');
    console.log('authorTags:', authorTags);
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a></li>';
    console.log('linkhtml:', linkHTML);
    /* add generated code to HTML variable */
    html = html + '     ' + linkHTML;
    console.log('html:', linkHTML);
    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateAuthor();

function authorClickHandler(event) {
  console.log('event:', event);
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', '');
  console.log('href2:', href);
  console.log('tagL:', tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a[class="active"]');
  console.log('activeTags:', activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks:', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    console.log('tagLink:', tagLink);
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const Links = document.querySelectorAll('a[href^="#author-"]');
  console.log('Links:', Links);
  /* START LOOP: for each link */
  for (let linkactive of Links) {
    console.log('link:', linkactive);
    /* add tagClickHandler as event listener for that link */
    linkactive.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToAuthors();
