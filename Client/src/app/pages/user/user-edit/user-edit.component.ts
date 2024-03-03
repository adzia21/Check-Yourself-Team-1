import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { icons } from "src/app/shared/constants/constants";
import { User } from "src/app/shared/models/user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public userForm!: FormGroup;
  public userBasicInfoForm!: FormGroup;
  public userAboutSkillsForm!: FormGroup;
  public userDetailsForm!: FormGroup;

  public image: string = `${icons}/no-pfp.svg`;
  public dummyBool: boolean = true;
  public data!: User;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private router: Router, private userService: UserService) {
    this.setUp()
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(res => {
      this.data = res;
      this.setUp();
    });
  }

  private setUp() {

    this.userBasicInfoForm = this.fb.group({
      profilePic: new FormControl(null, []),
      name: new FormControl(this.data ? this.data.name : '', []),
      surname: new FormControl(this.data ? this.data.surname : '', []),
      title: new FormControl(this.data ? this.data.title : '', []),
      localization: new FormControl(this.data ? this.data.localization : '', []),
      phone: new FormControl(this.data ? this.data.phoneNumber : '', []),
      pay: new FormControl(this.data ? this.data.cashRequirements : '', []),
      email: new FormControl(this.data ? this.data.mail : '', []),
      dateOfBirth: new FormControl(this.data ? this.data.dateOfBirth : '', []),
      workTime: new FormControl(this.data ? this.data.timeRequirements : '', []),
      socialMedia: new FormControl(this.data ? this.data.githubUrl : '', []),
      page: new FormControl(this.data ? this.data.siteUrl : '', []),
      contractType: new FormControl(this.data ? this.data.typeOfContract : '', []),
    });

    this.userAboutSkillsForm = this.fb.group({
      aboutMe: new FormControl(this.data ? this.data.aboutMe : '', []),
      skillsFE: this.fb.array([]),
      skillsBE: this.fb.array([]),
      skillsLanguage: this.fb.array([]),
      skillsOther: this.fb.array([]),
    });

    this.userDetailsForm = this.fb.group({
      experiences: this.fb.array([]),
      educations: this.fb.array([]),
      certyficates: this.fb.array([]),
      organizations: this.fb.array([]),
      softSkills: this.fb.array([]),
      hobbies: this.fb.array([]),
    });

    this.userForm = this.fb.group({
      userBasicInfoForm: new FormControl(this.userBasicInfoForm),
      userAboutSkillsForm: new FormControl(this.userAboutSkillsForm),
      userDetailsForm: new FormControl(this.userDetailsForm)
    });
  }

  public save() {
    console.log(this.userBasicInfoForm.value)
    console.log(this.userAboutSkillsForm.value)
    console.log(this.userDetailsForm.value)
  }

  public cancel() {
    this.router.navigate(['/user/' + this.data.userId])
  }

  selectAvatar(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.toastrService.warning('Zdjęcie załadowane');
        this.image = event.target.result;
        this.dummyBool = false;
      }
    }
  }
}