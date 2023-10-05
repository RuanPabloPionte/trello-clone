type Board = {
  columns: Map<TypedColoumn, Column>;
};

type TypedColumn = "todo" | "inprogress" | "done";

type Column = {
  id: TypedColumn;
  todos: Todo[];
};

type Todo = {
  // atributos com $ são orinundos do appwrite
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: Image;
};

type Image = {
  bucketId: string;
  fileId: string;
};

/*
Exemplo de uso
// Criando instância do tipo Board
const board: Board = {
  columns: new Map([
    ["todo", { id: "todo", todos: [] }],
    ["inprogress", { id: "inprogress", todos: [] }],
    ["done", { id: "done", todos: [] }],
  ]),
};

// Adicionando uma tarefa na coluna "todo"
const todoTask: Todo = {
  $id: "1",
  $created: "2023-10-02",
  title: "Fazer compras",
  status: "todo",
};

board.columns.get("todo")?.todos.push(todoTask);

// Acessando uma coluna
const todoColumn = board.columns.get("todo");
if (todoColumn) {
  console.log(todoColumn.todos); // Array de tarefas na coluna "todo"
}

// Iterando sobre as colunas
for (const [columnId, column] of board.columns) {
  console.log(`Coluna ${columnId}: ${column.todos.length} tarefas`);
}
*/
