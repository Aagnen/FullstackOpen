const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.map(b => sum += b.likes)
    return sum
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0)
        return null

    const max = blogs.reduce(function(prev, current) {
        return (prev && prev.likes > current.likes) ? prev : current
    })
    return max
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return null
    
    let authorsCount = {}
    blogs.forEach(b => {
        let a = b.author
        if (typeof(authorsCount[a]) !== 'undefined'){
            authorsCount[a] ++
        } else {
            authorsCount[a] = 1
        }
    })

    let maxAuthor = Object.keys(authorsCount).reduce((maxAuthor, author) => {
        return authorsCount[maxAuthor] > authorsCount[author] ? maxAuthor : author;
      });

    return { author: maxAuthor, count: authorsCount[maxAuthor] }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return null
    
    let authorsCount = {}
    blogs.forEach(b => {
        let a = b.author
        if (typeof(authorsCount[a]) !== 'undefined'){
            authorsCount[a] += b.likes
        } else {
            authorsCount[a] = b.likes
        }
    })

    let maxAuthor = Object.keys(authorsCount).reduce((maxAuthor, author) => {
        return authorsCount[maxAuthor] > authorsCount[author] ? maxAuthor : author;
      });

    return { author: maxAuthor, likes: authorsCount[maxAuthor] }
}
  
module.exports = {
    dummy, 
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}