import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ReviewWriteRequestDto } from './dto/controller-request.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async write(@Req() req: Request, @Body() requestDto: ReviewWriteRequestDto) {
    const userId = req.user['id'];

    try {
      await this.reviewService.write(userId, requestDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
