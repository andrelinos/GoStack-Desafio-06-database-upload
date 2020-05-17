import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(transactionId: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne({
      id: transactionId,
    });

    if (!transaction) {
      throw new AppError('No transaction exists with this id');
    }

    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
