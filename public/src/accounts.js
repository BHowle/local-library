function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  //use .sort to sort the accounts by last name and return sorted array
  return accounts.sort((accountA,accountB)=>accountA.name.last.toLowerCase()>accountB.name.last.toLowerCase()?1:-1);
}

function getTotalNumberOfBorrows(account, books) {
  /*Using a specific account search through each books barrowers list for that ID. return total amount. Returns number.
  let total = 0;
  //first for loop traverses through individual books
  for(let book in books){
    const borrow = books[book];
    //second for loop looks at all of the borrows instances for specific ID.
    for(let i = 0; i < borrow.borrows.length; i++){
      if(borrow.borrows[i].id===account.id) total++;
    }
  }
  return total;*/
  //rework to use reduce;
  return books.reduce((acc, book)=>{
    if(book.borrows.find((book)=>book.id===account.id)) acc++;
    return acc;
  },0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //return an array of all books currently checked out by the account and replace author id with author information from authors.
  //when we find a book checked out by specific account, build new book object and add it too the array.
  const result = books.filter(book=>book.borrows[0].id===account.id && !book.returned);
  for(let book of result){
    const author = authors.find(author => author.id === book.authorId);
    book["author"] = author;
  }
  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
