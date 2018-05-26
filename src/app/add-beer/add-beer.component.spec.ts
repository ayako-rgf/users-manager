import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AddBeerComponent } from './add-beer.component';

describe('AddBeerComponent', () => {
    let component: AddBeerComponent;
    let fixture: ComponentFixture<AddBeerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddBeerComponent
            ],
            imports: [
                MatInputModule,
                HttpClientModule,
                MatSnackBarModule,
                BrowserAnimationsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddBeerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
