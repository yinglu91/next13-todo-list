import { TodoItem } from "@/components/TodoItem"
import db from "@/lib/prisma-db"
import Link from "next/link"

function getTodos() {
  return db.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await db.todo.update({ where: { id }, data: { complete } })
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  )
}