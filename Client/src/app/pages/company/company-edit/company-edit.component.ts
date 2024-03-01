import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  platforms,
  technologies,
  tools,
} from 'src/app/shared/constants/company-profile.constants';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent {
  public image: string = `${icons}/no-pfp.svg`;
  public facebook: string = `${icons}/facebook.svg`;
  public twitter: string = `${icons}/twitter.svg`;
  public instagram: string = `${icons}/instagram.svg`;
  public linkedin: string = `${icons}/linkedin.svg`;
  public icons = icons;
  public technologies = technologies;
  public tools = tools;
  public platforms = platforms;

  public companyForm: FormGroup;
  public selectedTechnology = [];
  public selectedTool = [];
  public selectedPlatform = [];
  public dummyBool: boolean = true;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private router: Router) {
    this.companyForm = this.fb.group({
      companyName: new FormControl(''),
      logo: new FormControl(''),
      location: new FormControl(''),
      personel: new FormControl(''),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      linkedin: new FormControl(''),
      description: new FormControl(''),
      technologies: new FormControl([]),
      tools: new FormControl([]),
      platforms: new FormControl([]),
    });
  }

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

  public technologyChange() {
    this.selectedTechnology = this.companyForm.value['technologies'];
  }

  public toolChange() {
    this.selectedTool = this.companyForm.value['tools'];
  }

  public platformChange() {
    this.selectedPlatform = this.companyForm.value['platforms'];
  }

  selectLogo(event: any) {
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

  cancel() {
    this.router.navigate(['/company/1'])
  }

  save() {
    console.log(this.companyForm.value);
  }
}
