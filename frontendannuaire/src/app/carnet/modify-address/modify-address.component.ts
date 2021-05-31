import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/Address.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-address',
  templateUrl: './modify-address.component.html',
  styleUrls: ['./modify-address.component.scss']
})
export class ModifyAddressComponent implements OnInit {

  address: Address;
  addressForm: FormGroup;
  loading = false;
  errorMessage: string;
  part: number;

  private partSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private state: StateService,
              private addressService: AddressService) { }

  ngOnInit() {
    this.loading = true;
    this.addressForm = this.formBuilder.group({
      name: [null, Validators.required],
      firstname: [null, Validators.required],
      phone: [0, Validators.required],
      email: [null, Validators.required],
      address: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.state.mode$.next('form');
    this.route.params.subscribe(
      (params) => {
        this.addressService.getAddressById(params.id).then(
          (address: Address) => {
            this.address = address;
            this.addressForm.get('name').setValue(this.address.name);
            this.addressForm.get('firstname').setValue(this.address.firstname);
            this.addressForm.get('phone').setValue(this.address.phone);
            this.addressForm.get('email').setValue(this.address.email);
            this.addressForm.get('address').setValue(this.address.address);
            this.addressForm.get('description').setValue(this.address.description);
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const address = new Address();
    address.name = this.addressForm.get('title').value;
    address.firstname = this.addressForm.get('firstname').value;
    address.phone = this.addressForm.get('phone').value;
    address.email = this.addressForm.get('email').value;
    address.address = this.addressForm.get('address').value;
    address.description = this.addressForm.get('description').value;
    address._id = new Date().getTime().toString();
    address.userId = this.address.userId;
    this.addressService.modifyAddress(this.address._id, address).then(
      () => {
        this.addressForm.reset();
        this.loading = false;
        this.part=3;
        this.router.navigate(['/part-three/all-address']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
