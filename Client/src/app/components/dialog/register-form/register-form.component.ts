import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { icons } from 'src/app/shared/constants/constants';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LoginUser } from 'src/app/shared/models/register-login.model';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements AfterViewInit {
  @Input() showRegisterForm: boolean = false;
  @Output() showRegisterFormChange = new EventEmitter<boolean>();
  public passwordMatchError: boolean = false;
  public isCompany: boolean = false;
  public passwordRegEx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  public logo: string = `${icons}/logo_black.svg`;
  public registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegEx)]),
    passwordConfirm: new FormControl('', [Validators.required]),
    checkbox: new FormControl(false),
    companyName: new FormControl(null),
    nip: new FormControl(null),
    company: new FormControl(null)
  });

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit(): void {}

  public register(model: FormGroup) {
    if (!model.valid) return model.markAllAsTouched();
    if (model.value.password === model.value.passwordConfirm) {
      this.passwordMatchError = false;
    } else {
      return (this.passwordMatchError = true);
    }
    if (this.registerForm.get('checkbox')?.value === false) return;
    model.value['company'] = this.isCompany;
    this.authService.registerUser(model.value).subscribe((res) => {
      this.toastr.success('Zarejestrowano pomyślnie');
      this.showRegisterForm = false;
      this.showRegisterFormChange.emit(this.showRegisterForm);
      this.openLoginDialog();
    }, error => {
        switch(error.status) {
            default:
                return this.toastr.error('Wystąpił błąd przy rejestracji')
        }
    }
    );
  }

  public radioChange(event: any) {
    this.isCompany = !this.isCompany;
    let control = this.registerForm.controls;

    if (this.isCompany) {
      control['name'].setValue(null);
      control['name'].clearValidators();
      control['name'].setErrors(null);
      control['surname'].setValue(null);
      control['surname'].clearValidators();
      control['surname'].setErrors(null);

      control['nip'].setValidators(Validators.required);
      control['companyName'].setValidators(Validators.required);
      this.registerForm.updateValueAndValidity();
    } else {
      control['nip'].setValue(null);
      control['nip'].clearValidators();
      control['nip'].setErrors(null);
      control['companyName'].setValue(null);
      control['companyName'].clearValidators();
      control['companyName'].setErrors(null);

      control['surname'].setValidators(Validators.required);
      control['name'].setValidators(Validators.required);
      this.registerForm.updateValueAndValidity();
    }
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      backdropClass: 'userLoginDialog',
    });
  }
}
