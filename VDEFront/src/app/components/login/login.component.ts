import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm!: FormGroup
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye " : this.eyeIcon = "fa-eye-slash"
    this.isText ? this.type = "text" : this.type = "password"
  }

  onLogin() {
    if (this.loginForm.valid) {

      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res.message)
            this.loginForm.reset()
            // alert(res.message)
            this.auth.storeToken(res.token)
            let tokenPayload = this.auth.decodedToken()
            this.userStore.setFullNameForStore(tokenPayload.name)
            this.userStore.setRoleForStore(tokenPayload.role)
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 })
            this.router.navigate(['dashboard'])
          },
          error: (err) => {
            alert(" ")
            this.toast.error({ detail: "ERROR", summary: "Something when wrong", duration: 5000 })
            console.log(err)

          }
        })
    } else {

      ValidateForm.validateAllFormFields(this.loginForm)
    }
  }
}
