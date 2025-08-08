import { NextRequest, NextResponse } from 'next/server'
import { todos, type Todo } from '@/lib/data/fake-data'

// In-memory storage (shared with main route)
const todosList = [...todos]

/**
 * GET /api/todos/[id]
 * Get a single todo by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = parseInt(params.id)
  const todo = todosList.find(t => t.id === todoId)

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(todo)
}

/**
 * PUT /api/todos/[id]
 * Update a todo by ID (complete replacement)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const todoId = parseInt(params.id)
    const todoIndex = todosList.findIndex(t => t.id === todoId)

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.userId || !body.title) {
      return NextResponse.json(
        { error: 'userId and title are required' },
        { status: 400 }
      )
    }

    // Update todo while preserving ID and createdAt
    const updatedTodo: Todo = {
      id: todoId,
      userId: body.userId,
      title: body.title,
      completed: body.completed || false,
      createdAt: todosList[todoIndex].createdAt,
      updatedAt: new Date().toISOString()
    }

    todosList[todoIndex] = updatedTodo

    return NextResponse.json(updatedTodo)
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * PATCH /api/todos/[id]
 * Partially update a todo by ID
 * Common use case: Toggle completed status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const todoId = parseInt(params.id)
    const todoIndex = todosList.findIndex(t => t.id === todoId)

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // Partial update - merge with existing data
    todosList[todoIndex] = {
      ...todosList[todoIndex],
      ...body,
      id: todoId, // Ensure ID doesn't change
      createdAt: todosList[todoIndex].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(todosList[todoIndex])
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * DELETE /api/todos/[id]
 * Delete a todo by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = parseInt(params.id)
  const todoIndex = todosList.findIndex(t => t.id === todoId)

  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    )
  }

  const deletedTodo = todosList[todoIndex]
  todosList.splice(todoIndex, 1)

  return NextResponse.json({
    message: 'Todo deleted successfully',
    todo: deletedTodo
  })
}