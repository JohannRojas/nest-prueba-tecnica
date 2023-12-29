import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, isValidObjectId } from 'mongoose'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.name = createUserDto.name.toLowerCase()

    try {
      const user = await this.userModel.create(createUserDto)
      return user
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    return this.userModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
  }

  async findOne(term: string) {
    let user: User

    if (!isNaN(+term)) {
      user = await this.userModel.findOne({ no: term })
    }
    if (isValidObjectId(term)) {
      user = await this.userModel.findById(term)
    }

    if (!user) {
      user = await this.userModel.findOne({ name: term.toLowerCase() })
    }

    if (!user) throw new NotFoundException(`User with Id ${term} not found`)



    return user
  }

  async update(term: string, updateUserDto: UpdateUserDto) {

    const user = await this.findOne(term)

    if (updateUserDto.name) updateUserDto.name = updateUserDto.name.toLowerCase()

    try {
      await user.updateOne(updateUserDto)
      return { ...user.toJSON(), ...updateUserDto }

    } catch (error) {
      this.handleExceptions(error)
    }

  }

  async remove(id: string) {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id })

    if (deletedCount === 0) {
      throw new BadRequestException('User not found')
    }

    return
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('User already exists')
    }
    throw new InternalServerErrorException('Error creating user')
  }
}
