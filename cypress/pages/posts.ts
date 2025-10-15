import { faker } from '@faker-js/faker';

export interface PostAttributes {
  title: string;
  content: string;
  status: string;
}

export class PostAPI {
//   baseUrl = 'https://dev.emeli.in.ua/wp-json/wp/v2';
//   auth = { username: 'admin', password: 'Engineer_123' };

  private baseUrl: string;
  private auth: { username: string; password: string };
 

  constructor() {
    this.baseUrl = Cypress.env('WP_BASE_URL') || 'https://dev.emeli.in.ua/wp-json/wp/v2';
    this.auth = {
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    };
  }

  // Generates random post data
  generatePostAttributes(status: string = 'draft'): PostAttributes {
    return {
      title: faker.word.noun(),
      content: faker.lorem.sentence(),
      status,
    };
  }

  // Create a new post
  createPost(postAttributes: PostAttributes) {
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
      failOnStatusCode: false,
    });
  }

  // Edit a post
  editPost(postId: number, newPostAttributes: PostAttributes) {
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
      url: `${this.baseUrl}/posts/${postId}/?force=true`,
      auth: this.auth,
    });
  }
}

export const postAPI = new PostAPI();
