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
    })

  }

  ngOnInit() {
    this.spinner.spin();
    this.premiumService.getListOfProperties().subscribe(
      properties => {
        this.properties = properties;
      }
    );

    this.premiumService.getExpenses().subscribe(
      (expenses: Array<any>) => {
        this.spinner.hide();
        this.expenses = expenses;
        this.updateGraph();
      },
      err => {
        this.spinner.hide();
        this.alert.error('Error retrieving expenses for this user', 5000, true);
      }
    )
  }

  createChart() {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    var labels = [];
    var costs = [];
    this.expenses.map(e => labels.push(months[new Date(e.date).getMonth()]))
    this.expenses.map(e => costs.push(e.cost));

    var chart = new Chart(document.getElementById('expensesLineChart'), {
      type: 'line',
      data: {
          labels: [...labels],
          datasets: [{
              borderColor: 'rgb(255, 99, 132)',
              data: [...costs],
          }]
      },
      options: {
        legend: {
          display: false
        }
      }
    })
  }

  updateGraph() {
      this.createChart();
  }

  saveExpense() {
    this.expensesForm.value.cost = +this.expensesForm.value.cost;
    this.expensesForm.value.date = new Date(this.expensesForm.value.date);

    this.premiumService.saveExpense(this.expensesForm.value).subscribe(
      response => {
        this.expenses.push(response);
        this.expensesForm.reset();
        this.createChart();
      },
      err => {
        this.alert.error('Error saving expense.', 5000, true);
      }
    )
  }

}
