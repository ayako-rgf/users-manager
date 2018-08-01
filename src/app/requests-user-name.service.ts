import { Injectable } from '@angular/core';
import { Request } from './request';
import { User } from './user';
import { SforceService } from './sforce.service';

@Injectable({
    providedIn: 'root'
})
export class RequestsUserNameService {

    constructor (private sforceService: SforceService) {
    }

    public addUserNameToRequests (requests: Request[]): Promise<void> {
        const userIds = this.getUniqueUserIdsFromRequests(requests);
        return this.queryUsers(userIds).then((users: any[]) => {
            this.fillUserNameInRequests(requests, users);
        });
    }
    private queryUsers (userIds: string[]): Promise<any[]> {
        const query = 'SELECT Id, Name FROM User WHERE Id IN (' + userIds.map((userId: string) => '\'' + userId + '\'').join(',') + ')';
        return this.sforceService.query(query).then((result: any) => result.records);
    }
    private fillUserNameInRequests (requests: Request[], users: User[]): void {
        const userIdNameMap = this.getUserIdNameMap(users);
        requests.forEach((request: Request) => {
            request['requesterUserName'] = userIdNameMap[request.requesterUserId];
            request['subjectUserName'] = userIdNameMap[request.subjectUserId];
        });
    }
    private getUserIdNameMap (users: User[]): any {
        const idNameMap = {};
        users.forEach((user: User) => {
            idNameMap[user.Id] = user.Name;
        });
        return idNameMap;
    }
    private getUniqueUserIdsFromRequests (requests: Request[]): string[] {
        const nestedUserIds = requests.map((request: Request) => [request.requesterUserId, request.subjectUserId]);
        const userIds = this.flattenArray(nestedUserIds).filter((userId: string) => userId);
        return Array.from(new Set(userIds));
    }
    private flattenArray (array: any[]): string[] {
        return array.reduce((acc, val) => acc.concat(val), []);
    }
}
