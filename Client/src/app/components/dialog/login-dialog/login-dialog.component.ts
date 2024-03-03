import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements AfterViewInit {
  public logo: string = `${icons}/logo_black.svg`;
  public showPassword: boolean = false;

  public loginForm = new FormGroup({
    mail: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {}

  public login(model: FormGroup): void {
    if (!model.valid) return model.markAllAsTouched();

    this.authService.loginUser(model.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['main-page']);
        this.dialogRef.close(true);
      },
      (error) => {
        switch (error.status) {
          case 401:
            return this.toastr.error('Niepoprawne dane logowania');
          default:
            return this.toastr.error('Wystąpił błąd przy logowani');
        }
      }
    );
  }

  public success() {}
}
