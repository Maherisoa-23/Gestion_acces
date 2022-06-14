import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stagiaire-profile',
  templateUrl: './stagiaire-profile.component.html',
  styleUrls: ['./stagiaire-profile.component.css'],
})
export class StagiaireProfileComponent implements OnInit {
  @Input() stagiaire_name = '';
  @Input() description = '';
  @Input() start_date = '';
  @Input() end_date = '';
  @Input() direction = '';

  status = 'Encore actif';
  photoPath = '';

  dtOptions: DataTables.Settings = {};
  isShow = false;

  depTab: any = [];
  photoName = 'anonymous.png';
  stagiaire_id = 0;
  pointed_at = '';

  isEdit = false;

  constructor(
    private stgServ: StagiaireService,
    private route: Router,
    private modalService: NgbModal,
    private authServ: AuthService,
    private toast: NgToastService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.stgServ.stagiaire_name == '')
      this.route.navigate(['/admin/stagiaire-list']);
    this.initialisation();
    this.refreshDepList();
  }

  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.depTab = data;
    });
  }

  initialisation() {
    this.stagiaire_id = this.stgServ.stagiaire_id;
    this.stagiaire_name = this.stgServ.stagiaire_name;
    this.direction = this.stgServ.departement;
    this.description = this.stgServ.description;
    this.start_date = this.stgServ.start_date;
    this.end_date = this.stgServ.end_date;
    this.photoPath = this.stgServ.photoPath;
    if (!this.stgServ.isActif) this.status = 'non actif';
  }

  //Methode pour les modals
  showModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  updateStagiaire() {
    if (
      this.stagiaire_name == '' ||
      this.description == '' ||
      this.direction == '' ||
      this.start_date == '' ||
      this.end_date == ''
    ) {
      this.showError('Vérifier bien tous les informations');
    } else {
      const val = {
        stagiaire_id: this.stgServ.stagiaire_id,
        stagiaire_name: this.stagiaire_name,
        description: this.description,
        department_name: this.direction.toString(),
        pointed_at: 'not pointed',
        start_date: this.start_date.toString(),
        end_date: this.end_date.toString(),
        function: 'stagiaire',
        photoName: this.photoName,
      };
      this.authServ.updateStagiaireEntity(val).subscribe((res) => {
        if (res.toString() == 'Updated Successfully!!') {
          this.showSuccess('Stagiaire modifié avec succès');
          setTimeout(() => {
            this.closeModal();
          }, 500);
        } else {
          this.showError(res.toString());
        }
      });
    }
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.authServ.UploadPhoto(formData).subscribe((data) => {
      this.photoName = data.toString();
      this.photoPath = this.authServ.PhotoUrl + this.photoName;
    });
  }

  deleteStagiaire() {
    this.authServ.deleteStagiaire(this.stagiaire_id).subscribe((res) => {
      if (res.toString() == 'deleted successfully')
        this.showSuccess(res.toString());
      this.closeModal();
    });
    setTimeout(() => {
      this.route.navigate(['/admin/stagiaire-list']);
    }, 1000);
  }

  //Les messages
  showSuccess(msg: string) {
    this.toast.success({
      detail: 'SUCCESS',
      summary: msg,
      duration: 3000,
    });
  }

  showError(msg: string) {
    this.toast.error({
      detail: 'ERROR',
      summary: msg,
      duration: 3000,
    });
  }
  goBack() {
    this.location.back();
  }
}
