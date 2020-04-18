<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align = "center">
Challenge 06: Database and file upload in Node.js
</h3>

<p align = "center"> "Just wish for things you are willing to fight like"! </blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafios?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafios/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafios?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">About the challenge</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#calendar-entrega">Delivery</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">License</a>
</p>

## :rocket: About the challenge
In this challenge, you must continue to develop the transaction management application, training what you have learned so far in Node.js together with TypeScript, but this time including using a database with TypeORM and sending files with Multer!

This will be an application that should store incoming and outgoing financial transactions and allow the registration and listing of these transactions, in addition to allowing the generation of reports from the sending of a csv file.


Now navigate to the created folder and open it in Visual Studio Code, remember to run the command `yarn` on your terminal to install all dependencies.

### Application routes

Now that you have the template cloned and ready to continue, you should check the files in the `src` folder and complete where there is no code with the code to achieve the objectives of each route.

- **`POST / transactions`**: The route must receive` title`, `value`,` type`, and `category` within the body of the request, with` type` being the type of transaction, which must be 'income' for inflows (deposits) and 'outcome' for outflows (withdrawals). When registering a new transaction, it must be stored within your database, with the fields `id`,` title`, `value`,` type`, `category_id`,` created_at`, `updated_at`.

```json
{
  "id": "uuid",
  "title": "Salary",
  "value": 3000,
  "type": "income",
  "category": "food"
}
```

- **`GET / transactions`**: This route should return a listing with all the transactions that you have registered so far, together with the sum of the entries, withdrawals and total credit. This route must return an object with the following format:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salary",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary"
      }
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others"
      }
    },
    {
      "id": "uuid",
      "title": "Invoice payment",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others"
      }
    },
    {
      "id": "uuid",
      "title": "Gamer Chair",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation"
      }
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- **`DELETE / transactions /: id`**: The route must delete a transaction with the` id` present in the route parameters;

* **`POST / transactions / import`**: The route must allow the import of a file in` .csv` format containing the same information needed to create a transaction `id`,` title`, `value`, `type`,` category_id`, `created_at`,` updated_at`, where each line of the CSV file must be a new record for the database, and finally return all the `transactions` that have been imported into your database . The csv file, must follow the following [model] (./ assets / file.csv)

### Specification of tests

In each test, you have a brief description of what your application must do in order for the test to pass.

For this challenge, we have the following tests:

<h4 align="center">
  ⚠️ Before running the tests, create a database with the name "gostack_desafio06_tests" so that all tests can run correctly⚠️
</h4>

- **`should be able to create a new transaction`**: For this test to pass, your application must allow a transaction to be created, and return a json with the created transaction.

* **`should create tags when inserting new transactions`**: For this test to pass, your application must allow that when creating a new transaction with a category that does not exist, it is created and inserted in the category_id field of the transaction with the `id` just created.

- **`should not create tags when they already exists`**: For this test to pass, your application must allow that when creating a new transaction with a category that already exists, it is assigned to the category_id field of the transaction with the` id `that existing category, not allowing the creation of categories with the same` title`.

* **`should be able to list the transactions`**: For this test to pass, your application must allow an array of objects to be returned containing all transactions along with the balance of income, outcome and total transactions that were created until now.

- **`should not be able to create outcome transaction without a valid balance`**: In order for this test to pass, your application must not allow a transaction of the` outcome` type to exceed the total amount that the user has in cash ( total income), returning a response with HTTP 400 code and an error message in the following format: `{error: string}`.

* **`should be able to delete a transaction`**: In order for this test to pass, you must allow your delete route to delete a transaction, and when doing the deletion, it returns an empty response, with status 204.

- **`should be able to import transactions`**: In order for this test to pass, your application must allow a csv file to be imported, containing the following [model] (./ assets / file.csv). With the imported file, you should allow all records and categories that were present in that file to be created in the database, and return all transactions that were imported.

## :calendar: Delivery

This challenge must be delivered from the Skylab platform, send the link to the repository where you made your changes. After completing the challenge, making a post on Linkedin and posting the code on Github is a good way to demonstrate your knowledge and efforts to evolve your career for future opportunities.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
