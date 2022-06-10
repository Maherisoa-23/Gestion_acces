import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SecurityAgentService } from 'src/app/services/security-agent.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css'],
  providers: [DatePipe],
})
export class VehiculeComponent implements OnInit {
  vehicules: any;
  @Input() numero_matricule = '';
  @Input() vehicule_name = '';
  @Input() vehicule_marque = '';
  @Input() direction = '';

  dtOptions: DataTables.Settings = {};
  isShow = false;
  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  depTab: any = [];
  photoName = 'anonymous.png';
  photoPath = '';
  stagiaire_id = '';
  pointed_at = '';

  constructor(
    private authServ: AuthService,
    private stgServ: StagiaireService,
    private securityServ: SecurityAgentService,
    private route: Router,
    private toast: NgToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.photoPath = this.authServ.PhotoUrl + this.photoName;
    this.refreshDepList();
    this.refreshVehiculeList();
    this.setUpDatePicker();
  }

  setUpDatePicker() {
    setTimeout(() => {
      this.isShow = true;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [10, 15, 25],
        processing: true,
        language: {
          url: 'http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
        },
      };
    }, 600);

    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(1).search(v).draw();
    });
  }

  refreshVehiculeList() {
    this.authServ.getVehiculeList().subscribe((data) => {
      this.vehicules = data;
    });
  }

  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.depTab = data;
    });
  }
  getDepID(name: string) {
    for (let index = 0; index < this.depTab.length; index++) {
      const element = this.depTab[index];
      if (element.department_short_name == name) {
        return element.departement_id;
      }
    }
  }

  //Methode pour les modals
  showModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
    this.reinitialisationDonnee();
  }

  addVehicule() {
    if (
      this.vehicule_name == '' ||
      this.vehicule_marque == '' ||
      this.direction == ''
    ) {
      this.showError('Vérifier bien tous les informations');
    } else {
      const val = {
        numero_matricule: this.numero_matricule,
        vehicule_name: this.vehicule_name,
        vehicule_marque: this.vehicule_marque,
        department_name: this.direction.toString(),
        photoName: this.photoName,
      };
      this.authServ.addVehicule(val).subscribe((res) => {
        if (res.toString() == 'Added successfully') {
          this.closeModal();
          this.showSuccess('Véhicule ajouté avec succès');
        }
      });
      setTimeout(() => {
        this.refreshVehiculeList();
      }, 500);
    }
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.authServ.UploadPhoto(formData).subscribe((data) => {
      this.photoName = data.toString();
    });
  }

  reinitialisationDonnee() {
    this.vehicule_name = this.direction = this.vehicule_marque = '';
    this.photoName = 'anonymous.png';
  }

  showVehiculeProfile(item: any) {
    this.stgServ.stagiaire_id = item.numero_matricule;
    this.stgServ.stagiaire_name = item.vehicule_name;
    this.stgServ.departement = item.department_name;
    this.stgServ.description = item.vehicule_marque;
    this.stgServ.start_date = item.start_date;
    this.stgServ.end_date = item.end_date;
    this.stgServ.photoPath = this.authServ.PhotoUrl + item.photoName;
    this.securityServ.security_name = item.numero_matricule;
    this.route.navigate(['admin/vehicule-profile']);
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

  showInfo(msg: string) {
    this.toast.info({
      detail: 'ATTENTION',
      summary: msg,
      duration: 3000,
    });
  }

  showWarn() {
    this.toast.warning({
      detail: 'ANNULER',
      summary: 'Ajout annulé',
      duration: 3000,
    });
  }
}
