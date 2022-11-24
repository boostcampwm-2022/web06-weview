import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/access-token.guard';
import {
  ReviewGetAllRequestDto,
  ReviewWriteRequestDto,
} from './dto/controller-request.dto';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('reviews')
  @UseGuards(AccessTokenGuard)
  async write(@Req() req: Request, @Body() requestDto: ReviewWriteRequestDto) {
    const userId = req.user['id'];

    try {
      await this.reviewService.write(userId, requestDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }

    return {
      message: '리뷰 작성에 성공했습니다.',
    };
  }

  @Get('posts/:postId/reviews')
  async getReviewsOfPost(
    @Param('postId') postId: number,
    @Query() requestDto: ReviewGetAllRequestDto,
  ) {
    try {
      return await this.reviewService.getReviewsOfPost(postId, requestDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
