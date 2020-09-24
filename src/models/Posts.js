class Posts {
  constructor(posts) {
    this.posts = posts;
  }

  addPost(newPoemDetails, userId) {
    const data = this.posts;
    const postsClone = data.slice();
    postsClone.unshift({
      id: postsClone.length,
      ...newPoemDetails,
      userId: userId,
      likes: [],
      comments: [],
    });
    this.posts = postsClone;
    return this.posts;
  }
}

module.exports = Posts;
