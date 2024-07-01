import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { generateParseIntPipe } from 'src/utils';
import { UserInfo } from 'src/custom.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('add')
  async add(
    @Body() createBookingDto: CreateBookingDto,
    @UserInfo('userId') userId: number,
  ) {
    await this.bookingService.add(createBookingDto, userId);
    return 'success';
  }

  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(10),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('username') username: string,
    @Query('meetingRoomName') meetingRoomName: string,
    @Query('meetingRoomPosition') meetingRoomPosition: string,
    @Query('bookingTimeRangeStart') bookingTimeRangeStart: number,
    @Query('bookingTimeRangeEnd') bookingTimeRangeEnd: number,
  ) {
    return this.bookingService.find(
      pageNo,
      pageSize,
      username,
      meetingRoomName,
      meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  @Get('apply/:id')
  async apply(@Param('id') id: number) {
    return this.bookingService.apply(id);
  }

  @Get('reject/:id')
  async reject(@Param('id') id: number) {
    return this.bookingService.reject(id);
  }

  @Get('unbind/:id')
  async unbind(@Param('id') id: number) {
    return this.bookingService.unbind(id);
  }
}
