import React from 'react';
import ReactDOM from 'react-dom';
import sampleData from './modules/sample-data';
import './styles/index.css';
import './styles/reset.css';

function EditBook(props) {
  return <button type="button">Edit</button>;
}

function DeleteBook(props) {
  const { id, onDelete } = props;
  return (
    <button type="button" onClick={() => onDelete(id)}>
      Delete
    </button>
  );
}

function BookControls(props) {
  const { id, onDelete } = props;
  return (
    <div className="controls book-elements">
      <EditBook />
      <DeleteBook id={id} onDelete={onDelete} />
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
  const { id, title, author, pages, isRead, onDelete } = props;
  return (
    <div className="book">
      <BookDetails title={title} author={author} pages={pages} />
      <ReadCheckBox isRead={isRead} />
      <BookControls id={id} onDelete={onDelete} />
    </div>
  );
}

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: sampleData,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const { books } = this.state;
    const newBooks = books.filter((e) => e.id !== id);
    this.setState({
      books: newBooks,
    });
  }

  render() {
    const { books } = this.state;
    const renderedBooks = books.map((e) => {
      return (
        <Book
          key={e.id}
          id={e.id}
          title={e.title}
          author={e.author}
          pages={e.pages}
          isRead={e.read}
          onDelete={this.handleDelete}
        />
      );
    });
    return <div className="library">{renderedBooks}</div>;
  }
}

ReactDOM.render(<Library />, document.getElementById('root'));
