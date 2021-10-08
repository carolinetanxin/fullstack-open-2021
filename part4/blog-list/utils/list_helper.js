const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blogi) => total + blogi.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }

    const mostLikes = blogs.reduce((pre, cur) => pre.likes > cur.likes ? pre : cur);

    const blog = {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
    }

    return blog;
}

const mostBlogs = (blogs) => {
    // 设置姓名list
    const authors = blogs.map(blog => blog.author)

    if (!authors || authors.length === 0) {
        return null
    }

    // 通过设置第二个参数，设置累加结果的初始值 {}
    // 将姓名list转换成"姓名-次数"的对象
    const countBlogsObj = authors.reduce((pre, cur) => {
        pre[cur] ? pre[cur]++ : (pre[cur] = 1)
        return pre
    }, {})

    const countBlogsList = [];
    for(let key in countBlogsObj) {
        countBlogsList.push({
            author: key,
            blogs: countBlogsObj[key]
        })
    }

    countBlogsList.sort((a, b) => b.blogs - a.blogs)

    const max = {
        author: countBlogsList[0].author,
        blogs: countBlogsList[0].blogs,
    }

    return max
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    blogs.sort((a, b) => b.likes - a.likes);
    const max = {
        author: blogs[0].author,
        likes: blogs[0].likes
    }
    return max
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
