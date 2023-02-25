# My Wallet :money_with_wings:

### 📄👀 Documentação do Projeto

Esta é a implementação Back-end (API) do My Wallet, uma aplicação mobile que simula um gerenciador de gastos, onde pode ser inserido os ganhos e gastos do usuário.

<details>
  <summary><strong>Instalação</strong></summary>

  ## 🛠️💻 Instalação 
Para rodar o projeto, primeiro clone este repositório usando o comando:

``` bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
```
Em seguida, instale as dependências usando o gerenciador de pacotes de sua escolha. Recomendo o uso do npm:
  
``` bash
npm install
```
Crie um arquivo <span style="color: green"> .env </span> na raiz do projeto e defina as seguintes variáveis de ambiente:
``` env
 MONGO_URI=<URL_BASE_DA_API>
``` 
</details>


<details>
<summary><strong>Utilização</strong></summary>
  
 ## 🚀💡 Utilização
  
Para rodar o projeto em um servidor de desenvolvimento, execute o seguinte comando:

``` bash
npm start

npm run dev
```
Isso irá iniciar um servidor de desenvolvimento em **localhost:3000**, onde você pode visualizar a aplicação em seu navegador.
</details>


<details>
  <summary><strong>Tecnologias Utilizadas</strong></summary>
   
  ## 🔧📦 Tecnologias
  
- Node.js 14.0.0
- Express 4.18.2
- MongoDB 4.4.10
- Visual Studio Code
- Git e GitHub

  O projeto foi desenvolvido em Node, Express e MongoDB. Para o desenvolvimento, utilizei o Visual Studio Code como IDE e o Git para controle de versão e o GitHub como repositório remoto.

