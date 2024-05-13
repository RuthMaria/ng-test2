import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {

  let service: UniqueIdService = null;
/*
  Tudo o que estiver dentro do 'beforeEach' será executado antes da chamada de cada 'it'.
  Cada 'it' terá suas próprias instâncias para que o resultado de um teste não interfira no
  resultado do outro.
  */
  beforeEach(() => {
    service = new UniqueIdService();
  });

  // pega o nome da função testada
  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}
    should return the number of generatedIds when called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should not generate duplicate IDs when called multiple times`, () => {
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });

  /*
   Nas exceções temos que embrulhar a chamada do método em uma função:
   expect(() => service.generateUniqueIdWithPrefix(emptyValue))

   withContext serve para adicionar contexto para nossa expectativa(expect) e assim
   sabermos em que ponto o texto falhou.
   */
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should throw when called with empty`, () => {
      const emptyValues = [null, undefined, '', '0', '1'];
      emptyValues.forEach(emptyValue => {
        expect(() => service.generateUniqueIdWithPrefix(emptyValue))
          .withContext(`Empty value: ${emptyValue}`)
          .toThrow();
      });
    });
});

 /*
  expect(true).toBeTrue(); // só funciona com tipos 'true' ou 'false' literais, os tipos primitivos
  expect(true).toBe(true); // compara dois valores iguais: primitivo com primitivo, instância com instância
  expect(true).toBeTruthy(); // funciona com os valores verdadeiros de javascript

  Jasmine para escrever os testes e Karma para rodar
  A estrutura de escrita deve ser:

  should ... when ...
  Alguma coisa SHOULD(deve) fazer algo WHEN(quando) essa condição estiver presente

  */
