let pageNo_one = document.getElementById("pageNoone");
let pageNo_Two = document.getElementById("pageNo_Two");
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");

let page = 1;
let loading = false;
window.addEventListener("scroll", () => {
  if (loading) return;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    page++;
    fetchData(page);
  }
});

fetchData(page);
async function fetchData(page = 1, perPage) {
  try {
    loading = true;
    // let perPage= 9;
    const response = await fetch(
      `https://api.github.com/search/users?q=followers:>0&sort=followers&order=desc&page=${page}&per_page=${perPage}`
    );
    const data = await response.json();
    console.log(data, "data");
    renderUsers(data.items);
    const response2 = await fetch(
      `https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=&page=${page}&per_page=${perPage}`
    );
    const repoData = await response2.json();
    console.log("second api:", repoData);
    renderStars(repoData.items);
    perPage += 100;
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    loading = false;
  }
  perPage += 100;
}

function renderUsers(users) {
  const userList = document.getElementById("userList");
  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    userCard.innerHTML = `
            <h2>${user.id}</h2>
            <h3>${user.type}</h3>
            <h3>${user.login}</h3>
            <a href="${user.html_url}">Profile</a>
            <br>
        `;
    userList.appendChild(userCard);
  });
}
function renderStars(repos) {
  const repList_Items = document.getElementById("repList_Items");
  repos.forEach((repa) => {
    const { name, id, stargazers_count, html_url } = repa;
    const myRepoCard = document.createElement("div");
    myRyepoCard.classList.add("repa-card");
    myRepoCard.innerHTML = `
            <h2 class="repa-name">name: ${name}</h2>
            <p class="repa-description">id: ${id}</p>
            <p class="repa-stars">Stars: ${stargazers_count}</p>
            <a href="${html_url}" class="repa-list">View Repo</a>
            <br>
        `;
    repList_Items.appendChild(repoCard);
  });
}
