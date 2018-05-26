import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { BeerDetailComponent } from './beer-detail.component';

describe('BeerDetailComponent', () => {
    let component: BeerDetailComponent;
    let fixture: ComponentFixture<BeerDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeerDetailComponent
            ],
            imports: [
                FormsModule,
                MatInputModule,
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [{
                provide: Location,
                useClass: class {
                    back = jasmine.createSpy('back');
                }
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BeerDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('ngOnInit', () => {
        component.ngOnInit();
    });
    it('goBack', () => {
        const location = fixture.debugElement.injector.get(Location);
        component.goBack();
        expect(location.back).toHaveBeenCalled();
    });
});
