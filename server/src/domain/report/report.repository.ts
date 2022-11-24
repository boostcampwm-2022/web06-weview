import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportRepository extends Repository<Report> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }
}
