import { AfterViewInit, Component } from "@angular/core"
import { icons } from "../../shared/constants/constants"
import { MatDialog } from "@angular/material/dialog";
import { LoginDialogComponent } from "../dialog/login-dialog/login-dialog.component";
import { FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { LoginUser } from "src/app/shared/models/register-login.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  public logo: string = `${icons}/logo.svg`;
  public isLoggedIn: boolean = false;
  public isCompany: boolean = false;
  public id: number = 0;

  constructor(private dialog: MatDialog, private authService: AuthService, private userService: UserService) { }

  ngAfterViewInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
      this.userService.getLoggedUser().subscribe(res => {
        this.isCompany = res.company;
        this.isLoggedIn = true;
        this.id = res.id;
      });
    };

    let menu = document.getElementById("logout")
    menu?.addEventListener("click", () => {
      this.isLoggedIn = false;
    });
  }

  public openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      backdropClass: 'userLoginDialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.getLoggedUser().subscribe(res => {
          this.isCompany = res.company;
          this.isLoggedIn = true;
          this.id = res.id;
        })
      }
    });
  }
}