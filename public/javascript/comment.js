async function createComment(event) {
    event.preventDefault();

    const content = document.querySelector('textarea["comment-body"]').value.trim();
    const blog_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    console.log('blog_id:', blog_id);

    if (content) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({
                content,
                blog_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.comment-form').addEventListener('sumbit', createComment);