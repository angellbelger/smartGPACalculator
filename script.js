let subject = window.document.querySelector('input#subject')
let note = window.document.querySelector('input#note')
let credit = window.document.querySelector('input#credit')
let tabSub = window.document.querySelector('select#tabSub')

let subjectsPro = {subject: '', note: 0, credit: 0}



function addSub (paramSub= 'Nonename', paramNote= 0, paramCred= 0){
    if (subject.value.length == 0){
        window.alert('Please, type a value for subject.')
    }else{
        subjectsPro.subject = subject.value
    }
    if (note.value < 0 || note.value > 10){
        window.alert('Please, type a value between 0 and 10.')
    }else{
        subjectsPro.note = Number(note.value)
    }
    if (credit.value.length == 0){
        window.alert('Type a valie credit.')
    }else{
        subjectsPro.credit = Number(credit.value)
    }
    let list = []
    list.push(subjectsPro)
    
    let item = document.createElement('option')
    item.text = `The value is ${list.subjectsPro.subject}`
    item.value = list[0].subject.value
    tabSub.appendChild(item)

}