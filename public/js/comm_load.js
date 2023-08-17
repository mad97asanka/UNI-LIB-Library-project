// ------------------------------------- books show ---------------------------
const ejsContainer1 = document.getElementById('com_Panel');
window.onload = async () => {

try {
    const response = await fetch('/all_com', { method: 'POST' });
    const html = await response.text();
    ejsContainer1.innerHTML = html;
} catch (error) {
    console.error('Error:', error);
}

};