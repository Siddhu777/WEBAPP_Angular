import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public customers:any;
  public customer:any;
  public showDetails:boolean = false;
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "speed": 600, "draggable": false, "infinite": false, "dots": false, "arrows": false, "autoplay": false, "step": -1 };
  public steps: Array<any>;
  public isNext:boolean = false;
  public customerDetails: FormGroup;
  constructor(private service:DataService,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getData();
    // setTimeout(() => {
      // this.loadStep(0);
    // }, 310);
    this.customerDetails = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.min(3), Validators.max(10)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(6)])],
    });
  }
  getData(){
    this.service.getCustomers().subscribe((res)=>{
      this.customers = res;
      this.getDetails(this.customers[0]);
    })
  }
  getDetails(data:any){
    console.log("getDetails",data)
    this.service.getCustomer(data.customerid).subscribe(res=>{
      this.showDetails = true;
      console.log("res222",res)
      this.customer = res[0];
    })

  }
  addCustomer(){
    this.service.addCustomer(this.customerDetails.value).subscribe(res =>{
      window.location.reload();
    })
  }
  // sliderClose(params:any) {
    
  // }
  // closeAddContentPopupContent() {
  //   this.loadStep(0);
  //   var param  ={};
  // }
  // loadStep(stepIndex:any, slickModal?:any): void {
  //   this.steps[stepIndex].status = 'active';
  //   this.slideConfig.step = stepIndex;
  //   if (slickModal !== null && slickModal !== undefined) {
  //     slickModal.slickGoTo(stepIndex);
  //   }
  // }
  // loadNextStep(stepIndex:any, slickModal:any): void {
  //   var stepValid = this.validateStep(stepIndex);
  //   switch (stepIndex) {
  //     case 0:
  //       break;
  //     case 1:
  //       break;
  //     case 2:
  //       break;
  //   }

  //   if (stepValid) {
  //     this.steps[stepIndex].done = true;
  //     this.steps[stepIndex].status = 'done';
  //     if ((stepIndex + 1) < this.steps.length) {
  //       this.loadStep(stepIndex + 1, slickModal);
  //     }
  //   }
  // }
  // validateStep(stepIndex:any): boolean {
  //   var valid = true;
  //   return valid;
  // }
  // loadPreviousStep(stepIndex:any, slickModal:any): void {
  //   this.steps[stepIndex].status = (this.steps[stepIndex].done === true) ? 'done' : 'open';
  //   if ((stepIndex - 1) >= 0) {
  //     this.loadStep(stepIndex - 1, slickModal);
  //   }
  // }
 
}
