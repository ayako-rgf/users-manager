import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../user';
import { Request } from '../request';
import { RequestService } from '../request.service';
import { SforceService } from '../sforce.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    public user: User;
    public userForm: FormGroup;

    constructor (private requestService: RequestService, private sforceService: SforceService, public snackBar: MatSnackBar) {
    }

    ngOnInit () {
        this.resetForm();
    }
    private resetForm (): void {
        this.user = new User();
        this.userForm = this.createFormGroup(this.user);
    }
    private createFormGroup (user: User): FormGroup {
        return new FormGroup({
            name: new FormControl(user.Name, [Validators.required]),
            email: new FormControl(user.Email, [
                Validators.required,
                Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/)
            ])
        });
    }
    public add ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        const currentUserId = this.sforceService.getCurrentUserId();
        const request = {
            requesterUserId: currentUserId,
            subjectUserId: null,
            action: 'Create',
            newUserName: this.user.Name,
            newUserEmail: this.user.Email
        };
        this.requestService.addRequest(request as Request).subscribe(() => {
            const message = 'A new user "' + this.user.Name + '" requested.';
            console.log(message);
            this.openSnackBar(message);
            this.resetForm();
        });
    }
    private openSnackBar (message: string): void {
        this.snackBar.open(message, null, {
            duration: 4000
        });
    }
}
