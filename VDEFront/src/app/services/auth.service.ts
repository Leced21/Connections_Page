import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { PaymentDetail } from '../shared/payment-detail.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7037/api/";
  private userPayload: any
  url: string = this.baseUrl + 'PaymentDetail'
  list: PaymentDetail[] = [];
  formData: PaymentDetail = new PaymentDetail();
  formSubmitted: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken()
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}User/register`, userObj)
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}User/authenticate`, loginObj)
  }

  signOut() {
    localStorage.clear()
    this.router.navigate(['login'])

  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService()
    const token = this.getToken()!
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role
  }

  refreshlist() {
    this.http.get(this.url).subscribe({

      next: (res) => {
        console.log(res);
        this.list = res as PaymentDetail[];
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  postPaymentDetail() {
    return this.http.post(this.url, this.formData);
  }

  putPaymentDetail() {
    return this.http.put(
      this.url + '/' + this.formData.paymentDetailId,
      this.formData
    );
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false;
  }
}
