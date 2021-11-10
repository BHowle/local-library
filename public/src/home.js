function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //first id of barrowers is most recent => only need to check books.barrowers[0].returned for count
  return books.reduce((acc, book)=>{
    if(book.borrows[0].returned === false)acc++;
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  //return array of objects { name: "Genre", count: #of books} that are the most common genres in book list. No more than 5 entries.
  let commonGenres = [];
  for(let book of books){
    let genreIndex = commonGenres.find((genre)=> genre.name === book.genre)
    if(genreIndex){
      genreIndex.count++;
    }else{
      commonGenres.push(buildNewObj(book.genre, 1))
    }
  }
  return sortNSplice(commonGenres, 5);
}

function getMostPopularBooks(books) {
  //returns 
  return sortNSplice(books.map((book)=> buildNewObj(book.title, book.borrows.length)), 5);
}

function getMostPopularAuthors(books, authors) {
  //sort books by check out number, will have top authors at top
  let sortedBooks = books.sort((bookA, bookB)=>bookB.borrows.length - bookA.borrows.length);

  let result = sortedBooks.reduce((acc, book, index)=>{
    let author = authors.find(objAuthor => objAuthor.id === book.authorId).name;
    acc[index] = { name: `${author.first} ${author.last}`, count: book.borrows.length};
    return acc;
  }, [])
  return sortNSplice(result, 5);
}
function buildNewObj(name, count){
  const newObj = {name: name, count: count};
  return newObj;
}
function sortNSplice(arr, limit){
  arr.sort((itemA, itemB)=>itemB.count-itemA.count);
  return arr.splice(0, limit);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
