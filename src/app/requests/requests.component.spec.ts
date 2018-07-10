import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

import { RequestsComponent } from './requests.component';

describe('UsersComponent', () => {
    let component: RequestsComponent;
    let fixture: ComponentFixture<RequestsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RequestsComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                MatTableModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
