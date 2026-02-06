$(document).ready(function() {
    loadTodo();

    $('#newBtn').click(function() {
        var todo = prompt("Please enter a new task:");
        if (todo && todo.trim() !== "") {
            addTodo(todo);
            saveTodo();
        }
    });

    $('#ft_list').on('click', 'div', function() {
        if (confirm("Do you want to remove this task?")) {
            $(this).remove(); 
            saveTodo();
        }
    });

    function addTodo(text) {
        $('#ft_list').prepend($('<div>').text(text));
    }

    function saveTodo() {
        var todos = [];
        $('#ft_list').children().each(function() {
            todos.push($(this).text());
        });


        var date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = "ft_list=" + encodeURIComponent(JSON.stringify(todos)) + "; expires=" + date.toUTCString() + "; path=/; SameSite=Lax";
    }

    function loadTodo() {
        var cookies = document.cookie.split(';');
        var result = null;
        for (var i = 0; i < cookies.length; i++) {
            var c = cookies[i].trim();
            if (c.indexOf("ft_list=") == 0) {
                result = decodeURIComponent(c.substring("ft_list=".length));
                break;
            }
        }

        if (result) {
            try {
                var todos = JSON.parse(result);
                for (var i = todos.length - 1; i >= 0; i--) {
                    addTodo(todos[i]);
                }
            } catch (e) { console.error("Error parsing cookie"); }
        }
    }
});