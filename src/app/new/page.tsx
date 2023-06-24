import { redirect } from 'next/navigation';
import Link from 'next/link';
import db from '@/lib/prisma-db';
import { revalidatePath } from 'next/cache'

async function createTodo(data: FormData) {
  'use server';

  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid Title');
  }

  await db.todo.create({ data: { title, complete: false } });

  revalidatePath("/")  // marks that / path needs to be revalidated

  redirect('/');
}

const NewTodo = () => {
  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl'>New</h1>
      </header>
      <form action={createTodo} className='flex gap-2 flex-col'>
        <input
          type='text'
          name='title'
          className='border border-slate-300  rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <div className='flex gap-1 justify-end'>
          <Link
            href='..'
            className='border border-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 focus-within:bg-slate-100 outline-none'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='border border-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 focus-within:bg-slate-700 outline-none'
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTodo;
