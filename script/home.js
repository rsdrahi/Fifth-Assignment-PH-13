// console.log("home file connected");

const issueContainer = document.getElementById("issue-container");
const issueModal = document.getElementById("issue_modal");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalDescription = document.getElementById("modal-description");
const modalAuthor = document.getElementById("modal-author");
const modalPriority = document.getElementById("modal-priority");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const allBtn = document.getElementById("all-btn");
const issueCounter = document.getElementById("issue-counter");
const loadingSpinner = document.getElementById("loading-spinner");
const searchInput = document.getElementById("search-input");
let allIssues = [];

function showLoading() {
    loadingSpinner.classList.remove("hidden");
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}
function activeButton() {
  allBtn.classList.remove("btn-primary");
  allBtn.classList.add("btn-outline");
  openBtn.classList.remove("btn-primary");
  openBtn.classList.add("btn-outline");
  closedBtn.classList.remove("btn-primary");
  closedBtn.classList.add("btn-outline");
}

async function loadIssue() {
  showLoading();
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  // console.log(data);
  allIssues = data.data
  displayIssue(allIssues);
  hideLoading();
}

function displayIssue(issues) {
  // console.log(issues);
  issueContainer.innerHTML = "";
  // console.log(issues.length)
  issueCounter.innerText = `${issues.length} Issues`;
  issues.forEach(issue => {
    // console.log(issue);
    const card = document.createElement('div');
    card.addEventListener('click', function () {
      openIssueModal(issue.id);
    })
    const statusImage = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"
    console.log(statusImage);
    const borderColor = issue.status === "open" ? "border-t-green-700" : "border-t-purple-700";
    card.className = `bg-white rounded-sm p-3 shadow-lg border-t-4 ${borderColor} card`;
    let labelsHTML = "";

    issue.labels.forEach(label => {
    labelsHTML += `<button class="badge badge-warning rounded-full p-4 font-medium">${label}</button>`;
    });
    card.innerHTML = `<div class="flex justify-between mb-4 gap-5">
          <img src="${statusImage}" alt="" class="max-w-6">
          <button class="badge badge-error rounded-full font-medium">${issue.priority}</button>
        </div>
        <h2 class="text-[#1F2937] font-bold mb-2">${issue.title}</h2>
        <p class="text-[#64748B] line-clamp-2 text-sm">${issue.description}</p>
        <div class="flex gap-2 my-3">
        ${labelsHTML}
       </div>
        <hr class="text-gray-300 mb-3">
        <div class="flex justify-between">
         <div>
          <p class="text-[#64748B]">${issue.author}</p>
          <p class="text-[#64748B]">${issue.assignee}</p>
         </div>
         <div>
          <p class="text-[#64748B]">${issue.createdAt}</p>
          <p class="text-[#64748B]">${issue.updatedAt}</p>
         </div>
        </div>`
    issueContainer.appendChild(card);
  })
}

async function openIssueModal(issueId) {
  console.log(issueId, "issueID")
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
  const data = await res.json()
  const issueDetails = data.data;
  console.log(issueDetails, "data");
  issueModal.showModal();
  modalTitle.textContent = issueDetails.title
  modalStatus.textContent = issueDetails.status
  modalDescription.textContent = issueDetails.description
  modalAuthor.textContent = issueDetails.author
  modalPriority.textContent = issueDetails.priority
}

allBtn.addEventListener('click', () => {
  activeButton();
  allBtn.classList.remove("btn-outline");
  allBtn.classList.add("btn-primary");
  displayIssue(allIssues);
})

openBtn.addEventListener('click', () => {
  showLoading();
  activeButton();
  openBtn.classList.remove("btn-outline");
  openBtn.classList.add("btn-primary");
  const openIssue = allIssues.filter(issue => issue.status === 'open');
  displayIssue(openIssue);
  hideLoading();
})

closedBtn.addEventListener('click', () => {
  showLoading();
  activeButton();
  closedBtn.classList.remove("btn-outline");
  closedBtn.classList.add("btn-primary");
  const closedIssue = allIssues.filter(issue => issue.status === "closed");
  displayIssue(closedIssue);
  hideLoading();
})


loadIssue();

searchInput.addEventListener("keydown", (e) => {
  const inputSearch = e.target.value;
  console.log(inputSearch);
  searchIssue(inputSearch);
});
  
async function searchIssue(inputSearch) {
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputSearch}`);
  const data = await res.json();
  console.log(data);
  displayIssue(data.data);
}












// "id": 42,
// "title": "Add role-based access control",
// "description": "Implement RBAC system with different permission levels for users, moderators, and admins.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "high",
// "author": "rbac_rachel",
// "assignee": "security_sam",
// "createdAt": "2024-01-23T08:45:00Z",
// "updatedAt": "2024-01-23T08:45:00Z"