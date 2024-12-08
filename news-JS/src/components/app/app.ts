import AppController from '../controller/controller';
import { AppView } from '../view/sources/appView';
import {NewsData} from '../../types/NewsData';
import {SourcesData} from '../../types/SourcesData';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement = document.querySelector('.sources');
        
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) => {
                this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data:SourcesData) => this.view.drawSources(data));
    }
}

export default App;

