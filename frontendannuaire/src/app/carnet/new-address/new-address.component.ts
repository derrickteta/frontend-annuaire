import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../models/Address.model';
import { AddressService } from '../../services/address.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit, OnDestroy {
      
  public addressForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public errorMessage: string;

  private partSub: Subscription;
  address: Address;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private addressService: AddressService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.addressForm = this.formBuilder.group({
      name: [null, Validators.required],
      firstname: [null, Validators.required],
      phone: [0, Validators.required],
      email: [null, Validators.required],
      address: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.userId = this.part >= 3 ? this.auth.userId : 'userID40282382';
  }

  onSubmit() {
    this.loading = true;
    const address = new Address();
    address.name = this.addressForm.get('name').value;
    address.firstname = this.addressForm.get('firstname').value;
    address.phone = this.addressForm.get('phone').value;
    address.email = this.addressForm.get('email').value;
    address.address = this.addressForm.get('address').value;
    address.description = this.addressForm.get('description').value;
    address._id = new Date().getTime().toString();
    address.userId = this.address.userId;

    this.addressService.createNewAddress(address).then(
      () => {
        this.addressForm.reset();
        this.loading = false;
        this.router.navigate(['/carnet/all-address']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }

}
