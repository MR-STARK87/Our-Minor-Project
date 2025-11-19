# EJS-Based Frontend Implementation Plan

## Project Overview
This document provides a comprehensive, unambiguous plan for implementing an EJS-based frontend for a Note-Taking and Flashcard Management application with AI capabilities.

---

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Page Definitions](#page-definitions)
4. [Component Definitions](#component-definitions)
5. [API Integration](#api-integration)
6. [Authentication Flow](#authentication-flow)
7. [Features Implementation](#features-implementation)
8. [Client-Side JavaScript Modules](#client-side-javascript-modules)
9. [CSS/Styling Strategy](#cssstyling-strategy)
10. [Error Handling](#error-handling)
11. [Implementation Phases](#implementation-phases)

---

## 1. Technology Stack

### Core Technologies
- **Template Engine**: EJS (Embedded JavaScript)
- **CSS Framework**: Bootstrap 5.3+ OR Tailwind CSS
- **Rich Text Editor**: Quill.js (for note content with Delta format)
- **HTTP Client**: Axios (client-side)
- **Icons**: Font Awesome 6 OR Feather Icons
- **Notifications**: Toast notifications library (e.g., Toastify)
- **Modal Library**: Bootstrap Modals OR Custom modals
- **Date Handling**: Day.js (lightweight alternative to Moment.js)

### Additional Libraries
- **Color Picker**: vanilla-picker OR @simonwep/pickr
- **Markdown Support**: marked.js (if needed for card content)
- **Loading Indicators**: CSS spinners OR nprogress
- **Form Validation**: Client-side validation matching Zod schemas

---

## 2. Project Structure

```
My Minor Project/
├── public/
│   ├── css/
│   │   ├── main.css                    # Global styles
│   │   ├── auth.css                    # Authentication pages styles
│   │   ├── dashboard.css               # Dashboard styles
│   │   ├── notes.css                   # Notes page styles
│   │   ├── cards.css                   # Flashcards page styles
│   │   ├── chat.css                    # Chat interface styles
│   │   └── components.css              # Reusable component styles
│   ├── js/
│   │   ├── utils/
│   │   │   ├── api.js                  # API client wrapper
│   │   │   ├── auth.js                 # Auth utilities
│   │   │   ├── validation.js           # Client-side validation
│   │   │   ├── storage.js              # LocalStorage utilities
│   │   │   └── helpers.js              # General helper functions
│   │   ├── components/
│   │   │   ├── toast.js                # Toast notification component
│   │   │   ├── modal.js                # Modal component handler
│   │   │   ├── colorPicker.js          # Color picker component
│   │   │   └── confirmDialog.js        # Confirmation dialog
│   │   ├── pages/
│   │   │   ├── dashboard.js            # Dashboard page logic
│   │   │   ├── notes.js                # Notes page logic
│   │   │   ├── note-editor.js          # Note editor (create/edit)
│   │   │   ├── cards.js                # Cards page logic
│   │   │   ├── card-editor.js          # Card editor (create/edit)
│   │   │   ├── card-review.js          # Card review/study mode
│   │   │   ├── chat.js                 # Chat page logic
│   │   │   └── profile.js              # User profile page
│   │   ├── auth/
│   │   │   ├── login.js                # Login page logic
│   │   │   ├── register.js             # Register page logic
│   │   │   ├── forgot-password.js      # Forgot password logic
│   │   │   └── reset-password.js       # Reset password logic
│   │   └── main.js                     # Global JS initialization
│   ├── images/                         # Static images
│   ├── icons/                          # Icon assets
│   └── assets/                         # Other assets
├── views/
│   ├── layouts/
│   │   ├── main.ejs                    # Main layout (authenticated users)
│   │   └── auth.ejs                    # Auth layout (login/register)
│   ├── partials/
│   │   ├── head.ejs                    # Common <head> content
│   │   ├── header.ejs                  # Main navigation header
│   │   ├── sidebar.ejs                 # Sidebar navigation
│   │   ├── footer.ejs                  # Footer
│   │   ├── toast.ejs                   # Toast notification template
│   │   ├── modal.ejs                   # Generic modal template
│   │   ├── note-card.ejs               # Note card component
│   │   ├── flashcard-card.ejs          # Flashcard card component
│   │   ├── tag-badge.ejs               # Tag badge component
│   │   ├── loading-spinner.ejs         # Loading spinner
│   │   └── pagination.ejs              # Pagination component
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login.ejs               # Login page
│   │   │   ├── register.ejs            # Register page
│   │   │   ├── forgot-password.ejs     # Forgot password page
│   │   │   ├── reset-password.ejs      # Reset password page
│   │   │   ├── verify-email.ejs        # Email verification page
│   │   │   └── resend-verification.ejs # Resend verification page
│   │   ├── dashboard.ejs               # Dashboard/Home page
│   │   ├── notes/
│   │   │   ├── index.ejs               # Notes list page
│   │   │   ├── create.ejs              # Create note page
│   │   │   ├── edit.ejs                # Edit note page
│   │   │   ├── view.ejs                # View single note page
│   │   │   └── archive.ejs             # Archived notes page
│   │   ├── cards/
│   │   │   ├── index.ejs               # Cards list page
│   │   │   ├── create.ejs              # Create card page
│   │   │   ├── edit.ejs                # Edit card page
│   │   │   ├── review.ejs              # Review/study mode page
│   │   │   └── by-note.ejs             # Cards from specific note
│   │   ├── chat/
│   │   │   ├── index.ejs               # Chat interface page
│   │   │   └── chat-with-note.ejs      # Chat with note context page
│   │   ├── profile.ejs                 # User profile page
│   │   └── 404.ejs                     # 404 error page
│   └── error.ejs                       # Generic error page
└── src/
    └── routes/
        └── viewRoutes.js               # NEW: Routes for serving EJS pages
```

---

## 3. Page Definitions

### 3.1 Authentication Pages

#### 3.1.1 Login Page (`/login`)
**File**: `views/pages/auth/login.ejs`

**Layout**: `views/layouts/auth.ejs`

**Elements**:
- Page title: "Login - NoteFlash"
- Brand logo/name at top
- Form with fields:
  - Email input (type="email", required, autocomplete="email")
  - Password input (type="password", required, show/hide toggle)
  - "Remember me" checkbox (optional)
  - Submit button: "Login"
- Links:
  - "Forgot Password?" → `/forgot-password`
  - "Don't have an account? Register" → `/register`
- Error message display area
- Loading state during submission

**Validation**:
- Email: Valid email format
- Password: Not empty
- Client-side validation before API call
- Display server errors from API response

**API Endpoint**: `POST /api/v1/auth/login`

**Success Action**: 
- Store tokens in httpOnly cookies (handled by backend)
- Redirect to `/dashboard`

---

#### 3.1.2 Register Page (`/register`)
**File**: `views/pages/auth/register.ejs`

**Layout**: `views/layouts/auth.ejs`

**Elements**:
- Page title: "Create Account - NoteFlash"
- Brand logo/name at top
- Form with fields:
  - Username input (3-30 chars, alphanumeric + underscore)
  - Email input (valid email format)
  - Password input (with strength indicator)
  - Confirm Password input
  - Terms & Conditions checkbox (required)
  - Submit button: "Create Account"
- Password requirements displayed:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- Link: "Already have an account? Login" → `/login`
- Error message display area
- Loading state during submission

**Validation**:
- Username: 3-30 chars, regex `/^[a-zA-Z0-9_]+$/`
- Email: Valid email format
- Password: Match all requirements listed above
- Confirm Password: Must match password
- Real-time validation feedback

**API Endpoint**: `POST /api/v1/auth/register`

**Success Action**: 
- Show success message: "Account created! Please check your email to verify."
- Redirect to `/login` after 2 seconds

---

#### 3.1.3 Forgot Password Page (`/forgot-password`)
**File**: `views/pages/auth/forgot-password.ejs`

**Layout**: `views/layouts/auth.ejs`

**Elements**:
- Page title: "Forgot Password - NoteFlash"
- Instructions text: "Enter your email address and we'll send you a link to reset your password."
- Form with fields:
  - Email input
  - Submit button: "Send Reset Link"
- Link: "Back to Login" → `/login`
- Success message area
- Error message display area

**API Endpoint**: `POST /api/v1/auth/forgot-password`

**Success Action**: 
- Display success message: "Password reset link sent to your email"
- Keep user on same page

---

#### 3.1.4 Reset Password Page (`/reset-password?token=xxx`)
**File**: `views/pages/auth/reset-password.ejs`

**Layout**: `views/layouts/auth.ejs`

**Elements**:
- Page title: "Reset Password - NoteFlash"
- Form with fields:
  - Current/Temporary Password input (extracted from token or entered)
  - New Password input (with strength indicator)
  - Confirm New Password input
  - Submit button: "Reset Password"
- Password requirements displayed
- Error message display area

**Validation**:
- New Password: Match all password requirements
- Confirm New Password: Must match new password

**API Endpoint**: `POST /api/v1/auth/reset-password`

**Success Action**: 
- Show success message: "Password reset successful!"
- Redirect to `/login` after 2 seconds

---

#### 3.1.5 Email Verification Pages
**File**: `views/pages/auth/verify-email.ejs`

**Elements**:
- Success state: "Email verified successfully! Redirecting to login..."
- Error state: "Verification failed. Link may be expired."
- Link to resend verification email

**API Endpoint**: `GET /api/v1/auth/verify-email?token=xxx`

**File**: `views/pages/auth/resend-verification.ejs`

**Elements**:
- Button: "Resend Verification Email"
- Success message area

**API Endpoint**: `POST /api/v1/auth/resend-verification-email`

---

### 3.2 Dashboard Page (`/dashboard`)
**File**: `views/pages/dashboard.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Welcome message: "Welcome back, {username}!"
- Statistics cards (grid layout, 4 columns on desktop, 2 on tablet, 1 on mobile):
  1. Total Notes (with icon)
  2. Total Flashcards (with icon)
  3. Pinned Items (with icon)
  4. Favorites (with icon)
- Quick Actions section:
  - Button: "Create New Note" → `/notes/create`
  - Button: "Create Flashcard" → `/cards/create`
  - Button: "Chat with AI" → `/chat`
  - Button: "Study Cards" → `/cards/review`
- Recent Notes section:
  - Display last 5 notes (using note-card partial)
  - "View All Notes" link → `/notes`
- Recent Flashcards section:
  - Display last 5 flashcards (using flashcard-card partial)
  - "View All Cards" link → `/cards`
- Quick Filters sidebar:
  - Categories dropdown
  - Tags filter
  - Pinned items toggle
  - Favorites toggle

**Data Required** (via API or server-side rendering):
- User info (name, username, email)
- Notes count
- Cards count
- Pinned count
- Favorites count
- Recent notes array (limit 5)
- Recent cards array (limit 5)
- All categories list
- All tags list

**API Endpoints**:
- `GET /api/v1/auth/me` (user info)
- `GET /api/v1/notes?limit=5&sort=-lastEditedAt`
- `GET /api/v1/cards?limit=5&sort=-createdAt`
- `GET /api/v1/notes/categories`
- `GET /api/v1/notes/tags`

---

### 3.3 Notes Pages

#### 3.3.1 Notes List Page (`/notes`)
**File**: `views/pages/notes/index.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Page header:
  - Title: "My Notes"
  - Button: "New Note" → `/notes/create`
- Filter bar (horizontal):
  - Search input (with search icon, placeholder: "Search notes...")
  - Category dropdown (All, {user categories})
  - Tag multi-select dropdown
  - View toggles: All | Pinned | Favorites | Archived
  - Sort dropdown: Recent | Title A-Z | Title Z-A
- Notes grid/list:
  - Display mode toggle: Grid view | List view
  - Each note using `note-card.ejs` partial
  - Empty state: "No notes found. Create your first note!"
- Pagination component at bottom
- Floating action button (mobile): "+" → `/notes/create`

**Note Card Component** (`partials/note-card.ejs`):
- Note title (truncated if too long)
- Content preview (first 150 chars of plainText)
- Tags badges
- Category badge
- Color indicator (left border or background)
- Action buttons:
  - Pin/Unpin icon (toggle)
  - Favorite/Unfavorite icon (toggle)
  - Edit icon → `/notes/edit/{id}`
  - Delete icon (with confirmation)
  - Archive icon
- Metadata:
  - Last edited date
  - Pin indicator (if pinned)
  - Favorite indicator (if favorite)

**Interactions**:
- Click on card title/content → View note (`/notes/view/{id}`)
- Click on tag → Filter by that tag
- Click on category → Filter by that category
- Real-time search (debounced 300ms)
- Toggle pin/favorite with visual feedback
- Delete with confirmation modal

**API Endpoints**:
- `GET /api/v1/notes?page={page}&limit=20&category={cat}&tag={tag}&isPinned={bool}&isFavorite={bool}&isArchived={bool}`
- `GET /api/v1/notes/search?query={searchTerm}`
- `PATCH /api/v1/notes/{id}/pin`
- `PATCH /api/v1/notes/{id}/favorite`
- `PATCH /api/v1/notes/{id}/archive`
- `DELETE /api/v1/notes/{id}`
- `GET /api/v1/notes/categories`
- `GET /api/v1/notes/tags`

**Pagination**:
- Default: 20 notes per page
- Show: Previous | 1 2 3 ... 10 | Next
- Show "Showing 1-20 of 150 notes"

---

#### 3.3.2 Create Note Page (`/notes/create`)
**File**: `views/pages/notes/create.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Page header:
  - Title: "Create New Note"
  - Buttons: "Cancel" (→ `/notes`) | "Save" (submit form)
- Form:
  - Title input (required, max 200 chars, char counter)
  - Quill editor for content (rich text, required)
    - Toolbar: Bold, Italic, Underline, Strikethrough, Headers (H1-H3), Lists (ordered/unordered), Links, Images, Code blocks, Blockquotes
  - Tags input (multi-select with autocomplete from existing tags, max 10)
  - Category input (dropdown with existing categories + "Add new" option)
  - Color picker (preset colors + custom)
  - Toggles:
    - Pin this note
    - Mark as favorite
- Auto-save draft to localStorage every 30 seconds
- Unsaved changes warning on page leave

**Validation**:
- Title: 1-200 characters, required
- Content: Must have at least one operation in Quill Delta, required
- Tags: Max 10 tags
- Category: Max 50 characters
- Color: Hex format #XXXXXX

**API Endpoint**: `POST /api/v1/notes`

**Request Body**:
```json
{
  "title": "Note Title",
  "content": { "ops": [...] },  // Quill Delta format
  "tags": ["tag1", "tag2"],
  "category": "Work",
  "color": "#FFD700",
  "isPinned": false,
  "isFavorite": false
}
```

**Success Action**: 
- Show toast: "Note created successfully!"
- Redirect to `/notes/view/{id}` or `/notes`
- Clear localStorage draft

**Error Handling**:
- Display validation errors inline
- Keep form data
- Show error toast

---

#### 3.3.3 Edit Note Page (`/notes/edit/{id}`)
**File**: `views/pages/notes/edit.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Same as Create Note page, but:
  - Title: "Edit Note"
  - Form pre-populated with existing note data
  - Additional button: "Delete Note" (with confirmation)
  - Show "Last edited: {date}"

**API Endpoints**:
- `GET /api/v1/notes/{id}` (to load note data)
- `PUT /api/v1/notes/{id}` (to update note)
- `DELETE /api/v1/notes/{id}` (delete button)

**Success Action**: 
- Show toast: "Note updated successfully!"
- Redirect to `/notes/view/{id}`

---

#### 3.3.4 View Note Page (`/notes/view/{id}`)
**File**: `views/pages/notes/view.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Page header:
  - Back button → `/notes`
  - Note title (large)
  - Action buttons:
    - Edit → `/notes/edit/{id}`
    - Delete (with confirmation)
    - Pin/Unpin toggle
    - Favorite toggle
    - Archive toggle
    - Generate Flashcards (→ call AI API)
    - Chat about this note → `/chat?noteId={id}`
- Note metadata:
  - Category badge
  - Tags badges (clickable to filter)
  - Color indicator
  - Created date
  - Last edited date
  - Pin/Favorite indicators
- Note content:
  - Rendered Quill content (read-only Quill editor OR HTML from Delta)
- Related flashcards section:
  - "Flashcards from this note" heading
  - Display cards generated from this note
  - Button: "Generate Flashcards" → Call `POST /api/v1/cards/ai`

**API Endpoints**:
- `GET /api/v1/notes/{id}`
- `GET /api/v1/cards/note/{noteId}`
- `POST /api/v1/cards/ai` (generate flashcards)
- `PATCH /api/v1/notes/{id}/pin`
- `PATCH /api/v1/notes/{id}/favorite`
- `PATCH /api/v1/notes/{id}/archive`
- `DELETE /api/v1/notes/{id}`

---

#### 3.3.5 Archived Notes Page (`/notes/archive`)
**File**: `views/pages/notes/archive.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Same as Notes List page, but:
  - Title: "Archived Notes"
  - Filter for isArchived=true
  - Action: Unarchive (instead of Archive)

**API Endpoint**: `GET /api/v1/notes?isArchived=true`

---

### 3.4 Flashcards Pages

#### 3.4.1 Cards List Page (`/cards`)
**File**: `views/pages/cards/index.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Page header:
  - Title: "My Flashcards"
  - Buttons: "New Card" → `/cards/create` | "Study Mode" → `/cards/review`
- Filter bar:
  - Search input (placeholder: "Search flashcards...")
  - Difficulty dropdown: All | Easy | Medium | Hard
  - Tag multi-select dropdown
  - View toggles: All | Pinned | Favorites | AI Generated | Manual
  - Sort dropdown: Recent | Title A-Z | Review Count | Difficulty
- Cards grid/list:
  - Display mode toggle: Grid view | List view
  - Each card using `flashcard-card.ejs` partial
  - Empty state: "No flashcards found. Create your first card!"
- Pagination component

**Flashcard Card Component** (`partials/flashcard-card.ejs`):
- Card title (question/front)
- Content preview (answer/back, truncated)
- Tags badges
- Difficulty badge (color-coded: green=easy, yellow=medium, red=hard)
- Color indicator
- AI Generated badge (if applicable)
- Action buttons:
  - Pin/Unpin icon
  - Favorite icon
  - Edit icon → `/cards/edit/{id}`
  - Delete icon
- Metadata:
  - Review count
  - Last reviewed date
  - Created date
  - Note reference (if from a note)

**Interactions**:
- Click on card → Flip animation to show back
- Click on note reference → View that note
- Real-time search (debounced)
- Toggle pin/favorite
- Delete with confirmation

**API Endpoints**:
- `GET /api/v1/cards?page={page}&limit=20&difficulty={diff}&isPinned={bool}&isFavorite={bool}&isAIGenerated={bool}`
- `GET /api/v1/cards/search?query={searchTerm}`
- `PATCH /api/v1/cards/{id}/pin`
- `PATCH /api/v1/cards/{id}/favorite`
- `DELETE /api/v1/cards/{id}`
- `GET /api/v1/cards/tags`

---

#### 3.4.2 Create Card Page (`/cards/create`)
**File**: `views/pages/cards/create.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Page header:
  - Title: "Create New Flashcard"
  - Buttons: "Cancel" | "Save"
- Form:
  - Title input (Question/Front side, required, max 500 chars)
  - Content textarea (Answer/Back side, required, max 2000 chars)
    - Optional: Markdown support with preview
  - Tags input (multi-select, max 10)
  - Color picker
  - Difficulty dropdown: Easy | Medium | Hard
  - Toggles:
    - Pin this card
    - Mark as favorite
- Preview card (live preview showing flip animation)

**Validation**:
- Title: 1-500 characters, required
- Content: 1-2000 characters, required
- Tags: Max 10
- Color: Hex format
- Difficulty: Must be one of: easy, medium, hard

**API Endpoint**: `POST /api/v1/cards`

**Request Body**:
```json
{
  "title": "What is JavaScript?",
  "content": "JavaScript is a programming language...",
  "tags": ["programming", "javascript"],
  "color": "#FF6B6B",
  "difficulty": "easy",
  "isPinned": false,
  "isFavorite": false
}
```

**Success Action**: 
- Show toast: "Flashcard created!"
- Redirect to `/cards` or show modal: "Create Another?" | "View All Cards"

---

#### 3.4.3 Edit Card Page (`/cards/edit/{id}`)
**File**: `views/pages/cards/edit.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Same as Create Card, but:
  - Title: "Edit Flashcard"
  - Pre-populated with card data
  - Show metadata:
    - Review count
    - Last reviewed date
    - AI Generated badge (if applicable)
    - Source note link (if from a note)
  - Delete button

**API Endpoints**:
- `GET /api/v1/cards/{id}`
- `PUT /api/v1/cards/{id}`
- `DELETE /api/v1/cards/{id}`

---

#### 3.4.4 Review/Study Mode Page (`/cards/review`)
**File**: `views/pages/cards/review.ejs`

**Layout**: `views/layouts/main.ejs` OR minimal layout for focus

**Elements**:
- Study session header:
  - Progress bar (cards reviewed / total cards)
  - Counter: "Card 5 of 20"
  - Exit button → `/cards` (with confirmation if in progress)
- Card display (center of screen, large):
  - Front side visible by default
  - "Show Answer" button (flips to back side)
- Answer side:
  - Back content visible
  - Difficulty rating buttons:
    - "Again" (red) - Mark as hard
    - "Hard" (orange)
    - "Good" (yellow)
    - "Easy" (green)
  - Each button marks card as reviewed and loads next card
- Navigation:
  - Previous card button (if available)
  - Next card button
  - Shuffle cards toggle
- Filter options (before starting):
  - All cards
  - By difficulty
  - By tag
  - Favorites only
  - Cards not reviewed today

**Study Session Flow**:
1. User selects filter options
2. Click "Start Studying" button
3. Show first card (front side)
4. User clicks "Show Answer"
5. User rates difficulty
6. API call to mark as reviewed: `PATCH /api/v1/cards/{id}/review`
7. Load next card
8. Repeat until all cards reviewed
9. Show completion screen with statistics

**Completion Screen**:
- "Session Complete!" message
- Statistics:
  - Cards reviewed: X
  - Time spent: Y minutes
  - Breakdown by difficulty rating
- Actions:
  - "Review Again" button
  - "Back to Cards" → `/cards`

**API Endpoints**:
- `GET /api/v1/cards?{filters}` (get cards to review)
- `PATCH /api/v1/cards/{id}/review` (mark as reviewed)

**Keyboard Shortcuts**:
- Space: Show answer / Next card
- 1-4: Rate difficulty (Again/Hard/Good/Easy)
- Left/Right arrows: Previous/Next card

---

#### 3.4.5 Cards by Note Page (`/cards/note/{noteId}`)
**File**: `views/pages/cards/by-note.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Page header:
  - Back button → previous page
  - Title: "Flashcards from: {Note Title}"
  - Button: "View Note" → `/notes/view/{noteId}`
  - Button: "Generate More Cards" → Call AI API
- Note preview card (collapsible):
  - Note title
  - Content preview
  - Tags, category
- Cards list:
  - Display all cards from this note
  - Same card component as Cards List page
  - Delete all cards button (with confirmation): "Delete All Cards from This Note"

**API Endpoints**:
- `GET /api/v1/notes/{noteId}` (note info)
- `GET /api/v1/cards/note/{noteId}` (cards)
- `POST /api/v1/cards/ai` (generate more cards)
- `DELETE /api/v1/cards/note/{noteId}` (delete all cards)

---

### 3.5 Chat Pages

#### 3.5.1 General Chat Page (`/chat`)
**File**: `views/pages/chat/index.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Chat interface (full height):
  - Chat header:
    - Title: "AI Assistant"
    - Subtitle: "Ask me anything about your notes"
    - Clear chat button
  - Messages container (scrollable):
    - Display chat messages with:
      - User messages (right-aligned, blue bubble)
      - AI messages (left-aligned, gray bubble)
      - Timestamps
      - Typing indicator (when AI is responding)
  - Input area (bottom, sticky):
    - Text input field (auto-expanding, max 4 lines)
    - Send button
    - Character counter (optional)
    - Attachment button (optional for future)
- Suggested prompts (shown when chat is empty):
  - "Summarize my recent notes"
  - "Create a study plan"
  - "What topics have I been studying?"

**Chat Message Format**:
```html
<div class="message user/ai">
  <div class="message-bubble">
    <p>Message content...</p>
  </div>
  <span class="message-time">10:30 AM</span>
</div>
```

**Interactions**:
- Type message → Press Enter or click Send
- Loading state while waiting for AI response
- Scroll to bottom on new message
- Copy message button on hover
- Store chat history in state (not persistent by default)

**API Endpoint**: `POST /api/v1/chat`

**Request Body**:
```json
{
  "message": "User's message here"
}
```

**Response**:
```json
{
  "response": "AI's response here"
}
```

---

#### 3.5.2 Chat with Note Page (`/chat/note/{noteId}`)
**File**: `views/pages/chat/chat-with-note.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Same as General Chat, but:
  - Header shows note title: "Chat about: {Note Title}"
  - Note preview panel (collapsible sidebar or top section)
  - Suggested prompts specific to the note:
    - "Explain this concept"
    - "Create flashcards from this note"
    - "Quiz me on this topic"

**API Endpoint**: `POST /api/v1/chat-with-note`

**Request Body**:
```json
{
  "noteId": "64f8a...",
  "message": "Explain the key concepts"
}
```

---

### 3.6 Profile Page (`/profile`)
**File**: `views/pages/profile.ejs`

**Layout**: `views/layouts/main.ejs`

**Elements**:
- Page header: "My Profile"
- Profile information card:
  - Avatar placeholder (initials or icon)
  - Username (non-editable)
  - Name (editable)
  - Email (with verification status badge)
  - Joined date
- Email verification section (if not verified):
  - Warning message: "Please verify your email"
  - Button: "Resend Verification Email"
- Statistics section:
  - Total notes created
  - Total flashcards created
  - Account age
- Settings section:
  - Preferences (placeholder for future)
- Account actions:
  - Change password button → Modal
  - Logout button

**API Endpoints**:
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/resend-verification-email`
- `POST /api/v1/auth/logout`

---

### 3.7 Error Pages

#### 3.7.1 404 Page (`/404`)
**File**: `views/pages/404.ejs`

**Elements**:
- Large "404" text
- Message: "Page not found"
- Description: "The page you're looking for doesn't exist."
- Button: "Go to Dashboard" → `/dashboard`

#### 3.7.2 Generic Error Page
**File**: `views/error.ejs`

**Elements**:
- Error code (if available)
- Error message
- Description
- Button: "Go Back" | "Go to Dashboard"

---

## 4. Component Definitions

### 4.1 Partials

#### 4.1.1 Head Partial (`partials/head.ejs`)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><%= title %> - NoteFlash</title>
<meta name="description" content="<%= description || 'Smart note-taking with AI-powered flashcards' %>">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/images/favicon.ico">

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="/css/main.css">
<% if (typeof additionalCSS !== 'undefined') { %>
  <% additionalCSS.forEach(css => { %>
    <link rel="stylesheet" href="<%= css %>">
  <% }); %>
<% } %>
```

**Required Variables**:
- `title` (string): Page title
- `description` (string, optional): Meta description
- `additionalCSS` (array, optional): Additional CSS files

---

#### 4.1.2 Header Partial (`partials/header.ejs`)
**Top navigation bar**

**Elements**:
- Brand logo/name (left) → `/dashboard`
- Search bar (center, global search across notes and cards)
- User menu (right):
  - User avatar/initials dropdown
  - Dropdown menu:
    - Profile → `/profile`
    - Settings (placeholder)
    - Logout

**Mobile**:
- Hamburger menu icon → Toggle sidebar
- Search icon → Show search modal

---

#### 4.1.3 Sidebar Partial (`partials/sidebar.ejs`)
**Left sidebar navigation**

**Elements**:
- Navigation links:
  - Dashboard (icon + text) → `/dashboard`
  - My Notes → `/notes`
  - Flashcards → `/cards`
  - Study Mode → `/cards/review`
  - AI Chat → `/chat`
  - Archive → `/notes/archive`
- Quick filters (collapsible):
  - Categories
  - Tags
  - Difficulty (for cards)
- Footer:
  - Help/Documentation link
  - Version number

**States**:
- Active link highlighted
- Collapsible on mobile
- Can be pinned/unpinned on desktop

---

#### 4.1.4 Footer Partial (`partials/footer.ejs`)
**Page footer**

**Elements**:
- Copyright text
- Links: Privacy Policy | Terms of Service | Contact
- Social media icons (optional)

---

#### 4.1.5 Toast Partial (`partials/toast.ejs`)
**Toast notification template**

```html
<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11">
  <div id="toast" class="toast" role="alert">
    <div class="toast-header">
      <i class="fas fa-info-circle me-2 toast-icon"></i>
      <strong class="me-auto toast-title">Notification</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
      Toast message here
    </div>
  </div>
</div>
```

**Types**:
- Success (green, checkmark icon)
- Error (red, error icon)
- Warning (yellow, warning icon)
- Info (blue, info icon)

---

#### 4.1.6 Modal Partial (`partials/modal.ejs`)
**Generic modal template**

**Variants**:
- Confirmation modal (Yes/No buttons)
- Form modal (with form fields)
- Info modal (OK button only)

**Example**:
```html
<div class="modal fade" id="confirmModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Action</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Are you sure you want to proceed?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="confirmBtn">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

---

#### 4.1.7 Pagination Partial (`partials/pagination.ejs`)
**Pagination component**

**Props**:
- `currentPage` (number)
- `totalPages` (number)
- `baseUrl` (string)
- `totalItems` (number)
- `itemsPerPage` (number)

**Elements**:
- Info text: "Showing X-Y of Z items"
- Previous button (disabled if on first page)
- Page numbers (with ellipsis for large ranges)
- Next button (disabled if on last page)

**Example**:
```html
<nav>
  <ul class="pagination">
    <li class="page-item <%= currentPage === 1 ? 'disabled' : '' %>">
      <a class="page-link" href="<%= baseUrl %>?page=<%= currentPage - 1 %>">Previous</a>
    </li>
    <% for (let i = 1; i <= totalPages; i++) { %>
      <li class="page-item <%= i === currentPage ? 'active' : '' %>">
        <a class="page-link" href="<%= baseUrl %>?page=<%= i %>"><%= i %></a>
      </li>
    <% } %>
    <li class="page-item <%= currentPage === totalPages ? 'disabled' : '' %>">
      <a class="page-link" href="<%= baseUrl %>?page=<%= currentPage + 1 %>">Next</a>
    </li>
  </ul>
</nav>
```

---

### 4.2 Layouts

#### 4.2.1 Auth Layout (`layouts/auth.ejs`)
**For login, register, forgot password pages**

**Structure**:
```html
<!DOCTYPE html>
<html lang="en">
  <%- include('../partials/head', { title: title }) %>
  <body class="auth-layout">
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- Left side: Branding/Image (hidden on mobile) -->
        <div class="col-md-6 d-none d-md-flex bg-primary text-white align-items-center justify-content-center">
          <div class="text-center">
            <h1 class="display-4">NoteFlash</h1>
            <p class="lead">Smart note-taking with AI-powered learning</p>
          </div>
        </div>
        
        <!-- Right side: Form -->
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="auth-form-container">
            <%- body %>
          </div>
        </div>
      </div>
    </div>
    
    <%- include('../partials/scripts') %>
  </body>
</html>
```

---

#### 4.2.2 Main Layout (`layouts/main.ejs`)
**For authenticated pages**

**Structure**:
```html
<!DOCTYPE html>
<html lang="en">
  <%- include('../partials/head', { title: title }) %>
  <body class="main-layout">
    <%- include('../partials/header') %>
    
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 col-lg-2 sidebar-col">
          <%- include('../partials/sidebar') %>
        </div>
        
        <!-- Main content -->
        <main class="col-md-9 col-lg-10 main-content">
          <%- body %>
        </main>
      </div>
    </div>
    
    <%- include('../partials/footer') %>
    <%- include('../partials/toast') %>
    <%- include('../partials/scripts') %>
  </body>
</html>
```

---

## 5. API Integration

### 5.1 API Client Setup (`public/js/utils/api.js`)

**Base Configuration**:
```javascript
const API_BASE_URL = '/api/v1';

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // For cookies
});

// Request interceptor (add loading state, etc.)
api.interceptors.request.use(
  config => {
    // Show loading indicator
    showLoading();
    return config;
  },
  error => {
    hideLoading();
    return Promise.reject(error);
  }
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  response => {
    hideLoading();
    return response;
  },
  async error => {
    hideLoading();
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Try to refresh token
      try {
        await refreshToken();
        // Retry original request
        return api.request(error.config);
      } catch {
        // Redirect to login
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      showToast('Access denied', 'error');
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      showToast('Resource not found', 'error');
    }
    
    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      showToast('Server error. Please try again later.', 'error');
    }
    
    return Promise.reject(error);
  }
);

// Refresh token function
async function refreshToken() {
  const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
    withCredentials: true
  });
  return response.data;
}
```

---

### 5.2 API Endpoint Functions

Create wrapper functions for each API endpoint:

**Auth API** (`public/js/utils/auth.js`):
```javascript
// Register
async function register(userData) {
  const response = await api.post('/auth/register', userData);
  return response.data;
}

// Login
async function login(credentials) {
  const response = await api.post('/auth/login', credentials);
  return response.data;
}

// Logout
async function logout() {
  const response = await api.post('/auth/logout');
  return response.data;
}

// Get current user
async function getCurrentUser() {
  const response = await api.get('/auth/me');
  return response.data;
}

// Forgot password
async function forgotPassword(email) {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
}

// Reset password
async function resetPassword(data) {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
}

// Resend verification email
async function resendVerification() {
  const response = await api.post('/auth/resend-verification-email');
  return response.data;
}
```

**Notes API** (`public/js/pages/notes.js`):
```javascript
// Get all notes
async function getNotes(params = {}) {
  const response = await api.get('/notes', { params });
  return response.data;
}

// Get single note
async function getNote(id) {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}

// Create note
async function createNote(noteData) {
  const response = await api.post('/notes', noteData);
  return response.data;
}

// Update note
async function updateNote(id, noteData) {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
}

// Delete note
async function deleteNote(id) {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}

// Search notes
async function searchNotes(query) {
  const response = await api.get('/notes/search', { params: { query } });
  return response.data;
}

// Toggle pin
async function togglePin(id) {
  const response = await api.patch(`/notes/${id}/pin`);
  return response.data;
}

// Toggle favorite
async function toggleFavorite(id) {
  const response = await api.patch(`/notes/${id}/favorite`);
  return response.data;
}

// Archive note
async function archiveNote(id) {
  const response = await api.patch(`/notes/${id}/archive`);
  return response.data;
}

// Get user tags
async function getUserTags() {
  const response = await api.get('/notes/tags');
  return response.data;
}

// Get user categories
async function getUserCategories() {
  const response = await api.get('/notes/categories');
  return response.data;
}
```

**Cards API** (`public/js/pages/cards.js`):
```javascript
// Get all cards
async function getCards(params = {}) {
  const response = await api.get('/cards', { params });
  return response.data;
}

// Get single card
async function getCard(id) {
  const response = await api.get(`/cards/${id}`);
  return response.data;
}

// Create card
async function createCard(cardData) {
  const response = await api.post('/cards', cardData);
  return response.data;
}

// Update card
async function updateCard(id, cardData) {
  const response = await api.put(`/cards/${id}`, cardData);
  return response.data;
}

// Delete card
async function deleteCard(id) {
  const response = await api.delete(`/cards/${id}`);
  return response.data;
}

// Generate flashcards from note
async function generateFlashcards(noteId) {
  const response = await api.post('/cards/ai', { noteId });
  return response.data;
}

// Search cards
async function searchCards(query) {
  const response = await api.get('/cards/search', { params: { query } });
  return response.data;
}

// Get cards by note
async function getCardsByNote(noteId) {
  const response = await api.get(`/cards/note/${noteId}`);
  return response.data;
}

// Delete cards by note
async function deleteCardsByNote(noteId) {
  const response = await api.delete(`/cards/note/${noteId}`);
  return response.data;
}

// Mark as reviewed
async function markAsReviewed(id) {
  const response = await api.patch(`/cards/${id}/review`);
  return response.data;
}

// Toggle pin
async function toggleCardPin(id) {
  const response = await api.patch(`/cards/${id}/pin`);
  return response.data;
}

// Toggle favorite
async function toggleCardFavorite(id) {
  const response = await api.patch(`/cards/${id}/favorite`);
  return response.data;
}
```

**Chat API** (`public/js/pages/chat.js`):
```javascript
// General chat
async function chat(message) {
  const response = await api.post('/chat', { message });
  return response.data;
}

// Chat with note context
async function chatWithNote(noteId, message) {
  const response = await api.post('/chat-with-note', { noteId, message });
  return response.data;
}
```

---

## 6. Authentication Flow

### 6.1 Token Management

**Tokens Storage**:
- Access token: HttpOnly cookie (set by backend)
- Refresh token: HttpOnly cookie (set by backend)
- No tokens stored in localStorage for security

**Token Refresh Flow**:
1. When API call returns 401 Unauthorized
2. Automatically call `/api/v1/auth/refresh-token`
3. If successful, retry original request
4. If refresh fails, redirect to `/login`

---

### 6.2 Protected Routes

**Server-side Route Protection**:
All authenticated pages must check for valid token before rendering.

**viewRoutes.js** structure:
```javascript
import express from 'express';
import tokenChecker from '../middlewares/tokenChecker.js';

const router = express.Router();

// Public routes
router.get('/login', (req, res) => {
  if (req.cookies.accessToken) {
    return res.redirect('/dashboard');
  }
  res.render('pages/auth/login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  if (req.cookies.accessToken) {
    return res.redirect('/dashboard');
  }
  res.render('pages/auth/register', { title: 'Register' });
});

// Protected routes
router.get('/dashboard', tokenChecker, async (req, res) => {
  // Fetch data needed for dashboard
  res.render('pages/dashboard', { 
    title: 'Dashboard',
    user: req.user 
  });
});

router.get('/notes', tokenChecker, (req, res) => {
  res.render('pages/notes/index', { 
    title: 'My Notes',
    user: req.user 
  });
});

// ... more routes

export default router;
```

**Middleware Requirements**:
- Token checker middleware must attach user info to `req.user`
- If token invalid, redirect to `/login`
- If token valid but email not verified (for certain routes), show verification reminder

---

### 6.3 Login Flow

1. User visits `/login`
2. If already logged in (has valid token), redirect to `/dashboard`
3. User enters credentials
4. Client-side validation
5. Submit to `POST /api/v1/auth/login`
6. On success:
   - Backend sets httpOnly cookies (access + refresh tokens)
   - Frontend redirects to `/dashboard`
7. On error:
   - Display error message
   - If "Email not verified", show link to resend verification

---

### 6.4 Registration Flow

1. User visits `/register`
2. User fills form with validation feedback
3. Submit to `POST /api/v1/auth/register`
4. On success:
   - Show success message: "Account created! Check your email to verify."
   - Redirect to `/login` after 2 seconds
5. On error:
   - Display validation errors inline

---

### 6.5 Logout Flow

1. User clicks "Logout" in user menu
2. Confirm (optional)
3. Call `POST /api/v1/auth/logout`
4. Backend clears cookies
5. Redirect to `/login`

---

## 7. Features Implementation

### 7.1 Quill Editor Integration

**Installation**:
Include Quill.js in pages that need rich text editor:
```html
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
```

**Initialization** (in note-editor.js):
```javascript
// Create editor instance
const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Start writing your note...',
  modules: {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['link', 'image'],
      ['clean']
    ]
  }
});

// Get content as Delta
const content = quill.getContents(); // Returns Delta object

// Set content from Delta
quill.setContents(deltaObject);

// Disable for read-only view
quill.disable();
```

**Saving Note**:
```javascript
async function saveNote() {
  const title = document.getElementById('note-title').value;
  const content = quill.getContents(); // Quill Delta format
  const tags = getSelectedTags();
  const category = document.getElementById('category').value;
  const color = selectedColor;
  const isPinned = document.getElementById('pin-toggle').checked;
  const isFavorite = document.getElementById('favorite-toggle').checked;
  
  const noteData = {
    title,
    content, // Send as-is (Delta format)
    tags,
    category,
    color,
    isPinned,
    isFavorite
  };
  
  try {
    const response = await createNote(noteData);
    showToast('Note saved successfully!', 'success');
    window.location.href = `/notes/view/${response.data._id}`;
  } catch (error) {
    showToast('Error saving note', 'error');
  }
}
```

**Rendering Note Content** (View mode):
```javascript
// Option 1: Use Quill in read-only mode
const quill = new Quill('#note-viewer', {
  theme: 'snow',
  readOnly: true,
  modules: { toolbar: false }
});
quill.setContents(noteContent); // noteContent is Delta object

// Option 2: Convert Delta to HTML and display
const html = convertDeltaToHTML(noteContent);
document.getElementById('note-content').innerHTML = html;
```

---

### 7.2 Color Picker Integration

**Library**: vanilla-picker or @simonwep/pickr

**Example with Pickr**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/classic.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js"></script>
```

```javascript
const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'classic',
  default: '#ffffff',
  swatches: [
    '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1',
    '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'
  ],
  components: {
    preview: true,
    opacity: false,
    hue: true,
    interaction: {
      hex: true,
      input: true,
      save: true
    }
  }
});

pickr.on('save', (color) => {
  selectedColor = color.toHEXA().toString();
  pickr.hide();
});
```

---

### 7.3 Search Functionality

**Client-side Debounced Search**:
```javascript
let searchTimeout;

function handleSearch(event) {
  const query = event.target.value.trim();
  
  // Clear previous timeout
  clearTimeout(searchTimeout);
  
  // Debounce for 300ms
  searchTimeout = setTimeout(async () => {
    if (query.length === 0) {
      // Show all items
      loadAllItems();
      return;
    }
    
    if (query.length < 2) {
      // Don't search for single character
      return;
    }
    
    try {
      // Call search API
      const results = await searchNotes(query);
      displaySearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  }, 300);
}

// Attach to search input
document.getElementById('search-input').addEventListener('input', handleSearch);
```

**Global Search** (Search across both notes and cards):
```javascript
async function globalSearch(query) {
  const [notesResults, cardsResults] = await Promise.all([
    searchNotes(query),
    searchCards(query)
  ]);
  
  return {
    notes: notesResults,
    cards: cardsResults
  };
}
```

---

### 7.4 Filtering and Sorting

**Filter State Management**:
```javascript
// Current filters
const filters = {
  category: null,
  tags: [],
  isPinned: null,
  isFavorite: null,
  isArchived: false,
  difficulty: null, // for cards
  page: 1,
  limit: 20,
  sort: '-lastEditedAt' // default sort
};

// Update filters
function updateFilter(key, value) {
  filters[key] = value;
  filters.page = 1; // Reset to first page
  loadItems();
}

// Load items with current filters
async function loadItems() {
  try {
    showLoading();
    const response = await getNotes(filters);
    displayItems(response.data);
    updatePagination(response.pagination);
  } catch (error) {
    showToast('Error loading items', 'error');
  } finally {
    hideLoading();
  }
}

// Category filter
document.getElementById('category-filter').addEventListener('change', (e) => {
  updateFilter('category', e.target.value || null);
});

// Tag filter (multi-select)
function handleTagSelection(selectedTags) {
  updateFilter('tags', selectedTags);
}

// Sort
document.getElementById('sort-select').addEventListener('change', (e) => {
  updateFilter('sort', e.target.value);
});
```

---

### 7.5 Pagination

**Pagination Handler**:
```javascript
function updatePagination(pagination) {
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;
  
  // Update info text
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  document.getElementById('pagination-info').textContent = 
    `Showing ${start}-${end} of ${totalItems} items`;
  
  // Build pagination controls
  const container = document.getElementById('pagination-controls');
  container.innerHTML = '';
  
  // Previous button
  const prevBtn = createPaginationButton('Previous', currentPage - 1, currentPage === 1);
  container.appendChild(prevBtn);
  
  // Page numbers
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  pageNumbers.forEach(pageNum => {
    if (pageNum === '...') {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.className = 'pagination-ellipsis';
      container.appendChild(ellipsis);
    } else {
      const pageBtn = createPaginationButton(pageNum, pageNum, false, pageNum === currentPage);
      container.appendChild(pageBtn);
    }
  });
  
  // Next button
  const nextBtn = createPaginationButton('Next', currentPage + 1, currentPage === totalPages);
  container.appendChild(nextBtn);
}

function createPaginationButton(text, pageNum, disabled, active = false) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = `btn btn-sm ${active ? 'btn-primary' : 'btn-outline-primary'}`;
  btn.disabled = disabled;
  btn.addEventListener('click', () => {
    filters.page = pageNum;
    loadItems();
  });
  return btn;
}

function generatePageNumbers(current, total) {
  // Show: 1 ... current-1 current current+1 ... total
  const pages = [];
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (current > 3) {
      pages.push('...');
    }
    
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    
    if (current < total - 2) {
      pages.push('...');
    }
    
    pages.push(total);
  }
  
  return pages;
}
```

---

### 7.6 Card Flip Animation

**HTML Structure**:
```html
<div class="flashcard" data-card-id="<%= card._id %>">
  <div class="flashcard-inner">
    <div class="flashcard-front">
      <h3><%= card.title %></h3>
      <button class="btn-flip">Show Answer</button>
    </div>
    <div class="flashcard-back">
      <p><%= card.content %></p>
      <button class="btn-flip">Show Question</button>
    </div>
  </div>
</div>
```

**CSS**:
```css
.flashcard {
  width: 100%;
  height: 300px;
  perspective: 1000px;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.flashcard-back {
  transform: rotateY(180deg);
}
```

**JavaScript**:
```javascript
function flipCard(cardElement) {
  cardElement.classList.toggle('flipped');
}

// Attach to all cards
document.querySelectorAll('.flashcard').forEach(card => {
  card.addEventListener('click', () => flipCard(card));
});
```

---

### 7.7 Auto-save Draft Feature

**LocalStorage Draft Management**:
```javascript
const DRAFT_KEY_PREFIX = 'draft_note_';

// Save draft
function saveDraft() {
  const draftData = {
    title: document.getElementById('note-title').value,
    content: quill.getContents(),
    tags: getSelectedTags(),
    category: document.getElementById('category').value,
    color: selectedColor,
    timestamp: Date.now()
  };
  
  const draftKey = DRAFT_KEY_PREFIX + (currentNoteId || 'new');
  localStorage.setItem(draftKey, JSON.stringify(draftData));
}

// Load draft
function loadDraft() {
  const draftKey = DRAFT_KEY_PREFIX + (currentNoteId || 'new');
  const savedDraft = localStorage.getItem(draftKey);
  
  if (savedDraft) {
    const draft = JSON.parse(savedDraft);
    const timeSaved = new Date(draft.timestamp);
    
    // Ask user if they want to restore
    if (confirm(`Found a draft saved on ${timeSaved.toLocaleString()}. Restore it?`)) {
      document.getElementById('note-title').value = draft.title;
      quill.setContents(draft.content);
      setSelectedTags(draft.tags);
      document.getElementById('category').value = draft.category;
      selectedColor = draft.color;
    }
  }
}

// Clear draft
function clearDraft() {
  const draftKey = DRAFT_KEY_PREFIX + (currentNoteId || 'new');
  localStorage.removeItem(draftKey);
}

// Auto-save every 30 seconds
let autoSaveInterval;
function startAutoSave() {
  autoSaveInterval = setInterval(saveDraft, 30000);
}

function stopAutoSave() {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
}

// Warn on unsaved changes
window.addEventListener('beforeunload', (e) => {
  if (hasUnsavedChanges()) {
    e.preventDefault();
    e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
  }
});
```

---

### 7.8 Tags Input with Autocomplete

**HTML**:
```html
<div class="tags-input-container">
  <div class="tags-display" id="tags-display"></div>
  <input type="text" 
         id="tags-input" 
         class="form-control" 
         placeholder="Add tags..."
         autocomplete="off">
  <div class="tags-suggestions" id="tags-suggestions"></div>
</div>
```

**JavaScript**:
```javascript
let selectedTags = [];
let allTags = []; // Load from API

async function loadExistingTags() {
  try {
    const response = await getUserTags();
    allTags = response.data || [];
  } catch (error) {
    console.error('Error loading tags:', error);
  }
}

function addTag(tag) {
  tag = tag.trim().toLowerCase();
  
  if (!tag || selectedTags.length >= 10) return;
  
  if (!selectedTags.includes(tag)) {
    selectedTags.push(tag);
    renderTags();
  }
  
  document.getElementById('tags-input').value = '';
  hideSuggestions();
}

function removeTag(tag) {
  selectedTags = selectedTags.filter(t => t !== tag);
  renderTags();
}

function renderTags() {
  const container = document.getElementById('tags-display');
  container.innerHTML = selectedTags.map(tag => `
    <span class="badge bg-secondary tag-badge">
      ${tag}
      <button type="button" class="btn-close btn-close-white btn-sm" 
              onclick="removeTag('${tag}')" 
              aria-label="Remove tag"></button>
    </span>
  `).join('');
}

function showSuggestions(inputValue) {
  if (!inputValue) {
    hideSuggestions();
    return;
  }
  
  const suggestions = allTags.filter(tag => 
    tag.toLowerCase().includes(inputValue.toLowerCase()) &&
    !selectedTags.includes(tag)
  );
  
  const container = document.getElementById('tags-suggestions');
  
  if (suggestions.length === 0) {
    hideSuggestions();
    return;
  }
  
  container.innerHTML = suggestions.map(tag => `
    <div class="suggestion-item" onclick="addTag('${tag}')">
      ${tag}
    </div>
  `).join('');
  
  container.style.display = 'block';
}

function hideSuggestions() {
  document.getElementById('tags-suggestions').style.display = 'none';
}

// Event listeners
document.getElementById('tags-input').addEventListener('input', (e) => {
  showSuggestions(e.target.value);
});

document.getElementById('tags-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTag(e.target.value);
  }
});
```

---

### 7.9 Toast Notifications

**Toast Utility** (`public/js/components/toast.js`):
```javascript
function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${getBootstrapColor(type)} border-0`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="${getIcon(type)} me-2"></i>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" 
              data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Show toast
  const bsToast = new bootstrap.Toast(toast, { delay: duration });
  bsToast.show();
  
  // Remove from DOM after hidden
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
}

