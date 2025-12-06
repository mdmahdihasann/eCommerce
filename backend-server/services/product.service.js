const crypto = require("crypto");

const getPostById = (postId, db) => {
  return db.get("posts").find({ id: postId }).value();
};

const likePost = (postId, user, db) => {
  const { id } = user;
  const post = getPostById(postId, db);

  if (!post) throw new Error("Post not found");

  let likes;
  let message;

  if (post.likes.includes(id)) {
    likes = post.likes.filter((like) => like !== id);
    message = "Post Unliked";
  } else {
    likes = [...post.likes, id];
    message = "Post Liked";
  }

  db.get("posts").find({ id: postId }).assign({ likes }).write();
  return { message, likeCount: likes.length };
};

const comment = (postId, db, user, commentText) => {
  const { id, name, avatar } = user;
  const post = getPostById(postId, db);

  if (!post) throw new Error("Post not found");

  const comments = [
    ...post.comments,
    { id: crypto.randomUUID(), comment: commentText, createdAt: new Date(), author: { id, name, avatar } },
  ];

  db.get("posts").find({ id: postId }).assign({ comments }).write();
  return { message: "Comment Added", commentCount: comments.length, comments };
};

const deleteComment = (postId, commentId, db, user) => {
  const post = getPostById(postId, db);

  if (!post) throw new Error("Post not found");

  const commentToDelete = post.comments.find((c) => c.id === commentId);
  if (!commentToDelete) throw new Error("Comment not found");

  // Only author of post or comment can delete
  if (post.author.id !== user.id && commentToDelete.author.id !== user.id) {
    throw new Error("You are not allowed to delete this comment");
  }

  const comments = post.comments.filter((c) => c.id !== commentId);
  db.get("posts").find({ id: postId }).assign({ comments }).write();

  return { message: "Comment Deleted", commentCount: comments.length, comments };
};

module.exports.PostService = { likePost, comment, deleteComment };
