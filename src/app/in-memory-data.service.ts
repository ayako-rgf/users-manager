import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const beers = [
            { id: 12, name: 'Heineken Lager Beer', country: 'Singapore' },
            { id: 11, name: 'Tiger Lager Beer', country: 'Singapore' },
            { id: 13, name: 'Chang Beer Premium Draft Beer', country: 'Thailand' },
            { id: 16, name: 'Sapporo Premium Draft Beer', country: 'Vietnam' },
            { id: 15, name: 'Carlsberg Lager Beer', country: 'Malaysia' },
            { id: 14, name: 'Corona Extra Beer', country: 'Mexico' },
            { id: 17, name: 'Anchor Smooth Pilsener Beer', country: 'Singapore' },
            { id: 18, name: 'Kirin Ichiban Lager Beer', country: 'Japan' },
            { id: 19, name: 'Guinness Draught', country: 'Ireland' },
            { id: 20, name: 'Skol Lager Beer', country: 'Malaysia' }
        ];
        return { beers };
    }
}
