# EventHub Backend

> Backend API untuk aplikasi manajemen event dengan autentikasi JWT dan role-based access control

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Daftar Isi

- [Tentang Projek](#tentang-projek)
- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Tentang Projek

**EventHub** adalah backend API untuk aplikasi manajemen event yang dibangun dengan Express.js dan TypeScript. Aplikasi ini menyediakan sistem autentikasi yang aman dengan JWT, refresh token mechanism, dan role-based access control untuk memisahkan hak akses antara user biasa dan admin.

## ✨ Fitur

- 🔐 **Autentikasi & Otorisasi**
  - Register & Login user
  - JWT Access Token & Refresh Token
  - Logout single session & all sessions
  - Role-based access control (User & Admin)

- 📅 **Manajemen Event**
  - CRUD operations untuk event
  - Public listing & detail event
  - Admin-only event management

- 🛡️ **Security**
  - Password hashing dengan bcrypt
  - JWT token validation
  - Protected routes dengan middleware
  - Token refresh mechanism

- 🗄️ **Database**
  - Type-safe database operations dengan Drizzle ORM
  - Migration management
  - Database seeding untuk data awal

## 🛠️ Tech Stack

- **Runtime:** Node.js (v18+)
- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Drizzle ORM
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Development:** ts-node-dev
- **Database:** PostgreSQL / MySQL / SQLite (sesuaikan dengan konfigurasi)

## 📦 Prasyarat

Pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (v18 atau lebih tinggi)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- Database (PostgreSQL/MySQL/SQLite)
- [Git](https://git-scm.com/)

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/fhmonly/eventhub_be.git
cd eventhub_be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` dari template:

```bash
cp .env.example .env
```

### 4. Konfigurasi Database

Edit file `.env` dan sesuaikan dengan konfigurasi database Anda:

```env
# Server
NODE_ENV=development
HOST=your_host_here
PORT=3000

# Database
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# JWT
JWT_ACCESS_SECRET=your_jwt_secret_key
JWT_ACCESS_LIFETIME=your_ms_string_value
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_LIFETIME=your_ms_string_value

# Email
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

### 5. Database Migration & Seeding

```bash
# Jalankan migration
npm run db:migrate

# Seed database dengan data awal
npm run db:seed
```

### Development Mode

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000` dengan hot-reload enabled.

### Production Mode

```bash
# Build aplikasi
npm run build

# Jalankan hasil build
npm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```


atau


```http
POST /api/auth/login?withRefresh=true
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

atau

```http
GET /api/auth/refresh
Authorization: Bearer your_refresh_token
```

#### Logout

```http
GET /api/auth/logout
Authorization: Bearer your_access_token
```

#### Logout All Sessions

```http
GET /api/auth/logout-all
Authorization: Bearer your_access_token
```

### Event Endpoints

#### Get All Events (Public)

```http
GET /api/events
Authorization: Bearer your_access_token
```

#### Get Event Detail (Public)

```http
GET /api/events/:id
Authorization: Bearer your_access_token
```

#### Create Event (Admin Only)

```http
POST /api/events
Authorization: Bearer your_admin_access_token
Content-Type: application/json

{
  "title": "Tech Conference 2025",
  "desc": "Annual technology conference",
  "location": "Jakarta Convention Center",
  "startAt": "2025-12-01"
}
```

#### Update Event (Admin Only)

```http
PUT /api/events/:id
Authorization: Bearer your_admin_access_token
Content-Type: application/json

{
  "title": "Tech Conference 2025",
  "desc": "Annual technology conference",
  "location": "Jakarta Convention Center",
  "startAt": "2025-12-01"
}
```

#### Delete Event (Admin Only)

```http
DELETE /api/events/:id
Authorization: Bearer your_admin_access_token
```

### Response Status Codes

| Code | Deskripsi              |
| ---- | ---------------------- |
| 200  | OK                     |
| 201  | Created                |
| 400  | Bad Request            |
| 401  | Unauthorized           |
| 403  | Forbidden              |
| 404  | Not Found              |
| 500  | Internal Server Error  |

## 📜 Scripts

| Command                      | Keterangan                                        |
| ---------------------------- | ------------------------------------------------- |
| `npm run dev`                | Menjalankan server dalam mode development         |
| `npm start`                  | Menjalankan server production (hasil build)       |
| `npm run build`              | Compile TypeScript ke JavaScript                  |
| `npm run create-env-example` | Generate file `.env.example`                      |
| `npm run db:generate`        | Generate migration files dari schema              |
| `npm run db:migrate`         | Menjalankan migration ke database                 |
| `npm run db:seed`            | Seed database dengan data awal                    |
| `npm test`                   | Menjalankan unit tests (jika ada)                 |
| `npm run lint`               | Check code style dengan ESLint                    |

## 🗄️ Database

### Schema

Aplikasi ini menggunakan Drizzle ORM untuk mengelola database schema. Schema utama meliputi:

- **Users**: Menyimpan data user dan kredensial
- **Events**: Menyimpan informasi event
- **Refresh Tokens**: Menyimpan token untuk session management

### Migration

Untuk membuat perubahan pada database schema:

1. Edit schema di `src/models/`
2. Generate migration:
   ```bash
   npm run db:generate
   ```
3. Review migration file di folder `drizzle/`
4. Apply migration:
   ```bash
   npm run db:migrate
   ```

### Seeding

Data awal untuk development dapat ditambahkan melalui seed script:

```bash
npm run db:seed
```

Default seed akan membuat:
- Admin user (admin@example.com / admin123)
- Regular user (john@example.com / user123)
- Beberapa sample events

## 🤝 Contributing

Kontribusi selalu diterima! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Guidelines

- Gunakan conventional commits
- Pastikan code lulus linting
- Tambahkan tests untuk fitur baru
- Update dokumentasi jika diperlukan

## 📄 License

Projek ini dilisensikan under [MIT License](LICENSE).

## 👥 Authors

- **fhmonly** - *Initial work* - [@fhmonly](https://github.com/fhmonly)

## 🙏 Acknowledgments

- Express.js team untuk framework yang powerful
- Drizzle team untuk ORM yang type-safe
- Semua contributor yang telah membantu projek ini

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/fhmonly/eventhub_be/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/fhmonly/eventhub_be/discussions)

---

**Built with ❤️ using TypeScript and Express.js**