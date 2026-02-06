
var ft_list = document.getElementById('ft_list');
var newBtn = document.getElementById('newBtn');

window.onload = function() {
    loadTodo();
};

newBtn.addEventListener("click", function() {
    var todo = prompt("Please enter a new task:");
    if (todo !== "" && todo !== null) {
        addTodo(todo);
        saveTodo(); 
    }
});

function addTodo(text) {
    var div = document.createElement("div");
    div.innerHTML = text;
    
    div.addEventListener("click", function() {
        if (confirm("Do you want to remove this task?")) {
            this.remove(); 
            saveTodo();    
        }
    });

    ft_list.prepend(div);
}

function saveTodo() {
    var todos = [];
    var children = ft_list.children;
    
    for (var i = 0; i < children.length; i++) {
        todos.push(children[i].innerHTML);
    }

    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    
    document.cookie = "ft_list=" + encodeURIComponent(JSON.stringify(todos)) + ";" + expires + ";path=/;SameSite=Lax";
}

function loadTodo() {
    var cookies = document.cookie.split(';');
    var result = null;

    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf("ft_list=") == 0) {
            result = decodeURIComponent(c.substring("ft_list=".length, c.length));
            break;
        }
    }

    if (result) {
        try {
            var todos = JSON.parse(result);
            for (var i = todos.length - 1; i >= 0; i--) {
                addTodo(todos[i]);
            }
        } catch (e) {
            console.error("Error parsing cookie");
        }
    }
}