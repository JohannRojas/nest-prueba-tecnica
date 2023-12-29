import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query } from '@nestjs/common'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { ParseMongoIdPipe } from 'src/common/parse-mongo-id/parse-mongo-id.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto)
  }

  @Get(':term')
  @Header('Access-Control-Allow-Origin', '*')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term)
  }

  @Patch(':term')
  @Header('Access-Control-Allow-Origin', '*')
  update(@Param('term') term: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(term, updateUserDto)
  }

  @Delete(':id')
  @Header('Access-Control-Allow-Origin', '*')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.remove(id)
  }
}
