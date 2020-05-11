import React from 'react';
import ReactDOM from 'react-dom';
import sampleData from './modules/sample-data';
import './styles/index.css';
import './styles/reset.css';

function EditBook(props) {
  return <button type="button">Edit</button>;
}

function DeleteBook(props) {
  return <button type="button">Delete</button>;
}

function BookControls(props) {
  return (
    <div className="controls book-elements">
      <EditBook />
      <DeleteBook />
    </div>
  );
}

function ReadCheckBox(props) {
  const { isRead } = props;
  return (
    <div className="checkbox-container book-elements">
      <form>
        <label htmlFor="read">
          Is Read?
          <input
            id="read"
            name="read"
            type="checkbox"
            checked={isRead}
            // onReadChange={handleChange}
            // Create handler function
          />
        </label>
      </form>
    </div>
  );
}

function BookDetails(props) {
  const { title, author, pages } = props;
  return (
    <div className="book-details book-elements">
      <p>
        Title:
        <span>{title}</span>
      </p>
      <p>
        Author:
        <span>{author}</span>
      </p>
      <p>
        Pages:
        <span>{pages}</span>
      </p>
    </div>
  );
}

function Book(props) {
  const { title, author, pages, isRead } = props;
  return (
    <div className="book">
      <BookDetails title={title} author={author} pages={pages} />
      <ReadCheckBox isRead={isRead} />
      <BookControls />
    </div>
  );
}

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: sampleData,
    };
  }

  render() {
    const { books } = this.state;
    const renderedBooks = books.map((e) => {
      return (
        <Book
          key={e.id}
          title={e.title}
          author={e.author}
          pages={e.pages}
          isRead={e.read}
        />
      );
    });
    return <div className="library">{renderedBooks}</div>;
  }
}

ReactDOM.render(<Library />, document.getElementById('root'));
