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
  selector: 'app-stagiaire-list',
  templateUrl: './stagiaire-list.component.html',
  styleUrls: ['./stagiaire-list.component.css'],
  providers: [DatePipe]
})
export class StagiaireListComponent implements OnInit {
  stagiaires: any;
  @Input() stagiaire_name = "";
  @Input() description = "";
  @Input() direction = "";
  @Input() date_debut : any = "";
  @Input() date_fin : any = "";

  dtOptions: DataTables.Settings = {};
  isShow = false;
  //filtrage personnalisé
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  depTab : any = []
  photoName = "anonymous.png"
  photoPath = ""
  stagiaire_id = ""
  pointed_at = ""

  constructor(
    private authServ: AuthService,
    private stgServ: StagiaireService,
    private securityServ : SecurityAgentService,
    private route: Router,
    private toast: NgToastService,
    private modalService: NgbModal
  ) {}



  ngOnInit(): void {   
    this.photoPath = this.authServ.PhotoUrl + this.photoName
    this.refreshDepList()
    this.refreshStagiaireList();
    setTimeout(() => {}, 500);
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
        }
      };
    }, 600);

    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value; // getting search input value

      $('#dataTables-example').DataTable().columns(1).search(v).draw();
    });
  }

  refreshStagiaireList() {
    this.authServ.getStagiaireList().subscribe((data) => {
      this.stagiaires = data
    })
  }

  refreshDepList() {
    this.authServ.getDepartmentList().subscribe((data) => {
      this.depTab = data
    })
  }
  getDepID(name : string){
    for (let index = 0; index < this.depTab.length; index++) {
      const element = this.depTab[index];
      if (element.department_short_name == name){
        return element.departement_id
      }
    }
  }

  //Methode pour les modals
  showModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll()
    this.reinitialisationDonnee()
  }

  addStagiaire() {
    if (this.stagiaire_name == "" || this.description == "" || this.direction == "" || this.date_debut == "" || this.date_fin == "") {
      this.showError("Vérifier bien tous les informations")
    }
    else {
      if (!this.checkValidDate(this.date_debut, this.date_fin)) {
        this.showError("Veuillez entrer une date de fin valide")
      } 
      else {
        const val = {
          stagiaire_name : this.stagiaire_name,
          description : this.description,
          start_date : this.date_debut.toString(),
          end_date : this.date_fin.toString(),
          department_name : this.direction.toString(),
          photoName : this.photoName,
        }
        this.authServ.addStagiaire(val).subscribe((res) => {
          if (res.toString() == "Added successfully") {
            this.closeModal()
            this.showSuccess("Stagiaire ajouté avec succès")
          }
        })
        setTimeout(() => {
          this.refreshStagiaireList()
        }, 500);
      }
    }
  }

  //Pour les stagiaires
  checkValidDate(startDate: string, endDate : string) {
    const start_date = new Date(startDate);
    const end_date = new Date(endDate);
    if (start_date.getTime() < end_date.getTime()) {
      return true
    }
    return false
  }

  uploadPhoto(event : any) {
    var file = event.target.files[0];
    const formData : FormData = new FormData()
    formData.append('uploadedFile',file,file.name); 

    this.authServ.UploadPhoto(formData).subscribe((data) => {
      this.photoName = data.toString();
      this.photoPath = this.authServ.PhotoUrl + this.photoName
    })
  }

  reinitialisationDonnee() {
    this.stagiaire_name = this.direction = this.date_debut = this.date_fin = this.description = ""
    this.photoName = "anonymous.png";
  }

  showStagiaireProfile(item : any) {
    this.stgServ.stagiaire_id = item.stagiaire_id
    this.stgServ.stagiaire_name = item.stagiaire_name;
    this.stgServ.departement = item.department_name;
    this.stgServ.description = item.description;
    this.stgServ.start_date = item.start_date;
    this.stgServ.end_date = item.end_date;
    this.stgServ.photoPath = this.authServ.PhotoUrl + item.photoName
    this.securityServ.security_name = item.stagiaire_name
    this.route.navigate(['admin/stagiaire-profile']);
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
