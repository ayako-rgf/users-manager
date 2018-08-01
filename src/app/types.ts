export class User {
    Id: string;
    Name: string;
    Email: string;
    IsActive: boolean;
}

export class Request {
    id?: number;
    requesterUserId: string;
    subjectUserId: string;
    status: string;
    action: string;
    newUserName: string;
    newUserEmail: string;
}
