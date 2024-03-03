import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobOfferService } from 'src/app/services/job-offer.service';
import {
  platforms,
  technologies,
  tools,
} from 'src/app/shared/constants/company-profile.constants';
import { icons } from 'src/app/shared/constants/constants';
import { FullJobOffer } from 'src/app/shared/models/job-offer.model';

@Component({
  selector: 'app-job-offer-edit',
  templateUrl: './job-offer-edit.component.html',
  styleUrls: ['./job-offer-edit.component.scss'],
})
export class JobOfferEditComponent implements AfterViewInit, OnInit {
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
    'desiredKnowledge',
    'organizationOfWork',
    'benefits',
    'whatWeOffer',
    'additionalInformation',
  ];

  public selectedTechnology = [];
  public selectedTool = [];
  public selectedPlatform = [];
  public jobOfferForm!: FormGroup;
  public data!: FullJobOffer;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private ref: ChangeDetectorRef,
    private jobOfferService: JobOfferService
  ) {
    this.setUp();
  }

  ngOnInit(): void {
    this.jobOfferService.getJobOffer(1).subscribe(res => {
      console.log(res)
      this.data = res;
      this.setUp();
    });
  }

  ngAfterViewInit(): void {
    this.addNew('technologies');
    this.addNew('tools');
    this.addNew('platforms');
    this.addNew('languages');
    this.addNew('mainTasks');
    this.addNew('desiredKnowledge');
    this.addNew('organizationOfWork');
    this.addNew('benefits');
    this.addNew('whatWeOffer');
    this.addNew('additionalInformation');
    this.ref.detectChanges();
  }

  private setUp() {
    this.jobOfferForm = this.fb.group({
      logo: new FormControl(''),
      companyName: new FormControl(this.data ? this.data.companyName : ''),
      title: new FormControl(this.data ? this.data.title : ''),
      localization: new FormControl(this.data ? this.data.localization : ''),
      contractType: new FormControl(this.data ? this.data.contractType : ''),
      expirationDate: new FormControl(this.data ? this.data.expirationDate : ''),
      description: new FormControl(this.data ? this.data.description : ''),
      technologies: this.fb.array(this.data ? this.data.technologies : []),
      tools: this.fb.array(this.data ? this.data.tools : []),
      platforms: this.fb.array(this.data ? this.data.platforms : []),
      languages: this.fb.array(this.data ? this.data.languages : []),
      mainTasks: this.fb.array(this.data ? this.data.mainTasks : []),
      desiredKnowledge: this.fb.array(this.data ? this.data.desiredKnowledge : []),
      organizationOfWork: this.fb.array(this.data ? this.data.organizationOfWork : []),
      benefits: this.fb.array(this.data ? this.data.benefits : []),
      whatWeOffer: this.fb.array(this.data ? this.data.whatWeOffer : []),
      additionalInformation: this.fb.array(this.data ? this.data.additionalInformation : []),
    });
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

  public get desiredKnowledge() {
    return this.jobOfferForm.get('desiredKnowledge') as FormArray;
  }

  public get organizationOfWork() {
    return this.jobOfferForm.get('organizationOfWork') as FormArray;
  }

  public get benefits() {
    return this.jobOfferForm.get('benefits') as FormArray;
  }

  public get whatWeOffer() {
    return this.jobOfferForm.get('whatWeOffer') as FormArray;
  }

  public get additionalInformation() {
    return this.jobOfferForm.get('additionalInformation') as FormArray;
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
      case 'desiredKnowledge':
        return 'Co szczególnie cenimy w kandydacie';
      case 'organizationOfWork':
        return 'Organizacja pracy';
      case 'benefits':
        return 'Benefity';
      case 'whatWeOffer':
        return 'Narzędzia do pracy, które zapewniamy';
      case 'additionalInformation':
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
      case 'desiredKnowledge':
        return this.desiredKnowledge.controls;
      case 'organizationOfWork':
        return this.organizationOfWork.controls;
      case 'benefits':
        return this.benefits.controls;
      case 'whatWeOffer':
        return this.whatWeOffer.controls;
      case 'additionalInformation':
        return this.additionalInformation.controls;
      default:
        return;
    }
  }

  public getIcon(icon: string) {
    switch (icon) {
        case 'mainTasks':
          return 'change_history';
        case 'desiredKnowledge':
          return 'card_membership';
        case 'organizationOfWork':
          return 'trending_up';
        case 'benefits':
          return 'tag_faces';
        case 'whatWeOffer':
          return 'style';
        case 'additionalInformation':
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
    if (!this.jobOfferForm.valid) return;

    this.jobOfferService.editJobOffer(1, this.jobOfferForm.value).subscribe(res => { // spojrzeć na next i complete zamiast res
    }, error => {
      console.log(error)
      switch (error) {
        default:
          return this.toastrService.error('Wystąpił błąd podczas zapisywania')
      };
    });
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
      case 'desiredKnowledge':
        return this.desiredKnowledge.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'organizationOfWork':
        return this.organizationOfWork.push(
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
      case 'whatWeOffer':
        return this.whatWeOffer.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'additionalInformation':
        return this.additionalInformation.push(
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
      case 'desiredKnowledge':
        return this.desiredKnowledge.removeAt(questionIndex);
      case 'organizationOfWork':
        return this.organizationOfWork.removeAt(questionIndex);
      case 'benefits':
        return this.benefits.removeAt(questionIndex);
      case 'whatWeOffer':
        return this.whatWeOffer.removeAt(questionIndex);
      case 'additionalInformation':
        return this.additionalInformation.removeAt(questionIndex);
      default:
        return;
    }
  }
}
