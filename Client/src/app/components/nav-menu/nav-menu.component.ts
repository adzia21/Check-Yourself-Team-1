import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core"
import { MatDrawer } from "@angular/material/sidenav";

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

  constructor() { } //private accountService: AccountService

  ngAfterViewInit(): void {
    let x = document.getElementById("menu")
    console.log(x)
    x?.addEventListener("click", () => {
      this.drawer.toggle();
    });
  }

  public activateDropdown() {
    this.isQuizDropdownActive = !this.isQuizDropdownActive;
  }
  public getArrow() {
    return this.isQuizDropdownActive ? 'keyboard_arrow_up_outline' : 'keyboard_arrow_down_outline';
  }

  public logout() {
    // this.accountService.logout();
    this.closeMenu();
  }

  public closeMenu() {
    this.navMenuToggleChange.emit(false)
  }

}