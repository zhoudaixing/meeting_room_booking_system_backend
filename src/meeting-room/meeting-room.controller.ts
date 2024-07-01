import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { generateParseIntPipe } from 'src/utils';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MeetingRoomListVo } from './vo/meeting-room-list.vo';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @ApiBearerAuth()
  @ApiQuery({
    name: 'pageNo',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'capacity',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'equipment',
    type: String,
    required: false,
  })
  @ApiResponse({
    type: MeetingRoomListVo,
  })
  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('name') name: string,
    @Query('capacity') capacity: number,
    @Query('equipment') equipment: string,
  ) {
    return await this.meetingRoomService.find(
      pageNo,
      pageSize,
      name,
      capacity,
      equipment,
    );
  }

  @Post('create')
  async create(@Body() createMeetingRoomDto: CreateMeetingRoomDto) {
    return await this.meetingRoomService.create(createMeetingRoomDto);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.meetingRoomService.findById(id);
  }

  @Put('update')
  async update(@Body() updateMeetingRoomDto: UpdateMeetingRoomDto) {
    return await this.meetingRoomService.update(updateMeetingRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.meetingRoomService.remove(+id);
  }
}
