import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionMembersService } from './subscription_members.service';
import { AddSubscriptionMemberDto } from './dto/create-subscription_member.dto';
import { UpdateSubscriptionMemberDto } from './dto/update-subscription_member.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { SubscriptionMember } from './entities/subscription_member.entity';
import { RequestWithUser } from 'src/types/request-with-user';
import { RemoveSubscriptionMemberDto } from './dto/remove-subscription_member.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('subscription-members')
@UseGuards(JwtGuard) // Assuming JwtGuard is imported from the correct path
export class SubscriptionMembersController {
  constructor(
    private readonly subscriptionMembersService: SubscriptionMembersService,
  ) {}

  @Post(':subscriptionId/add-member')
  @ApiBody({
    type: AddSubscriptionMemberDto,
  })
  addMember(
    @Param('subscriptionId') subscriptionId: number,
    @Body('userId') userId: number,
  ) {
    return this.subscriptionMembersService.addUserToSubscription(
      subscriptionId,
      userId,
    );
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: [SubscriptionMember] })
  findAll(@Param('id') id: number) {
    return this.subscriptionMembersService.findAll(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subscriptionMembersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSubscriptionMemberDto: UpdateSubscriptionMemberDto,
  // ) {
  //   return this.subscriptionMembersService.update(
  //     +id,
  //     updateSubscriptionMemberDto,
  //   );
  // }

  @Delete(':memberId')
  @ApiBody({
    type: RemoveSubscriptionMemberDto,
  })
  removeMember(
    @Param('memberId') memberId: number,
    @Req() req: RequestWithUser,
  ) {
    console.log(req.session);

    return this.subscriptionMembersService.remove(
      memberId,
      Number(req.session.userId),
    );
  }
}