Links úteis:
- [Visual Studio Code](https://code.visualstudio.com/docs)
- [Git](https://git-scm.com/doc)
- [GitHub](https://docs.github.com/) 
</details>

<details>
  <summary><strong>Estrutura do Projeto</strong></summary>

## 🌳📂 A estrutura do projeto é organizada da seguinte maneira:
```bash
- `src/`:  contém todo o código-fonte da aplicação.

  - `controllers/`: contém os controladores da aplicação.  
    - `user.controller.js`: controlador para usuários. 

  - `database/`: contém o arquivo de conexão com o banco de dados. 
    - `db.js`: arquivo de conexão com o banco de dados. 

  - `schemas/`: contém os esquemas banco de dados. 
   - `transactionSchema.js`: esquema para transações financeiras. 
   - `userSchema.js`: esquema para usuários. 
   
  `index.js`: arquivo principal que inicializa a aplicação. 
``` 
</details>

  
<details>
  <summary><strong>API - Endpoints</strong></summary>

   ### 📋 Segue abaixo o resumo dos endpoints do projeto MyWallet:

   - `POST /debit`: Cria uma nova transação de débito na conta do usuário.
   - `POST /credit`: Cria uma nova transação de crédito na conta do usuário.
   - `GET /transactions`: Retorna todas as transações realizadas pelo usuário.

   ##  💻🔍 Exemplo de Uso com Endpoints detalhado:
  <details>
    <summary><strong>endpoint postSignUp</strong></summary>

### Este exemplo mostra como enviar uma solicitação POST para o endpoint **postSignUp** para criar uma nova conta de usuário.
    
#### Requisição

```javascript
POST /api/sign-up

{
    "name": "João Silva",
    "email": "joao.silva@gmail.com",
    "password": "senha123",
    "confirmPassword": "senha123"
}
``` 

#### Resposta

Se a solicitação for bem-sucedida, a resposta terá o código de status **201 Created**.

Se o endereço de e-mail fornecido já estiver em uso, a resposta terá o código de status **409 Conflict** e a mensagem de erro **"Email já está em uso"**.

```json
HTTP/1.1 409 Conflict

{
  "message": "Email já está em uso!"
}

``` 
    
Se os dados da solicitação não estiverem no formato correto, a resposta terá o código de status **401 Unauthorized** e uma lista de erros no formato JSON.


``` json
 HTTP/1.1 401 Unauthorized
{
    "errors": [
        "O nome é obrigatório.",
        "O endereço de e-mail deve ser válido.",
        "A senha deve ter pelo menos 8 caracteres.",
        "As senhas não coincidem."
    ]
}

```
 </details>
  
  <details>
    <summary><strong>endpoint postSignIn</strong></summary>

### Este exemplo mostra como enviar uma solicitação POST para o endpoint postSignIn para autenticar um usuário existente.

#### Requisição

```javascript

POST /api/sign-in

{
    "email": "joao.silva@gmail.com",
    "password": "senha123"
}
``` 
#### Resposta

Se a solicitação for bem-sucedida, a resposta terá o código de status **201 Created** e um objeto JSON com o **nome do usuário** e o **token de autenticação**.

```json
{
    "name": "João Silva",
    "token": "f87c5453-14b3-43d3-8fb1-739b4385c287"
}
```
    
Se os dados da solicitação não estiverem no formato correto, a resposta terá o código de status **401 Unauthorized** e uma lista de erros no formato JSON.

    
```json
HTTP/1.1 401 Unauthorized
{
    "errors": [
        "O endereço de e-mail deve ser válido.",
        "A senha deve ter pelo menos 8 caracteres."
    ]
}
```
Se o endereço de e-mail fornecido não estiver associado a nenhuma conta de usuário, a resposta terá o código de status **401 Unauthorized** e a mensagem de erro **"Usuário não existe"**.

```json
HTTP/1.1 401 Unauthorized
{
    "message": "Usuário não existe"
}
``` 
Se a senha fornecida estiver incorreta, a resposta terá o código de status **401 Unauthorized**.

Se a conta já estiver logada em outra sessão, a resposta terá o código de status **401 Unauthorized** e a mensagem de erro **"Sua conta já está logada, tente novamente!"**.
    
Se os dados da solicitação não estiverem no formato correto, a resposta terá o código de status **401 Unauthorized** e uma lista de erros no formato JSON.

```json
HTTP/1.1 401 Unauthorized
{
    "errors": [
        "O endereço de e-mail deve ser válido.",
        "A senha deve ter pelo menos 6 caracteres."
    ]
}
```
  </details>
  
  
  
  <details>
    <summary><strong>endpoint deleteSignOut</strong></summary>

### Este endpoint é utilizado para efetuar o logout do usuário e encerrar a sessão.

#### Requisição:

```javascript
DELETE /api/sign-out
    
Authorization: Bearer { token }
``` 
#### Resposta:

Se a solicitação for bem-sucedida, a resposta terá o código de status **200 OK**.

Se o token de autorização não for válido, a resposta terá o código de status **401 Unauthorized**.

```json

HTTP/1.1 401 Unauthorized
``` 
Se ocorrer um erro durante o processo de logout, a resposta terá o código de status **500 Internal Server Error**.

```json
HTTP/1.1 500 Internal Server Error
``` 
  </details>
  
  <details>
    <summary><strong>endpoint getTransactions</strong></summary>

### Este exemplo mostra como enviar uma solicitação GET para o endpoint getTransactions para obter todas as transações de um usuário.

#### Requisição

```javascript

GET /api/transactions
Authorization: Bearer <token>
``` 
#### Resposta

Se a solicitação for bem-sucedida, a resposta terá o código de status **200 OK** e uma lista de todas as transações do usuário no formato JSON.

```json

[
  {
    "_id": "617a8d1edc09f2486b9e6c30",
    "token":"1d8b068b-1e9c-4bbe-9cb7-78c4941c8188",
    "type": "credit",
    "value": 1000,
    "userId": "617a88d9dc09f2486b9e6c2f",
    "description": "Depósito",
    "date": "2021-10-28T20:51:50.191Z"
  },
  {
    "_id": "617a8d1edc09f2486b9e6c31",
    "token":"1d8b068b-1e9c-4bbe-9cb7-78c4941c8188",
    "type": "debit",
    "value": 500,
    "userId": "617a88d9dc09f2486b9e6c2f",
    "description": "Saque",
    "date": "2021-10-28T20:51:50.191Z"
  }
]
``` 
Se o token de autorização não for fornecido, a resposta terá o código de status **401 Unauthorized**.
```json
HTTP/1.1 401 Unauthorized
```
Se ocorrer um erro no servidor, a resposta terá o código de status **500 Internal Server Error**.

```json

HTTP/1.1 500 Internal Server Error
``` 
  </details>
  
  <details>
    <summary><strong>endpoint postCreditTransactions</strong></summary>

### Este exemplo mostra como enviar uma solicitação POST para o endpoint postCreditTransactions para adicionar uma nova transação de crédito na conta do usuário.

#### Requisição

```javascript

POST /api/credit

{
    "value": 50.00,
    "description": "Depósito em dinheiro",
    "type": "credit"
}
``` 
#### Resposta

Se a solicitação for bem-sucedida, a resposta terá o código de status **201 Created**.

Se os dados da solicitação não estiverem no formato correto, a resposta terá o código de status **401 Unauthorized** e uma lista de erros no formato JSON.

```json

{
    "errors": [
        "O valor é obrigatório.",
        "A descrição é obrigatória.",
        "O tipo de transação é obrigatório."
    ]
}
``` 
Se o token de autorização não for enviado ou for inválido, a resposta terá o código de status **401 Unauthorized**.

```json
HTTP/1.1 401 Unauthorized
```  

Se ocorrer algum erro no servidor, a resposta terá o código de status 500 Internal Server Error.
```json
HTTP/1.1 500 Internal Server Error
``` 
  </details>
 
    
  <details>
    <summary><strong>endpoint postDebitTransactions</strong></summary>

### Este exemplo mostra como enviar uma solicitação POST para o endpoint postCreditTransactions para adicionar uma nova transação de crédito na conta do usuário.

#### Requisição

```javascript

POST /api/debit

{
    "value": 50.00,
    "description": "Retirada em dinheiro",
    "type": "debit"
}
``` 
#### Resposta

Se a solicitação for bem-sucedida, a resposta terá o código de status **201 Created**.

Se os dados da solicitação não estiverem no formato correto, a resposta terá o código de status **401 Unauthorized** e uma lista de erros no formato JSON.

```json

{
    "errors": [
        "O valor é obrigatório.",
        "A descrição é obrigatória.",
        "O tipo de transação é obrigatório."
    ]
}
``` 
Se o token de autorização não for enviado ou for inválido, a resposta terá o código de status **401 Unauthorized**.

```json
HTTP/1.1 401 Unauthorized
```  

Se ocorrer algum erro no servidor, a resposta terá o código de status 500 Internal Server Error.
```json
HTTP/1.1 500 Internal Server Error
``` 
</details>
  
 </details>
