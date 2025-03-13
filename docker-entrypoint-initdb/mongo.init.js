db.createUser({
  // user for database which shall be created
  user: 'general-user',
  // password of user
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'sample-dev',
    },
  ],
});
