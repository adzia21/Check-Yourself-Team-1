import { Component } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { icons } from "src/app/shared/constants/constants";

@Component({
  selector: 'app-landing-page-wraper',
  templateUrl: './landing-page-wraper.component.html',
  styleUrls: ['./landing-page-wraper.component.scss']
})
export class LandingPageWraperComponent {
    public vectorIcon: string = `${icons}/landing-page-vector.svg`;
    public showRegisterForm: boolean = false;

    public registerForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      checkbox: new FormControl(false)
    });

    constructor(fb: FormBuilder) { }

    register(form?: FormGroup) {
      if(this.showRegisterForm) {
        console.log("Register")
        console.log(form)
      }
      this.showRegisterForm = true;
    }
}