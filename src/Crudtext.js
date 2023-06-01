
import React, { useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function CRUD() {
  const { isAuthenticated } = useAuth0();
  const [lists, setList] = useState([]);
  const [updateState, setUpdateState] = useState(-1);

  useEffect(() => {
    const storedListData = localStorage.getItem('listData');
    if (storedListData) {
      setList(JSON.parse(storedListData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listData', JSON.stringify(lists));
  }, [lists]);

  function handleEdit(id) {
    setUpdateState(id);
  }

  function handleDelete(id) {
    const newlist = lists.filter((li) => li.id !== id);
    setList(newlist);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const date = event.target.elements.date.value;
    const description = event.target.elements.description.value;

    if (updateState !== -1) {
      const updatedList = lists.map((li) =>
        li.id === updateState ? { ...li, name, date, description } : li
      );
      setList(updatedList);
      setUpdateState(-1);
    } else {
      const newlist = {
        id: Date.now(),
        name,
        date,
        description,
      };
      setList((prevList) => [...prevList, newlist]);
    }

    event.target.reset();
  }

  if (!isAuthenticated) {
    return null; // Return null if the user is not authenticated
  }

  return (
    <div className="crud" style={{ backgroundColor: '#d0bdf4' }}>
      <div>
        <AddList setList={setList} />
        <form onSubmit={handleSubmit}>
          <table style={{ backgroundColor: ' #2d545e', color: 'white' }}>
            <tbody>
              {lists.map((current) =>
                updateState === current.id ? (
                  <EditList
                    key={current.id}
                    current={current}
                    setList={setList}
                    setUpdateState={setUpdateState}
                  />
                ) : (
                  <tr key={current.id}>
                    <td>{current.name}</td>
                    <td>{current.date}</td>
                    <td>{current.description}</td>
                    <td>
                      <button className="edit mx-3" onClick={() => handleEdit(current.id)}>
                        Edit
                      </button>
                      <button className="delete" type="button" onClick={() => handleDelete(current.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

function EditList({ current, setList, setUpdateState }) {
  const nameRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  function handleUpdate(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;
    const updatedList = {
      ...current,
      name,
      date,
      description,
    };
    setList((prevList) => prevList.map((item) => (item.id === current.id ? updatedList : item)));
    setUpdateState(-1);
  }

  if (!current) {
    return null;
  }

  return (
    <tr>
      <td>
        <input type="text" name="name" defaultValue={current.name || ''} ref={nameRef} />
      </td>
      <td>
        <input type="date" name="date" defaultValue={current.date || ''} ref={dateRef} />
      </td>
      <td>
        <textarea
          name="description"
          defaultValue={current.description || ''}
          ref={descriptionRef}
          style={{ width: '100%', height: '32px' }}
        />
      </td>
      <td>
        <button className="btn btn-secondary" type="submit" onClick={handleUpdate}>
          Update
        </button>
      </td>
    </tr>
  );
}

function AddList({ setList }) {
  const nameRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const date = event.target.elements.date.value;
    const description = event.target.elements.description.value;
    const newlist = {
      id: Date.now(),
      name,
      date,
      description,
    };
    setList((prevList) => [...prevList, newlist]);
    event.target.reset();
  }

  return (
    <form className="addForm mx-3" onSubmit={handleSubmit}>
      <input className="my-1" type="text" name="name" placeholder="Enter Name" ref={nameRef} required />
      <input className="my-3" type="date" name="date" placeholder="Enter Date" ref={dateRef} required />
      <textarea
        className="my-3"
        name="description"
        placeholder="Enter Description of your task"
        ref={descriptionRef}
        style={{ width: '100%', height: '70px', border: '5px solid pink' }}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CRUD;