function getBootstrapColor(type) {
  const colors = {
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'info'
  };
  return colors[type] || 'info';
}

function getIcon(type) {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  };
  return icons[type] || 'fas fa-info-circle';
}
```

---

### 7.10 Confirmation Dialog

**Confirmation Utility** (`public/js/components/confirmDialog.js`):
```javascript
function showConfirmDialog(title, message, onConfirm, onCancel = null) {
  // Create modal HTML
  const modalHTML = `
    <div class="modal fade" id="confirmModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ${message}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmBtn">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add to body
  const modalElement = document.createElement('div');
  modalElement.innerHTML = modalHTML;
  document.body.appendChild(modalElement.firstElementChild);
  
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  
  // Confirm button handler
  document.getElementById('confirmBtn').addEventListener('click', () => {
    modal.hide();
    if (onConfirm) onConfirm();
  });
  
  // Cancel handler
  if (onCancel) {
    document.getElementById('confirmModal').addEventListener('hidden.bs.modal', () => {
      onCancel();
      document.getElementById('confirmModal').remove();
    });
  } else {
    document.getElementById('confirmModal').addEventListener('hidden.bs.modal', () => {
      document.getElementById('confirmModal').remove();
    });
  }
  
  modal.show();
}

// Usage example
function deleteNote(noteId) {
  showConfirmDialog(
    'Delete Note',
    'Are you sure you want to delete this note? This action cannot be undone.',
    async () => {
      try {
        await deleteNoteAPI(noteId);
        showToast('Note deleted successfully', 'success');
        window.location.href = '/notes';
      } catch (error) {
        showToast('Error deleting note', 'error');
      }
    }
  );
}
```

---

## 8. Client-Side JavaScript Modules

### 8.1 Validation Module (`public/js/utils/validation.js`)

**Client-side validation matching backend Zod schemas**:

```javascript
// Username validation
function validateUsername(username) {
  const errors = [];
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  if (username.length > 30) {
    errors.push('Username must be at most 30 characters');
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }
  
  return { valid: errors.length === 0, errors };
}

// Email validation
function validateEmail(email) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    errors.push('Invalid email address');
  }
  
  return { valid: errors.length === 0, errors };
}

// Password validation
function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (password.length > 100) {
    errors.push('Password must be at most 100 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[\W_]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return { valid: errors.length === 0, errors };
}

// Note validation
function validateNote(noteData) {
  const errors = {};
  
  // Title
  if (!noteData.title || noteData.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (noteData.title.length > 200) {
    errors.title = 'Title cannot exceed 200 characters';
  }
  
  // Content (Quill Delta)
  if (!noteData.content || !noteData.content.ops || noteData.content.ops.length === 0) {
    errors.content = 'Content is required';
  }
  
  // Tags
  if (noteData.tags && noteData.tags.length > 10) {
    errors.tags = 'Cannot have more than 10 tags';
  }
  
  // Category
  if (noteData.category && noteData.category.length > 50) {
    errors.category = 'Category name cannot exceed 50 characters';
  }
  
  // Color
  if (noteData.color && !/^#[0-9A-Fa-f]{6}$/.test(noteData.color)) {
    errors.color = 'Invalid color format';
  }
  
  return { valid: Object.keys(errors).length === 0, errors };
}

// Card validation
function validateCard(cardData) {
  const errors = {};
  
  // Title
  if (!cardData.title || cardData.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (cardData.title.length > 500) {
    errors.title = 'Title cannot exceed 500 characters';
  }
  
  // Content
  if (!cardData.content || cardData.content.trim().length === 0) {
    errors.content = 'Content is required';
  } else if (cardData.content.length > 2000) {
    errors.content = 'Content cannot exceed 2000 characters';
  }
  
  // Tags
  if (cardData.tags && cardData.tags.length > 10) {
    errors.tags = 'Cannot have more than 10 tags';
  }
  
  // Color
  if (cardData.color && !/^#[0-9A-Fa-f]{6}$/.test(cardData.color)) {
    errors.color = 'Invalid color format';
  }
  
  // Difficulty
  if (cardData.difficulty && !['easy', 'medium', 'hard'].includes(cardData.difficulty)) {
    errors.difficulty = 'Invalid difficulty level';
  }
  
  return { valid: Object.keys(errors).length === 0, errors };
}

// Display validation errors
function displayValidationErrors(errors, formId) {
  // Clear previous errors
  document.querySelectorAll(`#${formId} .invalid-feedback`).forEach(el => el.remove());
  document.querySelectorAll(`#${formId} .is-invalid`).forEach(el => el.classList.remove('is-invalid'));
  
  // Display new errors
  Object.keys(errors).forEach(field => {
    const input = document.getElementById(field);
    if (input) {
      input.classList.add('is-invalid');
      const feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      feedback.textContent = errors[field];
      input.parentNode.appendChild(feedback);
    }
  });
}
```

---

### 8.2 Storage Utility (`public/js/utils/storage.js`)

```javascript
// Safe localStorage wrapper with error handling
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage error:', error);
      return defaultValue;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }
};
```

---

### 8.3 Helper Functions (`public/js/utils/helpers.js`)

```javascript
// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Format date
function formatDate(date, format = 'short') {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString();
  } else if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else if (format === 'relative') {
    return getRelativeTime(d);
  }
  
  return d.toISOString();
}

