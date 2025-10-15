import { postAPI } from '../pages/posts';
import type { PostAttributes } from '../pages/posts';

describe('API TESTS', () => {
  
//  let postAttributes: any;

let postAttributes: PostAttributes;

  beforeEach(() => {
    postAttributes = postAPI.generatePostAttributes();
  });

  it('creates a post', () => {
    postAPI.createPost(postAttributes).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title.rendered).to.eq(postAttributes.title);
      expect(response.body.content.raw).to.eq(postAttributes.content);
      const postId = response.body.id;
      cy.log(`Створено пост з ID: ${postId}`);
    });
  });

    it('fetches a post', () => {
      //Creates a new post
    postAPI.createPost(postAttributes).then((response) => {
    const postId = response.body.id;
    cy.log(`Створено пост з ID: ${postId}`);

      postAPI.getPost(postId, true).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title.rendered).to.eq(postAttributes.title);
        expect(response.body.content.raw).to.include(postAttributes.content);
        cy.log(`Знайдено пост з ID: ${postId}`);
      });
    });
  });

  it('edits a post', () => {
    postAPI.createPost(postAttributes).then((response) => {
      const postId = response.body.id;
      cy.log(`Створено пост з ID: ${postId}`);

      const newPostAttributes = postAPI.generatePostAttributes('pending');

      postAPI.editPost(postId, newPostAttributes).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title.rendered).to.eq(newPostAttributes.title);
        expect(response.body.content.raw).to.eq(newPostAttributes.content);
        expect(response.body.status).to.eq('pending');
        cy.log(`Оновлено пост з ID: ${postId}`);
      });
    });
  });

  it('deletes a post', () => {
    postAPI.createPost(postAttributes).then((response) => {
      const postId = response.body.id;
      cy.log(`Створено пост з ID: ${postId}`);

      postAPI.deletePost(postId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.deleted).to.be.true;
        cy.log(`Видалено пост з ID: ${postId}`);

        postAPI.getPost(postId).then((response) => {
          expect(response.status).to.eq(404);
          cy.log(`Не знайдено пост з ID: ${postId}`);
        });
      });
    });
  });
});


// import { faker } from '@faker-js/faker';

// describe('API TESTS', () => {
//   const baseUrl = 'https://dev.emeli.in.ua/wp-json/wp/v2';
//   const auth = { username: 'admin', password: 'Engineer_123' };

//   let postAttributes: { title: string; content: string; status: string };

//   beforeEach(() => {
//     postAttributes = {
//       title: faker.word.noun(),
//       content: faker.lorem.sentence(),
//       status: 'draft',
//     };
//   });

//   it('creates a post', () => {
//     cy.request({
//       method: 'POST',
//       url: `${baseUrl}/posts`,
//       auth,
//       body: postAttributes,
//     }).then((response) => {
//       expect(response.status).to.eq(201);
//       expect(response.body).to.have.property('id');
//       expect(response.body.title.rendered).to.eq(postAttributes.title);
//       expect(response.body.content.raw).to.eq(postAttributes.content);
//       const postId = response.body.id;
//       cy.log(`Створено пост з ID: ${postId}`);
//     });
//   });

//   it('fetches a post', () => {
//     cy.request({
//       method: 'POST',
//       url: `${baseUrl}/posts`,
//       auth,
//       body: postAttributes,
//     }).then((response) => {
//       expect(response.status).to.eq(201);
//       expect(response.body).to.have.property('id');
//       expect(response.body.title.rendered).to.eq(postAttributes.title);
//       expect(response.body.content.raw).to.eq(postAttributes.content);
//       const postId = response.body.id;
//       cy.log(`Створено пост з ID: ${postId}`);

//       cy.request({
//         method: 'GET',
//         url: `${baseUrl}/posts/${postId}`,
//         auth,
//         failOnStatusCode: false,
//       }).then((response) => {
//         expect(response.status).to.eq(200);
//         expect(response.body).to.have.property('id');
//         expect(response.body.title.rendered).to.eq(postAttributes.title);
//         expect(response.body.content.rendered).to.include(postAttributes.content);
//         cy.log(`Знайдено пост з ID: ${postId}`);
//       });
//     });
//   });

//   it('edits a post', () => {
//     const postTitle = faker.word.noun();
//     const postContent = faker.lorem.sentence();

//     const postAttributes = {
//       title: postTitle,
//       content: postContent,
//       status: 'draft'
//     };

//     cy.request({
//       method: 'POST',
//       url: `${baseUrl}/posts`,
//       auth,
//       body: postAttributes,
//     }).then((response) => {
//       expect(response.status).to.eq(201);
//       expect(response.body).to.have.property('id');
//       expect(response.body.title.rendered).to.eq(postAttributes.title);
//       expect(response.body.content.raw).to.eq(postAttributes.content);
//       const postId = response.body.id;
//       cy.log(`Створено пост з ID: ${postId}`);

//       const newPostTitle = faker.word.noun();
//       const newPostContent = faker.lorem.sentence();

//       const newPostAttributes = {
//         title: newPostTitle,
//         content: newPostContent,
//         status: 'pending'
//       };

//       cy.request({
//         method: 'PUT',
//         url: `${baseUrl}/posts/${postId}`,
//         auth,
//         body: newPostAttributes,
//       }).then((response) => {
//         expect(response.status).to.eq(200);
//         expect(response.body.title.rendered).to.eq(newPostTitle);
//         expect(response.body.content.raw).to.eq(newPostContent);
//         expect(response.body.status).to.eq(newPostAttributes.status);
//         const postId = response.body.id;
//         cy.log(`Оновлено пост з ID: ${postId}`);
//       });
//     });
//   });

  // it('deletes a post', () => {
  //   const postTitle = faker.word.noun();
  //   const postContent = faker.lorem.sentence();

  //   const postAttributes = {
  //     title: postTitle,
  //     content: postContent,
  //     status: 'draft'
  //   };

  //   cy.request({
  //     method: 'POST',
  //     url: `${baseUrl}/posts`,
  //     auth,
  //     body: postAttributes,
  //   }).then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body).to.have.property('id');
  //     expect(response.body.title.rendered).to.eq(postAttributes.title);
  //     expect(response.body.content.raw).to.eq(postAttributes.content);
  //     const postId = response.body.id;
  //     cy.log(`Створено пост з ID: ${postId}`);

  //     cy.request({
  //       method: 'DELETE',
  //       url: `${baseUrl}/posts/${postId}`,
  //       auth,
  //     }).then((response) => {
  //       expect(response.status).to.eq(200);
  //       cy.log(`Видалено пост з ID: ${postId}`);

  //       cy.request({
  //         method: 'GET',
  //         url: `${baseUrl}/posts/${postId}`,
  //         auth,
  //       }).then((response) => {
  //         expect(response.status).to.eq(200);

  //         expect(response.body.status).to.eq('trash');
  //       });
  //     });
  //   });
  // });
// });