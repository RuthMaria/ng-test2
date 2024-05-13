import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null; // têm uma referência para a representação do template(html) do componente no DOM permitindo que o desenvolvedor possa fazer pesquisas.
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  /*
    Usamos o fakeAsync para fazer o teste esperar/aguardar 500 milissegundos
    para pode ser executado.
    A função tick só funciona dentro do escopo da função fakeAsync.
  */
  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) once when called
    multiple times within debounce time`, fakeAsync(() => {
      fixture.detectChanges();
      let times = 0;
      component.liked.subscribe(() => times++);
      component.like();
      component.like();
      tick(500); // espera 500 milissegundos
      expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) two times when
    called outside debounce time`, fakeAsync(() => {
      fixture.detectChanges();
      let times = 0;
      component.liked.subscribe(() => times++);
      component.like();
      tick(500);
      component.like();
      tick(500);
      expect(times).toBe(2);
    }));

    /*
    Usamos HTMLElement ao invés de HTMLSpanElement, que seria mais específico porque
    o elemento que queremos pegar é um span, porque ele é mais genérico e caso quiséssemos
    trocar o span por outro elemento html o teste não iria quebrar.
    */
  it(`(D) Should display number of likes when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges(); // chamou pela segunda vez para poder atualizar os componentes do DOM com o novo valor
    const elementLike: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    expect(elementLike.textContent.trim()).toBe('1');
  });

  it(`(D) Should update aria-label when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it(`(D) Should have aria-label with 0 (@Input likes)`, () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it(`(D) Should display image with src and description when bound to properties`, () => {
    const description = 'some description';
    const src = 'http://somesite.com/img.jpg';
    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  });
});

/*
Se quisermos saber o tempo de execução de cada teste, para verificarmos quais estão
demandando bastante tempo de execução, podemos fazer essa verificação através do
JUnit report (que precisa ser instalado como um plugin do karma).

Basta rodar o script 'npm run test-ci' (que já está configurado com o JUnit) e
ter acesso a esse relatório.
*/
