import AppLoader from './appLoader';
import { NewsData } from '../../types/NewsData';
import { SourcesData } from '../../types/SourcesData';



type NewsCallback = (data: NewsData) => void;
type SourcesCallback = (data: SourcesData) => void;

class AppController extends AppLoader {
    getSources(callback: SourcesCallback): void {
        super.getResp(
            { endpoint: 'sources' },
            callback
        );
    }

    getNews(e: Event, callback: NewsCallback): void {
        const target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        let currentTarget = target;
        while (currentTarget !== newsContainer) {
            if (currentTarget.classList.contains('source__item')) {
                const sourceId = currentTarget.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: { sources: sourceId },
                        },
                        callback
                    );
                }
                return;
            }
            currentTarget = currentTarget.parentNode as HTMLElement;
        }
    }
}

export default AppController;
