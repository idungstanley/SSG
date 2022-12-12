import requestNew from '../../app/requestNew';

export const createWalletService = (data) => {
  const response = requestNew(
    {
      url: 'at/wallets',
      method: 'POST',
      data: {
        name: data.name,
        hub_id: data.hubID,
        parent_id: data.walletId,
      },
    },
    true,
  );
  return response;
};

// get wallets
export const getWalletService = (data) => {
  const parentId = data.queryKey[1][0];
  // const currentHubId = data.queryKey[1][1];
  const response = requestNew(
    {
      url: 'at/wallets',
      method: 'GET',
      data: {
        parent_id: parentId,
        // hub_id: currentHubId,
      },
    },
    true,
  );

  return response;
};
