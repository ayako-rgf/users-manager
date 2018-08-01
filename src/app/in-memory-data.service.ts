import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Request } from './types';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const requests: Request[] = [{
                id: 1001,
                requesterUserId: '005100000051qOzAAI',
                subjectUserId: '005100000051cV0AAI',
                action: 'Deactivate',
                status: 'Pending',
                newUserName: null,
                newUserEmail: null
            }, {
                id: 1002,
                requesterUserId: '0055F00000552NyQAI',
                subjectUserId: '005100000051qRhAAI',
                action: 'Deactivate',
                status: 'Approved',
                newUserName: null,
                newUserEmail: null
            }, {
                id: 1003,
                requesterUserId: '005100000051qOzAAI',
                subjectUserId: '005100000051cVFAAY',
                action: 'Deactivate',
                status: 'Rejected',
                newUserName: null,
                newUserEmail: null
            }, {
                id: 1004,
                requesterUserId: '005100000051qKuAAI',
                subjectUserId: null,
                action: 'Create',
                status: 'Pending',
                newUserName: 'Ichiro Suzuki',
                newUserEmail: 'ichiro@example.com'
            }
        ];
        return { requests };
    }
}
