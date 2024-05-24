import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';

const mockData = {
  api: 'http://localhost:3000/photos',
  data: [
    {
      id: 1,
      description: 'example 1',
      src: ''
    },
    {
      id: 2,
      description: 'example 2',
      src: ''
    }
  ]
};

describe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService]
    }).compileComponents();

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController); // controla todas as respostas de requisições feitas
  });

  /* verifica se todas as requisições feitas a api tem um
  expectOne com a resposta para elas, pois todas devem ter uma resposta.
  */
  afterEach(() => httpController.verify());

  it(`#${PhotoBoardService.prototype.getPhotos.name} should return
    photos with description in uppercase`, done => {
      service.getPhotos().subscribe(photos => {
        expect(photos[0].description).toBe('EXAMPLE 1');
        expect(photos[1].description).toBe('EXAMPLE 2');
        done();
      });

      httpController
        .expectOne(mockData.api) // faz uma requisição para a api, fazendo o getPhotos ser disparado
        .flush(mockData.data); // e retorna os dados mockados
    });
});

/*
Não é raro de o desenvolvedor aplicar lógicas de transformação diretamente nas
chamadas de instâncias de HttpClient (alteramos o retorno do getPhotos para a
descrição ser maiuscula). Esse é um dos motivos que levam o desenvolvedor a
utilizar o HttpClientTestingController do módulo HttpClientTestingModule para
criar respostas falsas para determinadas APIs. Ele pode fornecer dados
previsíveis tornando possível o teste dessas transformações.
*/
