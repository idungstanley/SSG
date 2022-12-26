import requestNew from '../../app/requestNew';

export const createWalletService = (data: {name: string; hubID: string; walletId: string }) => {
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
export const getWalletService = (data: any) => {
  const parentId = data.queryKey[1][0];
  const response = requestNew(
    {
      url: 'at/wallets',
      method: 'GET',
      data: {
        parent_id: parentId,
      },
    },
    true,
  );

  return response;
};
