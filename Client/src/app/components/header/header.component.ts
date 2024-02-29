import { AfterViewInit, Component } from "@angular/core"
import { icons } from "../../shared/constants/constants"
import { MatDialog } from "@angular/material/dialog";
import { LoginDialogComponent } from "../dialog/login-dialog/login-dialog.component";
import { FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { LoginUser } from "src/app/shared/models/register-login.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  public logo: string = `${icons}/logo.svg`;

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngAfterViewInit(): void {
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      backdropClass: 'userLoginDialog'
    });
  }
}