// Get relative time (e.g., "2 hours ago")
function getRelativeTime(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return formatDate(date, 'short');
}

// Truncate text
function truncate(text, maxLength, suffix = '...') {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

// Sanitize HTML
function sanitizeHTML(html) {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
}

// Generate random color
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Get initials from name
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard', 'success');
    return true;
  } catch (error) {
    console.error('Copy failed:', error);
    showToast('Failed to copy', 'error');
    return false;
  }
}
```

---

## 9. CSS/Styling Strategy

### 9.1 CSS Architecture

**File Organization**:
1. `main.css` - Global styles, variables, reset
2. `auth.css` - Authentication pages
3. `dashboard.css` - Dashboard specific
4. `notes.css` - Notes pages
5. `cards.css` - Cards pages
6. `chat.css` - Chat interface
7. `components.css` - Reusable components

---

### 9.2 CSS Variables (`public/css/main.css`)

```css
:root {
  /* Colors */
  --primary-color: #4A90E2;
  --secondary-color: #7B68EE;
  --success-color: #28A745;
  --danger-color: #DC3545;
  --warning-color: #FFC107;
  --info-color: #17A2B8;
  
  --text-primary: #212529;
  --text-secondary: #6C757D;
  --text-light: #ADB5BD;
  
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --bg-dark: #343A40;
  
  --border-color: #DEE2E6;
  --border-radius: 8px;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Layout */
  --sidebar-width: 250px;
  --header-height: 60px;
  --max-content-width: 1200px;
}

