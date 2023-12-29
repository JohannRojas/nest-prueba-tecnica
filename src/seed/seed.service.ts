import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class SeedService {

  private demoUsers: CreateUserDto[] = [
    {
      no: 1,
      name: 'John Doe',
      birthday: new Date('1990-01-01'),
      gender: 'male'
    },
    {
      no: 2,
      name: 'Jane Doe',
      birthday: new Date('2000-01-01'),
      gender: 'female'
    }
  ]

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }

  async executeSeed() {
    await this.userModel.deleteMany({})
    await this.userModel.insertMany(this.demoUsers)
    return 'Seed completed'
  }
}
