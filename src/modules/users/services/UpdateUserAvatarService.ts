import AppError from '@shared/errors/AppError';
import { User } from '../database/entities/User';
import { usersRepositories } from '../database/repositories/UsersRepositories';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IUpdateUserAvatar {
  userId: number;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(Number(userId));

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      try {

        await fs.promises.stat(userAvatarFilePath);

        await fs.promises.unlink(userAvatarFilePath);
      } catch {

      }
    }

    // Atualiza o usuário com o novo avatar
    user.avatar = avatarFileName;
    await usersRepositories.save(user);

    return user;
  }
}
