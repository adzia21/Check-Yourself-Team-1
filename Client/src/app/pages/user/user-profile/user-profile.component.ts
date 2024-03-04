import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
  public isUsersProfile: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(res => {
      this.isUsersProfile = res.id === Number(this.route.snapshot.paramMap.get('id'));
    });

    this.userService.getUser().subscribe(res => {
      console.log(res)
      this.data = res;
    });
  }

}