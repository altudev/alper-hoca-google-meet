import { NextRequest, NextResponse } from 'next/server'
import { todos, getNextTodoId, type Todo } from '@/lib/data/fake-data'

// In-memory storage (resets on server restart)
let todosList = [...todos]

/**
 * GET /api/todos
 * Get all todos or filter by query parameters
 * 
 * Query params:
 * - userId: Filter by user ID
 * - completed: Filter by completion status (true/false)
 * - search: Search in title
 * - limit: Limit number of results
 * - page: Page number for pagination
 * - sort: Sort by field (id, title, createdAt, updatedAt)
 * - order: Sort order (asc, desc)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId')
  const completed = searchParams.get('completed')
  const search = searchParams.get('search')
  const limit = searchParams.get('limit')
  const page = searchParams.get('page')
  const sort = searchParams.get('sort') || 'id'
  const order = searchParams.get('order') || 'asc'

  let filteredTodos = [...todosList]

  // Filter by userId
  if (userId) {
    filteredTodos = filteredTodos.filter(todo => todo.userId === parseInt(userId))
  }

  // Filter by completed status
  if (completed !== null) {
    filteredTodos = filteredTodos.filter(todo => todo.completed === (completed === 'true'))
  }

  // Search functionality
  if (search) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Sorting
  filteredTodos.sort((a, b) => {
    let aValue = a[sort as keyof Todo] as string | number | boolean
    let bValue = b[sort as keyof Todo] as string | number | boolean
    
    if (sort === 'title') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (order === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Pagination
  if (limit && page) {
    const limitNum = parseInt(limit)
    const pageNum = parseInt(page)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    
    return NextResponse.json({
      todos: filteredTodos.slice(startIndex, endIndex),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredTodos.length,
        totalPages: Math.ceil(filteredTodos.length / limitNum)
      }
    })
  }

  // Limit without pagination
  if (limit) {
    filteredTodos = filteredTodos.slice(0, parseInt(limit))
  }

  return NextResponse.json(filteredTodos)
}

/**
 * POST /api/todos
 * Create a new todo
 * 
 * Body: { userId: number, title: string, completed?: boolean }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.userId || !body.title) {
      return NextResponse.json(
        { error: 'userId and title are required' },
        { status: 400 }
      )
    }

    // Create new todo
    const now = new Date().toISOString()
    const newTodo: Todo = {
      id: getNextTodoId(),
      userId: body.userId,
      title: body.title,
      completed: body.completed || false,
      createdAt: now,
      updatedAt: now
    }

    todosList.push(newTodo)

    return NextResponse.json(newTodo, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * DELETE /api/todos
 * Delete all todos or todos for a specific user
 * 
 * Query params:
 * - userId: Delete todos for specific user only
 */
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId')

  if (userId) {
    const userIdNum = parseInt(userId)
    const beforeCount = todosList.length
    todosList = todosList.filter(todo => todo.userId !== userIdNum)
    const deletedCount = beforeCount - todosList.length
    
    return NextResponse.json({ 
      message: `Deleted ${deletedCount} todos for user ${userId}`,
      deletedCount 
    })
  }

  // Reset all todos to initial state
  todosList = [...todos]
  return NextResponse.json({ message: 'All todos reset to initial state' })
}