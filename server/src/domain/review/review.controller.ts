import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { PostNotFoundException } from '../../exception/post-not-found.exception';

@Controller()
@ApiTags('리뷰 API')
@ApiBadRequestResponse({ description: '잘못된 요청입니다' })
@ApiBearerAuth('accessToken')
@ApiUnauthorizedResponse()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * 리뷰를 작성합니다
   */
  @Post('reviews')
  @UseGuards(AccessTokenGuard)
  @ApiCreatedResponse({
    description: '리뷰 작성에 성공했습니다',
  })
  @ApiNotFoundResponse({
    description: '게시물 or 사용자가 존재하지 않습니다',
  })
  async write(@Req() req: Request, @Body() requestDto: ReviewWriteRequestDto) {
    try {
      const userId = req.user['id'];
      await this.reviewService.write(userId, requestDto);

      return { message: '리뷰 작성에 성공했습니다.' };
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof PostNotFoundException) {
        throw new NotFoundException(err.message);
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * 검색조건에 맞는 최신 데이터를 가져옵니다
   */
  @Get('posts/:postId/reviews')
  @ApiOkResponse({ description: '요청에 성공했습니다' })
  async getReviewsOfPost(
    @Param('postId') postId: number,
    @Query() requestDto: ReviewGetAllRequestDto,
  ) {
    try {
      return await this.reviewService.getReviewsOfPost(postId, requestDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
