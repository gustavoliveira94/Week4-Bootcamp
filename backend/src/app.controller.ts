import { Controller, Get, Body, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { MintTokenDto } from './dtos/MintToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-contract-address')
  getTokenContractAddress() {
    return { address: this.appService.getTokenContractAddress() };
  }

  @Get('ballot-contract-address')
  getBallotContractAddress() {
    return { address: this.appService.getBallotContractAddress() };
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return { hash: await this.appService.mintTokens(body.signature) };
  }

  @Get('proposals')
  async getProposals() {
    return { proposals: await this.appService.getProposals() };
  }
}
