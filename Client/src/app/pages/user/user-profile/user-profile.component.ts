import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { icons } from "src/app/shared/constants/constants";
import { User } from "src/app/shared/models/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public image: string = `${icons}/no-pfp.svg`;
  public data!: User;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(res => {
      this.data = res;
    });
  }

}