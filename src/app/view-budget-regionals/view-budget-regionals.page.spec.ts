import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewBudgetRegionalsPage } from './view-budget-regionals.page';

describe('ViewBudgetRegionalsPage', () => {
  let component: ViewBudgetRegionalsPage;
  let fixture: ComponentFixture<ViewBudgetRegionalsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBudgetRegionalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBudgetRegionalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
