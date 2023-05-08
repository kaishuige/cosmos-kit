import { hasRequiredKeyType, isArray } from '@cosmos-kit/core';
import { SignAndBroadcastOptionsMap, SignAndBroadcastParams } from '../types';
import { SignParamsValidator } from './sign';

export const SignAndBroadcastParamsValidator = {
  Ethereum: {
    isTransaction(
      params: unknown,
      options?: SignAndBroadcastOptionsMap
    ): params is SignAndBroadcastParams.Stella.XDR {
      return SignParamsValidator.Ethereum.isTransaction(params);
    },
  },
  Everscale: {
    isMessage(
      params: unknown,
      options?: SignAndBroadcastOptionsMap
    ): params is SignAndBroadcastParams.Stella.XDR {
      return SignParamsValidator.Everscale.isMessage(params);
    },
  },
  Stella: {
    isXDR(
      params: unknown,
      options?: SignAndBroadcastOptionsMap
    ): params is SignAndBroadcastParams.Stella.XDR {
      return hasRequiredKeyType(params, { xdr: 'string' });
    },
  },
  Tezos: {
    isSend(
      params: unknown,
      options?: SignAndBroadcastOptionsMap
    ): params is SignAndBroadcastParams.Tezos.Send {
      return (
        hasRequiredKeyType(params, { account: 'string' }) &&
        isArray(params['operations'], {
          kind: 'string',
          destination: 'string',
          amount: 'string',
        })
      );
    },
  },
  XRPL: {
    isTransaction(
      params: unknown,
      options?: SignAndBroadcastOptionsMap
    ): params is SignAndBroadcastParams.XRPL.Transaction {
      const submit =
        params['submit'] === true || typeof params['submit'] === 'undefined';
      return (
        submit &&
        hasRequiredKeyType(params['tx_json'], {
          Account: 'string',
          TransactionType: 'string',
        })
      );
    },
    isTransactionFor(
      params: unknown,
      options?: SignAndBroadcastOptionsMap
    ): params is SignAndBroadcastParams.XRPL.TransactionFor {
      const submit = params['submit'] === true;
      return (
        submit &&
        hasRequiredKeyType(params, { tx_signer: 'string' }) &&
        hasRequiredKeyType(params['tx_json'], {
          Account: 'string',
          TransactionType: 'string',
        })
      );
    },
  },
};
