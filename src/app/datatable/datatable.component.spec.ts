import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableComponent } from './datatable.component';
import { User } from '../user';

describe('DatatableComponent', () => {
    let component: DatatableComponent<User>;
    let fixture: ComponentFixture<DatatableComponent<User>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatatableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatatableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
