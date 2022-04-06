import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllocateTerritoryBudgetPage } from './allocate-territory-budget.page';

describe('AllocateTerritoryBudgetPage', () => {
  let component: AllocateTerritoryBudgetPage;
  let fixture: ComponentFixture<AllocateTerritoryBudgetPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateTerritoryBudgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllocateTerritoryBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
