import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})

export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Output() public liked: EventEmitter<void> = new EventEmitter();
  @Input() public description = '';
  @Input() public src = '';
  @Input() public likes = 0;
  private debounceSubject: Subject<void> = new Subject(); //será usado para controlar a emissão de eventos de "curtir" com um atraso.
  private unsubscribe: Subject<void> = new Subject(); // será usado para cancelar a inscrição em observáveis quando o componente for destruído.

  public ngOnInit(): void {
    this.debounceSubject
      .asObservable() // transforma o debounceSubject em um observável para que possamos encadear operadores RxJS para manipular os eventos emitidos pelo debounceSubject.
      .pipe(debounceTime(500)) // cria um novo observável que emite um valor somente depois que passou um período de 500 milissegundos sem que nenhum novo valor seja emitido pelo observável anterior
      .pipe(takeUntil(this.unsubscribe)) // takeUntil(this.unsubscribe) permite que o observável seja encerrado quando um outro observável (this.unsubscribe) emite um valor, ou seja, eu destruo o debounceSubject e crio o unsubscribe para poder encerrá-lo no ngOnDestroy
      .subscribe(() => this.liked.emit()); // se inscreve no observável resultante e emite o evento liked quando um evento é recebido pelo observável após passar pelo tempo de debounce.
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next(); //  notifica todos os observadores deste Subject que o assunto foi encerrado
    this.unsubscribe.complete(); // Completa o Subject this.unsubscribe. Isso significa que ele não emitirá mais nenhum valor. Com isso, qualquer observador que ainda não tenha sido notificado do término também será notificado
  }

  /*
  Quando o método like() é chamado, ele emite um valor no debounceSubject. Isso inicia o processo de espera pelo período de
  debounce configurado no método ngOnInit(). Se durante esse período de espera outro evento like() for chamado, o temporizador é reiniciado.
  Quando o tempo de espera é concluído sem a ocorrência de outro evento like(), o evento liked é finalmente emitido, conforme configurado no método ngOnInit().
  Isso ajuda a evitar ações de "curtir" excessivamente frequentes, dando aos usuários um tempo mínimo entre as ações.
  */
  public like(): void {
    this.debounceSubject.next();
  }
}
