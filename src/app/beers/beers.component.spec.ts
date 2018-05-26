import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

import { BeersComponent } from './beers.component';

describe('BeersComponent', () => {
    let component: BeersComponent;
    let fixture: ComponentFixture<BeersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BeersComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                MatTableModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BeersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
