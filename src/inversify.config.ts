import {Container} from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';

import TYPES from './type';
import { CustomerRepository } from './repository/customer-repository';
import { ICustomerRepository } from './repository/Interface/ICustomerRepository';

const container = new Container();

container.bind<ICustomerRepository>(TYPES.CustomerRepository ).to(CustomerRepository).inSingletonScope();

export default container;