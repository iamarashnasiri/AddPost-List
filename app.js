// Post class
class Post {
    constructor(title, author, content) {
        this.title = title;
        this.author = author;
        this.content = content;
    }
}
// UI class
class UI {
    // add post in document
    addPost(post) {
        const list = document.getElementById('table-body')
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${post.title}</td>
        <td>${post.author}</td>
        <td>${post.content}</td>
        <td class="remove">X</td>
        `;
        list.appendChild(row)
    }
    // show alert when a element has chenge
    showAlert(message, className) {
        const div = document.createElement('div')
        div.setAttribute('id', 'alert')
        div.className = `alert-${className}`;
        div.innerHTML = message;
        const container = document.querySelector('.container')
        const form = document.getElementById('create-post')
        container.insertBefore(div, form)
        setTimeout(() => {
            document.getElementById('alert').remove()
        }, 3000);
    }
    // clear inouts when submited
    clearInputs() {
        title.value = "";
        author.value = "";
        content.value = "";
    }
    // remove item from document
    removeItem(target) {
        target.parentElement.remove()
        this.showAlert('Post deleted', 'danger')
    }
}
// Store in local storage class
class Store {
    // get item from local storage
    static downPost() {
        let posts;
        if (localStorage.getItem('posts') === null) {
            posts = [];
        } else {
            posts = JSON.parse(localStorage.getItem('posts'))
        }
        return posts;
    }
    // set item into storage
    static upPost(post) {
        const posts = Store.downPost()
        posts.push(post)
        localStorage.setItem('posts', JSON.stringify(posts))
    }
    // display item when load page, get item from local storage
    static displayPost() {
        const posts = Store.downPost()
        posts.forEach(post => {
            const ui = new UI;
            ui.addPost(post)
        });
    }
    // clear item from local storage
    static erasePost(item) {
        const posts = Store.downPost()
        posts.forEach((post, index) => {

            if (JSON.stringify(post) === JSON.stringify(item)) {
                posts.splice(index, 1)
            }
            localStorage.setItem('posts', JSON.stringify(posts))
        });
    }
}
// events
document.addEventListener('DOMContentLoaded', Store.displayPost)
document.getElementById('create-post').addEventListener('submit', getPost)
document.getElementById('table-body').addEventListener('click', removePost)
// functions
function getPost(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const post = new Post(title, author, content)
    const ui = new UI()
    if (title === "" || author === "" || content === "") {
        ui.showAlert('Input is required !', 'danger')
    } else {
        ui.addPost(post)
        Store.upPost(post)
        ui.clearInputs()
        ui.showAlert('Post added successfully !', 'success')
    }
    e.preventDefault();
}
function removePost(e) {
    const ui = new UI()
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove()
        ui.removeItem(e.target)
        const post = {
            title: e.target.parentElement.children[0].textContent,
            author: e.target.parentElement.children[1].textContent,
            content: e.target.parentElement.children[2].textContent
        }
        Store.erasePost(post)
    }
}
