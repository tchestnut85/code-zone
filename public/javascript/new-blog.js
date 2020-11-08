async function createBlog(event) {
    event.preventDefault();

    const blogTitle = document.querySelector('#post-title').value.trim();
    const blogContent = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
            blogTitle,
            blogContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(respne.statusText);
    }
}

document.querySelector('#create-post-form').addEventListener('submit', createBlog);