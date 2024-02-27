document.addEventListener('DOMContentLoaded', function() {
    const formPreview = document.getElementById('form-preview');
    const addBtn = document.getElementById('add-btn');
    const importBtn = document.getElementById('import-btn');
    const exportBtn = document.getElementById('export-btn');
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    addBtn.addEventListener('click', function() {
        const fieldType = document.getElementById('field-type').value;
        const field = createFormField(fieldType);
        formPreview.appendChild(field);
    });

    importBtn.addEventListener('click', function() {
        fileInput.value = null;
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const formData = JSON.parse(e.target.result);
            if (formData) {
                formPreview.innerHTML = '';
                formData.forEach(data => {
                    const field = createFormField(data.type);
                    formPreview.appendChild(field);
                });
            }
        };
        reader.readAsText(file);
    });

    exportBtn.addEventListener('click', function() {
        const formFields = Array.from(formPreview.children).map((field, index) => {
            return { type: field.dataset.type, index: index };
        });
        const json = JSON.stringify(formFields);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form-config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    formPreview.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.index);
    });

    formPreview.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    formPreview.addEventListener('drop', function(event) {
        event.preventDefault();
        const fromIndex = event.dataTransfer.getData('text/plain');
        const toIndex = event.target.dataset.index;
        const fields = Array.from(formPreview.children);
        const fromField = fields.find(field => field.dataset.index === fromIndex);
        const toField = fields.find(field => field.dataset.index === toIndex);
        if (fromField && toField && fromIndex !== toIndex) {
            const fromIndexNum = fields.indexOf(fromField);
            const toIndexNum = fields.indexOf(toField);
            if (fromIndexNum !== -1 && toIndexNum !== -1) {
                if (fromIndexNum < toIndexNum) {
                    formPreview.insertBefore(fromField, toField.nextSibling);
                } else {
                    formPreview.insertBefore(fromField, toField);
                }
                updateIndexes();
            }
        }
    });

    let fieldIndex = 0;

    function createFormField(type) {
        const field = document.createElement('div');
        field.className = 'form-field';
        field.dataset.type = type;
        field.dataset.index = fieldIndex++;
        field.draggable = true;
        switch (type) {
            case 'text':
            case 'email':
            case 'password':
                field.innerHTML = `<input type="${type}" placeholder="${type.charAt(0).toUpperCase() + type.slice(1)} field">
                                   <button class="delete-btn">Delete</button>`;
                break;
            case 'dropdown':
                field.innerHTML = `
                    <select>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                    </select>
                    <button class="delete-btn">Delete</button>`;
                break;
            case 'checkbox':
                field.innerHTML = `<label><input type="checkbox"> Checkbox</label>
                                   <button class="delete-btn">Delete</button>`;
                break;
            case 'radio':
                field.innerHTML = `
                    <label><input type="radio" name="radio"> Option 1</label>
                    <label><input type="radio" name="radio"> Option 2</label>
                    <label><input type="radio" name="radio"> Option 3</label>
                    <button class="delete-btn">Delete</button>`;
                break;
        }
        field.querySelector('.delete-btn').addEventListener('click', function() {
            formPreview.removeChild(field);
            updateIndexes();
        });
        return field;
    }

    function updateIndexes() {
        Array.from(formPreview.children).forEach((field, index) => {
            field.dataset.index = index;
        });
    }
});