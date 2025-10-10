import AppError from '@shared/errors/AppError';
import { usersRepositories } from '../database/repositories/UsersRepositories';
import { UserTokensRepositories } from '../database/repositories/UserTokensRepositories';


interface IForgotPassword {
  email: string;
}



export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError('User not exists.', 404);
    }

    const token = await UserTokensRepositories.generate(user.id);

console.log('Token de recuperação criado:');
console.log({
  user_id: user.id,
  token,
  created_at: new Date(),
  updated_at: new Date(),
});
  }
}

