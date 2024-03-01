import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public users: any = []
  public fullName: string = ""
  public role!: string;
  constructor(
    private api: ApiService,
    public auth: AuthService,
    private toastr: NgToastService,
    private userStore: UserStoreService

  ) { }
  ngOnInit() {
    this.auth.refreshlist();

    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
      });
    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        let fullNameFromToken = this.auth.getfullNameFromToken()
        this.fullName = val || fullNameFromToken
      })
    this.userStore.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.auth.getRoleFromToken()
        this.role = val || roleFromToken
      })
  }
  populateForm(selectedRecord: PaymentDetail) {
    this.auth.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to deleted this record?'))
      this.auth.deletePaymentDetail(id).subscribe({
        next: (res) => {
          this.auth.list = res as PaymentDetail[];
          this.toastr.error({ detail: 'Deleted successfully', summary: 'Payment Detail Register' });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  logOut() {
    this.auth.signOut()
  }

}









