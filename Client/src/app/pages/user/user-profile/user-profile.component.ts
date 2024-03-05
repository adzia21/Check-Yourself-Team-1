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
  public skillFE: any = [];
  public skillBE: any = [];
  public language: any = [];
  public skillOther: any = [];

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(res => {
      this.isUsersProfile = res.id === Number(this.route.snapshot.paramMap.get('id'));
    });

    this.userService.getUser().subscribe(res => {
      this.data = res;
      
      let fe = this.data?.skills.fe?.skill;
      let be = this.data?.skills.be?.skill;
      let lng = this.data?.skills.lng?.skill;
      let other = this.data?.skills.other?.skill;

      if(fe) this.skillFE = Object.keys(fe).map(key => ({type: key, value: fe[key]}));
      if(be) this.skillBE = Object.keys(be).map(key => ({type: key, value: be[key]}));
      if(lng) this.language = Object.keys(lng).map(key => ({type: key, value: lng[key]}));
      if(other) this.skillOther = Object.keys(other).map(key => ({type: key, value: other[key]}));
      
      
    });
  }

  public getColor(value: number) {
    if (value < 35) return 'warn';
    if (value < 35 && value > 85) return 'accent';
    if (value > 85) return 'primary';
    return 'accent';
  }

}