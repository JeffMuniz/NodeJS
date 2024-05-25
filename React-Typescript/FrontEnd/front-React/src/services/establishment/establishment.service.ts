
import {httpClientGet} from '~/clients';

const {REACT_APP_API_DOMAIN} = process.env;

type GetDetailParams = EstablishmentService.GetDetailParams;
type GetDetailDTO = EstablishmentService.GetDetailDTO;
type GetDetailResponse = EstablishmentService.GetDetailResponse;

export const getDetail = async({
  cnpj,
}: GetDetailParams): Promise<GetDetailDTO> => {

  const response = await httpClientGet<GetDetailResponse>({
    url: REACT_APP_API_DOMAIN,
    path: `/clientes/${cnpj}`,
  });

  return null;
};
