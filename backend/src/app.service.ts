import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { hashMessage } from '@ethersproject/hash';
import { ConfigService } from '@nestjs/config';

import * as tokenJson from './assets/MyToken.json';
import * as ballotJson from './assets/TokenizedBallot.json';

@Injectable()
export class AppService {
  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  ballotContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.wallet,
    );
    this.ballotContract = new ethers.Contract(
      this.configService.get<string>('BALLOT_ADDRESS'),
      ballotJson.abi,
      this.wallet,
    );
  }

  getTokenContractAddress(): string {
    return this.configService.get<string>('TOKEN_ADDRESS');
  }

  getBallotContractAddress(): string {
    return this.configService.get<string>('BALLOT_ADDRESS');
  }

  async mintTokens(signature: string) {
    const message = 'Sign message to get free tokens';
    const signer = ethers.recoverAddress(hashMessage(message), signature);
    const mintTx = await this.contract.mint(
      signer,
      ethers.parseUnits('100000000000000000'),
    );
    return mintTx.hash;
  }

  async getProposals() {
    const rawProposals = await this.ballotContract.getProposals();
    const proposals: string[] = [];
    for (let index = 0; index < rawProposals.length; index++) {
      proposals.push(ethers.decodeBytes32String(rawProposals[index][0]));
    }
    return proposals;
  }
}
