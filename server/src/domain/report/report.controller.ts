import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PostAlreadyReportedException } from 'src/exception/post-already-reported.exception';
import { ReportCreateRequestDto } from './dto/controller-request.dto';
import { ReportService } from './report.service';

@Controller('')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post('posts/:postId/report')
  @UseGuards(AuthGuard('jwt'))
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

      throw new BadRequestException(err.message);
    }

    return {
      message: '신고가 접수되었습니다.',
    };
  }
}
