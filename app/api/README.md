# Fake API Documentation

Bu API'ler öğrencilere REST API kullanımını göstermek için oluşturulmuş fake (sahte) endpoint'lerdir. Veriler sunucu hafızasında tutulur ve sunucu yeniden başlatıldığında sıfırlanır.

## Base URL
```
http://localhost:3000/api
```

## Users API

### Get All Users
```http
GET /api/users
```

Query Parameters:
- `search` (string): İsim, kullanıcı adı veya email'de arama
- `limit` (number): Sonuç sayısını sınırla
- `page` (number): Sayfalama için sayfa numarası (limit ile birlikte kullanılır)

Örnek:
```bash
# Tüm kullanıcıları getir
curl http://localhost:3000/api/users

# İsimde "Ahmet" geçen kullanıcıları bul
curl http://localhost:3000/api/users?search=Ahmet

# Sayfalama ile kullanıcıları getir (sayfa 1, her sayfada 2 kullanıcı)
curl http://localhost:3000/api/users?limit=2&page=1
```

### Get User by ID
```http
GET /api/users/{id}
```

Örnek:
```bash
curl http://localhost:3000/api/users/1
```

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "Yeni Kullanıcı",
  "username": "yenikullanici",
  "email": "yeni@example.com",
  "phone": "+90 555 111 2222",
  "website": "yenisite.com"
}
```

### Update User (Complete)
```http
PUT /api/users/{id}
Content-Type: application/json

{
  "name": "Güncellenmiş İsim",
  "username": "guncelkullanici",
  "email": "guncel@example.com",
  ...
}
```

### Update User (Partial)
```http
PATCH /api/users/{id}
Content-Type: application/json

{
  "name": "Sadece İsim Güncellendi"
}
```

### Delete User
```http
DELETE /api/users/{id}
```

### Reset All Users
```http
DELETE /api/users
```

## Todos API

### Get All Todos
```http
GET /api/todos
```

Query Parameters:
- `userId` (number): Belirli bir kullanıcının todo'larını getir
- `completed` (boolean): Tamamlanma durumuna göre filtrele
- `search` (string): Başlıkta arama yap
- `limit` (number): Sonuç sayısını sınırla
- `page` (number): Sayfalama için sayfa numarası
- `sort` (string): Sıralama alanı (id, title, createdAt, updatedAt)
- `order` (string): Sıralama yönü (asc, desc)

Örnek:
```bash
# Tüm todo'ları getir
curl http://localhost:3000/api/todos

# Kullanıcı 1'in todo'larını getir
curl http://localhost:3000/api/todos?userId=1

# Tamamlanmamış todo'ları getir
curl http://localhost:3000/api/todos?completed=false

# Başlığında "test" geçen todo'ları bul
curl http://localhost:3000/api/todos?search=test

# Todo'ları tarihe göre azalan sırada getir
curl http://localhost:3000/api/todos?sort=createdAt&order=desc
```

### Get Todo by ID
```http
GET /api/todos/{id}
```

### Create Todo
```http
POST /api/todos
Content-Type: application/json

{
  "userId": 1,
  "title": "Yeni görev",
  "completed": false
}
```

### Update Todo (Complete)
```http
PUT /api/todos/{id}
Content-Type: application/json

{
  "userId": 1,
  "title": "Güncellenmiş görev",
  "completed": true
}
```

### Update Todo (Partial)
```http
PATCH /api/todos/{id}
Content-Type: application/json

{
  "completed": true
}
```

### Delete Todo
```http
DELETE /api/todos/{id}
```

### Delete User's Todos
```http
DELETE /api/todos?userId={userId}
```

### Reset All Todos
```http
DELETE /api/todos
```

## JavaScript Fetch Örnekleri

### Kullanıcı Listesini Getir
```javascript
fetch('/api/users')
  .then(response => response.json())
  .then(users => console.log(users))
```

### Yeni Todo Oluştur
```javascript
fetch('/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 1,
    title: 'Yeni görev',
    completed: false
  })
})
  .then(response => response.json())
  .then(todo => console.log(todo))
```

### Todo'yu Tamamlandı Olarak İşaretle
```javascript
fetch('/api/todos/1', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    completed: true
  })
})
  .then(response => response.json())
  .then(todo => console.log(todo))
```

## React/Next.js Kullanım Örneği

```typescript
import { useEffect, useState } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => {
        setTodos(data)
        setLoading(false)
      })
  }, [])

  const toggleTodo = async (id: number, completed: boolean) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    
    if (response.ok) {
      const updated = await response.json()
      setTodos(todos.map(t => t.id === id ? updated : t))
    }
  }

  if (loading) return <div>Yükleniyor...</div>

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id, todo.completed)}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  )
}
```

## Notlar

- Tüm veriler sunucu hafızasında tutulur
- Sunucu yeniden başlatıldığında veriler başlangıç haline döner
- ID'ler otomatik olarak atanır ve artarak devam eder
- Tarih alanları ISO 8601 formatında saklanır
- CORS ayarları Next.js tarafından otomatik yönetilir