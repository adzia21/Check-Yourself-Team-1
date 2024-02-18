import { AfterViewInit, Component } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { icons } from "src/app/shared/constants/constants";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements AfterViewInit {
    public logo: string = `${icons}/logo_black.svg`;
    public showPassword: boolean = false;

    public loginForm = new FormGroup({
        email: new FormControl('', [Validators.email]),
        password: new FormControl(''),
      });

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngAfterViewInit(): void {
  }

  login(): void {
    this.dialogRef.close(this.loginForm);
  }
}