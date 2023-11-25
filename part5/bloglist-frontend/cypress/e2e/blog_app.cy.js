describe('Blog app basic', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'xiyuanzhang',
      username: 'xiyuan',
      password: '315728'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })
  // it('front page can be opened', () => {
  //   cy.contains('Blogs')
  // })

  it('login form is shown', function() {
    cy.get('#Username').type('xiyuan')
    cy.get('#Password').type('315728')
    cy.contains('login')

  })
  describe('Login',function() {


    it('succeeds with correct credentials', function() {
      // cy.get('loggout').click()
      cy.get('#Username').type('xiyuan')
      cy.get('#Password').type('315728')
      cy.get('#login-button').click()
      cy.contains('xiyuan logged in')

    })
    
    it('fails with wrong credentials', function() {
      cy.get('#Username').type('xiyuan')
      cy.get('#Password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong credential')
    })
  })
  describe('when logged in', function() {
      beforeEach(function() {
        cy.get('#Username').type('xiyuan')
        cy.get('#Password').type('315728')
    cy.get('#login-button').click()
      })
  
      it('a new blog can be created,liked', function() {
        cy.contains('create new blog').click()
        cy.get('#Title').type('a title')
        cy.get('#Author').type('jane')
        cy.get('#Url').type('jane.com')
        cy.get('#create').click()
        cy.contains('a title')
        cy.contains('a title').parent().as('blogPost');
        cy.get('@blogPost').contains('view').click();
    
        cy.get('@blogPost').find('.blogLikes').then(($likes) => {
        const initialLikes = parseInt($likes.text().split(' ')[1]);
    
        cy.get('@blogPost').contains('like').click();
        cy.get('@blogPost').find('.blogLikes').should('contain', initialLikes + 1);
          
      })
      })
  })
})

describe('Blog app advanced', () => {
  beforeEach(function() {
  // Reset the database
  cy.request('POST', 'http://localhost:3003/api/testing/reset');

  // Create two users
  const user1 = { name: 'Test User 1', username: 'testuser1', password: 'testpassword1' };
  const user2 = { name: 'Test User 2', username: 'testuser2', password: 'testpassword2' };

  cy.request('POST', 'http://localhost:3003/api/users/', user1);
  cy.request('POST', 'http://localhost:3003/api/users/', user2);
  cy.visit('http://localhost:5173');
});

  describe('Blog creation and deletion', function() {
  it('Delete button is visible to creator', function() {
    // Log in as the first user and create a blog
    cy.get('#Username').type('testuser1');
    cy.get("#Password").type('testpassword1');
    cy.get('button').contains('login').click();
    cy.contains('create new blog').click();
    cy.get('input[name="Title"]').type('Test Blog for Deletion');
    cy.get('input[name="Author"]').type('Author 1');
    cy.get('input[name="Url"]').type('http://testblogfordeletion.com');
    cy.get('#create').click()
    cy.contains('Test Blog for Deletion').parent().find('button').contains('view').click()
    // Check if the delete button is visible
    cy.contains('Test Blog for Deletion').parent().contains('delete').should('exist');
    
    // Log out
    cy.contains('logout').click();
  });

  it('Delete button is not visible to others', function() {
    // Log in as the second user
    cy.get('input[name="Username"]').clear().type('testuser2');
    cy.get('input[name="Password"]').clear().type('testpassword2');
    cy.get('button').contains('login').click();

    // Check if the delete button is not visible
    // cy.contains('Test Blog for Deletion').parent().should('not.contain', 'delete');
  })
})

  describe('Order of blogs', function() {
    it('Blogs are ordered according to likes', function() {
      //login
      cy.get('#Username').type('testuser1')
      cy.get("#Password").type('testpassword1')
      cy.get('button').contains('login').click()
      // create multi blogs
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('First Blog Title')
      cy.get('input[name="Author"]').type('Author 1')
      cy.get('input[name="Url"]').type('http://testblogfordeletion.com')
      cy.get('#create').click()
      cy.contains('create new blog').click()
      cy.get('input[name="Title"]').type('First Blog Title')
      cy.get('input[name="Author"]').type('Second Blog Title')
      cy.get('input[name="Url"]').type('http://testblogfordeletion.com')
      cy.get('#create').click() 
      // Assuming each blog has a 'view' button to show likes and a like button
      cy.contains('First Blog Title').parent().find('button').contains('view').click();
      cy.contains('Second Blog Title').parent().find('button').contains('view').click();

      // Like the first blog twice
      cy.contains('First Blog Title').parent().find('button').contains('like').as('firstLikeButton');
      cy.get('@firstLikeButton').click();
      cy.wait(500); // Wait for state to update
      cy.get('@firstLikeButton').click();
      cy.wait(500);

      // Like the second blog once
      cy.contains('Second Blog Title').parent().find('button').contains('like').click();
      cy.wait(500);

      // Check the order of the blogs
      cy.get('.blog').eq(0).should('contain', 'First Blog Title');
      cy.get('.blog').eq(1).should('contain', 'Second Blog Title');
    });
})
})


  




 

