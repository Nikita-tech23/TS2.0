import { NewsData } from '../../types/NewsData';
import { SourcesData } from '../../types/SourcesData';

interface LoaderOptions {
    apiKey?: string;
    [key: string]: string | undefined;  // Изменение типа на string | undefined
}

interface RequestParams {
    endpoint: string;
    options?: LoaderOptions;
}

type NewsCallback = (data: NewsData) => void;
type SourcesCallback = (data: SourcesData) => void;

class Loader {
    private baseLink: string;
    private options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options = {} }: RequestParams, callback: NewsCallback | SourcesCallback): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key] ?? ''; // Присвоение пустой строки для undefined значений
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: NewsCallback | SourcesCallback, options: LoaderOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
