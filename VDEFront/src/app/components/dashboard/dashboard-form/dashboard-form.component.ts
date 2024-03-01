import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';


@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})

export class DashboardFormComponent {
  constructor(
    public auth: AuthService,
    private toastr: NgToastService
  ) { }

  onSubmit(form: NgForm) {
    this.auth.formSubmitted = true;
    if (form.valid) {
      if (this.auth.formData.paymentDetailId == 0) this.insertRecord(form);
      else this.updateRecord(form);
    }
  }
  insertRecord(form: NgForm) {
    this.auth.postPaymentDetail().subscribe({
      next: (res) => {
        this.auth.list = res as PaymentDetail[];
        this.auth.resetForm(form);
        this.toastr.success({ detail: 'Inserted successfully', summary: 'Payment Detail Register' });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateRecord(form: NgForm) {
    this.auth.putPaymentDetail().subscribe({
      next: (res) => {
        this.auth.list = res as PaymentDetail[];
        this.auth.resetForm(form);
        this.toastr.info({ detail: 'updated successfully', summary: 'Payment Detail Register' });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}



