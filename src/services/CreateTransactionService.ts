import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionRepository.getBalance();

    const ifHaveMoney =
      type === 'income' || (type === 'outcome' && total > value);

    if (!ifHaveMoney) {
      throw new AppError('Insufficient funds', 400);
    }

    let checkIfCategoryExist = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!checkIfCategoryExist) {
      checkIfCategoryExist = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(checkIfCategoryExist);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: checkIfCategoryExist,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
