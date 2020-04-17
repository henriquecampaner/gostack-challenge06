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

    if (
      type === 'outcome' &&
      (await transactionRepository.getBalance()).total < value
    ) {
      throw new AppError(
        "You don't have enough money to make this transaction",
      );
    }

    const categoryTitileToLowerCase = category.toLowerCase();

    let checkIfCategoryExist = await categoryRepository.findOne({
      where: { title: categoryTitileToLowerCase },
    });

    if (!checkIfCategoryExist) {
      checkIfCategoryExist = categoryRepository.create({
        title: categoryTitileToLowerCase,
      });
      await categoryRepository.save(checkIfCategoryExist);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: checkIfCategoryExist,
    });

    transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
