// console.log("home file connected");

const issueContainer = document.getElementById("issue-container");

async function loadIssue() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  // console.log(data);
  displayIssue(data.data);
}

function displayIssue(issues) {
  console.log(issues);
  issues.forEach(issue => {
    console.log(issue);
    const card = document.createElement('div');
    card.className = "bg-white rounded-sm p-3 shadow-lg border-t-4 border-green-600";
    card.innerHTML = `<div class="flex justify-between mb-4 gap-5">
          <img src="./assets/Open-Status.png" alt="" class="max-w-6">
          <button class="badge badge-error rounded-full font-medium">HIGH</button>
        </div>
        <h2 class="text-[#1F2937] font-bold mb-2">Fix navigation menu on mobile devices</h2>
        <p class="text-[#64748B] line-clamp-2 text-sm">The navigation menu doesn't collapse properly on mobile
          devices...</p>
        <div class="flex gap-2 my-3">
          <button class="badge badge-error rounded-full p-4 font-medium">BUG</button>
          <button class="badge badge-warning rounded-full p-4 font-medium">HELP WANTED</button>
        </div>
        <hr class="text-gray-300 mb-3">
        <div>
          <p class="text-[#64748B]">#1 by john_doe</p>
          <p class="text-[#64748B]">1/15/2024</p>
        </div>`
    issueContainer.appendChild(card);
  })
}

loadIssue()