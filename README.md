# Last.fm Mini Dashboard

## 🎧 Sobre o Projeto 

Este é um projeto acadêmico desenvolvido para a matéria de **Programação Web Fullstack**.

O **Last.fm Mini Dashboard** é uma aplicação web construída em React que permite aos usuários visualizar de forma rápida e simples as estatísticas de qualquer perfil da plataforma [Last.fm](https://www.last.fm). Basta inserir um nome de usuário para obter informações sobre o perfil, a música mais recente ouvida (scrobble) e o top 5 artistas mais escutados.

A interface foi construída com Material-UI (MUI), seguindo um design moderno e responsivo, com um tema escuro que destaca as informações e as imagens dos artistas e álbuns.

---

## 💿 Funcionalidades 

- **Busca de Usuário**: Formulário simples e intuitivo para buscar qualquer usuário do Last.fm.
- **Perfil do Usuário**: Exibe o nome real, nome de usuário, avatar e o número total de scrobbles.
- **Última Música Ouvida**: Mostra a faixa mais recente, incluindo o nome da música, artista, e a arte do álbum. Indica se a música está "Tocando agora".
- **Top 5 Artistas**: Apresenta uma lista com os 5 artistas mais ouvidos pelo usuário, com a contagem de plays para cada um.
- **Histórico de Buscas**: Salva as últimas 10 buscas no `localStorage` para fácil referência, indicando se a busca foi bem-sucedida ou não.
- **Design Responsivo**: A interface se adapta a diferentes tamanhos de tela.
- **Feedback Visual**: Componentes de carregamento (loading) e mensagens de erro claras para o usuário.

---

## ⚙️ Como Executar o Projeto 

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/nathaliamiyuki/Projeto1-FullStack.git](https://github.com/nathaliamiyuki/Projeto1-FullStack.git)
    cd Projeto1-FullStack
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Abra no navegador:**
    Acesse [http://localhost:5173](http://localhost:5173) (ou a porta que seu terminal indicar) para ver a aplicação em funcionamento.

    ### Conta Teste 𝄞𝄢
-  Para facilitar a demonstração e os testes, você pode usar o seguinte nome de usuário que foi criado para este propósito: userTeste (ou se preferir a sua própria conta).


