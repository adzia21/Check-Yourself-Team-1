import { AfterViewInit, Component } from "@angular/core"
import { icons } from "../../shared/constants/constants"
import { MatDialog } from "@angular/material/dialog";
import { LoginDialogComponent } from "../dialog/login-dialog/login-dialog.component";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  public logo: string = `${icons}/logo.svg`;

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit(): void {
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      console.log('The dialog was closed');
      console.log(result.value)
    });
  }
}