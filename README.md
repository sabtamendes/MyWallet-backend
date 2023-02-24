## My Wallet :money_with_wings:

<details>
<summary>Documentação do Projeto</summary>

Este é um projeto em Node, Express e MongoDb
</details>


<details>
<summary>Instalação</summary>

Para rodar o projeto, primeiro clone este repositório usando o comando:

```
git clone https://github.com/seu-usuario/nome-do-projeto.git
```
Em seguida, instale as dependências usando o gerenciador de pacotes de sua escolha. Recomendo o uso do npm:
  
```
npm install
```
Crie um arquivo <span style="color: green"> .env </span> na raiz do projeto e defina as seguintes variáveis de ambiente:

      MONGO_URI=<URL_BASE_DA_API>

</details>


<details>
<summary>Utilização</summary>

Para rodar o projeto em um servidor de desenvolvimento, execute o seguinte comando:

```
npm start

npm run dev
```
Isso irá iniciar um servidor de desenvolvimento em **localhost:3000**, onde você pode visualizar a aplicação em seu navegador.
</details>


<details>
<summary>Tecnologias Utilizadas</summary>

- Node.js 14.0.0
- Express 4.18.2
- MongoDB 4.4.10
- Visual Studio Code
- Git e GitHub

</details>

<details>
<summary>Estrutura do Projeto</summary>

A estrutura do projeto é organizada da seguinte maneira:

- `src/`:  contém todo o código-fonte da aplicação.

  - `controllers/`: contém os controladores da aplicação.  
    - `user.controller.js`: controlador para usuários. 

  - `database/`: contém o arquivo de conexão com o banco de dados. 
    - `db.js`: arquivo de conexão com o banco de dados. 

  - `schemas/`: contém os esquemas do banco de dados. 
   - `transactionSchema.js`: esquema para transações financeiras. 
   - `userSchema.js`: esquema para usuários. 
   
  `index.js`: arquivo principal que inicializa a aplicação. 

</details>
