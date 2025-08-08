export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

// Fake users data
export const users: User[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    username: "ahmetyilmaz",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 532 123 4567",
    website: "ahmetyilmaz.com",
    company: {
      name: "Yılmaz Tech",
      catchPhrase: "Geleceğin teknolojileri",
      bs: "yazılım geliştirme hizmetleri"
    },
    address: {
      street: "Atatürk Caddesi",
      suite: "No: 123",
      city: "İstanbul",
      zipcode: "34000",
      geo: {
        lat: "41.0082",
        lng: "28.9784"
      }
    }
  },
  {
    id: 2,
    name: "Ayşe Demir",
    username: "aysedemir",
    email: "ayse.demir@example.com",
    phone: "+90 533 234 5678",
    website: "aysedemir.dev",
    company: {
      name: "Demir Software",
      catchPhrase: "Kaliteli yazılım çözümleri",
      bs: "mobil uygulama geliştirme"
    },
    address: {
      street: "Cumhuriyet Bulvarı",
      suite: "Apt 456",
      city: "Ankara",
      zipcode: "06000",
      geo: {
        lat: "39.9334",
        lng: "32.8597"
      }
    }
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    username: "mehmetkaya",
    email: "mehmet.kaya@example.com",
    phone: "+90 534 345 6789",
    website: "kayatech.io",
    company: {
      name: "Kaya Innovations",
      catchPhrase: "Yenilikçi çözümler",
      bs: "bulut teknolojileri"
    },
    address: {
      street: "İnönü Mahallesi",
      suite: "Blok B Daire 12",
      city: "İzmir",
      zipcode: "35000",
      geo: {
        lat: "38.4192",
        lng: "27.1287"
      }
    }
  },
  {
    id: 4,
    name: "Fatma Öztürk",
    username: "fatmaozturk",
    email: "fatma.ozturk@example.com",
    phone: "+90 535 456 7890",
    website: "ozturkdesign.com",
    company: {
      name: "Öztürk Design Studio",
      catchPhrase: "Yaratıcı tasarımlar",
      bs: "UI/UX tasarım"
    },
    address: {
      street: "Barbaros Bulvarı",
      suite: "No: 78",
      city: "Bursa",
      zipcode: "16000",
      geo: {
        lat: "40.1826",
        lng: "29.0665"
      }
    }
  },
  {
    id: 5,
    name: "Ali Çelik",
    username: "alicelik",
    email: "ali.celik@example.com",
    phone: "+90 536 567 8901",
    website: "celiktechnology.net",
    company: {
      name: "Çelik Technologies",
      catchPhrase: "Güvenilir teknoloji ortağınız",
      bs: "siber güvenlik çözümleri"
    },
    address: {
      street: "Kızılay Meydanı",
      suite: "İş Merkezi Kat 5",
      city: "Antalya",
      zipcode: "07000",
      geo: {
        lat: "36.8969",
        lng: "30.7133"
      }
    }
  }
]

// Fake todos data
export const todos: Todo[] = [
  {
    id: 1,
    userId: 1,
    title: "React projesi için döküman hazırla",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    userId: 1,
    title: "Unit testleri yaz",
    completed: true,
    createdAt: "2024-01-14T09:00:00Z",
    updatedAt: "2024-01-15T14:00:00Z"
  },
  {
    id: 3,
    userId: 2,
    title: "Müşteri toplantısına hazırlan",
    completed: false,
    createdAt: "2024-01-16T08:30:00Z",
    updatedAt: "2024-01-16T08:30:00Z"
  },
  {
    id: 4,
    userId: 2,
    title: "API entegrasyonunu tamamla",
    completed: true,
    createdAt: "2024-01-13T11:00:00Z",
    updatedAt: "2024-01-14T16:00:00Z"
  },
  {
    id: 5,
    userId: 3,
    title: "Database şemasını güncelle",
    completed: false,
    createdAt: "2024-01-17T09:00:00Z",
    updatedAt: "2024-01-17T09:00:00Z"
  },
  {
    id: 6,
    userId: 3,
    title: "Code review yap",
    completed: true,
    createdAt: "2024-01-12T14:00:00Z",
    updatedAt: "2024-01-13T10:00:00Z"
  },
  {
    id: 7,
    userId: 4,
    title: "Yeni tasarım mockup'larını hazırla",
    completed: false,
    createdAt: "2024-01-18T10:30:00Z",
    updatedAt: "2024-01-18T10:30:00Z"
  },
  {
    id: 8,
    userId: 4,
    title: "Kullanıcı deneyimi analizi yap",
    completed: false,
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-18T11:00:00Z"
  },
  {
    id: 9,
    userId: 5,
    title: "Güvenlik denetimi raporu hazırla",
    completed: true,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-11T17:00:00Z"
  },
  {
    id: 10,
    userId: 5,
    title: "Firewall kurallarını güncelle",
    completed: false,
    createdAt: "2024-01-19T08:00:00Z",
    updatedAt: "2024-01-19T08:00:00Z"
  },
  {
    id: 11,
    userId: 1,
    title: "Git repository'yi düzenle",
    completed: true,
    createdAt: "2024-01-11T13:00:00Z",
    updatedAt: "2024-01-11T15:00:00Z"
  },
  {
    id: 12,
    userId: 2,
    title: "Performance optimizasyonu yap",
    completed: false,
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T09:00:00Z"
  }
]

// Helper functions for in-memory data manipulation
let nextUserId = users.length + 1
let nextTodoId = todos.length + 1

export function getNextUserId() {
  return nextUserId++
}

export function getNextTodoId() {
  return nextTodoId++
}