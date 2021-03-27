$(() => {
    const getFormSubmitHandler = (endpoint, redirect) => {
        return (e) => {
            e.preventDefault();
                    
            // get data
            let form = $(e.target);
            let formData = form.serializeArray();
            
            // format data for api
            const registerDetails = {};
            formData.forEach(({ name: key, value }) => {
                registerDetails[key] = value;
            });
            
            $.post(endpoint, registerDetails)
                .done((data) => {
                    window.location.href = redirect;
                })
                .fail((err) => {
                    console.error(err);
                });
        };
    };

    $("#registerForm").on("submit", getFormSubmitHandler("/api/register", "/login"));
    $("#loginForm").on("submit", getFormSubmitHandler("/api/login", "/dashboard"));
});