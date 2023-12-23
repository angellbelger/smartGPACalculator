// Vetor para armazenar as disciplinas
var subjectsArray = [];

// Função para adicionar uma disciplina
function addSub() {
    // Obter os valores dos campos
    var subject = document.getElementById("subject").value.trim();
    var note = parseFloat(document.getElementById("note").value);
    var credit = parseFloat(document.getElementById("credit").value);

    // Verificar se os valores são válidos
    if (subject && !isNaN(note) && !isNaN(credit)) {
        // Adicionar a disciplina ao vetor
        subjectsArray.push({
            subject: subject,
            note: note,
            credit: credit
        });

        // Atualizar a tabela com as disciplinas
        updateSubjectsTable();

        // Limpar os campos
        document.getElementById("subject").value = "";
        document.getElementById("note").value = "";
        document.getElementById("credit").value = "";
    } else {
        console.error("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para remover uma disciplina
function removeSub(index) {
    subjectsArray.splice(index, 1);
    updateSubjectsTable(); // Atualiza a tabela após a remoção
}

// Função para atualizar o select com as disciplinas
function updateSubjectsSelect() {
    var tabSub = document.getElementById("tabSub");
    // Limpar as opções existentes
    tabSub.innerHTML = "";

    // Adicionar as disciplinas como opções
    for (var i = 0; i < subjectsArray.length; i++) {
        var option = document.createElement("option");
        option.text = subjectsArray[i].subject + ": " + subjectsArray[i].note + " / " + subjectsArray[i].credit;
        tabSub.add(option);
    }
}

// Função para calcular o GPA e atualizar a tabela
function calculateGPA() {
    var totalCredits = 0;
    var totalWeightedPoints = 0;

    // Iterar sobre as disciplinas
    for (var i = 0; i < subjectsArray.length; i++) {
        // Converter a nota para a escala de 0 a 4
        var scaledGrade = (subjectsArray[i].note * 4) / 10;

        totalWeightedPoints += scaledGrade * subjectsArray[i].credit;
        totalCredits += subjectsArray[i].credit;
    }

    // Calcular o GPA na escala de 0 a 4
    var gpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

    // Exibir o GPA no rodapé da tabela
    document.getElementById("gpa").textContent = gpa.toFixed(2);
}

// Função para atualizar a tabela com as disciplinas e calcular o GPA
function updateSubjectsTable() {
    var tableBody = document.getElementById("tableBody");

    // Limpar as linhas existentes
    tableBody.innerHTML = "";

    // Adicionar as disciplinas como linhas na tabela
    for (var i = 0; i < subjectsArray.length; i++) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3); // Nova célula para o botão de remoção

        cell1.innerHTML = subjectsArray[i].subject;
        cell2.innerHTML = subjectsArray[i].note;
        cell3.innerHTML = subjectsArray[i].credit;

        // Adicionar botão de remoção com o sinal "-"
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "  —  ";
        removeButton.onclick = createRemoveHandler(i); // Usar uma função de fábrica para criar handlers únicos
        cell4.appendChild(removeButton);
    }

    // Calcular o GPA e atualizar o rodapé
    calculateGPA();
}

// Função para criar um handler de remoção único para cada botão
function createRemoveHandler(index) {
    return function () {
        removeSub(index);
    };
}
