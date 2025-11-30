# Software Requirements Specification (SRS)

## Retro - AI-Powered Smart Study Assistant

### The Sloth Project

---

**Document Version:** 1.0  
**Date:** 2024  
**Author:** Development Team  
**Project Name:** Retro (The Sloth Project)

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   - 1.4 [References](#14-references)
   - 1.5 [Overview](#15-overview)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)
3. [System Features and Requirements](#3-system-features-and-requirements)
   - 3.1 [User Authentication System](#31-user-authentication-system)
   - 3.2 [Notes Management System](#32-notes-management-system)
   - 3.3 [AI Chat System (Retro Assistant)](#33-ai-chat-system-retro-assistant)
   - 3.4 [Flashcard System](#34-flashcard-system)
   - 3.5 [Music Streaming System](#35-music-streaming-system)
   - 3.6 [Chat Session Management](#36-chat-session-management)
   - 3.7 [User Context Memory](#37-user-context-memory)
4. [External Interface Requirements](#4-external-interface-requirements)
   - 4.1 [User Interfaces](#41-user-interfaces)
   - 4.2 [Hardware Interfaces](#42-hardware-interfaces)
   - 4.3 [Software Interfaces](#43-software-interfaces)
   - 4.4 [Communication Interfaces](#44-communication-interfaces)
5. [Non-Functional Requirements](#5-non-functional-requirements)
   - 5.1 [Performance Requirements](#51-performance-requirements)
   - 5.2 [Security Requirements](#52-security-requirements)
   - 5.3 [Reliability Requirements](#53-reliability-requirements)
   - 5.4 [Availability Requirements](#54-availability-requirements)
   - 5.5 [Scalability Requirements](#55-scalability-requirements)
   - 5.6 [Maintainability Requirements](#56-maintainability-requirements)
6. [Data Requirements](#6-data-requirements)
   - 6.1 [Data Models](#61-data-models)
   - 6.2 [Data Dictionary](#62-data-dictionary)
7. [API Specifications](#7-api-specifications)
   - 7.1 [Authentication APIs](#71-authentication-apis)
   - 7.2 [Notes APIs](#72-notes-apis)
   - 7.3 [Chat APIs](#73-chat-apis)
   - 7.4 [Flashcard APIs](#74-flashcard-apis)
   - 7.5 [Music APIs](#75-music-apis)
   - 7.6 [Chat Session APIs](#76-chat-session-apis)
8. [Future Enhancements](#8-future-enhancements)
9. [Appendices](#9-appendices)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a comprehensive description of the **Retro** application, an AI-powered smart study assistant developed under **The Sloth Project**. This document is intended for:

- Software developers and engineers
- Quality assurance teams
- Project managers and stakeholders
- System architects
- UI/UX designers
- Future maintenance teams

The document defines all functional and non-functional requirements necessary to design, develop, test, and deploy the Retro application.

### 1.2 Scope

**Retro** is a web-based study assistant application that combines intelligent note-taking, AI-powered conversational assistance, automated flashcard generation, and ambient study music to enhance the learning experience.

#### Key Capabilities:

1. **Intelligent Note Management** - Create, organize, and enhance notes with rich text formatting
2. **AI-Powered Chat Assistant** - Context-aware conversational AI for study assistance
3. **Chat with Notes** - AI conversations using specific notes as reference material
4. **Automated Flashcard Generation** - AI-generated flashcards from note content
5. **AI Note Enhancement** - Intelligent note improvement while preserving author's voice
6. **Ambient Music Streaming** - Background music for focused study sessions
7. **Persistent User Context** - Long-term memory of user preferences and context
8. **Session Management** - Multiple chat session handling with history

#### Out of Scope (Current Version):

- Mobile native applications
- Offline mode functionality
- Real-time collaboration features
- Third-party integrations (Notion, Google Drive, etc.)
- Video/audio note attachments
- Multi-language AI responses

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface |
| **AI** | Artificial Intelligence |
| **CRUD** | Create, Read, Update, Delete operations |
| **JWT** | JSON Web Token - used for authentication |
| **LLM** | Large Language Model |
| **MongoDB** | NoSQL document database |
| **Quill Delta** | JSON format for rich text content |
| **REST** | Representational State Transfer |
| **SPA** | Single Page Application |
| **SRS** | Software Requirements Specification |
| **UI/UX** | User Interface/User Experience |
| **Groq** | AI inference platform used for LLM calls |
| **EJS** | Embedded JavaScript templating |
| **CORS** | Cross-Origin Resource Sharing |

### 1.4 References

1. IEEE Std 830-1998 - IEEE Recommended Practice for Software Requirements Specifications
2. Express.js Documentation - https://expressjs.com/
3. MongoDB Documentation - https://docs.mongodb.com/
4. OpenAI API Documentation - https://platform.openai.com/docs/
5. Groq API Documentation - https://groq.com/docs/
6. Zod Validation Library - https://zod.dev/
7. JSON Web Token RFC 7519 - https://tools.ietf.org/html/rfc7519

### 1.5 Overview

The remainder of this document is organized as follows:

- **Section 2** provides an overall description of the product including its context, functions, user characteristics, constraints, and dependencies
- **Section 3** details all system features with functional requirements
- **Section 4** specifies external interface requirements
- **Section 5** describes non-functional requirements
- **Section 6** presents data requirements and models
- **Section 7** documents API specifications
- **Section 8** outlines future enhancements
- **Section 9** contains appendices with supplementary information

---

## 2. Overall Description

### 2.1 Product Perspective

Retro is a standalone web application designed to serve as a comprehensive study companion. It operates as a client-server architecture with the following components:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        RETRO SYSTEM ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────┐         ┌──────────────┐         ┌────────────┐  │
│   │   Browser    │ ◄─────► │  Express.js  │ ◄─────► │  MongoDB   │  │
│   │   Client     │  HTTP   │   Server     │         │  Database  │  │
│   │  (EJS/HTML)  │         │   (API)      │         │            │  │
│   └──────────────┘         └──────┬───────┘         └────────────┘  │
│                                   │                                  │
│                                   │ API Calls                        │
│                                   ▼                                  │
│                          ┌──────────────┐                           │
│                          │   Groq API   │                           │
│                          │ (LLM Service)│                           │
│                          └──────────────┘                           │
│                                                                      │
│   ┌──────────────┐                                                  │
│   │  Mailtrap    │◄─── Email Service (Verification, Password Reset) │
│   │   SMTP       │                                                  │
│   └──────────────┘                                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

#### System Context:

1. **Frontend Client**: Browser-based interface using EJS templates, HTML, CSS, and JavaScript
2. **Backend Server**: Node.js with Express.js framework handling business logic
3. **Database**: MongoDB for persistent data storage
4. **AI Service**: Groq API for LLM-based features (using Llama 4 Maverick model)
5. **Email Service**: Mailtrap SMTP for transactional emails

### 2.2 Product Functions

The major functions of Retro are categorized as follows:

#### 2.2.1 User Management Functions
- User registration with email verification
- Secure login/logout with JWT authentication
- Password reset via email
- Token refresh mechanism
- User profile retrieval

#### 2.2.2 Note Management Functions
- Create notes with rich text content (Quill Delta format)
- Read/view notes with pagination and filtering
- Update note content, metadata, and organization
- Delete notes
- Search notes by title, content, or tags
- Organize notes with categories and tags
- Pin, favorite, and archive notes
- Color-code notes for visual organization
- AI-powered note enhancement

#### 2.2.3 AI Chat Functions
- General AI chat with Retro assistant
- Context-aware conversations with user memory
- Chat with specific note as reference
- Structured JSON responses with meta-information
- Session-based conversation history

#### 2.2.4 Flashcard Functions
- Manual flashcard creation
- AI-generated flashcards from notes
- Flashcard organization (tags, difficulty levels)
- Pin, favorite, and review tracking
- Spaced repetition support (review count, last reviewed)
- Search and filter flashcards

#### 2.2.5 Music Functions
- Browse available music library
- Stream audio files with seeking support
- Get music file information

#### 2.2.6 Session Management Functions
- Create new chat sessions
- Retrieve chat session history
- Delete chat sessions
- Auto-generate session titles

### 2.3 User Classes and Characteristics

#### 2.3.1 Students (Primary Users)
- **Description**: School, college, or university students seeking study assistance
- **Technical Expertise**: Basic to intermediate computer skills
- **Usage Pattern**: Daily or frequent use during academic periods
- **Key Needs**: Note-taking, flashcard generation, study assistance, comprehension support

#### 2.3.2 Educators
- **Description**: Teachers, professors, and tutors
- **Technical Expertise**: Intermediate computer skills
- **Usage Pattern**: Moderate use for content preparation
- **Key Needs**: Note organization, content enhancement, teaching material preparation

#### 2.3.3 Lifelong Learners
- **Description**: Self-directed learners and professionals
- **Technical Expertise**: Varied
- **Usage Pattern**: Variable based on learning goals
- **Key Needs**: Knowledge retention, concept clarification, organized learning

#### 2.3.4 Researchers
- **Description**: Academic and professional researchers
- **Technical Expertise**: Intermediate to advanced
- **Usage Pattern**: Project-based intensive use
- **Key Needs**: Information synthesis, note organization, concept exploration

### 2.4 Operating Environment

#### 2.4.1 Server Environment
- **Runtime**: Node.js v18.x or higher
- **Framework**: Express.js v5.x
- **Database**: MongoDB v6.x or higher
- **Package Manager**: npm

#### 2.4.2 Client Environment
- **Browsers Supported**:
  - Google Chrome (v90+)
  - Mozilla Firefox (v88+)
  - Microsoft Edge (v90+)
  - Safari (v14+)
- **Screen Resolution**: Minimum 1280x720, optimized for 1920x1080
- **JavaScript**: Must be enabled
- **Cookies**: Must be enabled for authentication

#### 2.4.3 External Services
- **AI Provider**: Groq API (OpenAI-compatible endpoint)
- **Email Provider**: Mailtrap SMTP
- **Database Hosting**: MongoDB Atlas (recommended) or self-hosted MongoDB

### 2.5 Design and Implementation Constraints

#### 2.5.1 Technical Constraints
1. **ES Modules**: Project uses ES module syntax (`"type": "module"` in package.json)
2. **API Rate Limits**: Subject to Groq API rate limiting
3. **File Storage**: Music files stored locally in `/public/music` directory
4. **Rich Text Format**: Notes must use Quill Delta JSON format
5. **Authentication**: JWT-based with HTTP-only cookies
6. **Single Database**: All data stored in single MongoDB database

#### 2.5.2 Regulatory Constraints
1. Password security requirements (minimum 8 characters with complexity)
2. Email verification required for full account access
3. Secure token handling for password reset

#### 2.5.3 Business Constraints
1. Freemium model planned with tiered feature access
2. AI features are cost-intensive and may require usage limits
3. Music streaming limited to locally stored files

### 2.6 Assumptions and Dependencies

#### 2.6.1 Assumptions
1. Users have stable internet connectivity
2. Users have modern web browsers with JavaScript enabled
3. MongoDB server is accessible and operational
4. Groq API service remains available and compatible
5. Email delivery service (Mailtrap) functions reliably
6. Users provide valid email addresses for registration

#### 2.6.2 Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| express | ^5.1.0 | Web application framework |
| mongoose | ^8.18.2 | MongoDB object modeling |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| bcrypt | ^6.0.0 | Password hashing |
| zod | ^4.1.11 | Input validation |
| openai | ^6.9.0 | AI API client (Groq-compatible) |
| nodemailer | ^7.0.6 | Email sending |
| cookie-parser | ^1.4.7 | Cookie handling |
| cors | ^2.8.5 | Cross-origin requests |
| ejs | ^3.1.10 | Template engine |
| dotenv | ^17.2.2 | Environment configuration |

---

## 3. System Features and Requirements

### 3.1 User Authentication System

#### 3.1.1 Description
The authentication system provides secure user registration, login, logout, email verification, and password management functionality using JWT tokens.

#### 3.1.2 Functional Requirements

##### FR-AUTH-001: User Registration
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | firstName, lastName, username, email, password, confirmPassword |
| **Process** | Validate input → Check uniqueness → Hash password → Create user → Generate verification token → Send verification email |
| **Output** | User object (excluding password), success message |
| **Validation Rules** | |
| - Username | 3-30 characters, alphanumeric and underscores only |
| - Email | Valid email format |
| - Password | 8-100 characters, must contain: uppercase, lowercase, number, special character |
| - First/Last Name | 1-50 characters, letters, spaces, hyphens, apostrophes only |

##### FR-AUTH-002: User Login
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | email, password |
| **Process** | Validate credentials → Compare password hash → Generate tokens → Set cookies |
| **Output** | Access token and refresh token (as HTTP-only cookies), success message |
| **Token Expiry** | Access: configurable via env, Refresh: configurable via env |

##### FR-AUTH-003: User Logout
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Valid access token (via cookie or header) |
| **Process** | Verify token → Clear refresh token in database → Clear cookies |
| **Output** | Success message |

##### FR-AUTH-004: Email Verification
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Verification token (query parameter) |
| **Process** | Hash token → Find matching user → Verify expiry → Mark email as verified |
| **Output** | Success HTML page or error HTML page |
| **Token Expiry** | 10 minutes |

##### FR-AUTH-005: Resend Verification Email
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Valid access token (authenticated user) |
| **Process** | Check if already verified → Generate new token → Send email |
| **Output** | Success message |

##### FR-AUTH-006: Forgot Password
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | email |
| **Process** | Find user → Generate reset token → Send reset email |
| **Output** | Success message (sent regardless of email existence for security) |

##### FR-AUTH-007: Reset Password
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Reset token (query), password, confirmPassword |
| **Process** | Verify token → Validate passwords match → Hash new password → Update user |
| **Output** | Success message |

##### FR-AUTH-008: Get Current User
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Valid access token |
| **Process** | Verify token → Retrieve user → Fetch user context/memory |
| **Output** | User object with context and preferences |

##### FR-AUTH-009: Refresh Access Token
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Valid refresh token (via cookie or body) |
| **Process** | Verify refresh token → Validate against stored token → Generate new tokens |
| **Output** | New access and refresh tokens (as cookies) |

### 3.2 Notes Management System

#### 3.2.1 Description
A comprehensive note-taking system supporting rich text content, organization features, and AI-powered enhancement.

#### 3.2.2 Functional Requirements

##### FR-NOTE-001: Create Note
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | title, content (Quill Delta), tags[], category, color, isPinned, isFavorite |
| **Process** | Validate input → Extract plain text → Create note → Save to database |
| **Output** | Created note object |
| **Constraints** | Title: 1-200 chars, Content: Quill Delta format, Tags: max 10, Color: hex format |

##### FR-NOTE-002: Get All Notes
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | page, limit, category, tag, isPinned, isFavorite, isArchived |
| **Process** | Apply filters → Paginate → Sort by pinned status and last edited |
| **Output** | Notes array with pagination metadata |
| **Default Sort** | isPinned (descending), lastEditedAt (descending) |
| **Default Limit** | 20 notes per page, max 100 |

##### FR-NOTE-003: Get Note by ID
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Note ID |
| **Process** | Find note by ID → Verify ownership |
| **Output** | Single note object |

##### FR-NOTE-004: Update Note
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Note ID, fields to update |
| **Process** | Find note → Verify ownership → Update fields → Re-extract plain text if content changed |
| **Output** | Updated note object |

##### FR-NOTE-005: Delete Note
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Note ID |
| **Process** | Find note → Verify ownership → Delete |
| **Output** | Success message |

##### FR-NOTE-006: Search Notes
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Search query (1-100 characters) |
| **Process** | Search in title, plainText, and tags using regex |
| **Output** | Matching notes array with count |

##### FR-NOTE-007: Get Notes by Tag
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Tag name |
| **Process** | Filter notes by tag (case-insensitive) |
| **Output** | Notes array with count |

##### FR-NOTE-008: Get Notes by Category
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Category name |
| **Process** | Filter notes by category |
| **Output** | Notes array with count |

##### FR-NOTE-009: Toggle Pin Status
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Note ID |
| **Process** | Find note → Toggle isPinned boolean → Save |
| **Output** | Updated note object |

##### FR-NOTE-010: Toggle Favorite Status
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Note ID |
| **Process** | Find note → Toggle isFavorite boolean → Save |
| **Output** | Updated note object |

##### FR-NOTE-011: Archive/Unarchive Note
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Note ID |
| **Process** | Find note → Toggle isArchived boolean → Save |
| **Output** | Updated note object |

##### FR-NOTE-012: Get User Tags
| Attribute | Description |
|-----------|-------------|
| **Priority** | Low |
| **Input** | Authenticated user |
| **Process** | Get distinct tags from user's non-archived notes |
| **Output** | Tags array with count |

##### FR-NOTE-013: Get User Categories
| Attribute | Description |
|-----------|-------------|
| **Priority** | Low |
| **Input** | Authenticated user |
| **Process** | Get distinct categories from user's non-archived notes |
| **Output** | Categories array with count |

##### FR-NOTE-014: AI Note Enhancement
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | noteId |
| **Process** | Retrieve note → Extract content → Send to AI for enhancement → Parse response → Update note |
| **Output** | Enhanced note with improvements list |
| **AI Behavior** | Preserve author's voice, improve clarity, enhance organization, fix grammar, add markdown formatting |

### 3.3 AI Chat System (Retro Assistant)

#### 3.3.1 Description
An intelligent conversational AI assistant that provides study help, answers questions, and maintains context across conversations.

#### 3.3.2 AI Persona: Retro
- **Identity**: AI-powered smart study assistant
- **Behavior**: Accurate, helpful, concise, supportive
- **Response Format**: JSON with `response` and `meta` fields
- **Memory**: Maintains user context across sessions
- **Capabilities**: Answer questions, explain concepts, summarize content, generate study materials

#### 3.3.3 Functional Requirements

##### FR-CHAT-001: General AI Chat
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | message, chatSessionId |
| **Process** | Validate session → Auto-generate title (first message) → Save user message → Retrieve user context → Call AI API → Parse response → Save AI response → Update context (async) |
| **Output** | AI response with meta information |
| **Response Format** | `{ success, response, meta }` |

**AI Response Schema:**
```json
{
  "response": "Natural language answer to user query",
  "meta": "Short summary of action taken (6-18 tokens)"
}
```

##### FR-CHAT-002: Chat with Note Reference
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | message, noteId |
| **Process** | Validate inputs → Retrieve note → Verify ownership → Extract content → Build context prompt → Call AI API → Return response |
| **Output** | AI response with note reference information |
| **Response Format** | `{ success, response, meta, noteReference: { noteId, noteTitle } }` |
| **AI Behavior** | Use note as primary reference, quote/summarize content, help user learn from note |

### 3.4 Flashcard System

#### 3.4.1 Description
A flashcard management system supporting both manual creation and AI-powered generation from notes, with spaced repetition tracking.

#### 3.4.2 Functional Requirements

##### FR-CARD-001: Create Card (Manual)
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | title, content, tags[], color, difficulty, isPinned, isFavorite |
| **Process** | Validate input → Create card → Save to database |
| **Output** | Created card object |
| **Constraints** | Title: 1-500 chars, Content: 1-2000 chars, Tags: max 10, Difficulty: easy/medium/hard |

##### FR-CARD-002: Get All Cards
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | page, limit, difficulty, isPinned, isFavorite, isAIGenerated, noteId |
| **Process** | Apply filters → Paginate → Sort |
| **Output** | Cards array with pagination metadata |
| **Default Sort** | isPinned (descending), createdAt (descending) |

##### FR-CARD-003: Get Card by ID
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Card ID |
| **Process** | Find card by ID → Verify ownership |
| **Output** | Single card object |

##### FR-CARD-004: Update Card
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Card ID, fields to update |
| **Process** | Find card → Verify ownership → Update fields → Save |
| **Output** | Updated card object |

##### FR-CARD-005: Delete Card
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Card ID |
| **Process** | Find card → Verify ownership → Delete |
| **Output** | Success message |

##### FR-CARD-006: Search Cards
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Search query |
| **Process** | Search in title, content, and tags using regex |
| **Output** | Matching cards array with count |

##### FR-CARD-007: Get Cards by Note
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Note ID |
| **Process** | Filter cards by noteId |
| **Output** | Cards array with count |

##### FR-CARD-008: Get Cards by Difficulty
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Difficulty level (easy/medium/hard) |
| **Process** | Filter cards by difficulty |
| **Output** | Cards array with count |

##### FR-CARD-009: Toggle Pin Status
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Card ID |
| **Process** | Find card → Toggle isPinned → Save |
| **Output** | Updated card object |

##### FR-CARD-010: Toggle Favorite Status
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Card ID |
| **Process** | Find card → Toggle isFavorite → Save |
| **Output** | Updated card object |

##### FR-CARD-011: Mark as Reviewed
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Card ID |
| **Process** | Find card → Increment reviewCount → Set lastReviewedAt → Save |
| **Output** | Updated review statistics |

##### FR-CARD-012: Get User Tags
| Attribute | Description |
|-----------|-------------|
| **Priority** | Low |
| **Input** | Authenticated user |
| **Process** | Get distinct tags from user's cards |
| **Output** | Tags array with count |

##### FR-CARD-013: Delete Cards by Note
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | Note ID |
| **Process** | Delete all cards associated with noteId |
| **Output** | Deleted count |

##### FR-CARD-014: AI Flashcard Generation
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | noteId |
| **Process** | Validate noteId → Retrieve note → Verify ownership → Extract plain text → Send to AI → Parse JSON response → Validate cards → Return to user → Save to database (async) |
| **Output** | Generated flashcards array with note info |
| **AI Output Format** | `{ numberOfCards, cards: [{ title, content }] }` |
| **Card Types** | Definition, concept explanation, key facts, process/procedure, comparison |
| **Limits** | Minimum 1 card, Maximum 20 cards |

### 3.5 Music Streaming System

#### 3.5.1 Description
An ambient music streaming feature for background study music, supporting local file playback with seeking capabilities.

#### 3.5.2 Functional Requirements

##### FR-MUSIC-001: Get Music List
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | None (public endpoint) |
| **Process** | Read music directory → Filter audio files → Return metadata |
| **Output** | Array of music files with id, filename, title, url, size |
| **Supported Formats** | .mp3, .wav, .ogg |

##### FR-MUSIC-002: Stream Music File
| Attribute | Description |
|-----------|-------------|
| **Priority** | Medium |
| **Input** | filename |
| **Process** | Validate path (prevent traversal) → Check existence → Handle range requests → Stream file |
| **Output** | Audio stream with appropriate headers |
| **Features** | Range request support for seeking (HTTP 206) |

##### FR-MUSIC-003: Get Music Info
| Attribute | Description |
|-----------|-------------|
| **Priority** | Low |
| **Input** | filename |
| **Process** | Validate path → Get file stats |
| **Output** | File metadata (filename, title, size, modified date, url) |

### 3.6 Chat Session Management

#### 3.6.1 Description
Manages multiple chat sessions per user, allowing for organized conversation history and context separation.

#### 3.6.2 Functional Requirements

##### FR-SESSION-001: Create Chat Session
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | title (optional, default: "New Chat") |
| **Process** | Create session → Associate with user → Save |
| **Output** | Created session object |

##### FR-SESSION-002: Get All Chat Sessions
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | Authenticated user |
| **Process** | Retrieve all sessions for user → Sort by updatedAt |
| **Output** | Sessions array sorted by most recent |

##### FR-SESSION-003: Get Chat Session by ID
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | sessionId |
| **Process** | Find session → Verify ownership |
| **Output** | Session object with messages |

##### FR-SESSION-004: Delete Chat Session
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Input** | sessionId |
| **Process** | Find session → Verify ownership → Delete |
| **Output** | No content (204) |

### 3.7 User Context Memory

#### 3.7.1 Description
A persistent memory system that stores user preferences, learning goals, and contextual information across sessions.

#### 3.7.2 Functional Requirements

##### FR-CONTEXT-001: Context Extraction and Update
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Trigger** | After each chat message (asynchronous) |
| **Process** | Merge new information into existing context → Deduplicate → Respect forget requests |
| **Storage** | UserContext collection |

**Context Extraction Rules:**
1. **Prioritized Information**: Identity, roles, skills, learning goals, preferences, interests, constraints
2. **Exclusions**: Greetings, temporary moods, secrets/passwords, one-off events
3. **Format**: Third-person, compact sentences
4. **Forget Requests**: Honor explicit requests to forget information

##### FR-CONTEXT-002: Context Retrieval
| Attribute | Description |
|-----------|-------------|
| **Priority** | High |
| **Trigger** | On getCurrentUser and chat requests |
| **Process** | Retrieve user context from database |
| **Output** | Context string and preferences array |

---

## 4. External Interface Requirements

### 4.1 User Interfaces

#### 4.1.1 General UI Requirements

| ID | Requirement |
|----|-------------|
| UI-001 | Application shall use responsive design supporting viewport widths from 320px to 4K |
| UI-002 | Application shall support dark and light themes with toggle functionality |
| UI-003 | Application shall provide visual feedback for all user actions |
| UI-004 | Application shall display loading indicators during async operations |
| UI-005 | Application shall show error messages in user-friendly format |

#### 4.1.2 Page/Section Requirements

##### Login/Signup Page
- Clean, minimal design with two-panel layout
- Form validation with real-time feedback
- Password visibility toggle
- Link between login and signup forms

##### Main Application (Horizontal Navigation)
- **Chat Section**: AI chat interface with sidebar for sessions
- **Notes Section**: Note list with search, filters, and editor
- **DEN Section**: Focus/study environment with timer and ambient features
- **Flashcards Section**: Card grid with generation and review functionality

##### Common UI Elements
- Profile icon with dropdown menu
- Theme toggle button
- Ambient mode controls
- Color picker for sky/theme customization
- Modal overlays for read mode, confirmations, flashcard views

### 4.2 Hardware Interfaces

Retro is a web application and does not directly interface with hardware. However:

| Interface | Requirement |
|-----------|-------------|
| Audio Output | Requires device audio output for music streaming |
| Display | Minimum 1280x720 resolution recommended |
| Network | Requires network adapter for HTTP communication |

### 4.3 Software Interfaces

#### 4.3.1 Database Interface (MongoDB)

| Attribute | Specification |
|-----------|---------------|
| **Protocol** | MongoDB Wire Protocol |
| **Driver** | Mongoose ODM v8.x |
| **Connection** | URI-based via MONGO_URI environment variable |
| **Collections** | users, notes, cards, chatsessions, usercontexts |

#### 4.3.2 AI Service Interface (Groq API)

| Attribute | Specification |
|-----------|---------------|
| **Protocol** | HTTPS REST API |
| **Base URL** | https://api.groq.com/openai/v1 |
| **Authentication** | Bearer token (GROQ_API_KEY) |
| **Model** | meta-llama/llama-4-maverick-17b-128e-instruct |
| **SDK** | OpenAI SDK v6.x (compatible) |

#### 4.3.3 Email Service Interface (Mailtrap)

| Attribute | Specification |
|-----------|---------------|
| **Protocol** | SMTP |
| **Port** | Configurable (default 587) |
| **Authentication** | Username/Password |
| **Templates** | HTML email templates for verification and password reset |

### 4.4 Communication Interfaces

#### 4.4.1 HTTP/HTTPS Protocol

| Attribute | Specification |
|-----------|---------------|
| **Protocol Version** | HTTP/1.1, HTTP/2 supported |
| **Secure** | HTTPS required in production |
| **Methods** | GET, POST, PUT, PATCH, DELETE |
| **Content-Type** | application/json for API, multipart for file uploads |

#### 4.4.2 Authentication Headers

| Header | Description |
|--------|-------------|
| Authorization | Bearer <access_token> |
| Cookie | accessToken, refreshToken (HTTP-only) |

#### 4.4.3 CORS Configuration

| Setting | Development | Production |
|---------|-------------|------------|
| Origin | Reflect request origin | Whitelist only |
| Credentials | true | true |
| Methods | GET, POST, PUT, DELETE, PATCH | GET, POST, PUT, DELETE, PATCH |

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| PERF-001 | API response time (non-AI) | < 500ms for 95th percentile |
| PERF-002 | AI chat response time | < 10 seconds for 95th percentile |
| PERF-003 | Page load time | < 3 seconds on 3G connection |
| PERF-004 | Database query time | < 100ms for indexed queries |
| PERF-005 | Concurrent users supported | Minimum 100 simultaneous users |
| PERF-006 | Music streaming latency | < 2 seconds initial buffer |
| PERF-007 | File upload/download | Support files up to 50MB |

### 5.2 Security Requirements

| ID | Requirement |
|----|-------------|
| SEC-001 | All passwords must be hashed using bcrypt with salt rounds of 10 |
| SEC-002 | JWT tokens must use secure secrets (minimum 256-bit) |
| SEC-003 | HTTP-only cookies must be used for token storage |
| SEC-004 | HTTPS must be enforced in production environment |
| SEC-005 | Input validation must be performed on all user inputs using Zod |
| SEC-006 | Path traversal protection must be implemented for file access |
| SEC-007 | Rate limiting should be implemented for authentication endpoints |
| SEC-008 | Email verification tokens must expire within 10 minutes |
| SEC-009 | Password reset tokens must expire within 10 minutes |
| SEC-010 | API keys and secrets must never be exposed in client-side code |
| SEC-011 | User data must be isolated - users can only access their own data |
| SEC-012 | AI prompts must not retain or echo sensitive information (passwords, API keys) |

### 5.3 Reliability Requirements

| ID | Requirement |
|----|-------------|
| REL-001 | System uptime: 99.5% availability |
| REL-002 | Data persistence: No data loss during normal operations |
| REL-003 | Graceful degradation when AI service is unavailable |
| REL-004 | Database connection retry mechanism |
| REL-005 | Error logging for all server-side errors |
| REL-006 | Transaction handling for multi-document operations |

### 5.4 Availability Requirements

| ID | Requirement |
|----|-------------|
| AVAIL-001 | System shall be available 24/7 |
| AVAIL-002 | Planned maintenance windows shall be communicated in advance |
| AVAIL-003 | Recovery time objective (RTO): < 4 hours |
| AVAIL-004 | Recovery point objective (RPO): < 1 hour |

### 5.5 Scalability Requirements

| ID | Requirement |
|----|-------------|
| SCALE-001 | Horizontal scaling support through stateless API design |
| SCALE-002 | Database indexes for all query patterns |
| SCALE-003 | Support for database replication |
| SCALE-004 | Pagination for all list endpoints |
| SCALE-005 | Maximum 100 items per page for list queries |

### 5.6 Maintainability Requirements

| ID | Requirement |
|----|-------------|
| MAINT-001 | Modular code architecture (MVC pattern) |
| MAINT-002 | Consistent code formatting (ESLint/Prettier) |
| MAINT-003 | Separation of concerns (routes, controllers, models, utils) |
| MAINT-004 | Environment-based configuration via dotenv |
| MAINT-005 | Centralized error handling |
| MAINT-006 | Reusable validation schemas |
| MAINT-007 | Documentation for all API endpoints |

---

## 6. Data Requirements

### 6.1 Data Models

#### 6.1.1 User Model

```javascript
{
  username: String,        // Unique, 3-30 chars, alphanumeric + underscore
  firstName: String,       // Required, trimmed
  lastName: String,        // Required, trimmed
  email: String,          // Unique, lowercase, valid email
  password: String,       // Hashed, min 8 chars, select: false
  isEmailVerified: Boolean, // Default: false
  refreshToken: String,   // Select: false
  forgotPasswordToken: String, // Select: false
  forgotPasswordExpiry: Date,  // Select: false
  emailVerificationToken: String, // Select: false
  emailVerificationExpiry: Date,  // Select: false
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

#### 6.1.2 Note Model

```javascript
{
  userId: ObjectId,       // Reference to User, indexed
  title: String,          // Required, max 200 chars
  content: Mixed,         // Quill Delta format (JSON)
  plainText: String,      // Extracted text, max 50000 chars
  tags: [String],         // Array of lowercase strings
  category: String,       // Default: "General"
  isPinned: Boolean,      // Default: false
  isArchived: Boolean,    // Default: false
  isFavorite: Boolean,    // Default: false
  color: String,          // Hex color, default: "#ffffff"
  lastEditedAt: Date,     // Auto-updated on content/title change
  sharedWith: [{          // Future feature
    userId: ObjectId,
    permission: String    // "view" or "edit"
  }],
  reminder: Date,         // Optional
  attachments: [{         // Future feature
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number,
    uploadedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}

// Indexes:
// - { userId: 1, createdAt: -1 }
// - { userId: 1, isPinned: -1, createdAt: -1 }
// - { userId: 1, tags: 1 }
// - { userId: 1, category: 1 }
// - { plainText: "text", title: "text" } (text search)
```

#### 6.1.3 Card (Flashcard) Model

```javascript
{
  userId: ObjectId,       // Reference to User, indexed
  noteId: ObjectId,       // Reference to Note, indexed, nullable
  title: String,          // Required, max 500 chars
  content: String,        // Required, max 2000 chars
  tags: [String],         // Array of lowercase strings
  color: String,          // Hex color, default: "#ffffff"
  isPinned: Boolean,      // Default: false
  isFavorite: Boolean,    // Default: false
  difficulty: String,     // "easy", "medium", "hard", default: "medium"
  reviewCount: Number,    // Default: 0
  lastReviewedAt: Date,   // Nullable
  isAIGenerated: Boolean, // Default: false
  createdAt: Date,
  updatedAt: Date
}

// Indexes:
// - { userId: 1, createdAt: -1 }
// - { userId: 1, isPinned: -1, createdAt: -1 }
// - { userId: 1, isFavorite: -1 }
// - { userId: 1, noteId: 1 }
// - { userId: 1, difficulty: 1 }
// - { title: "text", content: "text" } (text search)
```

#### 6.1.4 ChatSession Model

```javascript
{
  userId: ObjectId,       // Reference to User, indexed
  title: String,          // Required, default: "New Chat"
  messages: [{
    sender: String,       // "user" or "ai"
    content: String,      // Required
    createdAt: Date       // Default: Date.now()
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### 6.1.5 UserContext Model

```javascript
{
  userId: ObjectId,       // Reference to User, indexed
  context: String,        // Extracted user context, default: ""
  preferences: [String],  // Array of preferences, default: []
  createdAt: Date,
  updatedAt: Date
}
```

### 6.2 Data Dictionary

#### 6.2.1 User Data Elements

| Field | Type | Size | Required | Description |
|-------|------|------|----------|-------------|
| username | String | 3-30 | Yes | Unique user identifier |
| firstName | String | 1-50 | Yes | User's first name |
| lastName | String | 1-50 | Yes | User's last name |
| email | String | - | Yes | Unique email address |
| password | String | 8-100 | Yes | Hashed password |
| isEmailVerified | Boolean | - | Yes | Email verification status |

#### 6.2.2 Note Data Elements

| Field | Type | Size | Required | Description |
|-------|------|------|----------|-------------|
| title | String | 1-200 | Yes | Note title |
| content | Mixed | - | Yes | Quill Delta JSON content |
| plainText | String | 0-50000 | No | Searchable plain text |
| tags | Array | 0-10 items | No | Organizational tags |
| category | String | 0-50 | No | Note category |
| color | String | 7 | No | Hex color code |

#### 6.2.3 Card Data Elements

| Field | Type | Size | Required | Description |
|-------|------|------|----------|-------------|
| title | String | 1-500 | Yes | Card question/prompt |
| content | String | 1-2000 | Yes | Card answer |
| difficulty | Enum | - | No | easy, medium, hard |
| reviewCount | Number | - | No | Times reviewed |

---

## 7. API Specifications

### 7.1 Authentication APIs

**Base Path:** `/api/v1/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Authenticate user | No |
| POST | `/logout` | Log out user | Yes |
| GET | `/verify-email` | Verify email address | No |
| GET | `/me` | Get current user | Yes |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/reset-password` | Reset password | No |
| POST | `/resend-verification-email` | Resend verification | Yes |
| POST | `/refresh-token` | Refresh access token | No |

### 7.2 Notes APIs

**Base Path:** `/api/v1/notes`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create new note | Yes |
| GET | `/` | Get all notes (paginated) | Yes |
| GET | `/search` | Search notes | Yes |
| GET | `/tags` | Get all user tags | Yes |
| GET | `/categories` | Get all user categories | Yes |
| GET | `/tag/:tag` | Get notes by tag | Yes |
| GET | `/category/:category` | Get notes by category | Yes |
| GET | `/:id` | Get note by ID | Yes |
| PUT | `/:id` | Update note | Yes |
| DELETE | `/:id` | Delete note | Yes |
| PATCH | `/:id/pin` | Toggle pin status | Yes |
| PATCH | `/:id/favorite` | Toggle favorite status | Yes |
| PATCH | `/:id/archive` | Toggle archive status | Yes |
| POST | `/enhance` | AI-enhance note | Yes |

### 7.3 Chat APIs

**Base Path:** `/api/v1`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/chat` | Send chat message | Yes |
| POST | `/chat-with-note` | Chat with note reference | Yes |

### 7.4 Flashcard APIs

**Base Path:** `/api/v1/cards`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create new card | Yes |
| POST | `/ai` | Generate cards from note | Yes |
| GET | `/` | Get all cards (paginated) | Yes |
| GET | `/search` | Search cards | Yes |
| GET | `/tags` | Get all user tags | Yes |
| GET | `/difficulty/:difficulty` | Get cards by difficulty | Yes |
| GET | `/note/:noteId` | Get cards by note | Yes |
| GET | `/:id` | Get card by ID | Yes |
| PUT | `/:id` | Update card | Yes |
| DELETE | `/:id` | Delete card | Yes |
| DELETE | `/note/:noteId` | Delete cards by note | Yes |
| PATCH | `/:id/pin` | Toggle pin status | Yes |
| PATCH | `/:id/favorite` | Toggle favorite status | Yes |
| PATCH | `/:id/review` | Mark as reviewed | Yes |

### 7.5 Music APIs

**Base Path:** `/api/v1/music`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get music list | No |
| GET | `/stream/:filename` | Stream music file | No |
| GET | `/info/:filename` | Get music file info | No |

### 7.6 Chat Session APIs

**Base Path:** `/api/v1/chat-sessions`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create new session | Yes |
| GET | `/` | Get all sessions | Yes |
| GET | `/:sessionId` | Get session by ID | Yes |
| DELETE | `/:sessionId` | Delete session | Yes |

---

## 8. Future Enhancements

### 8.1 Planned Features (From Monetization Plan)

#### 8.1.1 Subscription System
- Three-tier model: Free, Pro, Premium
- Feature gating based on tier
- Usage tracking and limits
- Stripe payment integration

#### 8.1.2 Rate Limiting
- Tier-based API rate limits
- Monthly usage quotas for AI features
- Soft and hard limit warnings

#### 8.1.3 Enhanced Features
- Note sharing (view/edit permissions)
- PDF, Markdown, Word, JSON export
- Note templates
- Advanced AI-powered semantic search
- Offline mode with sync
- API access for developers
- Analytics dashboard
- Custom music upload

### 8.2 Technical Improvements

| Feature | Description |
|---------|-------------|
| Redis Caching | Implement caching for frequently accessed data |
| WebSocket Support | Real-time updates for collaborative features |
| File Attachments | Support for images and documents in notes |
| Full-text Search | Elasticsearch integration for advanced search |
| Background Jobs | Job queue for async processing |
| Monitoring | APM and logging infrastructure |
| CI/CD Pipeline | Automated testing and deployment |

### 8.3 Mobile Applications
- React Native or Flutter mobile apps
- Offline-first architecture
- Push notifications for reminders

---

## 9. Appendices

### 9.1 Appendix A: Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port (default: 3000) | No |
| NODE_ENV | Environment (development/production) | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| ACCESS_TOKEN_SECRET | JWT access token secret | Yes |
| REFRESH_TOKEN_SECRET | JWT refresh token secret | Yes |
| ACCESS_TOKEN_EXPIRY | Access token expiry (seconds) | Yes |
| REFRESH_TOKEN_EXPIRY | Refresh token expiry (seconds) | Yes |
| GROQ_API_KEY | Groq API key for AI features | Yes |
| MAILTRAP_SMTP_HOST | Email SMTP host | Yes |
| MAILTRAP_SMTP_PORT | Email SMTP port | Yes |
| MAILTRAP_SMTP_USER | Email SMTP username | Yes |
| MAILTRAP_SMTP_PASS | Email SMTP password | Yes |
| FRONTEND_URL | Frontend URL for CORS | No |

### 9.2 Appendix B: Error Codes

| HTTP Status | Error Type | Description |
|-------------|------------|-------------|
| 400 | Bad Request | Invalid input or validation failure |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side error |

### 9.3 Appendix C: AI Prompt Templates

#### Answering Prompt
- Purpose: General study assistance
- Response Format: JSON with `response` and `meta` fields
- Behavior: Accurate, concise, supportive

#### Context Prompt
- Purpose: Extract and update user context
- Response Format: JSON with `context` field
- Rules: Merge new info, deduplicate, respect forget requests

#### Flashcard Prompt
- Purpose: Generate educational flashcards
- Response Format: JSON with `numberOfCards` and `cards` array
- Card Types: Definitions, explanations, facts, processes, comparisons

#### Note Reference Prompt
- Purpose: Chat using note as context
- Response Format: JSON with `response` and `meta` fields
- Behavior: Prioritize note content, help user learn

#### Note Enhancement Prompt
- Purpose: Improve note quality
- Response Format: JSON with `enhanced`, `improvements`, `preserved` fields
- Behavior: Preserve voice, improve clarity, add formatting

### 9.4 Appendix D: Project Structure

```
My Minor Project/
├── public/
│   ├── assets/
│   │   └── images/
│   ├── music/               # Music files directory
│   ├── *.html               # Static HTML pages
│   └── *.css                # Stylesheets
├── src/
│   ├── controllers/         # Business logic
│   │   ├── auth.js
│   │   ├── card.js
│   │   ├── chat.js
│   │   ├── chatSession.js
│   │   ├── healthCheck.js
│   │   ├── musicController.js
│   │   └── note.js
│   ├── db/
│   │   └── dbConnection.js  # MongoDB connection
│   ├── middlewares/
│   │   ├── redirectIfAuthenticated.js
│   │   ├── tokenChecker.js
│   │   ├── validate.js
│   │   └── viewTokenChecker.js
│   ├── models/              # Mongoose schemas
│   │   ├── card.js
│   │   ├── chatSession.js
│   │   ├── note.js
│   │   ├── user.js
│   │   └── userContext.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── cardRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── chatSessionRoutes.js
│   │   ├── healthCheckRoute.js
│   │   ├── musicRoutes.js
│   │   ├── noteRoutes.js
│   │   └── viewRoutes.js
│   ├── utils/
│   │   ├── prompts/         # AI prompt templates
│   │   │   ├── answeringPrompt.txt
│   │   │   ├── contextPrompt.txt
│   │   │   ├── flashcardPrompt.txt
│   │   │   ├── index.js
│   │   │   ├── noteEnhancePrompt.txt
│   │   │   └── noteReferencePrompt.txt
│   │   ├── asyncHandler.js
│   │   ├── mail.js
│   │   └── openai.js
│   ├── validators/          # Zod schemas
│   │   ├── flashcardSchemas.js
│   │   ├── loginSchema.js
│   │   ├── noteSchemas.js
│   │   ├── passwordSchemas.js
│   │   ├── registerSchema.js
│   │   └── validationRules.js
│   ├── views/               # EJS templates
│   │   ├── partials/
│   │   ├── app.ejs
│   │   ├── chat.ejs
│   │   └── loginSignUp.ejs
│   └── index.js             # Application entry point
├── package.json
└── MONETIZATION_PLAN.md
```

---

## Document Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2024 | Development Team | Initial SRS document |

---

**End of Document**