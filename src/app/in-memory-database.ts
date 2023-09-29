import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'
import { Observable } from 'rxjs'


export class InMemoryDataBase implements InMemoryDbService{
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    const categories = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário'},
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer'}
    ]

    return {categories}
  }

}
