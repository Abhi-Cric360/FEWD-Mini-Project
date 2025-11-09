let uploadedImageSrc = "";
let form = document.querySelector('#form1');

function hide() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.container2').style.display = 'block';
    document.querySelector('.details').style.display = 'none';

}

function hidet1() {
    document.querySelector('.container2').style.display = 'none';
    document.querySelector('.details').style.display = 'flex';
}

function addToList(selectId, inputId, listId) {
    const select = document.querySelector(selectId);
    const input = document.querySelector(inputId);
    const list = document.querySelector(listId);

    let value = input.value;
    if (value === '' && select.value !== '') {
        value = select.value;
    }

    if (value !== '') {
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        newItem.innerHTML = `<p>${value}</p><button type="button" class="remove-btn">X</button>`;

        newItem.querySelector('.remove-btn').addEventListener('click', function () {
            newItem.remove();
        });

        list.appendChild(newItem);
        input.value = '';
        select.value = '';
    }
}

document.querySelector('#image-upload').addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (event) {
            document.querySelector('#upload-preview').src = event.target.result;
            uploadedImageSrc = event.target.result;
        }

        reader.readAsDataURL(e.target.files[0]);
    }
});


document.querySelector('#add-skill-btn').addEventListener('click', function () {
    addToList('#skills', '#custom-skill', '#skills-list');
});

document.querySelector('#add-hobby-btn').addEventListener('click', function () {
    addToList('#hobbies', '#custom-hobby', '#hobbies-list');
});

document.querySelector('#add-lang-btn').addEventListener('click', function () {
    addToList('#languages', '#custom-language', '#languages-list');
});


document.querySelector('#add-edu-btn').addEventListener('click', function () {
    const level = document.querySelector('#edu-level').value;
    const course = document.querySelector('#edu-course').value.trim();
    const school = document.querySelector('#edu-school').value.trim();
    const years = document.querySelector('#edu-years').value.trim();
    const score = document.querySelector('#edu-score').value.trim();
    const list = document.querySelector('#education-list');

    if (course && school && years && score) {
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        newItem.innerHTML = `
                <p>
                    <strong>${course}</strong> (${school})
                    <span class="data-edu-course" style="display:none">${course}</span>
                    <span class="data-edu-level" style="display:none">${level}</span>
                    <span class="data-edu-school" style="display:none">${school}</span>
                    <span class="data-edu-years" style="display:none">${years}</span>
                    <span class="data-edu-score" style="display:none">${score}</span>
                </p>
                <button type="button" class="remove-btn">X</button>`;

        newItem.querySelector('.remove-btn').addEventListener('click', function () {
            newItem.remove();
        });

        list.appendChild(newItem);

        document.querySelector('#edu-course').value = '';
        document.querySelector('#edu-school').value = '';
        document.querySelector('#edu-years').value = '';
        document.querySelector('#edu-score').value = '';
    }
});

document.querySelector('#add-project-btn').addEventListener('click', function () {
    const title = document.querySelector('#project-title').value.trim();
    const desc = document.querySelector('#project-desc').value.trim();
    const list = document.querySelector('#projects-list');

    if (title && desc) {
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        newItem.innerHTML = `
                <p>
                    <strong>${title}</strong>
                    <span class="data-proj-title" style="display:none">${title}</span>
                    <span class="data-proj-desc" style="display:none">${desc}</span>
                </p>
                <button type="button" class="remove-btn">X</button>`;

        newItem.querySelector('.remove-btn').addEventListener('click', function () {
            newItem.remove();
        });

        list.appendChild(newItem);
        document.querySelector('#project-title').value = '';
        document.querySelector('#project-desc').value = '';
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;
    let email = document.querySelector('#email').value;
    let github = document.querySelector('#github').value;
    let linkedin = document.querySelector('#linkedin').value;
    let address = document.querySelector('#address').value;
    let about = document.querySelector('#about').value;

    document.querySelector('.pname p').innerText = name;
    document.querySelector('.p-about p').innerText = about;

    document.querySelector('#pphone').innerHTML = `<i class="fa-solid fa-phone"></i> ${phone}`;
    document.querySelector('#pemail').innerHTML = `<i class="fa-solid fa-envelope"></i> ${email}`;
    document.querySelector('#pgit').innerHTML = `<i class="fa-brands fa-github"></i> ${github}`;
    document.querySelector('#plinked').innerHTML = `<i class="fa-brands fa-linkedin"></i> ${linkedin}`;
    document.querySelector('#padd').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${address}`;

    if (uploadedImageSrc) {
        document.querySelector('#preview-image').src = uploadedImageSrc;
    }

    const skillsList = document.querySelector('#skills-list');
    const skills = skillsList.querySelectorAll('.list-item p');
    let skillsHTML = '';
    skills.forEach(skill => {
        skillsHTML += `<li>${skill.innerText}</li>`;
    });
    document.querySelector('.p-skills ul').innerHTML = skillsHTML || "<li>Add a skill</li>";

    const hobbiesList = document.querySelector('#hobbies-list');
    const hobbies = hobbiesList.querySelectorAll('.list-item p');
    let hobbiesArr = [];
    hobbies.forEach(hobby => hobbiesArr.push(hobby.innerText));
    document.querySelector('#phobbies').innerText = hobbiesArr.join(', ') || "Add a hobby";

    const langList = document.querySelector('#languages-list');
    const languages = langList.querySelectorAll('.list-item p');
    let langArr = [];
    languages.forEach(lang => langArr.push(lang.innerText));
    document.querySelector('#planguages').innerText = langArr.join(', ') || "Add a language";

    const eduContainer = document.querySelector('#preview-education');
    const eduList = document.querySelector('#education-list');
    const eduItems = eduList.querySelectorAll('.list-item');
    eduContainer.innerHTML = '<h2><i class="fa-solid fa-graduation-cap"></i> Education</h2>';

    if (eduItems.length > 0) {
        eduItems.forEach(item => {
            const course = item.querySelector('.data-edu-course').innerText;
            const school = item.querySelector('.data-edu-school').innerText;
            const years = item.querySelector('.data-edu-years').innerText;
            const score = item.querySelector('.data-edu-score').innerText;

            eduContainer.innerHTML += `
                        <div class="p-item">
                            <h3>${course}</h3>
                            <p>${school} (${years})</p>
                            <p>${score}</p>
                        </div>`;
        });
    }

    const projectsContainer = document.querySelector('#preview-projects');
    const projectsList = document.querySelector('#projects-list');
    const projectItems = projectsList.querySelectorAll('.list-item');
    projectsContainer.innerHTML = '<h2><i class="fa-solid fa-briefcase"></i> Projects</h2>';

    if (projectItems.length > 0) {
        projectItems.forEach(item => {
            const title = item.querySelector('.data-proj-title').innerText;
            const desc = item.querySelector('.data-proj-desc').innerText;

            projectsContainer.innerHTML += `
                        <div class="p-item">
                            <h3>${title}</h3>
                            <p>${desc}</p>
                        </div>`;
        });
    }
});

document.querySelector('#upload-trigger').addEventListener('click', function () {
    document.querySelector('#image-upload').click();
});

document.querySelector('#download-btn').addEventListener('click', function() {
    const element = document.querySelector('#preview');
    const opt = {
      margin:       0,
      filename:     'resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
});