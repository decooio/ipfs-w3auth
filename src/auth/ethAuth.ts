import {AuthData} from './types';
import * as _ from 'lodash';
import {ethers} from 'ethers';

function auth(data: AuthData): boolean {
  const {address, signature} = data;

  console.log('Validate as ethereum signature.');
  const signatureWithPrefix = _.startsWith(signature, '0x')
    ? signature
    : `0x${signature}`;
  return (
    compareAddresses(
      address,
      recoverMyEtherWalletSignature(address, signatureWithPrefix)
    ) ||
    compareAddresses(
      address,
      recoverMyCryptoSignature(address, signatureWithPrefix)
    )
  );
}

function recoverMyEtherWalletSignature(
  address: string,
  signature: string
): string {
  const hashBytes = ethers.utils.arrayify(address);
  const messageHash = ethers.utils.hashMessage(hashBytes);
  const messageHashBytes = ethers.utils.arrayify(messageHash);
  const publicKey = ethers.utils.recoverPublicKey(messageHashBytes, signature);
  return ethers.utils.computeAddress(publicKey);
}

function recoverMyCryptoSignature(address: string, signature: string): string {
  return ethers.utils.verifyMessage(address, signature);
}

function compareAddresses(address: string, recoverAddress: string): boolean {
  return _.toLower(_.trim(recoverAddress)) === _.toLower(_.trim(address));
}

export default {
  auth,
};