/* Dark mode variables */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #F8F9FA;
    --text-secondary: #ADB5BD;
    --text-light: #6C757D;
    
    --bg-primary: #1A1D23;
    --bg-secondary: #212529;
    --bg-dark: #0D0F12;
    
    --border-color: #343A40;
  }
}
```

---

### 9.3 Responsive Design

**Breakpoints**:
```css
/* Mobile first approach */
/* xs: < 576px (default) */
/* sm: >= 576px */
/* md: >= 768px */
/* lg: >= 992px */
/* xl: >= 1200px */
/* xxl: >= 1400px */

/* Example responsive grid */
.notes-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 576px) {
  .notes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .notes-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .notes-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

### 9.4 Component Styles Examples

**Note Card**:
```css
.note-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--note-color, var(--primary-color));
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
}

.note-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.note-card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.note-card-preview {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--text-light);
}

.note-card-actions {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  display: none;
  gap: var(--spacing-xs);
}

.note-card:hover .note-card-actions {
  display: flex;
}

.note-card-action-btn {
  background: var(--bg-secondary);
  border: none;
  padding: var(--spacing-xs);
  border-radius: 4px;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.note-card-action-btn:hover {
  background: var(--border-color);
}
```

**Flashcard**:
```css
.flashcard {
  width: 100%;
  max-width: 500px;
  height: 300px;
  perspective: 1000px;
  margin: 0 auto;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--bg-primary);
  box-shadow: var(--shadow-lg);
}

.flashcard-back {
  transform: rotateY(180deg);
  background: var(--bg-secondary);
}

.flashcard-difficulty-easy {
  border-color: var(--success-color);
}

.flashcard-difficulty-medium {
  border-color: var(--warning-color);
}

.flashcard-difficulty-hard {
  border-color: var(--danger-color);
}
```

---

## 10. Error Handling

### 10.1 Global Error Handler

```javascript
// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  showToast('An unexpected error occurred', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  showToast('An error occurred while processing your request', 'error');
});
```

---

### 10.2 API Error Handling

```javascript
function handleAPIError(error) {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || 'An error occurred';
    
    switch (status) {
      case 400:
        showToast(message, 'warning');
        return error.response.data?.errors || null;
      
      case 401:
        showToast('Session expired. Please login again.', 'error');
        setTimeout(() => window.location.href = '/login', 2000);
        break;
      
      case 403:
        showToast('Access denied', 'error');
        break;
      
      case 404:
        showToast('Resource not found', 'error');
        break;
      
      case 422:
        showToast('Validation error', 'warning');
        return error.response.data?.errors || null;
      
      case 500:
        showToast('Server error. Please try again later.', 'error');
        break;
      
      default:
        showToast(message, 'error');
    }
  } else if (error.request) {
    // Request made but no response
    showToast('Network error. Please check your connection.', 'error');
  } else {
    // Error setting up request
    showToast('An error occurred', 'error');
  }
  
  return null;
}
```

---

### 10.3 Form Error Display

```javascript
function displayFormErrors(errors, formId = 'main-form') {
  // Clear previous errors
  clearFormErrors(formId);
  
  if (!errors || typeof errors !== 'object') return;
  
  Object.keys(errors).forEach(fieldName => {
    const field = document.querySelector(`#${formId} [name="${fieldName}"]`);
    
    if (field) {
      field.classList.add('is-invalid');
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'invalid-feedback';
      errorDiv.textContent = Array.isArray(errors[fieldName]) 
        ? errors[fieldName][0] 
        : errors[fieldName];
      
      field.parentNode.appendChild(errorDiv);
    }
  });
}

