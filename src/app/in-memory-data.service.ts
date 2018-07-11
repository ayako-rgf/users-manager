import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Request } from './request';

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
        const users: User[] = [
            { id: 101, name: 'Tomoko', email: 'tomoko@ayako.com', status: 'Active' },
            { id: 102, name: 'Jumpei', email: 'jumpei@ayako.com', status: 'Inactive' },
            { id: 103, name: 'Toshihiro', email: 'toshihiro@ayako.com', status: 'Active' },
            { id: 104, name: 'Hana', email: 'hana@ayako.com', status: 'Active' },
            { id: 105, name: 'Takashi', email: 'takashi@ayako.com', status: 'Active' },
        ];
        const requests: Request[] = [
            { id: 1001, requesterUserId: 103, subjectUserId: 101, action: 'Deactivate', status: 'Pending' },
            { id: 1002, requesterUserId: 103, subjectUserId: 102, action: 'Deactivate', status: 'Approved' },
            { id: 1003, requesterUserId: 103, subjectUserId: 104, action: 'Deactivate', status: 'Rejected' },
            { id: 1003, requesterUserId: 103, subjectUserId: 105, action: 'Create', status: 'Approved' }
        ];
        return { beers, users, requests };
    }
}
