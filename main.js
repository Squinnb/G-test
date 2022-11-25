import './style.css'
import { merge } from './merge.js'
import dataTwo from "/src/data2.json" assert {type: 'json'}
// ...


const getMergedData =  async () => {
  const arr1 = await d3.tsv("./src/data1.tsv")
  const arr2 = dataTwo;
  const tableData = merge(arr1, arr2);
  return tableData
 }

let tableData;
let tableCount = 10;
let tableStart = 0;
const table = document.createElement("table")
const tbody = document.createElement("tbody")

document.addEventListener("DOMContentLoaded", async() => {
  const root = document.getElementById("root")
  tableData = await getMergedData()
  main(root)
})

const generateTableRow = (themePark) => {
  const tr = document.createElement("tr")
  tr.classList.add("table-row")
  
  const imgContainer = document.createElement("td"); imgContainer.classList.add("table-col")
  const img = document.createElement("img"); img.classList.add("img")
  img.src = "/img.jpg"
  imgContainer.appendChild(img)
  tr.appendChild(imgContainer)

  for(const key of Object.keys(themePark)) {
    const keyDiv = document.createElement("td"); keyDiv.classList.add("table-col")
    keyDiv.innerText = themePark[key]
    tr.appendChild(keyDiv)
  }
  
  return tr;
}


const generateTableBody = () => {
  for(let i = tableStart; i < tableCount; i++) {
    const rowData = tableData[i]
    const row = generateTableRow(rowData)
    tbody.appendChild(row)
  }
  tableStart += 10
  tableCount += 10
  table.appendChild(tbody)
} 

const generateTableHeader = () => {
  const headerText = ["Image", "Name", "Theme", "Type","Cost", "Estimated Customers", "Maintenance Time", "Workers Required", "Updated"]
  const headerRow = document.createElement("tr"); headerRow.classList.add("header-row")
  for(const key of headerText) {
    const d = document.createElement("th")
    d.classList.add("table-col")
    d.innerText = key
    headerRow.appendChild(d)
  }
  const thead = document.createElement("thead");
  thead.appendChild(headerRow);
  return thead
}

const addIfiniteLoadMoreListeners = () => {
  const infinityScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
      console.log("infinite scrolling...")
      generateTableBody()
    }
  }
  const infinityBtn = document.getElementById("infinityBtn")
  const toggleInfinity = () => {
    if(infinityBtn.innerText === "Infinity: off") {
      infinityBtn.innerText = "Infinity: on"
      window.addEventListener('scroll', infinityScroll);
      seeMoreBtn.style.display = "none"
    } else if(infinityBtn.innerText === "Infinity: on"){
      window.removeEventListener("scroll", infinityScroll)
      infinityBtn.innerText = "Infinity: off"
      seeMoreBtn.style.display = "block"
    }
  }
  const seeMoreBtn = document.getElementById("seeMore")
  seeMoreBtn.addEventListener("click", generateTableBody)
  infinityBtn.addEventListener("click", toggleInfinity)
}

const addFormSubmit = () => {
  const inputs = document.getElementById("inputs").childNodes
  let themePark = {}
  for (const node of inputs.values()) {
    if(node.type === "text") {
      if(node.value.trim().length === 0) return;
      themePark[node.name] = node.value.trim()
      node.value = ""
    }
  }
  themePark["updated_at"] = new Date().toISOString()
  const newRow = generateTableRow(themePark)
  tbody.prepend(newRow)
}

const addFormListeners = () => {
  const addBtn = document.getElementById("addMore")
  addBtn.addEventListener("click", addFormSubmit)

  const displayFormBtn = document.getElementById("displayForm")
  displayFormBtn.addEventListener("click", () => {
    const inputBox = document.getElementById("inputBox")
    if(displayFormBtn.innerText === "Hide form"){
      inputBox.style.display = "none"
      displayFormBtn.innerText = "Show form"
    }
    else if(displayFormBtn.innerText === "Show form"){
      inputBox.style.display = "block"
      displayFormBtn.innerText = "Hide form"
    }
  })
}


const main = (root) => {
  const app = document.createElement("div")
  app.id = "app"

  const thead = generateTableHeader()
  table.appendChild(thead)
  app.appendChild(table)
  root.appendChild(app)
  generateTableBody()
  addIfiniteLoadMoreListeners()
  addFormListeners()


}


