import { AfterViewInit, Component } from "@angular/core"
import { icons } from "../../shared/constants/constants"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  public logo: string = `${icons}/logo.svg`;

  constructor() { }

  ngAfterViewInit(): void {
  }
}