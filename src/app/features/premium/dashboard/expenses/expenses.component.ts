import { Component, OnInit, Inject } from '@angular/core';
import { PremiumService } from '../premium.service';
import { AlertService } from '../../../alert/alert.service';
import { SpinnerService } from '../../../spinner/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  addExpense: boolean;

  properties = [];
  expenses = [];
  tenants = [];
  revenue = 0;
  expenseTotal = 0;
  expensesForm: FormGroup;
  constructor(@Inject(FormBuilder) fb: FormBuilder,
              private premiumService: PremiumService,
              private alert: AlertService,
              private spinner: SpinnerService) {

    this.expensesForm = fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      property: ['', Validators.required],
      cost: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.spinner.spin();
    this.premiumService.getListOfProperties().subscribe(
      properties => {
        this.properties = properties;
      }
    );

    this.premiumService.getTenants$().subscribe(
      tenants => {
        this.spinner.hide();
        this.tenants = tenants;
        this.tenants.forEach(t => {
          this.revenue += t.rent;
        });
        this.updateGraph();
      }
    );

    this.premiumService.getExpenses$().subscribe(
      expenses => {
        this.spinner.hide();
        this.expenses = expenses;
        this.expenseTotal = 0;
        this.expenses.forEach(e => {
          this.expenseTotal += e.cost;
        });
        this.updateGraph();
      }
    );
  }

  createChart() {
    // var months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December"
    // ]
    // var labels = [];
    // var costs = [];
    // this.expenses.map(e => labels.push(new Date(e.date)));
    // this.expenses.map(e => costs.push(e.cost));

    // var chart = new Chart(document.getElementById('expensesLineChart'), {
    //   type: 'line',
    //   data: {
    //       labels: [...labels],
    //       datasets: [{
    //           borderColor: 'rgb(255, 99, 132)',
    //           data: [...costs],
    //       }]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     }
    //   }
    // })
  }

  drawPie() {
    const config = {
      type: 'pie',
      data: {
        datasets: [{
          data: [
            this.revenue,
            this.expenseTotal
          ],
          backgroundColor: [
            '#2f9eed',
            '#ed2f5e'
          ],
          label: 'Dataset 1'
        }],
        labels: [
          'Revenue',
          'Expenses'
        ]
      },
      options: {
        responsive: true
      }
    };
    const chart = new Chart(document.getElementById('revenueTotalPie'), config);
  }

  updateGraph() {
      this.createChart();
      this.drawPie();
  }

  saveExpense() {
    this.expensesForm.value.cost = +this.expensesForm.value.cost;
    this.expensesForm.value.date = new Date(this.expensesForm.value.date);

    this.premiumService.saveExpense(this.expensesForm.value).subscribe(
      response => {
        this.expenses.push(response);
        this.premiumService.getExpensesSubject().next(this.expenses);
        this.expensesForm.reset();
        this.updateGraph();
      },
      err => {
        this.alert.error('Error saving expense.', 5000, true);
      }
    );
  }

}
