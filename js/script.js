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
/* optArticleAuthorSelector = '.post-author .list',*/
// optTagsListSelector = '.tags.list';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  tagAuthorLink: Handlebars.compile(document.querySelector('#template-tag-author-link').innerHTML)
};

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
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

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

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
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
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      const linkHTMLData = { id: 'tag-' + tag, title: tag };
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkhtml:', linkHTML);
      /* add generated code to HTML variable */
      html = html + '     ' + linkHTML;
      console.log('html:', linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = ''; (pierwotna wersja)
  const allTagsData = { tags: [] };
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: (allTags[tag], tagsParams)
    });
  }
  console.log('allTagsData:', allTagsData);
  /* [NEW] END LOOP: for each tag in allTags: */
  /*[NEW] add HTML from allTagsHTML to tagList */
  // tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthor = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorList = article.querySelector(optAuthorSelector);
    console.log('authorList:', authorList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const authorTags = article.getAttribute('data-author');
    console.log('authorTags:', authorTags);
    /* generate HTML of the link */
    //const linkHTML = '<li><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a></li>';
    const linkHTMLData = { id: 'author-' + authorTags, title: authorTags };
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log('linkhtml:', linkHTML);
    /* add generated code to HTML variable */
    html = html + '     ' + linkHTML;
    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthor[authorTags]) {
      /* [NEW] add tag to allTags object */
      allAuthor[authorTags] = 1;
    } else {
      allAuthor[authorTags]++;
    }
    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector('.authors');
  console.log(allAuthor);
  const authorParams = calculateTagsParams(allAuthor);
  console.log('authorParams:', authorParams);
  /* [NEW] create variable for all links HTML code */
  //let allAuthorHTML = '';
  const allAuthorData = { authorTags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let authorTag in allAuthor) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allAuthorHTML += authorTags + ' (' + allAuthor[authorTags] + ') ';
    allAuthorData.authorTags.push({
      authorTag: authorTag,
      count: allAuthor[authorTag],
      className: (allAuthor[authorTag], authorParams)
    });
  }
  console.log('allAuthorData:', allAuthorData);
  /* [NEW] END LOOP: for each tag in allTags: */
  /*[NEW] add HTML from allTagsHTML to tagList */
  //authorList.innerHTML = allAuthorHTML;
  authorList.innerHTML = templates.tagAuthorLink(allAuthorData);
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
