import { databases } from "@/appwrite";

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    // add no array todos que foi criado na linha de cima
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      //   Esta parte é um exemplo de operador spread condicional (...). Se todo.image existir, então incluímos a propriedade image no novo objeto, caso contrário, não a incluímos.
      // JSON.parse(todo.image) é usado para converter a string todo.image em um objeto JavaScript, assumindo que todo.image é uma string JSON. Isso é feito apenas se todo.image existir.
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  // vai basicamente, verificar se cada um dos valores do array não é uma key do Map columns, e se um deles não for, ent criar um o id: [valor do array], e um array vazio.
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  console.log(board);
};
