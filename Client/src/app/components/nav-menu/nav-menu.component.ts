import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core"
import { MatDrawer } from "@angular/material/sidenav";
import { Route, Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  @Input() navMenuToggle: boolean = false;
  @Input() userID: string = '';

  @Output() navMenuToggleChange = new EventEmitter<boolean>();

  public isQuizDropdownActive: boolean = false;
  showFiller = false;

  opened: boolean = true;

  constructor(private router: Router, private helperService: HelperService) { } //private accountService: AccountService

  ngAfterViewInit(): void {
    let menu = document.getElementById("menu")
    menu?.addEventListener("click", () => {
      this.drawer.toggle();
    });
  }

  public activateDropdown() {
    this.isQuizDropdownActive = !this.isQuizDropdownActive;
  }
  public getArrow() {
    return this.isQuizDropdownActive ? 'keyboard_arrow_up_outline' : 'keyboard_arrow_down_outline';
  }

  public navigate(route: string) {
    this.router.navigate([route])
    this.drawer.toggle();
  }

  public logout() {
    this.helperService.logoutUser();
    this.navigate('');
  }

  public closeMenu() {
    this.navMenuToggleChange.emit(false)
  }

}