export class Request {
    id: number;
    requesterUserId: string;
    subjectUserId: string;
    status: string;
    action: string;
    newUser?: {
        Name: string;
        Email: string;
    };
}
