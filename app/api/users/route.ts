import { NextRequest, NextResponse } from 'next/server'
import { users, getNextUserId, type User } from '@/lib/data/fake-data'

// In-memory storage (resets on server restart)
let usersList = [...users]

/**
 * GET /api/users
 * Get all users or filter by query parameters
 * 
 * Query params:
 * - search: Search by name, username, or email
 * - limit: Limit number of results
 * - page: Page number for pagination
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')
  const limit = searchParams.get('limit')
  const page = searchParams.get('page')

  let filteredUsers = [...usersList]

  // Search functionality
  if (search) {
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Pagination
  if (limit && page) {
    const limitNum = parseInt(limit)
    const pageNum = parseInt(page)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    
    return NextResponse.json({
      users: filteredUsers.slice(startIndex, endIndex),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limitNum)
      }
    })
  }

  // Limit without pagination
  if (limit) {
    filteredUsers = filteredUsers.slice(0, parseInt(limit))
  }

  return NextResponse.json(filteredUsers)
}

/**
 * POST /api/users
 * Create a new user
 * 
 * Body: User object (without id)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.username) {
      return NextResponse.json(
        { error: 'Name, email, and username are required' },
        { status: 400 }
      )
    }

    // Check if username or email already exists
    const existingUser = usersList.find(
      user => user.username === body.username || user.email === body.email
    )
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser: User = {
      id: getNextUserId(),
      name: body.name,
      username: body.username,
      email: body.email,
      phone: body.phone || '',
      website: body.website || '',
      company: body.company || {
        name: '',
        catchPhrase: '',
        bs: ''
      },
      address: body.address || {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      }
    }

    usersList.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * DELETE /api/users
 * Delete all users (reset to initial state)
 */
export async function DELETE() {
  usersList = [...users]
  return NextResponse.json({ message: 'All users reset to initial state' })
}