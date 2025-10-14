describe('API TESTS', () => {

 const baseUrl = 'https://dev.emeli.in.ua/wp-json/wp/v2/posts';
 const authToken = 'Basic ' + btoa('admin:Engineer_123');
 let createdPostId: number;

 afterEach(() => {
    if (createdPostId) {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/${createdPostId}`,
        headers: {
          'Authorization': authToken
        },
        failOnStatusCode: false
      });
    //   createdPostId = null;
    }
  });

    it('creates a post', () => {
      const postData = {
      title: 'Test',
      content: 'Test post',
      status: 'draft'
    };
 
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      },
      body: postData
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title.rendered).to.eq(postData.title);
      expect(response.body.content.rendered).to.include(postData.content);
      expect(response.body.status).to.eq('draft');
      expect(response.body.type).to.eq('post');
      createdPostId = response.body.id;
      cy.log(`Створено пост з ID: ${createdPostId}`);
    });
    })

    it('fetches a post', () => {
      const postData = {
      title: 'Test',
      content: 'Test post',
      status: 'draft'
    };
 
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json'
      },
      body: postData
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title.rendered).to.eq(postData.title);
      expect(response.body.content.rendered).to.include(postData.content);
      expect(response.body.status).to.eq('draft');
      expect(response.body.type).to.eq('post');
      createdPostId = response.body.id;
      cy.log(`Створено пост з ID: ${createdPostId}`);

      cy.request({
            method: 'GET',
            url: `${baseUrl}/${createdPostId}`,
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            },

        }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(createdPostId);
        expect(response.body.title.rendered).to.eq(postData.title);
        cy.log(`Переглянуто пост з ID: ${createdPostId}`);
    });
    })
})

it('creates multiple posts', () => {
    const postData = [
      { title: 'Post1', content: 'Content1', status: 'draft' },
      { title: 'Post2', content: 'Content2', status: 'draft' },
      { title: 'Post3', content: 'Content3', status: 'draft' }
    ];
 
    const createdIds: number[] = [];
 
    cy.wrap(postData).each((postData: any) => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: postData
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title.rendered).to.eq(postData.title);
        createdIds.push(response.body.id);
      });
    }).then(() => {
      expect(createdIds).to.have.length(3);
      // Видалення всіх створених постів
      createdIds.forEach(id => {
        cy.request({
          method: 'DELETE',
          url: `${baseUrl}/${id}`,
          headers: {
            'Authorization': authToken
          },
          failOnStatusCode: false
        });
      });
    });
})
})

