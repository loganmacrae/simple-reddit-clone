document.addEventListener('DOMContentLoaded', loadApp);

function loadApp() {
    loadCommunities();
    loadPosts();
}

function loadCommunities() {
    const communitySelect = document.getElementById('community-select');
    communitySelect.innerHTML = '';
    const communities = getCommunities();
    communities.forEach(community => {
        const option = document.createElement('option');
        option.value = community;
        option.textContent = community;
        communitySelect.appendChild(option);
    });
}

function getCommunities() {
    return JSON.parse(localStorage.getItem('communities')) || [];
}

function saveCommunities(communities) {
    localStorage.setItem('communities', JSON.stringify(communities));
}

function createCommunity() {
    const communityName = document.getElementById('community-name').value.trim();
    if (communityName) {
        const communities = getCommunities();
        communities.push(communityName);
        saveCommunities(communities);
        loadCommunities();
        document.getElementById('community-name').value = '';
    }
}

function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    const posts = getPosts();
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title} (${post.community})</h3>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function createPost() {
    const communitySelect = document.getElementById('community-select');
    const postTitle = document.getElementById('post-title').value.trim();
    const postContent = document.getElementById('post-content').value.trim();
    if (communitySelect.value && postTitle && postContent) {
        const posts = getPosts();
        posts.push({
            community: communitySelect.value,
            title: postTitle,
            content: postContent
        });
        savePosts(posts);
        loadPosts();
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
    }
}