function clearFormErrors(formId = 'main-form') {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.querySelectorAll('.is-invalid').forEach(el => {
    el.classList.remove('is-invalid');
  });
  
  form.querySelectorAll('.invalid-feedback').forEach(el => {
    el.remove();
  });
}
```

---

## 11. Implementation Phases

### Phase 1: Project Setup (Day 1)
1. Install EJS in Express server
2. Set up view routes (`src/routes/viewRoutes.js`)
3. Create folder structure (`views/`, `public/`)
4. Set up static file serving
5. Create base layouts (auth, main)
6. Create common partials (head, header, sidebar, footer)
7. Install and configure CSS framework (Bootstrap)
8. Install client-side libraries (Axios, Quill.js, etc.)

**Files to create**:
- `src/routes/viewRoutes.js`
- `views/layouts/auth.ejs`
- `views/layouts/main.ejs`
- `views/partials/head.ejs`
- `views/partials/header.ejs`
- `views/partials/sidebar.ejs`
- `views/partials/footer.ejs`
- `public/css/main.css`
- `public/js/utils/api.js`

---

### Phase 2: Authentication Pages (Day 2-3)
1. Create login page
2. Create register page
3. Create forgot password page
4. Create reset password page
5. Create email verification pages
6. Implement client-side validation
7. Implement auth API integration
8. Test complete auth flow

**Files to create**:
- `views/pages/auth/login.ejs`
- `views/pages/auth/register.ejs`
- `views/pages/auth/forgot-password.ejs`
- `views/pages/auth/reset-password.ejs`
- `views/pages/auth/verify-email.ejs`
- `public/css/auth.css`
- `public/js/auth/login.js`
- `public/js/auth/register.js`
- `public/js/auth/forgot-password.js`
- `public/js/auth/reset-password.js`
- `public/js/utils/validation.js`

---

### Phase 3: Dashboard & Core Layout (Day 4)
1. Create dashboard page
2. Fetch and display statistics
3. Display recent notes and cards
4. Implement quick actions
5. Test navigation between pages

**Files to create**:
- `views/pages/dashboard.ejs`
- `public/css/dashboard.css`
- `public/js/pages/dashboard.js`

---

### Phase 4: Notes Module (Day 5-7)
1. Create notes list page with filtering
2. Create note card component
3. Implement search functionality
4. Create note creation page with Quill editor
5. Create note edit page
6. Create note view page
7. Implement note actions (pin, favorite, archive, delete)
8. Implement pagination
9. Test all note operations

**Files to create**:
- `views/pages/notes/index.ejs`
- `views/pages/notes/create.ejs`
- `views/pages/notes/edit.ejs`
- `views/pages/notes/view.ejs`
- `views/pages/notes/archive.ejs`
- `views/partials/note-card.ejs`
- `public/css/notes.css`
- `public/js/pages/notes.js`
- `public/js/pages/note-editor.js`

---

### Phase 5: Flashcards Module (Day 8-10)
1. Create cards list page
2. Create flashcard card component
3. Implement card flip animation
4. Create card creation page
5. Create card edit page
6. Implement AI flashcard generation
7. Create study/review mode page
8. Implement card review tracking
9. Create cards-by-note page
10. Test all card operations

**Files to create**:
- `views/pages/cards/index.ejs`
- `views/pages/cards/create.ejs`
- `views/pages/cards/edit.ejs`
- `views/pages/cards/review.ejs`
- `views/pages/cards/by-note.ejs`
- `views/partials/flashcard-card.ejs`
- `public/css/cards.css`
- `public/js/pages/cards.js`
- `public/js/pages/card-editor.js`
- `public/js/pages/card-review.js`

---

### Phase 6: Chat Module (Day 11-12)
1. Create chat interface page
2. Implement message sending/receiving
3. Implement chat history display
4. Create chat-with-note page
5. Add typing indicators
6. Test chat functionality

**Files to create**:
- `views/pages/chat/index.ejs`
- `views/pages/chat/chat-with-note.ejs`
- `public/css/chat.css`
- `public/js/pages/chat.js`

---

### Phase 7: Additional Features (Day 13-14)
1. Create profile page
2. Implement color picker
3. Implement tags autocomplete
4. Implement auto-save drafts
5. Create toast notifications
6. Create confirmation dialogs
7. Implement global search
8. Create 404 and error pages

**Files to create**:
- `views/pages/profile.ejs`
- `views/pages/404.ejs`
- `views/error.ejs`
- `public/js/components/toast.js`
- `public/js/components/modal.js`
- `public/js/components/colorPicker.js`
- `public/js/utils/helpers.js`
- `public/js/utils/storage.js`

---

### Phase 8: Testing & Polish (Day 15-16)
1. Test all pages on different screen sizes
2. Test all user flows
3. Fix bugs and edge cases
4. Optimize performance
5. Add loading states
6. Improve accessibility
7. Cross-browser testing
8. Final UI polish

---

### Phase 9: Documentation (Day 17)
1. Create user guide
2. Document component usage
3. Document API integration
4. Create developer documentation

---

## 12. Server-Side Integration

### 12.1 Update Express Server

**Install EJS**:
```bash
npm install ejs
```

**Update `src/index.js`**:
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Import view routes
import viewRoutes from './routes/viewRoutes.js';
app.use('/', viewRoutes);
```

