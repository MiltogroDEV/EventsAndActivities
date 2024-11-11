function showMessage(type, message) {
    const messageBox = document.getElementById("messageBox");
    
    if (type === "success") {
        messageBox.className = "alert alert-success";
        messageBox.style.backgroundColor = "rgba(60, 255, 0, 0.253)";
    } else if (type === "error") {
        messageBox.className = "alert alert-danger";
        messageBox.style.backgroundColor = "rgba(255, 0, 0, 0.253)";
    } else if (type === "warning") {
        messageBox.className = "alert alert-warning";
        messageBox.style.backgroundColor = "rgba(rgb(255, 202, 0, 0.5)";
    }
    
    messageBox.textContent = message;
    messageBox.style.display = "inline";
    
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

export { showMessage };