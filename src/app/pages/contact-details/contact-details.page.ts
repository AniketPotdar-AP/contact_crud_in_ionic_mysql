import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  contactForm: FormGroup;
  data: any;
  id: any;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required]),
    });
  }

  /*=======================================================
                   Get Contact Data by ID
  =======================================================*/

  getContactByphoneNo() {
    this.contactService
      .getContactByphoneNo(this.id)
      .subscribe((data: any) => {
        this.data = data[0];
        this.contactForm.patchValue({
          firstName: this.data?.firstName,
          lastName: this.data?.lastName,
          phoneNo: this.data?.phoneNo,
        });
      });
  }

  /*=======================================================
                     Update Contact
  =======================================================*/

  updateContact() {
    this.contactService.updateContacts(
      this.id,
      this.contactForm.value.firstName,
      this.contactForm.value.lastName,
      this.contactForm.value.phoneNo
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getContactByphoneNo();
  }

  get f() {
    return this.contactForm.controls;
  }
}
