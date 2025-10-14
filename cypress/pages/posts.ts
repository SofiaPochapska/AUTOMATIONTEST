import { faker } from '@faker-js/faker';

export class PostAPI {
  baseUrl = 'https://dev.emeli.in.ua/wp-json/wp/v2';
  auth = { username: 'admin', password: 'Engineer_123' };

  // Generates random post data
  generatePostAttributes(status: string = 'draft') {
    return {
      title: faker.word.noun(),
      content: faker.lorem.sentence(),
      status,
    };
  }

  // Create a new post
  createPost(postAttributes: any) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/posts`,
      auth: this.auth,
      body: postAttributes,
    });
  }

  // Fetch a post by ID
  getPost(postId: number, includeRaw: boolean = false) {
    const url = includeRaw
      ? `${this.baseUrl}/posts/${postId}?context=edit`
      : `${this.baseUrl}/posts/${postId}`;
    return cy.request({
      method: 'GET',
      url,
      auth: this.auth,
    });
  }

  // Edit a post
  editPost(postId: number, newPostAttributes: any) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}/posts/${postId}`,
      auth: this.auth,
      body: newPostAttributes,
    });
  }

  // Delete a post
  deletePost(postId: number) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/posts/${postId}`,
      auth: this.auth,
    });
  }
}

export const postAPI = new PostAPI();
