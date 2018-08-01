import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Request } from '../request';
import { RequestService } from '../request.service';
import { SforceService } from '../sforce.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    public userForm: FormGroup;

    constructor (private requestService: RequestService, private sforceService: SforceService, public snackBar: MatSnackBar) {
    }

    ngOnInit () {
        this.resetForm();
    }
    private resetForm (): void {
        this.userForm = this.createFormGroup();
    }
    private createFormGroup (): FormGroup {
        return new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/)
            ])
        });
    }
    public apply ($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        const request = this.buildRequest();
        this.requestService.addRequest(request).subscribe(() => {
            const message = 'A new user "' + request.newUserName + '" requested.';
            console.log(message);
            this.snackBar.open(message);
            this.resetForm();
        });
    }
    private buildRequest (): Request {
        const currentUserId = this.sforceService.getCurrentUserId();
        return {
            requesterUserId: currentUserId,
            subjectUserId: null,
            action: 'Create',
            status: 'Pending',
            newUserName: this.userForm.value.name,
            newUserEmail: this.userForm.value.email
        };
    }
}
