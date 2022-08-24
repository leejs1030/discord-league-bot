import original, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { riotHeaders } from './riot-headers';

const riotAxios = {
  ...original,
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config: AxiosRequestConfig<D> = {},
  ): Promise<R> {
    return original.get(url, { headers: riotHeaders, ...config });
  },
};

export default riotAxios;
