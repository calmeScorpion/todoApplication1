import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DataTable from 'react-data-table-component';
import ReactModal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {
  setPosts,
  showForm,
  addPost,
  getPost,
  cancelForm,
  editPost,
  deletePost,
  resetSuccessMessage,
} from '../actions';
import moment from 'moment/moment';
import Form from './Form';

const PostList = ({
  posts,
  setPosts,
  showForm,
  addPost,
  getPost,
  cancelForm,
  editPost,
  deletePost,
  resetSuccessMessage,
  authentication,
}) => {
  const [delModalConfig, setDelModalConfig] = useState({
    showModal: false,
    deleteId: null,
  });
  console.log('authentication:', authentication.isSignedIn);
  useEffect(() => {
    if (!posts.onDeleteLoading) {
      setDelModalConfig({
        showModal: false,
        deleteId: null,
      });
    }
  }, [posts.onDeleteLoading]);

  useEffect(() => {
    if (posts.successMessage) {
      toast.success(posts.successMessage, toastConfig);
      resetSuccessMessage();
    }
  }, [posts.successMessage]);

  useEffect(() => {
    setPosts();
  }, []);

  ReactModal.setAppElement('#root');

  const toastConfig = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  };

  const [showModal, setShowModal] = useState(true);

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.body,
    },
    {
      name: 'Created Date',
      selector: (row) =>
        moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          {authentication.isSignedIn ? (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => onEditRecord(row)}
            >
              Edit
              {posts.onEditLoading && posts.selectedPostId === row.id ? (
                <div
                  class="spinner-grow spinner-grow-sm"
                  style={{ marginLeft: '5px' }}
                ></div>
              ) : null}
            </button>
          ) : null}
          {authentication.isSignedIn ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelModal(row)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          ) : null}
        </div>
      ),
    },
  ];
  const onDelModal = (row) => {
    setDelModalConfig({
      showModal: true,
      deleteId: row.id,
    });
  };

  const onCloseModal = (row) => {
    setDelModalConfig({
      showModal: false,
      deleteId: null,
    });
  };
  const onDeleteConfirm = () => {
    deletePost(delModalConfig.deleteId);
  };

  const onEditRecord = (row) => {
    console.log(row.id);
    getPost(row.id);
  };

  const onFormSubmit = (data) => {
    console.log(data);
    if (posts.selectedPostId) {
      editPost(posts.selectedPostId, {
        title: data.title,
        body: data.description,
        updatedAt: new Date().getTime(),
      });
    } else {
      addPost({
        title: data.title,
        body: data.description,
        createdAt: new Date().getTime(),
      });
    }
  };

  return (
    <div className="container">
      <div className="header d-flex justify-content-between align -item-center m-2">
        <ToastContainer />
        <h1>POSTS</h1>

        <ReactModal
          isOpen={delModalConfig.showModal}
          contentLabel="Minimal Modal Example"
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onCloseModal()}
          >
            Close Modal
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => onDeleteConfirm()}
          >
            Confirm{''}
            {posts.onDeleteLoading ? <i className="bi bi-ubuntu">...</i> : null}
          </button>
        </ReactModal>

        {posts.showForm ? null : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => showForm(true)}
          >
            Add Post
          </button>
        )}
      </div>
      {posts.showForm ? (
        <Form
          onFormSubmit={onFormSubmit}
          selectedPostDetails={posts.selectedPostDetails}
          onCancel={cancelForm}
          onSumbitLoading={posts.addPostLoading}
        />
      ) : (
        <DataTable
          columns={columns}
          data={posts.data}
          pagination
          progressPending={posts.loadingData}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts, authentication: state.authentication };
};

export default connect(mapStateToProps, {
  setPosts,
  showForm,
  addPost,
  getPost,
  cancelForm,
  editPost,
  deletePost,
  resetSuccessMessage,
})(PostList);
