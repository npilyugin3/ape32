let id = null;

async function getPost() {
  let res = await fetch("http://rp-32/api32/posts");
  let posts = await res.json();
  document.querySelector('.post-list').innerHTML = '';
  console.log(posts[0].title);
  posts.forEach((post) => {
    document.querySelector('.post-list').innerHTML += ` 
    <div class="card" style="width: 18 rem">
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.body}</p>
      <a href="#" class="card-link">Подробнее </a>
      <a href="#" class="card-link" onclick="removePost(${Post.id})">Подробнее </a>
      </div>
    </div>`

  })
}
async function addPost() {
  const title = document.getElementById('title').value,
    body = document.getElementById('body').value;
  let formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  const res = await fetch('http://rp-32/posts', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.status === true) {
    await getPosts();
  }
}

async function removePost(id){
      const res = await fetch(`http://rp-32/posts/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.status === true) {
        await getPosts();
      }
}

function selectPost(ids, title, body){
  id = ids;
  document.getElementById('title-edit').value = title;
  document.getElementById('body-edit').value = body;
}
async function updatePost(){
  const title = document.getElementById('title-edit').value,
  body = document.getElementById('body-edit').value;

  const data = {
    title: title,
    body: body
  }

  const res = await fetch(`http://rp-32/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
  let resData =  await res.Json();
  if (resData.status === true){
    await getPost();
  }
}

getPost();