/**
 * Test file for the /chat-with-note endpoint
 *
 * This demonstrates how to use the new chat-with-note route
 * Make sure to replace the placeholders with actual values:
 * - JWT_TOKEN: Your authentication token
 * - NOTE_ID: A valid note ID from your database
 */

const BASE_URL = 'http://localhost:3000/api'; // Adjust port if different

// Example 1: Ask a question about a note
async function testChatWithNote() {
  const JWT_TOKEN = 'your-jwt-token-here';
  const NOTE_ID = 'your-note-id-here';

  try {
    const response = await fetch(`${BASE_URL}/chat-with-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        message: "Can you summarize the key points from this note?",
        noteId: NOTE_ID
      })
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 2: Ask for explanation of a concept from the note
async function testExplainConcept() {
  const JWT_TOKEN = 'your-jwt-token-here';
  const NOTE_ID = 'your-note-id-here';

  try {
    const response = await fetch(`${BASE_URL}/chat-with-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        message: "Explain the first concept mentioned in this note in simpler terms",
        noteId: NOTE_ID
      })
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 3: Generate quiz questions from the note
async function testGenerateQuiz() {
  const JWT_TOKEN = 'your-jwt-token-here';
  const NOTE_ID = 'your-note-id-here';

  try {
    const response = await fetch(`${BASE_URL}/chat-with-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        message: "Create 3 quiz questions based on this note",
        noteId: NOTE_ID
      })
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 4: Error case - Missing noteId
async function testMissingNoteId() {
  const JWT_TOKEN = 'your-jwt-token-here';

  try {
    const response = await fetch(`${BASE_URL}/chat-with-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        message: "Summarize this note"
        // noteId is missing
      })
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 5: Error case - Invalid noteId
async function testInvalidNoteId() {
  const JWT_TOKEN = 'your-jwt-token-here';

  try {
    const response = await fetch(`${BASE_URL}/chat-with-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        message: "Summarize this note",
        noteId: "invalid-note-id-123456"
      })
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Expected Response Format:
/*
{
  "success": true,
  "response": "Here are the key points from your note: ...",
  "meta": "Summarized key points from note",
  "noteReference": {
    "noteId": "6789...",
    "noteTitle": "Introduction to Machine Learning"
  }
}
*/

// Run tests (uncomment the one you want to test)
// testChatWithNote();
// testExplainConcept();
// testGenerateQuiz();
// testMissingNoteId();
// testInvalidNoteId();

console.log('Test file loaded. Uncomment a test function to run it.');
