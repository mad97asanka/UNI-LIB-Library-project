// ------------------------------------- books show ---------------------------
const ejsContainer1 = document.getElementById('book_Panel');
window.onload = async () => {

try {
    const response = await fetch('/all_book', { method: 'POST' });
    const html = await response.text();
    ejsContainer1.innerHTML = html;
} catch (error) {
    console.error('Error:', error);
}

};