---

### 12.2 View Routes (`src/routes/viewRoutes.js`)

```javascript
import express from 'express';
import tokenChecker from '../middlewares/tokenChecker.js';

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  if (req.cookies.accessToken) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  if (req.cookies.accessToken) {
    return res.redirect('/dashboard');
  }
  res.render('pages/auth/login', { 
    title: 'Login',
    layout: 'layouts/auth'
  });
});

router.get('/register', (req, res) => {
  if (req.cookies.accessToken) {
    return res.redirect('/dashboard');
  }
  res.render('pages/auth/register', { 
    title: 'Register',
    layout: 'layouts/auth'
  });
});

router.get('/forgot-password', (req, res) => {
  res.render('pages/auth/forgot-password', { 
    title: 'Forgot Password',
    layout: 'layouts/auth'
  });
});

router.get('/reset-password', (req, res) => {
  res.render('pages/auth/reset-password', { 
    title: 'Reset Password',
    layout: 'layouts/auth'
  });
});

// Protected routes
router.get('/dashboard', tokenChecker, (req, res) => {
  res.render('pages/dashboard', { 
    title: 'Dashboard',
    user: req.user
  });
});

router.get('/notes', tokenChecker, (req, res) => {
  res.render('pages/notes/index', { 
    title: 'My Notes',
    user: req.user
  });
});

router.get('/notes/create', tokenChecker, (req, res) => {
  res.render('pages/notes/create', { 
    title: 'Create Note',
    user: req.user
  });
});

router.get('/notes/edit/:id', tokenChecker, (req, res) => {
  res.render('pages/notes/edit', { 
    title: 'Edit Note',
    user: req.user,
    noteId: req.params.id
  });
});

router.get('/notes/view/:id', tokenChecker, (req, res) => {
  res.render('pages/notes/view', { 
    title: 'View Note',
    user: req.user,
    noteId: req.params.id
  });
});

router.get('/notes/archive', tokenChecker, (req, res) => {
  res.render('pages/notes/archive', { 
    title: 'Archived Notes',
    user: req.user
  });
});

router.get('/cards', tokenChecker, (req, res) => {
  res.render('pages/cards/index', { 
    title: 'My Flashcards',
    user: req.user
  });
});

router.get('/cards/create', tokenChecker, (req, res) => {
  res.render('pages/cards/create', { 
    title: 'Create Flashcard',
    user: req.user
  });
});

router.get('/cards/edit/:id', tokenChecker, (req, res) => {
  res.render('pages/cards/edit', { 
    title: 'Edit Flashcard',
    user: req.user,
    cardId: req.params.id
  });
});

router.get('/cards/review', tokenChecker, (req, res) => {
  res.render('pages/cards/review', { 
    title: 'Study Mode',
    user: req.user
  });
});

router.get('/cards/note/:noteId', tokenChecker, (req, res) => {
  res.render('pages/cards/by-note', { 
    title: 'Flashcards from Note',
    user: req.user,
    noteId: req.params.noteId
  });
});

router.get('/chat', tokenChecker, (req, res) => {
  res.render('pages/chat/index', { 
    title: 'AI Chat',
    user: req.user
  });
});

router.get('/chat/note/:noteId', tokenChecker, (req, res) => {
  res.render('pages/chat/chat-with-note', { 
    title: 'Chat with Note',
    user: req.user,
    noteId: req.params.noteId
  });
});

router.get('/profile', tokenChecker, (req, res) => {
  res.render('pages/profile', { 
    title: 'My Profile',
    user: req.user
  });
});

// Error pages
router.get('/404', (req, res) => {
  res.status(404).render('pages/404', { 
    title: 'Page Not Found'
  });
});

// Catch all for 404
router.get('*', (req, res) => {
  res.status(404).render('pages/404', { 
    title: 'Page Not Found'
  });
});

export default router;
```

