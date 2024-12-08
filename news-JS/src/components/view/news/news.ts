import './news.css';
import { Article } from '../../../types/Article';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.slice(0, 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            console.error("Template with id '#newsItemTemp' not found.");
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItemElement = newsClone.querySelector<HTMLElement>('.news__item');
            if (newsItemElement && idx % 2) {
                newsItemElement.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const descriptionTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }

            const descriptionSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (descriptionSource) {
                descriptionSource.textContent = item.source.name;
            }

            const descriptionContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (descriptionContent) {
                descriptionContent.textContent = item.description ||'';
            }

            const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url  || '#');
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
