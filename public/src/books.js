function findAuthorById(authors, id) {
  return authors.find(author=> author.id===id);
}

function findBookById(books, id) {
  return books.find(book=> book.id===id);
}

function partitionBooksByBorrowedStatus(books) {
  //return an array of all books split into two sub arrays, barrowed or not barrowed. returnArray[0]===barrwowed/returnArray[1]===returned
  /*let [barrowed, returned] =[[],[]];
  //for loop to traverse the book array
  for(let i = 0; i < books.length; i++){
    //if returned is true, push to returned, otherwise push to barrowed
    if(books[i].borrows[0].returned){
      returned.push(books[i]);
    }else{
      barrowed.push(books[i]);
    }
  }
  //join two arrays together.
  return [barrowed, returned];
  */
  return [books.filter((book)=>book.borrows[0].returned===false), books.filter((book)=>book.borrows[0].returned===true)];
}

function getBorrowersForBook(book, accounts) {
  //return array of the last 10 or fewer barrowers of the given book object.
  let result = [];
  //Makes sure result can be a maximum of 10 entries
  for(let i = 0; i < book.borrows.length && i < 10; i++){
    //findsthe account attached to the borrow record
    const found = accounts.find(account=>account.id===book.borrows[i].id);
    //builds new object with the account info and borrow status
    update = {...found, returned:book.borrows[i].returned};
    //adds updated object to array
    result.push(update);
  }
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