---

## 13. Final Checklist

### Pre-Development
- [ ] Review backend API documentation
- [ ] Set up development environment
- [ ] Install all required dependencies
- [ ] Create project folder structure

### Development
- [ ] Create all layouts
- [ ] Create all partials
- [ ] Implement authentication pages
- [ ] Implement dashboard
- [ ] Implement notes module
- [ ] Implement flashcards module
- [ ] Implement chat module
- [ ] Implement profile page
- [ ] Create error pages
- [ ] Implement all client-side utilities
- [ ] Implement all API integrations

### Testing
- [ ] Test authentication flow
- [ ] Test all CRUD operations for notes
- [ ] Test all CRUD operations for cards
- [ ] Test chat functionality
- [ ] Test all filters and search
- [ ] Test pagination
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test error handling
- [ ] Cross-browser testing
- [ ] Accessibility testing

### Polish
- [ ] Add loading states for all async operations
- [ ] Add transitions and animations
- [ ] Optimize images and assets
- [ ] Add favicon and meta tags
- [ ] Test performance
- [ ] Fix any UI inconsistencies

### Documentation
- [ ] Document component usage
- [ ] Create user guide
- [ ] Document API integration patterns
- [ ] Add code comments

---

## End of Plan

This comprehensive plan provides all the details needed to implement a complete EJS-based frontend for the NoteFlash application. Follow the phases sequentially for organized development.