import './sources.css';
import { Source } from '../../../types/Source';


class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error("Template with id '#sourceItemTemp' not found.");
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceItemName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (sourceItemName) {
                sourceItemName.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.innerHTML = ''; // Очистка контейнера перед добавлением новых данных
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
