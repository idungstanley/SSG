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
