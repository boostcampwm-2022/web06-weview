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
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ReviewGetAllRequestDto,
  ReviewWriteRequestDto,
} from './dto/controller-request.dto';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('reviews')
  @UseGuards(AuthGuard('jwt'))
  async write(@Req() req: Request, @Body() requestDto: ReviewWriteRequestDto) {
    const userId = req.user['id'];

    try {
      await this.reviewService.write(userId, requestDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('posts/:postId/reviews')
  async getReviewsOfPost(
    @Param('postId') postId: number,
    @Query() requestDto: ReviewGetAllRequestDto,
  ) {
    return await this.reviewService.getReviewsOfPost(postId, requestDto);
  }
}
