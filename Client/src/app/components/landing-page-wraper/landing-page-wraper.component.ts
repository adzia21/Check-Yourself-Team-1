import { Component } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { icons } from "src/app/shared/constants/constants";
import { RegisterUser } from "src/app/shared/models/register-login.model";

@Component({
  selector: 'app-landing-page-wraper',
  templateUrl: './landing-page-wraper.component.html',
  styleUrls: ['./landing-page-wraper.component.scss']
})
export class LandingPageWraperComponent {
    public vectorIcon: string = `${icons}/landing-page-vector.svg`;
    public logo: string = `${icons}/logo_black.svg`;
    public showRegisterForm: boolean = false;

    public registerForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      checkbox: new FormControl(false)
    });

    constructor(private fb: FormBuilder, private authService: AuthService) { }

    register(form?: FormGroup) {
      if(this.showRegisterForm) {
        console.log("Register")
        console.log(form)
        let formValue = form?.value;
        let model: RegisterUser = {
          username: 'username',
          password: formValue.password,
          name: formValue.name,
          surname: formValue.surname,
          email: formValue.email,
          roles: 'ADMIN' // string czy enum
        }
        console.log(model)
        this.authService.registerUser(model).subscribe(res => console.log(res))
      }
      this.showRegisterForm = true;
    }
}