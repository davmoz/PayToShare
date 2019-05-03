import { Component, OnInit } from '@angular/core';
import {PlanService} from '../../../../../services/product/plan.service';
import {Observable} from 'rxjs';
import {Plan} from '../../../../../models/products/plan';

@Component({
  selector: 'app-plan-overview',
  templateUrl: './plan-overview.component.html',
  styleUrls: ['./plan-overview.component.scss']
})
export class PlanOverviewComponent implements OnInit {
  private plans: Observable<Plan[]>;
  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.plans = this.planService.getPlans();
  }

}
