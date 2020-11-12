async function createComment(event) {
    event.preventDefault();


    const content = document.querySelector('#comment-text').value.trim();
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log('comment.js:', content, blog_id);


    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                blog_id,
                content
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

document.querySelector('#comment-form').addEventListener('submit', createComment);