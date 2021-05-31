import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AddressService } from '../../services/address.service';
import { Subscription } from 'rxjs';
import { Address } from '../../models/Address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit, OnDestroy {

  public address: Address[] = [];
  public part: number;
  public loading: boolean;

  private addressSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
              private addressService: AddressService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.addressSub = this.addressService.address$.subscribe(
      (address) => {
        this.address = address;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.addressService.getAddress();
  }

  onProductClicked(id: string) {
      this.router.navigate(['/carnet/address/' + id]);
  }

  ngOnDestroy() {
    this.addressSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
