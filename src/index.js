import React from 'react';
import ReactDOM from 'react-dom';
import sampleData from './modules/sample-data';
import './styles/reset.css';
import './styles/index.css';

function EditBook(props) {
  const { id, onEdit } = props;
  return (
    <button type="button" onClick={() => onEdit(id)}>
      Edit
    </button>
  );
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
  const { id, onDelete, onEdit } = props;
  return (
    <div className="controls book-elements">
      <EditBook id={id} onEdit={onEdit} />
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
  const {
    id,
    title,
    author,
    pages,
    isRead,
    onReadChange,
    onDelete,
    onEdit,
  } = props;
  return (
    <div className="book">
      <BookDetails title={title} author={author} pages={pages} />
      <ReadCheckBox id={id} isRead={isRead} onReadChange={onReadChange} />
      <BookControls id={id} onDelete={onDelete} onEdit={onEdit} />
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
  const {
    showForm,
    closeForm,
    editData,
    handleValueChange,
    handleSubmit,
  } = props;
  const { title, author, pages, read } = editData;
  const modalClasses = showForm ? 'modal' : 'modal display-none';
  return (
    <div className={modalClasses}>
      <div className="modal-main">
        <button type="button" className="close" onClick={closeForm}>
          X
        </button>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <label className="label" htmlFor="title">
              Title
              <input
                className="input"
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={handleValueChange}
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
                value={author}
                onChange={handleValueChange}
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
                  value={pages}
                  onChange={handleValueChange}
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
                  checked={read}
                  onChange={handleValueChange}
                />
              </label>
            </div>
            <input className="submit" type="submit" value="Submit" />
          </form>
        </div>
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
      isEdit: false,
      editData: {
        id: 0,
        title: '',
        author: '',
        pages: '',
        read: false,
      },
    };
    this.closeForm = this.closeForm.bind(this);
    this.handleReadChange = this.handleReadChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  closeForm() {
    this.setState({
      showForm: false,
      isEdit: false,
      editData: {
        id: 0,
        title: '',
        author: '',
        pages: '',
        read: false,
      },
    });
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

  // handler for input values changes on form field
  handleValueChange(event) {
    const { target } = event;
    const { name } = target;
    const value = name === 'read' ? target.checked : target.value;
    const { editData } = this.state;
    const newEditData = { ...editData };
    newEditData[name] = value;
    this.setState({
      editData: newEditData,
    });
  }

  handleEdit(id) {
    const { books } = this.state;
    const currentBook = books.filter((e) => e.id === id)[0];
    const { title, author, pages, read } = currentBook;
    this.setState({
      showForm: true,
      isEdit: true,
      editData: {
        id,
        title,
        author,
        pages,
        read,
      },
    });
  }

  handleDelete(id) {
    const { books } = this.state;
    const newBooks = books.filter((e) => e.id !== id);
    this.setState({
      books: newBooks,
    });
  }

  handleEditSubmit(event) {
    event.preventDefault();
    const { books, editData } = this.state;
    const newBooks = books.map((e) => {
      if (e.id === editData.id) {
        e.title = editData.title;
        e.author = editData.author;
        e.pages = editData.pages;
        e.read = editData.read;
      }
      return e;
    });
    this.setState({
      books: newBooks,
      showForm: false,
      isEdit: false,
      editData: {
        id: 0,
        title: '',
        author: '',
        pages: '',
        read: false,
      },
    });
    event.target.reset();
  }

  handleAddSubmit(event) {
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
    const { showForm, isEdit, editData, books } = this.state;
    const handleSubmit = isEdit ? this.handleEditSubmit : this.handleAddSubmit;
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
          onEdit={this.handleEdit}
        />
      );
    });
    return (
      <div className="library">
        {renderedBooks}
        <NewBook onClick={this.handleAddButtonClick} />
        <Form
          showForm={showForm}
          closeForm={this.closeForm}
          isEdit={isEdit}
          editData={editData}
          handleValueChange={this.handleValueChange}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  }
}

ReactDOM.render(<Library />, document.getElementById('root'));
