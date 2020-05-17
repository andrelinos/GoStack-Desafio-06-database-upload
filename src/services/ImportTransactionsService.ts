import csvToJson from 'csvtojson';
import Transaction from '../models/Transaction';
// import AppError from '../errors/AppError';
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(transactionsFilePath: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();
    const csvData = await csvToJson().fromFile(transactionsFilePath);
    const transactions: Transaction[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const transaction of csvData) {
      // eslint-disable-next-line no-await-in-loop
      transactions.push(await createTransaction.execute(transaction));
    }
    return transactions;
  }
}

export default ImportTransactionsService;
