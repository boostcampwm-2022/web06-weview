import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PostAlreadyReportedException } from 'src/exception/post-already-reported.exception';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { ReportCreateRequestDto } from './dto/controller-request.dto';
import { ReportService } from './report.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { PostNotFoundException } from '../../exception/post-not-found.exception';

@Controller()
@ApiTags('신고 API')
@ApiBearerAuth('access-token')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post('posts/:postId/report')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: '게시물 신고',
    description: 'postId 게시물을 신고합니다',
  })
  @ApiCreatedResponse({
    description: '신고에 성공',
  })
  @ApiNotFoundResponse({ description: '게시물 or 유저가 없습니다' })
  @ApiConflictResponse({
    description: '이미 해당 게시물에 신고가 이뤄진 상황',
  })
  async create(
    @Req() req: Request,
    @Param('postId') postId: number,
    @Body() requestDto: ReportCreateRequestDto,
  ) {
    const userId = req.user['id'];

    try {
      await this.reportService.report(userId, postId, requestDto);
    } catch (err) {
      if (err instanceof PostAlreadyReportedException) {
        throw new ConflictException(err.message);
      }
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof PostNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }

    return {
      message: '신고가 접수되었습니다.',
    };
  }
}
