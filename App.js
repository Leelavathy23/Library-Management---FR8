import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const handleStudentRegistration = (name) => {
    setStudents([...students, { name }]);
  };

  const handleAddBook = (title, author) => {
    setBooks([...books, { title, author, available: true }]);
  };

  const handleLendBook = (bookTitle, studentName) => {
    // Find the book by title
    const bookIndex = books.findIndex(book => book.title === bookTitle);

    if (bookIndex !== -1 && books[bookIndex].available) {
      // Update book availability to "Checked Out"
      const updatedBooks = [...books];
      updatedBooks[bookIndex].available = false;
      setBooks(updatedBooks);

      // Create a new transaction record (for demonstration purposes)
      const transaction = {
        bookTitle,
        studentName,
        action: 'Lend',
        timestamp: new Date().toLocaleString(),
      };

      // You can send this transaction data to your backend API for recording

      alert(`Book "${bookTitle}" has been lent to ${studentName}.`);
    } else {
      alert('Book is not available for lending.');
    }
  };

  const handleReturnBook = (bookTitle, studentName) => {
    // Find the book by title
    const bookIndex = books.findIndex(book => book.title === bookTitle);

    if (bookIndex !== -1 && !books[bookIndex].available) {
      // Update book availability to "Available"
      const updatedBooks = [...books];
      updatedBooks[bookIndex].available = true;
      setBooks(updatedBooks);

      // Create a new transaction record (for demonstration purposes)
      const transaction = {
        bookTitle,
        studentName,
        action: 'Return',
        timestamp: new Date().toLocaleString(),
      };

      // You can send this transaction data to your backend API for recording

      alert(`Book "${bookTitle}" has been returned by ${studentName}.`);
    } else {
      alert('Book cannot be returned.');
    }
  };

  const renderStudentRegistration = () => (
    <div>
      <h2>Student Registration</h2>
      <input
        type="text"
        placeholder="Enter student name"
        onChange={(e) => setSelectedStudent(e.target.value)}
      />
      <button onClick={() => handleStudentRegistration(selectedStudent)}>Register</button>
    </div>
  );

  const renderAddBook = () => (
    <div>
      <h2>Add a Book</h2>
      <input
        type="text"
        placeholder="Enter book title"
        onChange={(e) => setSelectedBook(e.target.value)}
      />
      <button onClick={() => handleAddBook(selectedBook, 'Author Name')}>Add</button>
    </div>
  );

  const renderBookList = () => (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author} - {book.available ? 'Available' : 'Checked Out'}
            <button onClick={() => handleLendBook(book.title, 'Student Name')}>Lend</button>
            <button onClick={() => handleReturnBook(book.title, 'Student Name')}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="App">
      <h1>Library Management System</h1>
      {renderStudentRegistration()}
      {renderAddBook()}
      {renderBookList()}
    </div>
  );
}

export default App;
