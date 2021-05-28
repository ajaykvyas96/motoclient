import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettinglayoutComponent } from './settinglayout.component';

describe('SettinglayoutComponent', () => {
  let component: SettinglayoutComponent;
  let fixture: ComponentFixture<SettinglayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettinglayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettinglayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
