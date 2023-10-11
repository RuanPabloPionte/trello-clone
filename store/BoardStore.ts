import { ID, databases, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import upLoadImage from "@/lib/upLoadImage";
import { create } from "zustand";

type BoardStore = {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;

  newTaskInput: string;
  setNewTaskInput: (input: string) => void;

  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;

  image: File | null;
  setImage: (image: File | null) => void;

  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },

  // search part
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo: Todo, columnId: TypedColumn) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),

  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image: File | null) => set({ image }),

  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    if (image) {
      const fileUpLoaded = await upLoadImage(image);
      if (fileUpLoaded) {
        file = {
          bucketId: fileUpLoaded.bucketId,
          fileId: fileUpLoaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        // add image se ela existir
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ newTaskInput: "" });

    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        // atributos com $ são orinundos do appwrite
        $id,
        $createdAt: new Date().toDateString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));
