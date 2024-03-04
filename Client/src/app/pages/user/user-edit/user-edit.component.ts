import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";
import { icons } from "src/app/shared/constants/constants";
import { Experience, User } from "src/app/shared/models/user.model";

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
      console.log(res)
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
    let basic = this.userBasicInfoForm.value;
    let about = this.userAboutSkillsForm.value;
    let details = this.userDetailsForm.value
    console.log(details)
    let model: User = {
      name: basic['name'],
      surname: basic['surname'],
      mail: basic['email'],
      title: basic['title'],
      cashRequirements: basic['pay'],
      localization: basic['localization'],
      githubUrl: basic['socialMedia'],
      phoneNumber: basic['phone'],
      dateOfBirth: basic['dateOfBirth'],
      siteUrl: basic['page'],
      timeRequirements: basic['workTime'],
      typeOfContract: basic['contractType'],
      aboutMe: about['aboutMe'],
      experience: this.formatData('experience'),
      education:  this.formatData('education'),
      qualification: this.formatData('qualification'),
      skills: this.formatData('skill'),
      organizations: this.formatData('organization'),
      softSkills: this.formatData('softSkill'),
      hobbies: this.formatData('hobbie')
    }

    console.log(model)
    this.userService.saveUser(model).subscribe(res => this.cancel())
  }

  private formatData(field: string) {
    let arr: any[] = []
    switch (field) {
      case 'experience': {
        this.userDetailsForm.value.experiences.forEach((element: any) => {
          let y: any = [];
          element.tasks.forEach((element: any) => {
            console.log(element.task)
            y.push(element.task)
          });
          let x = {
            name: element.name,
            startedDate: element.startedDate,
            finishedDate: element.finishedDate,
            tasks: y
          }
          
          arr.push(x)
        });
        return arr;
      };
      case 'education': {
        this.userDetailsForm.value.educations.forEach((element: any) => {
          let x = {
            name: element.name,
            schoolName: element.universityName,
            startedDate: element.startDate,
            finishedDate: element.endDate,
            title: element.title
          }
          arr.push(x)
        });
        return arr;
      };
      case 'qualification': {
        this.userDetailsForm.value.certyficates.forEach((element: any) => {
          console.log(element)
          let x = {
            name: '',
            certificateName: element.certName,
            date: element.date,
            certificateNumber: element.certNumber,
            companyName: element.organization
          }
          arr.push(x)
        });
        return arr;
      };
      case 'organization': {
        this.userDetailsForm.value.organizations.forEach((element: any) => {
          console.log(element)
          let x = element.field;
          arr.push(x)
        });
        return arr;
      };
      case 'softSkill': {
        this.userDetailsForm.value.softSkills.forEach((element: any) => {
          let x = element.field;
          arr.push(x)
        });
        return arr;
      };
      case 'hobbie': {
        this.userDetailsForm.value.hobbies.forEach((element: any) => {
          let x = element.field;
          arr.push(x)
        });
        return arr;
      };
      case 'skill': {
        return this.skillSet();
      };
      default:
        return;
    }
  }

  private skillSet() {
    let skills: any = {
      fe: {
        skill: {}
      },
      be: {
        skill: {}
      },
      lng: {
        skill: {}
      },
      other: {
        skill: {}
      }
    }

    this.userAboutSkillsForm.value.skillsFE.forEach((element: any) => {
      console.log(element)
      skills.fe.skill[element.skill] = element.level;
    });
    this.userAboutSkillsForm.value.skillsBE.forEach((element: any) => {
      skills.be.skill[element.skill] = element.level;
    });
    this.userAboutSkillsForm.value.skillsLanguage.forEach((element: any) => {
      skills.lng.skill[element.skill] = element.level;
    });
    this.userAboutSkillsForm.value.skillsOther.forEach((element: any) => {
      skills.other.skill[element.skill] = element.level
    });
    return skills;
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