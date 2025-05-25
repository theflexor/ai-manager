import { IsNumber } from 'class-validator';

export class AddMemberDto {
  @IsNumber()
  userId: number; // ID пользователя, которого необходимо добавить
}
