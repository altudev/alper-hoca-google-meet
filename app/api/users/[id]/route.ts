import { NextRequest, NextResponse } from 'next/server'
import { users, type User } from '@/lib/data/fake-data'

// In-memory storage (shared with main route)
const usersList = [...users]

/**
 * GET /api/users/[id]
 * Get a single user by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)
  const user = usersList.find(u => u.id === userId)

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

/**
 * PUT /api/users/[id]
 * Update a user by ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)
    const userIndex = usersList.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // Update user while preserving ID
    const updatedUser: User = {
      ...usersList[userIndex],
      ...body,
      id: userId // Ensure ID doesn't change
    }

    usersList[userIndex] = updatedUser

    return NextResponse.json(updatedUser)
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * PATCH /api/users/[id]
 * Partially update a user by ID
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)
    const userIndex = usersList.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // Partial update - merge with existing data
    usersList[userIndex] = {
      ...usersList[userIndex],
      ...body,
      id: userId // Ensure ID doesn't change
    }

    return NextResponse.json(usersList[userIndex])
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * DELETE /api/users/[id]
 * Delete a user by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)
  const userIndex = usersList.findIndex(u => u.id === userId)

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  const deletedUser = usersList[userIndex]
  usersList.splice(userIndex, 1)

  return NextResponse.json({
    message: 'User deleted successfully',
    user: deletedUser
  })
}