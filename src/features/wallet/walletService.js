import requestNew from '../../app/requestNew';

export const createWalletService = (data) => {
  const response = requestNew({
    url: 'at/wallets',
    method: 'POST',
    params: {
      name: data.name,
      hub_id: data.hubID,
    },
  }, true);
  return response;
};

// get wallets
export const getWalletService = (data) => {
  const hubID = data.queryKey[1];
  // console.log(hubID);
  const response = requestNew({
    url: 'at/wallets',
    method: 'GET',
    params: {
      hub_id: hubID,
    },
  }, true);

  return response;
};
