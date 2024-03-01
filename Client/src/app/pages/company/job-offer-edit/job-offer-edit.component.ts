import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  platforms,
  technologies,
  tools,
} from 'src/app/shared/constants/company-profile.constants';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-job-offer-edit',
  templateUrl: './job-offer-edit.component.html',
  styleUrls: ['./job-offer-edit.component.scss'],
})
export class JobOfferEditComponent implements AfterViewInit {
  public image: string = `${icons}/no-pfp.svg`;
  public facebook: string = `${icons}/facebook.svg`;
  public twitter: string = `${icons}/twitter.svg`;
  public instagram: string = `${icons}/instagram.svg`;
  public linkedin: string = `${icons}/linkedin.svg`;
  public icons = icons;
  public technologiesArray = technologies;
  public toolsArray = tools;
  public platformsArray = platforms;
  public isCompany = false;
  public dummyBool = false;

  public levels = ['początkujący', 'średniozaawansowany', 'zaawansowany'];
  public segments = ['technologies', 'tools', 'platforms', 'languages'];
  public segments2 = [
    'mainTasks',
    'candidateSpecifications',
    'workOrganization',
    'benefits',
    'workTools',
    'additionalInfo',
  ];

  public selectedTechnology = [];
  public selectedTool = [];
  public selectedPlatform = [];
  public jobOfferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private ref: ChangeDetectorRef
  ) {
    this.jobOfferForm = this.fb.group({
      logo: new FormControl(''),
      companyName: new FormControl(''),
      position: new FormControl(''),
      location: new FormControl(''),
      employmentForm: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl(''),
      technologies: this.fb.array([]),
      tools: this.fb.array([]),
      platforms: this.fb.array([]),
      languages: this.fb.array([]),
      mainTasks: this.fb.array([]),
      candidateSpecifications: this.fb.array([]),
      workOrganization: this.fb.array([]),
      benefits: this.fb.array([]),
      workTools: this.fb.array([]),
      additionalInfo: this.fb.array([]),
    });
  }

  ngAfterViewInit(): void {
    this.addNew('technologies');
    this.addNew('tools');
    this.addNew('platforms');
    this.addNew('languages');
    this.addNew('mainTasks');
    this.addNew('candidateSpecifications');
    this.addNew('workOrganization');
    this.addNew('benefits');
    this.addNew('workTools');
    this.addNew('additionalInfo');
    this.ref.detectChanges();
  }

  //#region  get as FormArray
  public get technologies() {
    return this.jobOfferForm.get('technologies') as FormArray;
  }

  public get tools() {
    return this.jobOfferForm.get('tools') as FormArray;
  }

  public get platforms() {
    return this.jobOfferForm.get('platforms') as FormArray;
  }

  public get languages() {
    return this.jobOfferForm.get('languages') as FormArray;
  }

  public get mainTasks() {
    return this.jobOfferForm.get('mainTasks') as FormArray;
  }

  public get candidateSpecifications() {
    return this.jobOfferForm.get('candidateSpecifications') as FormArray;
  }

  public get workOrganization() {
    return this.jobOfferForm.get('workOrganization') as FormArray;
  }

  public get benefits() {
    return this.jobOfferForm.get('benefits') as FormArray;
  }

  public get workTools() {
    return this.jobOfferForm.get('workTools') as FormArray;
  }

  public get additionalInfo() {
    return this.jobOfferForm.get('additionalInfo') as FormArray;
  }
  //#endregion

  //#region getName, getControl
  public getTechnologyName(technology: string) {
    switch (technology) {
      case 'angular.svg':
        return 'Angular';
      case 'c.svg':
        return 'C';
      case 'cpp.svg':
        return 'C++';
      case 'csharp.svg':
        return 'C#';
      case 'python.svg':
        return 'Python';
      case 'java.svg':
        return 'Java';
      case 'html5.svg':
        return 'HTML5';
      case 'css3.svg':
        return 'CSS3';
      case 'javascript.svg':
        return 'JavaScript';
      case 'typescript.svg':
        return 'TypeScript';
      case 'androidstudio.svg':
        return 'Android Studio';
      case 'react.svg':
        return 'React';
      case 'unrealengine.svg':
        return 'Unreal Engine';
      case 'arduino.svg':
        return 'Arduino';
      default:
        return '';
    }
  }

  public getToolName(tool: string) {
    switch (tool) {
      case 'git.svg':
        return 'Git';
      case 'jira.svg':
        return 'Jira';
      case 'jenkins.svg':
        return 'Jenkins';
      default:
        return '';
    }
  }

  public getPlatformName(platform: string) {
    switch (platform) {
      case 'windows.svg':
        return 'Windows';
      case 'linux.svg':
        return 'Linux';
      default:
        return '';
    }
  }

  public getName(segment: string) {
    switch (segment) {
      case 'technologies':
        return 'Technologie';
      case 'tools':
        return 'Narzędzia';
      case 'platforms':
        return 'Platformy';
      case 'languages':
        return 'Języki';
      case 'mainTasks':
        return 'Główne zadania';
      case 'candidateSpecifications':
        return 'Co szczególnie cenimy w kandydacie';
      case 'workOrganization':
        return 'Organizacja pracy';
      case 'benefits':
        return 'Benefity';
      case 'workTools':
        return 'Narzędzia do pracy, które zapewniamy';
      case 'additionalInfo':
        return 'Dodatkowe infromacje';
      default:
        return '';
    }
  }

  public getControls(control: string) {
    switch (control) {
      case 'technologies':
        return this.technologies.controls;
      case 'tools':
        return this.tools.controls;
      case 'platforms':
        return this.platforms.controls;
      case 'languages':
        return this.languages.controls;
      case 'mainTasks':
        return this.mainTasks.controls;
      case 'candidateSpecifications':
        return this.candidateSpecifications.controls;
      case 'workOrganization':
        return this.workOrganization.controls;
      case 'benefits':
        return this.benefits.controls;
      case 'workTools':
        return this.workTools.controls;
      case 'additionalInfo':
        return this.additionalInfo.controls;
      default:
        return;
    }
  }

  public getIcon(icon: string) {
    switch (icon) {
        case 'mainTasks':
          return 'change_history';
        case 'candidateSpecifications':
          return 'card_membership';
        case 'workOrganization':
          return 'trending_up';
        case 'benefits':
          return 'tag_faces';
        case 'workTools':
          return 'style';
        case 'additionalInfo':
          return 'vignette';
        default:
          return;
      }
}
  //#endregion

  public cancel() {
    this.router.navigate(['/company/1/job-offer/2']);
  }

  public save() {
    console.log(this.jobOfferForm.value);
  }

  public selectLogo(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.toastrService.warning('Zdjęcie załadowane');
        this.image = event.target.result;
        this.dummyBool = false;
      };
    }
  }

  public addNew(detail: string) {
    switch (detail) {
      case 'technologies':
        return this.technologies.push(
          this.fb.group({
            requirement: new FormControl(''),
            experience: new FormControl(''),
          })
        );
      case 'tools':
        return this.tools.push(
          this.fb.group({
            requirement: new FormControl(''),
            experience: new FormControl(''),
          })
        );
      case 'platforms':
        return this.platforms.push(
          this.fb.group({
            requirement: new FormControl(''),
            experience: new FormControl(''),
          })
        );
      case 'languages':
        return this.languages.push(
          this.fb.group({
            requirement: new FormControl(''),
            experience: new FormControl(''),
          })
        );
      case 'mainTasks':
        return this.mainTasks.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'candidateSpecifications':
        return this.candidateSpecifications.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'workOrganization':
        return this.workOrganization.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'benefits':
        return this.benefits.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'workTools':
        return this.workTools.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'additionalInfo':
        return this.additionalInfo.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      default:
        return;
    }
  }

  public removeAtIndex(form: string, questionIndex: number) {
    switch (form) {
      case 'technologies':
        return this.technologies.removeAt(questionIndex);
      case 'tools':
        return this.tools.removeAt(questionIndex);
      case 'platforms':
        return this.platforms.removeAt(questionIndex);
      case 'languages':
        return this.languages.removeAt(questionIndex);
      case 'mainTasks':
        return this.mainTasks.removeAt(questionIndex);
      case 'candidateSpecifications':
        return this.candidateSpecifications.removeAt(questionIndex);
      case 'workOrganization':
        return this.workOrganization.removeAt(questionIndex);
      case 'benefits':
        return this.benefits.removeAt(questionIndex);
      case 'workTools':
        return this.workTools.removeAt(questionIndex);
      case 'additionalInfo':
        return this.additionalInfo.removeAt(questionIndex);
      default:
        return;
    }
  }
}
