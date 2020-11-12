async function updateBlog(event) {
    event.preventDefault();

    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', updateBlog);