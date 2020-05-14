import React from 'react';
import ReactDOM from 'react-dom';
import sampleData from './modules/sample-data';
import './styles/reset.css';
import './styles/index.css';

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
  const { id, isRead, onReadChange } = props;
  return (
    <div className="checkbox-container book-elements">
      <form>
        <label htmlFor="read-status">
          Is Read
          <input
            id="read-status"
            name="read"
            type="checkbox"
            checked={isRead}
            onChange={() => onReadChange(id)}
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
  const { id, title, author, pages, isRead, onReadChange, onDelete } = props;
  return (
    <div className="book">
      <BookDetails title={title} author={author} pages={pages} />
      <ReadCheckBox id={id} isRead={isRead} onReadChange={onReadChange} />
      <BookControls id={id} onDelete={onDelete} />
    </div>
  );
}

function NewBook(props) {
  const { onClick } = props;
  return (
    <div className="book new-book">
      <button
        className="add-book-button"
        type="button"
        onClick={() => onClick()}
      >
        +
      </button>
    </div>
  );
}

function Form(props) {
  const { showForm, handleSubmit } = props;
  const modalClasses = showForm ? 'modal' : 'modal display-none';
  return (
    <div className={modalClasses}>
      <div className="modal-main">
        <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="title">
            Title
            <input
              className="input"
              id="title"
              name="title"
              type="text"
              required
            />
          </label>
          <label className="label" htmlFor="author">
            Author
            <input
              className="input"
              id="author"
              name="author"
              type="text"
              required
            />
          </label>
          <div className="input-group">
            <label className="label" htmlFor="pages">
              Pages
              <input
                className="input"
                id="pages"
                name="pages"
                type="number"
                min="0"
                required
              />
            </label>
            <label className="label" htmlFor="is-read">
              Read ?
              <input
                className="input"
                id="is-read"
                name="read"
                type="checkbox"
              />
            </label>
          </div>
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: sampleData,
      showForm: false,
    };
    this.handleReadChange = this.handleReadChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleReadChange(id) {
    const { books } = this.state;
    const newBooks = books.map((e) => {
      if (e.id === id) {
        e.read = e.read !== true;
      }
      return e;
    });
    this.setState({
      books: newBooks,
    });
  }

  handleDelete(id) {
    const { books } = this.state;
    const newBooks = books.filter((e) => e.id !== id);
    this.setState({
      books: newBooks,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { books } = this.state;
    const newBook = {
      id: books[books.length - 1].id + 1,
      title: event.target.title.value,
      author: event.target.author.value,
      pages: event.target.pages.value,
      read: event.target['is-read'].checked,
    };
    const newBooks = books.concat(newBook);
    this.setState({
      showForm: false,
      books: newBooks,
    });
    event.target.reset();
  }

  handleAddButtonClick() {
    this.setState({
      showForm: true,
    });
  }

  render() {
    const { showForm, books } = this.state;
    const renderedBooks = books.map((e) => {
      return (
        <Book
          key={e.id}
          id={e.id}
          title={e.title}
          author={e.author}
          pages={e.pages}
          isRead={e.read}
          onReadChange={this.handleReadChange}
          onDelete={this.handleDelete}
        />
      );
    });
    return (
      <div className="library">
        {renderedBooks}
        <NewBook onClick={this.handleAddButtonClick} />
        <Form showForm={showForm} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

ReactDOM.render(<Library />, document.getElementById('root'));
