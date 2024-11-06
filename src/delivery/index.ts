import { AxiosInstance } from './connector';
import Actions from './actions';

class AppCore {
  connector = AxiosInstance;
  Actions = Actions;
}

export default new AppCore();
