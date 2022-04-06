import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllocateRegionalBudgetPage } from './allocate-regional-budget.page';

describe('AllocateRegionalBudgetPage', () => {
  let component: AllocateRegionalBudgetPage;
  let fixture: ComponentFixture<AllocateRegionalBudgetPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRegionalBudgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllocateRegionalBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
