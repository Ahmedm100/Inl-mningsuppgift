document.addEventListener("DOMContentLoaded", () => {
    const programForm = document.getElementById("program-form");
    const programTitle = document.getElementById("program-title");
    const programDescription = document.getElementById("program-description");
    const programAgeLimit = document.getElementById("program-age-limit");
    const programList = document.getElementById("program-list");
    const searchProgram = document.getElementById("search-program");

    function saveProgram(program) {
        const programs = getProgramsFromLocalStorage();
        programs.push(program);
        localStorage.setItem("programs", JSON.stringify(programs));
    }
    function getProgramsFromLocalStorage() {
        const programs = JSON.parse(localStorage.getItem("programs")) || [];
        return programs;
    }   
    function fillFormWithSavedData() {
        const savedData = JSON.parse(localStorage.getItem("savedData")) || {};
        programTitle.value = savedData.title || "";
        programDescription.value = savedData.description || "";
        programAgeLimit.value = savedData.ageLimit || "";
    }
    fillFormWithSavedData();

    programForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = programTitle.value;
        const description = programDescription.value;
        const ageLimit = programAgeLimit.value;

       
        const program = { title, description, ageLimit };
        saveProgram(program);
        
        addProgramToList(program);

        programTitle.value = "";
        programDescription.value = "";
        programAgeLimit.value = "";

        
        const savedData = { title, description, ageLimit };
        localStorage.setItem("savedData", JSON.stringify(savedData));
    });

    programList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const listItem = e.target.parentElement;
            const programTitle = listItem.querySelector("strong").textContent;
            removeProgramFromList(programTitle);
        }
    });

    searchProgram.addEventListener("input", () => {
        const searchValue = searchProgram.value.toLowerCase();
        const programs = getProgramsFromLocalStorage();
        const filteredPrograms = programs.filter(program => program.title.toLowerCase().includes(searchValue));
        displayPrograms(filteredPrograms);
    });

    const addProgramToList = (program) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${program.title}</strong> (Åldersgräns: ${program.ageLimit})<br>${program.description} <button class="remove-button">Remove habibi</button>`;
        programList.appendChild(listItem);
    };

    const displayPrograms = (programs) => {
        programList.innerHTML = "";
        programs.forEach(program => addProgramToList(program));
    };

    const removeProgramFromList = (title) => {
        const updatedPrograms = getProgramsFromLocalStorage().filter(program => program.title !== title);
        localStorage.setItem("programs", JSON.stringify(updatedPrograms));
        displayPrograms(updatedPrograms);
    };
});
