async function createBlog(event) {
    event.preventDefault();

    const blogTitle = document.querySelector('#post-title').value;
    const blogContent = document.querySelector('#post-content').value;
    console.log('blog content variables:', blogTitle, blogContent);
    // const token = req.header

    if (blogTitle && blogContent) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({
                blogTitle,
                blogContent
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            // console.log(response.statusText);
            console.log('blog content variables:', blogTitle, blogContent);
        }
    }
}

document.querySelector('#create-post-form').addEventListener('submit', createBlog);