import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CentralComponent } from '../../components/central/central.component';
import { TransacoesComponent } from '../../components/transacoes/transacoes.component';
import { NavigationService } from '../../services/navigation.service';
import { WithdrawalComponent } from '../../components/withdrawal/withdrawal.component';
import { TransferComponent } from '../../components/transfer/transfer.component';
import { TicketComponent } from '../../components/ticket/ticket.component';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DepositComponent } from '../../components/deposit/deposit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    FooterComponent,
    FormsModule,
    RouterOutlet,
    CentralComponent,
    TransacoesComponent,
    RouterModule,
    WithdrawalComponent,
    TransferComponent,
    DepositComponent
  ],
  providers: [UserService],
})

export class HomeComponent implements OnInit {

  user: any = { name: '' };

  momento: Date = new Date();

  avatar: string = '../../../assets/perfil.png'

  cumprimento: string;

  menuIconChecked = false;

  selectedComponent: string = 'central';



  constructor(private navigationService: NavigationService, private router: Router, private userService: UserService) {

    const horaAtual = this.momento.getHours();
    if (horaAtual >= 5 && horaAtual < 12) {
      this.cumprimento = 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
      this.cumprimento = 'Boa tarde';
    } else {
      this.cumprimento = 'Boa noite';
    }

  }

  ngOnInit(): void {
    this.navigationService.selectedComponent$.subscribe(component => {
      this.selectedComponent = component;
    });

    this.userService.getUser().subscribe({
      next: (userData) => {
        // console.log(userData);
        this.user = userData;
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      },
    });
  }

  chooseComponent($event: any) {
    if ($event.srcElement.id === 'central') {
      this.selectedComponent = 'central';
    } else if ($event.srcElement.id === 'transacoes') {
      this.selectedComponent = 'transacoes';
    } else if ($event.srcElement.id === 'deposito') {
      this.selectedComponent = 'deposito';
    } else if ($event.srcElement.id === 'saque') {
      this.selectedComponent = 'saque';
    } else if ($event.srcElement.id === 'transfer') {
      this.selectedComponent = 'transfer';
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/land']);
  }





}





