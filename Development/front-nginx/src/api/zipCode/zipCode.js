export const getZipCode = async cep => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    const { status } = response;

    const formattedData = {
      zipcode: data.cep || "",
      address: data.logradouro || "",
      complement: data.complemento || "",
      neighborhood: data.bairro || "",
      city: data.localidade || "",
      state: data.uf || "",
    };

    const invalidZipCode = data.erro || false;

    return { data: formattedData, status, invalidZipCode };
  } catch (err) {
    return {
      data: {
        zipcode: "",
        address: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
      status: 500,
      invalidZipCode: true,
    };
  }
};
