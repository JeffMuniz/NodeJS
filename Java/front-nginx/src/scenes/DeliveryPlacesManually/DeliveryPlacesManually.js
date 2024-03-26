import React from "react";
import { bool, func, shape } from "prop-types";

import { Loading } from "@base";
import { FormGroup, Select, TextInput } from "@common";
import { buttonTypes, ufList } from "@enums";
import { If } from "@utils";

import {
  formatPhone,
  toZipCodeMask,
  toOnlyNumbers,
  toOnlyLettersAndNumbers,
  removeSomeCharacters,
} from "@utils/stringHelper";

import {
  AlertText,
  ColWrapper,
  ContainerFlex,
  ContainerCol,
  Form,
  InformationInputText,
  InformationText,
  Separator,
  StyledButton,
  Text,
  LoadingWrapper,
} from "./DeliveryPlacesManually.styles";

const DeliveryPlacesManually = ({
  handleBlur,
  handleChange,
  handleGoBack,
  handleSubmit,
  errors,
  touched,
  values,
  onZipCodeChange,
  disabledInput,
  errorGetZipCode,
  fromApi,
  invalidZipCode,
  handleStateChange,
  loading,
  isNewDeliveryPlace = false,
}) => (
  <Form onSubmit={handleSubmit}>
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <InformationText>*Todos os campos são obrigatórios</InformationText>
      <ContainerFlex margin>
        <ContainerCol>
          <Text>Local de Entrega</Text>
          <ColWrapper width="85%">
            <FormGroup
              fieldId="add_delivery_place_name"
              label="Insira um nome do Local de Entrega"
              error={errors.deliveryName}
              showSuccess={touched.deliveryName && !errors.deliveryName}
            >
              <TextInput
                id="deliveryName"
                name="deliveryName"
                value={toOnlyLettersAndNumbers(values.deliveryName, false)}
                onChange={handleChange}
                maxLength={30}
                maskType="text"
              />
            </FormGroup>
          </ColWrapper>
          <InformationInputText>
            Pode ser composto por letras e números, sem acentos e caracteres
            especiais
          </InformationInputText>
          <ColWrapper width="35%">
            <FormGroup
              fieldId="add_delivery_place_zipcode"
              label="CEP"
              error={errors.zipcode || (invalidZipCode && !errorGetZipCode)}
              showSuccess={touched.zipcode && !errors.zipcode}
            >
              <TextInput
                id="zipcode"
                name="zipcode"
                placeholder="00000-000"
                value={toZipCodeMask(toOnlyNumbers(values.zipcode))}
                onChange={handleChange}
                onBlur={e => onZipCodeChange(e, values)}
                maxLength={9}
                maskType="text"
              />
            </FormGroup>
          </ColWrapper>
          <If
            test={
              values.zipcode &&
              invalidZipCode &&
              !errorGetZipCode &&
              !errors.zipcode
            }
          >
            <AlertText>O CEP informado não existe</AlertText>
          </If>
          <ColWrapper width="85%">
            <FormGroup
              fieldId="add_delivery_place_address"
              label="Endereço"
              error={errors.address}
              showSuccess={touched.address && !errors.address}
              disabled={
                disabledInput ||
                (!disabledInput && fromApi.address !== "") ||
                (invalidZipCode && !errorGetZipCode)
              }
            >
              <TextInput
                id="address"
                name="address"
                value={removeSomeCharacters(values.address, true)}
                onChange={handleChange}
                maxLength={50}
                maskType="text"
              />
            </FormGroup>
          </ColWrapper>
          <ContainerFlex alignItems>
            <ColWrapper width="47%">
              <FormGroup
                fieldId="add_delivery_place_number"
                label="Número"
                error={errors.number}
                showSuccess={touched.number && !errors.number}
                disabled={
                  (disabledInput && isNewDeliveryPlace) ||
                  (invalidZipCode && !errorGetZipCode)
                }
              >
                <TextInput
                  id="number"
                  name="number"
                  onChange={handleChange}
                  // value={toOnlyLettersAndNumbers(values.number, true)}
                  value={toOnlyNumbers(values.number)}
                  onBlur={handleBlur}
                  maskType=""
                  maskChar=""
                  maxLength={10}
                />
              </FormGroup>
            </ColWrapper>
            <ColWrapper width="47%">
              <FormGroup
                fieldId="add_delivery_place_complement"
                label="Complemento (opcional)"
                disabled={
                  (disabledInput && isNewDeliveryPlace) ||
                  (invalidZipCode && !errorGetZipCode)
                }
                error={errors.complement}
                showSuccess={
                  touched.complement && values.complement && !errors.number
                }
              >
                <TextInput
                  id="complement"
                  name="complement"
                  onChange={handleChange}
                  value={toOnlyLettersAndNumbers(values.complement, true)}
                  onBlur={handleBlur}
                  maskType=""
                  maskChar=""
                  maxLength={30}
                />
              </FormGroup>
            </ColWrapper>
          </ContainerFlex>
          <ColWrapper width="60%">
            <FormGroup
              fieldId="add_delivery_place_neighborhood"
              label="Bairro"
              error={errors.neighborhood}
              showSuccess={touched.neighborhood && !errors.neighborhood}
              disabled={
                disabledInput ||
                (!disabledInput && fromApi.neighborhood !== "") ||
                (invalidZipCode && !errorGetZipCode)
              }
            >
              <TextInput
                id="neighborhood"
                name="neighborhood"
                onChange={handleChange}
                value={removeSomeCharacters(values.neighborhood, true)}
                onBlur={handleBlur}
                maxLength={50}
                maskType=""
                maskChar=""
              />
            </FormGroup>
          </ColWrapper>
          <ColWrapper width="60%">
            <FormGroup
              fieldId="add_delivery_place_city"
              label="Cidade"
              error={errors.city}
              showSuccess={touched.city && !errors.city}
              disabled={
                disabledInput ||
                (!disabledInput && fromApi.city !== "") ||
                (invalidZipCode && !errorGetZipCode)
              }
            >
              <TextInput
                id="city"
                name="city"
                onChange={handleChange}
                value={removeSomeCharacters(values.city, false)}
                onBlur={handleBlur}
                maxLength={50}
                maskType=""
                maskChar=""
              />
            </FormGroup>
          </ColWrapper>
          <ColWrapper width="60%">
            <FormGroup
              fieldId="add_delivery_place_state"
              label="Estado"
              error={errors.state}
              showSuccess={touched.state && !errors.state}
              disabled={
                disabledInput ||
                (!disabledInput && fromApi.state !== "") ||
                (invalidZipCode && !errorGetZipCode)
              }
            >
              <Select
                id="select_delivery_place_state_id"
                placeholder=""
                value={values.state}
                values={ufList}
                onValueChange={e => {
                  handleStateChange(e, values);
                  handleChange(e);
                }}
                maxMenuHeight="130px"
                isPassingSelectedItem
                isDisabled={
                  disabledInput ||
                  (!disabledInput && fromApi.state !== "") ||
                  (invalidZipCode && !errorGetZipCode)
                }
                isCapitalized
              />
            </FormGroup>
          </ColWrapper>
        </ContainerCol>
        <ContainerCol>
          <Text>Responsável 1</Text>
          <ColWrapper width="93%">
            <FormGroup
              fieldId="add_delivery_place_first_person_name"
              label="Nome Completo"
              error={errors.firstPersonName}
              showSuccess={touched.firstPersonName && !errors.firstPersonName}
            >
              <TextInput
                id="firstPersonName"
                name="firstPersonName"
                value={removeSomeCharacters(values.firstPersonName, false)}
                onChange={handleChange}
                maxLength={50}
                maskType="text"
              />
            </FormGroup>
          </ColWrapper>
          <InformationInputText>
            Pessoa responsável pelo recebimento dos cartões na empresa
          </InformationInputText>
          <ColWrapper width="60%">
            <FormGroup
              fieldId="add_delivery_place_first_rg"
              label="RG (documento de identificação)"
              error={errors.firstRg}
              showSuccess={touched.firstRg && !errors.firstRg}
            >
              <TextInput
                id="firstRg"
                name="firstRg"
                value={toOnlyNumbers(values.firstRg)}
                onChange={handleChange}
                maxLength={14}
                maskType="text"
              />
            </FormGroup>
          </ColWrapper>
          <InformationInputText>
            Sem pontos, espaços e traços
          </InformationInputText>
          <ColWrapper width="60%">
            <FormGroup
              fieldId="add_delivery_place_first_phone"
              label="Telefone"
              error={errors.firstPhone}
              showSuccess={touched.firstPhone && !errors.firstPhone}
            >
              <TextInput
                id="firstPhone"
                name="firstPhone"
                onChange={handleChange}
                value={formatPhone(values.firstPhone)}
                onBlur={handleBlur}
                maxLength={15}
                maskType=""
                maskChar=""
              />
            </FormGroup>
          </ColWrapper>
          <Separator marginTop="10px" marginBottom="20px" />
          <Text>Responsável 2</Text>
          <ColWrapper width="93%">
            <FormGroup
              fieldId="add_delivery_place_second_person_name"
              label="Nome Completo"
              error={errors.secondPersonName}
              showSuccess={touched.secondPersonName && !errors.secondPersonName}
            >
              <TextInput
                id="secondPersonName"
                name="secondPersonName"
                value={removeSomeCharacters(values.secondPersonName, false)}
                onChange={handleChange}
                maxLength={50}
                maskType="text"
              />
            </FormGroup>
          </ColWrapper>
          <InformationInputText>
            Pessoa responsável pelo recebimento dos cartões na empresa
          </InformationInputText>
          <ColWrapper width="60%">
            <FormGroup
              fieldId="add_delivery_place_second_rg"
              label="RG (documento de identificação)"
              error={errors.secondRg}
              showSuccess={touched.secondRg && !errors.secondRg}
            >
              <TextInput
                id="secondRg"
                name="secondRg"
                value={toOnlyNumbers(values.secondRg)}
                onChange={handleChange}
                maxLength={14}
                maskType="text"
              />
            </FormGroup>
          </ColWrapper>
          <InformationInputText>
            Sem pontos, espaços e traços
          </InformationInputText>
          <ColWrapper width="60%">
            <FormGroup
              fieldId="add_delivery_place_second_phone"
              label="Telefone"
              error={errors.secondPhone}
              showSuccess={touched.secondPhone && !errors.secondPhone}
            >
              <TextInput
                id="secondPhone"
                name="secondPhone"
                onChange={handleChange}
                value={formatPhone(values.secondPhone)}
                onBlur={handleBlur}
                maxLength={15}
                maskType=""
                maskChar=""
              />
            </FormGroup>
          </ColWrapper>
        </ContainerCol>
      </ContainerFlex>
      <ContainerFlex justifyContent="center">
        <StyledButton
          id="btn_delivery_place_new_back"
          buttonType={buttonTypes.light}
          type="button"
          value="cancelar"
          onClick={handleGoBack}
          marginRight
        />
        <StyledButton
          id="btn_delivery_place_new_submit"
          buttonType={buttonTypes.primary}
          type="submit"
          value="salvar"
        />
      </ContainerFlex>
    </If>
  </Form>
);

DeliveryPlacesManually.propTypes = {
  handleGoBack: func.isRequired,
  handleBlur: func.isRequired,
  handleChange: func.isRequired,
  handleSubmit: func.isRequired,
  errors: shape({}).isRequired,
  touched: shape({}).isRequired,
  values: shape({}).isRequired,
  onZipCodeChange: func.isRequired,
  disabledInput: bool.isRequired,
  errorGetZipCode: bool.isRequired,
  fromApi: shape({}).isRequired,
  invalidZipCode: bool.isRequired,
  handleStateChange: func.isRequired,
  loading: bool.isRequired,
  isNewDeliveryPlace: bool,
};

DeliveryPlacesManually.defaultProps = {
  isNewDeliveryPlace: false,
};

export default DeliveryPlacesManually;
